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
      from: 'ZeroBias <onboarding@resend.dev>',
      to: email,
      subject: 'Your ZeroBias OTP',
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Hi ${name},</h2>
          <p>Your ZeroBias OTP is:</p>
          <h1 style="color: #10b981; font-size: 48px; letter-spacing: 8px;">${otp}</h1>
          <p style="color: #666;">Valid for 10 minutes. Do not share this with anyone.</p>
        </div>
      `
    })

    // Send OTP via SMS using MSG91 (only if configured)
    if (mobile && process.env.MSG91_AUTH_KEY && process.env.MSG91_TEMPLATE_ID) {
      const mobileWithCode = `91${mobile.replace(/^\+91/, '')}`
      try {
        await fetch(`https://control.msg91.com/api/v5/otp?authkey=${process.env.MSG91_AUTH_KEY}&template_id=${process.env.MSG91_TEMPLATE_ID}&mobile=${mobileWithCode}&otp=${otp}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
