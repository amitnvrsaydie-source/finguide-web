import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, city, registration_type, sebi_reg_no, years_experience, bio } = body;

    if (!full_name || !email || !phone || !city || !sebi_reg_no) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('advisor_applications')
      .insert([{ full_name, email, phone, city, registration_type, sebi_reg_no, years_experience, bio }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await resend.emails.send({
      from: 'FinGuide <onboarding@resend.dev>',
      to: 'amiteshsinghrana2007@gmail.com',
      subject: `New Advisor Application — ${full_name}`,
      html: `<h2>New Advisor Application</h2><p><strong>Name:</strong> ${full_name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>City:</strong> ${city}</p><p><strong>SEBI/ARN:</strong> ${sebi_reg_no}</p><p><strong>Experience:</strong> ${years_experience} years</p><p><strong>Bio:</strong> ${bio}</p>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
