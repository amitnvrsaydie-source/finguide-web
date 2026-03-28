import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, name, mobile } = await req.json()

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    // Remove existing session for this email, then insert fresh
    await supabase.from('otp_sessions').delete().eq('email', email)

    const { error: dbError } = await supabase.from('otp_sessions').insert({
      email,
      mobile: mobile || '',
      otp_hash: otp,
      expires_at: expiresAt.toISOString(),
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json({ error: 'Failed to create OTP session' }, { status: 500 })
    }

    // Send OTP via email
    await resend.emails.send({
      from: 'FinGuide <onboarding@resend.dev>',
      to: email,
      subject: 'Your FinGuide OTP',
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Hi ${name},</h2>
          <p>Your FinGuide OTP is:</p>
          <h1 style="color: #10b981; font-size: 48px; letter-spacing: 8px;">${otp}</h1>
          <p style="color: #666;">Valid for 10 minutes. Do not share this with anyone.</p>
        </div>
      `
    })

    // Send OTP via SMS (only if Twilio is configured)
    if (mobile && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const sid = process.env.TWILIO_ACCOUNT_SID
      const token = process.env.TWILIO_AUTH_TOKEN
      const phoneNumber = mobile.startsWith('+') ? mobile : `+91${mobile}`
      try {
        await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: phoneNumber,
            From: process.env.TWILIO_PHONE_NUMBER!,
            Body: `Your FinGuide OTP is: ${otp}. Valid for 10 minutes. Do not share.`
          }).toString()
        })
      } catch (smsErr) {
        console.error('SMS send failed:', smsErr)
        // Don't fail the request if SMS fails — email OTP is still sent
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Send OTP error:', err)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
