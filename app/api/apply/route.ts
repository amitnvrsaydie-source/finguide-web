import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { full_name, email, phone, city, registration_type, sebi_reg_no, years_experience, bio } = body

    if (!full_name || !email || !sebi_reg_no || !registration_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('advisor_applications')
      .insert({
        full_name,
        email,
        phone,
        city,
        registration_type,
        sebi_reg_no,
        years_experience: parseInt(years_experience) || 0,
        bio,
        status: 'pending',
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError.message)
      // Continue to send emails even if DB fails
    }

    // Admin notification email
    await resend.emails.send({
      from: 'FinGuide <hello@finguide.in>',
      to: 'hello@finguide.in',
      subject: `New Advisor Application — ${full_name} (${sebi_reg_no})`,
      html: `
        <h2 style="color:#10b981">New Advisor Application</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px;color:#6b7280;width:180px">Name</td><td style="padding:8px;font-weight:600">${full_name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#6b7280">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;color:#6b7280">Phone</td><td style="padding:8px">${phone || '—'}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#6b7280">City</td><td style="padding:8px">${city || '—'}</td></tr>
          <tr><td style="padding:8px;color:#6b7280">Registration Type</td><td style="padding:8px">${registration_type}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#6b7280">SEBI / ARN No.</td><td style="padding:8px;font-weight:600">${sebi_reg_no}</td></tr>
          <tr><td style="padding:8px;color:#6b7280">Experience</td><td style="padding:8px">${years_experience} years</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#6b7280;vertical-align:top">Bio</td><td style="padding:8px">${bio || '—'}</td></tr>
        </table>
        <p style="color:#6b7280;font-size:12px;margin-top:24px">Submitted via finguide.in/apply</p>
      `,
    })

    // Applicant confirmation email
    await resend.emails.send({
      from: 'FinGuide <hello@finguide.in>',
      to: email,
      subject: 'We received your application — FinGuide',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#10b981">Application Received</h2>
          <p style="color:#374151">Hi ${full_name},</p>
          <p style="color:#374151">Thank you for applying to be listed on FinGuide. We have received your application and will manually review your SEBI registration details.</p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:24px 0">
            <p style="margin:0;color:#166534;font-size:14px">⏱ <strong>What happens next?</strong></p>
            <p style="margin:8px 0 0;color:#166534;font-size:14px">We review all applications within <strong>3–5 business days</strong>. We will contact you at ${email} with the outcome.</p>
          </div>
          <p style="color:#374151">Your application details:</p>
          <ul style="color:#6b7280;font-size:14px;line-height:1.8">
            <li>Registration: ${registration_type}</li>
            <li>SEBI / ARN No.: ${sebi_reg_no}</li>
            <li>City: ${city || '—'}</li>
          </ul>
          <p style="color:#374151">Questions? Reply to this email or write to <a href="mailto:hello@finguide.in" style="color:#10b981">hello@finguide.in</a>.</p>
          <p style="color:#374151">— Team FinGuide</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
          <p style="color:#9ca3af;font-size:12px">FinGuide is a discovery platform. We are not a SEBI-registered entity.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Apply error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
