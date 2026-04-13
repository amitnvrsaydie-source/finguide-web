import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const getResend = () => new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      // booking details
      name, email, phone, service,
      meeting_mode, meeting_date, meeting_time,
      amount,
    } = await req.json()

    // 1. Verify Razorpay signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // 2. Save booking to DB
    const { error: dbError } = await supabase.from('bookings').insert({
      advisor_id: null,
      advisor_name: `TBA — ${service}`,
      meeting_mode,
      meeting_date,
      meeting_time,
      name,
      email,
      phone,
      status: 'confirmed',
      payment_id: razorpay_payment_id,
      payment_status: 'paid',
      amount_paid: amount,
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Payment succeeded but DB failed — still acknowledge, flag for admin
    }

    const bookingDetails = `
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:20px 0;font-size:14px;color:#374151">
        <p style="margin:0 0 8px"><strong>Package:</strong> ${service}</p>
        <p style="margin:0 0 8px"><strong>Date:</strong> ${meeting_date}</p>
        <p style="margin:0 0 8px"><strong>Time:</strong> ${meeting_time}</p>
        <p style="margin:0 0 8px"><strong>Mode:</strong> ${meeting_mode}</p>
        <p style="margin:0"><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
      </div>
    `

    // 3. Confirmation email to client
    await getResend().emails.send({
      from: 'ZeroBias <hello@zerobias.in>',
      to: email,
      subject: 'Session Booked — ZeroBias',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#10b981">Session Confirmed!</h2>
          <p style="color:#374151">Hi ${name},</p>
          <p style="color:#374151">Your session has been booked and payment received. We are matching you with the right advisor for <strong>${service}</strong>.</p>
          ${bookingDetails}
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:20px 0">
            <p style="margin:0;color:#166534;font-size:14px">Your advisor will reach out before your session to share the meeting link.</p>
            <p style="margin:6px 0 0;color:#166534;font-size:14px">Independent. Unbiased. Fee-based advisory.</p>
          </div>
          <p style="color:#6b7280;font-size:13px">To reschedule or for any queries, reply to this email.</p>
          <p style="color:#374151;margin-top:24px">— Team ZeroBias</p>
        </div>
      `
    })

    // 4. Admin notification
    await getResend().emails.send({
      from: 'ZeroBias <hello@zerobias.in>',
      to: 'amitnvrsaydie@gmail.com',
      subject: `Payment Received — Assign Advisor for ${name} (${service})`,
      html: `
        <div style="font-family:sans-serif;max-width:520px">
          <h2 style="color:#10b981">New Paid Booking — Action Required</h2>
          <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:14px;margin:16px 0">
            <p style="margin:0;color:#713f12;font-weight:bold">Assign an advisor for: ${service}</p>
          </div>
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Package:</strong> ${service}</p>
          <p><strong>Date:</strong> ${meeting_date} at ${meeting_time}</p>
          <p><strong>Mode:</strong> ${meeting_mode}</p>
          <p><strong>Amount Paid:</strong> ₹${amount}</p>
          <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Payment verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
