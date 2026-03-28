import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { email, name } = await req.json()

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

  await supabase.from('otp_sessions').upsert({
    email,
    otp,
    expires_at: expiresAt.toISOString(),
    name
  })

  await resend.emails.send({
    from: 'FinGuide <hello@finguide.in>',
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

  return NextResponse.json({ success: true })
}