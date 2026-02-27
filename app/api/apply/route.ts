import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, city, registration_type, sebi_reg_no, years_experience, bio } = body;

    if (!full_name || !email || !phone || !city || !sebi_reg_no) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('advisor_applications')
      .insert([{
        full_name, email, phone, city, sebi_reg_no,
        years_experience: years_experience ? parseInt(years_experience) : null,
        bio,
        status: 'pending'
      }]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
