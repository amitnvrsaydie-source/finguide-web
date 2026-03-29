import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const service = req.nextUrl.searchParams.get('service')
  const city    = req.nextUrl.searchParams.get('city')
  const maxFee  = req.nextUrl.searchParams.get('maxFee')

  const { data, error } = await supabase
    .from('advisors')
    .select('id, full_name, city, sebi_reg_no, years_experience, specializations, bio, fee_per_session, photo_url')
    .order('id', { ascending: true })

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

  if (city) {
    advisors = advisors.filter(a =>
      a.city?.toLowerCase() === city.toLowerCase()
    )
  }

  if (maxFee) {
    const max = parseInt(maxFee)
    advisors = advisors.filter(a =>
      !a.fee_per_session || a.fee_per_session <= max
    )
  }

  return NextResponse.json({ advisors })
}
