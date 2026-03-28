import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const service = req.nextUrl.searchParams.get('service')

  let query = supabase
    .from('advisors')
    .select('id, full_name, city, sebi_reg_no, years_experience, specializations, bio')
    .order('id', { ascending: true })

  if (service) {
    // TEXT[] containment: use PostgREST cs operator with {value} format
    query = query.filter('specializations', 'cs', `{${service}}`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Advisors fetch error:', error.message)
    return NextResponse.json({ advisors: [] }, { status: 500 })
  }

  return NextResponse.json({ advisors: data || [] })
}
