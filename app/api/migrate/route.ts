import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// One-time migration: creates the users table
// Call: GET /api/migrate?secret=finguide_otp_secret_amit_2026
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== process.env.OTP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Try inserting a dummy record — if table doesn't exist, it will fail
  // We'll use Supabase's rpc if available, otherwise return instructions
  const { error } = await supabase.rpc('create_users_table_if_not_exists').maybeSingle()

  if (error) {
    // Table probably doesn't exist via RPC — return SQL to run manually
    return NextResponse.json({
      message: 'Please run this SQL in your Supabase SQL Editor',
      sql: `
CREATE TABLE IF NOT EXISTS public.users (
  id bigserial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  mobile text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.users
  USING (true) WITH CHECK (true);
      `.trim()
    })
  }

  return NextResponse.json({ success: true })
}
