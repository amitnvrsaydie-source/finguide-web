import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { email, otp } = await req.json()

  const { data, error } = await supabase
    .from('otp_sessions')
    .select('*')
    .eq('email', email)
    .eq('otp_hash', otp)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
  }

  const now = new Date()
  const expires = new Date(data.expires_at)

  if (now > expires) {
    return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
  }

  await supabase.from('otp_sessions').delete().eq('email', email)

  return NextResponse.json({ success: true })
}
