import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const getResend = () => new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name, email, phone, service,
      meeting_mode, meeting_date, meeting_time,
      advisor_name, advisor_id, amount
    } = body

    const fee = Number(amount) > 0 ? Number(amount) : 0

    // Save booking to DB — 'service' column doesn't exist yet, store package in advisor_name
    const advisorLabel = advisor_id
      ? (advisor_name || 'To be assigned')
      : `TBA — ${service}`  // e.g. "TBA — Investment Kickstart"

    const { error: dbError } = await supabase.from('bookings').insert({
      advisor_id: advisor_id || null,
      advisor_name: advisorLabel,
      meeting_mode,
      meeting_date,
      meeting_time,
      name,
      email,
      phone,
      status: 'confirmed'
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
    }

    // Fetch advisor's email so we can notify them
    let advisorEmail: string | null = null
    if (advisor_id) {
      const { data: advisorData } = await supabase
        .from('advisors')
        .select('email')
        .eq('id', advisor_id)
        .single()
      advisorEmail = advisorData?.email ?? null
    }

    const bookingDetails = `
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:20px 0;font-size:14px;color:#374151">
        <p style="margin:0 0 8px"><strong>Service:</strong> ${service}</p>
        <p style="margin:0 0 8px"><strong>Date:</strong> ${meeting_date}</p>
        <p style="margin:0 0 8px"><strong>Time:</strong> ${meeting_time}</p>
        <p style="margin:0"><strong>Mode:</strong> ${meeting_mode}</p>
        ${fee ? `<p style="margin:8px 0 0"><strong>Session fee:</strong> ₹${fee.toLocaleString('en-IN')}</p>` : ''}
      </div>
    `

    const paymentNote = fee
      ? `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px;margin:20px 0">
           <p style="margin:0;color:#1e40af;font-size:14px">💳 <strong>Payment:</strong> After your introductory session, once your advisor session is confirmed, we will send a secure payment link for ₹${fee.toLocaleString('en-IN')} to this email. No payment is needed right now.</p>
         </div>`
      : `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:20px 0">
           <p style="margin:0;color:#166534;font-size:14px">⭐ First session is completely free — no hidden charges.</p>
         </div>`

    // 1. Confirmation email to client
    await getResend().emails.send({
      from: 'ZeroBias <hello@zerobias.in>',
      to: email,
      subject: '✅ Session Confirmed — ZeroBias',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#10b981">Session Confirmed! 🎉</h2>
          <p style="color:#374151">Hi ${name},</p>
          <p style="color:#374151">Your booking is confirmed. Here is how it works:</p>
          <ol style="color:#374151;font-size:14px;padding-left:20px;margin:12px 0">
            <li style="margin-bottom:6px"><strong>Introductory session</strong> — at your chosen slot below, we connect with you to understand your requirements.</li>
            <li style="margin-bottom:6px"><strong>Advisor matched</strong> — we assign a fee-based, independent advisor best suited to your package: <strong>${service}</strong>.</li>
            <li><strong>Advisory session booked</strong> — your session with the advisor is scheduled.</li>
          </ol>
          ${bookingDetails}
          ${paymentNote}
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:20px 0">
            <p style="margin:0;color:#166534;font-size:14px">🛡️ Your advisor is unbiased and fee-only — zero commissions, ever.</p>
          </div>
          <p style="color:#6b7280;font-size:13px">We will reach out at your chosen slot for the introductory session. If you need to reschedule, reply to this email.</p>
          <p style="color:#374151;margin-top:24px">— Team ZeroBias</p>
        </div>
      `
    })

    // 2. Notification email to advisor (if we have their email)
    if (advisorEmail) {
      await getResend().emails.send({
        from: 'ZeroBias <hello@zerobias.in>',
        to: advisorEmail,
        subject: `New Booking — ${name} wants to meet you`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
            <h2 style="color:#10b981">You have a new booking!</h2>
            <p style="color:#374151">Hi ${advisor_name},</p>
            <p style="color:#374151">A client has booked a session with you on ZeroBias.</p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:20px 0;font-size:14px;color:#374151">
              <p style="margin:0 0 8px"><strong>Client:</strong> ${name}</p>
              <p style="margin:0 0 8px"><strong>Email:</strong> ${email}</p>
              <p style="margin:0 0 8px"><strong>Phone:</strong> ${phone || '—'}</p>
              <p style="margin:0 0 8px"><strong>Service:</strong> ${service}</p>
              <p style="margin:0 0 8px"><strong>Date:</strong> ${meeting_date}</p>
              <p style="margin:0 0 8px"><strong>Time:</strong> ${meeting_time}</p>
              <p style="margin:0"><strong>Mode:</strong> ${meeting_mode}</p>
            </div>
            <p style="color:#6b7280;font-size:13px">Please reach out to the client to share meeting details. Reply to this email if you need support.</p>
            <p style="color:#374151;margin-top:24px">— Team ZeroBias</p>
          </div>
        `
      })
    }

    // 3. Admin notification — action required: assign advisor + send payment link
    await getResend().emails.send({
      from: 'ZeroBias <hello@zerobias.in>',
      to: 'hello@zerobias.in',
      subject: `⚡ New Booking — Assign Advisor for ${name} (${service})`,
      html: `
        <div style="font-family:sans-serif;max-width:520px">
          <h2 style="color:#10b981">New Booking — Action Required</h2>
          <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:14px;margin:16px 0">
            <p style="margin:0;color:#713f12;font-weight:bold">👉 Conduct the introductory session at the slot below, then assign a fee-based, independent advisor for this package: <em>${service}</em></p>
            ${fee ? `<p style="margin:8px 0 0;color:#713f12;font-weight:bold">💳 After the intro session, send payment link for ₹${fee.toLocaleString('en-IN')} to ${email}</p>` : ''}
          </div>
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Package:</strong> ${service}</p>
          <p><strong>Date:</strong> ${meeting_date} at ${meeting_time}</p>
          <p><strong>Mode:</strong> ${meeting_mode}</p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Booking error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
