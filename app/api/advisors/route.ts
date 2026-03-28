import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Label map: filter key → Supabase specialization string
const SERVICE_LABELS: Record<string, string> = {
  epf: 'EPF Guidance',
  nri: 'NRI Services',
  global: 'Global Investments',
  inheritance: 'Inheritance Planning',
  loan: 'Loan Management',
  'mutual-funds': 'Mutual Funds',
  insurance: 'Insurance',
  bonds: 'Bonds & FDs',
  nps: 'NPS',
}

export async function GET(req: NextRequest) {
  const service = req.nextUrl.searchParams.get('service')

  let query = supabase
    .from('advisors')
    .select('id, full_name, city, sebi_reg_no, years_experience, specializations, bio')
    .order('id', { ascending: true })

  if (service && SERVICE_LABELS[service]) {
    query = query.contains('specializations', [SERVICE_LABELS[service]])
  }

  const { data, error } = await query

  if (error) {
    console.error('Advisors fetch error:', error.message)
    return NextResponse.json({ advisors: [] }, { status: 500 })
  }

  return NextResponse.json({ advisors: data || [] })
}
