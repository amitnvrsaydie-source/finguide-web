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
    const { name, email, phone, message, advisor_name, advisor_id } = body;

    await supabase.from('contact_requests').insert([{ name, email, phone, message, advisor_name, advisor_id }]);

    await resend.emails.send({
      from: 'FinGuide <onboarding@resend.dev>',
      to: 'amitnvrsaydie@gmail.com',
      subject: `New Connection Request — ${advisor_name}`,
      html: `<h2>New Connection Request</h2><p><strong>Investor:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Advisor:</strong> ${advisor_name}</p><p><strong>Message:</strong> ${message}</p>`
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
