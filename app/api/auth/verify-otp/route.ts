import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { email, otp, name, mobile } = await req.json()

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

  // Delete used OTP session
  await supabase.from('otp_sessions').delete().eq('email', email)

  // Upsert user — creates on first login, updates name/mobile if provided
  const upsertData: Record<string, string> = { email }
  if (name) upsertData.name = name
  if (mobile) upsertData.mobile = mobile

  await supabase
    .from('users')
    .upsert(upsertData, { onConflict: 'email', ignoreDuplicates: false })

  // Fetch user record to return name
  const { data: userData } = await supabase
    .from('users')
    .select('name, mobile')
    .eq('email', email)
    .single()

  return NextResponse.json({ success: true, name: userData?.name || name || '' })
}
