import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ bookings: [] })

  const { data, error } = await supabase
    .from('bookings')
    .select('id, advisor_name, service, meeting_mode, meeting_date, meeting_time')
    .eq('email', email)
    .order('meeting_date', { ascending: false })

  if (error) {
    console.error('Bookings fetch error:', error.message)
    return NextResponse.json({ bookings: [] })
  }

  return NextResponse.json({ bookings: data || [] })
}
