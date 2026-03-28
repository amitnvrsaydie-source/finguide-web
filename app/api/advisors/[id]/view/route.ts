import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error } = await supabase
    .from('advisor_views')
    .insert({ advisor_id: parseInt(id) })

  if (error) {
    console.error('View tracking error:', error.message)
  }

  return NextResponse.json({ ok: true })
}
