import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 })
    }

    // Verify OTP
    const { data: session, error: otpErr } = await supabase
      .from('otp_sessions')
      .select('*')
      .eq('email', email)
      .eq('otp_hash', otp)
      .single()

    if (otpErr || !session) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    if (new Date() > new Date(session.expires_at)) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
    }

    // Clean up OTP session
    await supabase.from('otp_sessions').delete().eq('email', email)

    // Check if this email belongs to an approved advisor
    const { data: advisor, error: advisorErr } = await supabase
      .from('advisors')
      .select('id, full_name, email')
      .eq('email', email)
      .single()

    if (advisorErr || !advisor) {
      return NextResponse.json(
        { error: 'This email is not registered as an approved advisor. Contact hello@zerobias.in.' },
        { status: 403 }
      )
    }

    // Set advisor session cookie
    const res = NextResponse.json({ success: true, name: advisor.full_name })
    res.cookies.set('advisor_session', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return res
  } catch (err) {
    console.error('Advisor verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('advisor_session')
  return res
}
