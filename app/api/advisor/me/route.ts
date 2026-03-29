import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const email = req.cookies.get('advisor_session')?.value
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('advisors')
    .select('id, full_name, city, sebi_reg_no, years_experience, specializations, languages, bio, fee_per_session, photo_url, email')
    .eq('email', email)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Advisor not found' }, { status: 404 })

  return NextResponse.json({ advisor: data })
}
