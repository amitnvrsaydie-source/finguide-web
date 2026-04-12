import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [totalViews, todayViews, registeredUsers] = await Promise.all([
    supabase.from('page_views').select('id', { count: 'exact', head: true }),
    supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
    supabase.from('users').select('id', { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    totalViews: totalViews.count ?? 0,
    todayViews: todayViews.count ?? 0,
    registeredUsers: registeredUsers.count ?? 0,
  })
}
