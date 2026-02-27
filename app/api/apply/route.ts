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
      .insert([{
        full_name, email, phone, city, sebi_reg_no,
        years_experience: years_experience ? parseInt(years_experience) : null,
        bio,
        status: 'pending'
      }]);

    if (error) {
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    // Email to Amit (you)
    await resend.emails.send({
      from: 'FinGuide <onboarding@resend.dev>',
      to: 'amiteshsinghrana2007@gmail.com',
      subject: `New Advisor Application — ${full_name}`,
      html: `
        <h2>New Advisor Application Received</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Registration:</strong> ${registration_type}</p>
        <p><strong>SEBI/ARN No:</strong> ${sebi_reg_no}</p>
        <p><strong>Experience:</strong> ${years_experience} years</p>
        <p><strong>Bio:</strong> ${bio}</p>
        <br/>
        <p>Login to Supabase to review and approve this application.</p>
      `
    });

    // Confirmation email to advisor
    await resend.emails.send({
      from: 'FinGuide <onboarding@resend.dev>',
      to: email,
      subject: 'We received your FinGuide application!',
      html: `
        <h2>Hi ${full_name},</h2>
        <p>Thank you for applying to be listed on FinGuide!</p>
        <p>We have received your application and will review your SEBI registration details.</p>
        <p>You will hear from us within <strong>3-5 business days</strong>.</p>
        <br/>
        <p>Best regards,<br/>Team FinGuide</p>
      `
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
