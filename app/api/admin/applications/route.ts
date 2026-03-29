import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

function isAdmin(req: NextRequest) {
  return req.cookies.get('admin_session')?.value === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('advisor_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ applications: data })
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, action } = await req.json()
  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Fetch the application
  const { data: app, error: fetchErr } = await supabase
    .from('advisor_applications')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchErr || !app) return NextResponse.json({ error: 'Application not found' }, { status: 404 })

  if (action === 'approve') {
    // Move to advisors table (only columns that exist in advisors schema)
    const { error: insertErr } = await supabase.from('advisors').insert({
      full_name: app.full_name,
      city: app.city || '',
      sebi_reg_no: app.sebi_reg_no,
      years_experience: app.years_experience || 0,
      bio: app.bio || '',
      specializations: [],
      languages: [],
    })

    if (insertErr) {
      console.error('Advisor insert error:', insertErr.message)
      return NextResponse.json({ error: insertErr.message }, { status: 500 })
    }

    // Update application status
    await supabase
      .from('advisor_applications')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', id)

    // Send approval email
    await resend.emails.send({
      from: 'ZeroBias <onboarding@resend.dev>',
      to: app.email,
      subject: '🎉 You are now listed on ZeroBias!',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#10b981">Welcome to ZeroBias, ${app.full_name}!</h2>
          <p style="color:#374151">Your advisor profile has been <strong>approved</strong> and is now live on ZeroBias.</p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:24px 0">
            <p style="margin:0;color:#166534;font-size:14px">✅ Your profile is now visible to investors across India.</p>
          </div>
          <p style="color:#374151">You can view your public profile at <a href="https://zerobias.in/advisors" style="color:#10b981">zerobias.in/advisors</a>.</p>
          <p style="color:#374151">— Team ZeroBias</p>
        </div>
      `,
    })

  } else {
    // Reject
    await supabase
      .from('advisor_applications')
      .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
      .eq('id', id)

    await resend.emails.send({
      from: 'ZeroBias <onboarding@resend.dev>',
      to: app.email,
      subject: 'Update on your ZeroBias application',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#374151">Application Update</h2>
          <p style="color:#374151">Hi ${app.full_name},</p>
          <p style="color:#374151">Thank you for applying to ZeroBias. After reviewing your application, we are unable to list your profile at this time.</p>
          <p style="color:#374151">If you believe this is an error or would like to re-apply, please write to <a href="mailto:hello@zerobias.in" style="color:#10b981">hello@zerobias.in</a>.</p>
          <p style="color:#374151">— Team ZeroBias</p>
        </div>
      `,
    })
  }

  return NextResponse.json({ success: true })
}
