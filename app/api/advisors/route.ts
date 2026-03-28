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

  const { data, error } = await query

  if (error) {
    console.error('Advisors fetch error:', error.message)
    return NextResponse.json({ advisors: [] }, { status: 500 })
  }

  let advisors = data || []

  if (service) {
    advisors = advisors.filter(a => {
      const specs: string[] = Array.isArray(a.specializations)
        ? a.specializations
        : (typeof a.specializations === 'string' ? (() => { try { return JSON.parse(a.specializations) } catch { return [] } })() : [])
      return specs.includes(service)
    })
  }

  return NextResponse.json({ advisors })
}
