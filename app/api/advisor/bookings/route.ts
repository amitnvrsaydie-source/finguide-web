import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const email = req.cookies.get('advisor_session')?.value
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Get advisor ID from email
  const { data: advisor } = await supabase
    .from('advisors')
    .select('id')
    .eq('email', email)
    .single()

  if (!advisor) return NextResponse.json({ error: 'Advisor not found' }, { status: 404 })

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('advisor_id', advisor.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ bookings: data || [] })
}
