import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, reason, advisorName } = body;
    await resend.emails.send({
      from: 'ZeroBias <hello@zerobias.in>',
      to: 'amitnvrsaydie@gmail.com',
      subject: `New Connection Request — ${advisorName}`,
      html: `<h2>New Request</h2><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Reason: ${reason}</p><p>Advisor: ${advisorName}</p>`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 });
  }
}
