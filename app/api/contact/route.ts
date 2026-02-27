 
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend('re_bbEKaRtX_8ay3n3brpL6HBeZsFpNxhxoA');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, reason, advisorName } = body;
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'amitnvrsaydie@gmail.com',
      subject: `New Connection Request - ${advisorName}`,
      html: `<h2>New Request</h2><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Reason: ${reason}</p><p>Advisor: ${advisorName}</p>`,
    });
    console.log('Resend response:', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}