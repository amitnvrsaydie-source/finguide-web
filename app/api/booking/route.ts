import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const {
    name, email, phone, service,
    meeting_mode, meeting_date, meeting_time,
    advisor_name, advisor_id
  } = body

  // Save to Supabase
  await supabase.from('bookings').insert({
    advisor_id,
    advisor_name,
    meeting_mode,
    meeting_date,
    meeting_time,
    name,
    email,
    phone,
    status: 'confirmed'
  })

  // Send confirmation email to user
  await resend.emails.send({
    from: 'FinGuide <hello@finguide.in>',
    to: email,
    subject: '✅ Booking Confirmed — FinGuide',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a0f; color: white; padding: 32px; border-radius: 12px;">
        <h2 style="color: #10b981;">Booking Confirmed! 🎉</h2>
        <p>Hi ${name},</p>
        <p>Your session with <strong>${advisor_name}</strong> is confirmed.</p>
        <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${meeting_date}</p>
          <p><strong>Time:</strong> ${meeting_time}</p>
          <p><strong>Mode:</strong> ${meeting_mode}</p>
        </div>
        <p style="color: #10b981;">First session is absolutely free — no hidden charges.</p>
        <p style="color: #888;">Your advisor will reach out to confirm the meeting link shortly.</p>
        <p>— Team FinGuide</p>
      </div>
    `
  })

  // Send notification to advisor
  await resend.emails.send({
    from: 'FinGuide <hello@finguide.in>',
    to: 'hello@finguide.in',
    subject: `New Booking — ${name} with ${advisor_name}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>New Booking Received</h2>
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Advisor:</strong> ${advisor_name}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${meeting_date}</p>
        <p><strong>Time:</strong> ${meeting_time}</p>
        <p><strong>Mode:</strong> ${meeting_mode}</p>
      </div>
    `
  })

  return NextResponse.json({ success: true })
}