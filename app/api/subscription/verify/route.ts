import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const getResend = () => new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      name, email, phone,
    } = await req.json()

    // Verify Razorpay signature for subscriptions
    const body = razorpay_payment_id + '|' + razorpay_subscription_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 })
    }

    // Upsert subscription (replace if re-subscribing with same email)
    await supabase.from('subscriptions').upsert(
      {
        email,
        name,
        phone,
        razorpay_subscription_id,
        razorpay_payment_id,
        status: 'active',
        start_date: new Date().toISOString(),
      },
      { onConflict: 'razorpay_subscription_id' }
    )

    // Welcome email to subscriber
    await getResend().emails.send({
      from: 'ZeroBias <hello@zerobias.in>',
      to: email,
      subject: 'Welcome to ZeroBias Membership!',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#10b981">You're now a ZeroBias Member!</h2>
          <p style="color:#374151">Hi ${name || 'there'},</p>
          <p style="color:#374151">Your ₹59/month membership is active. Here's what you get every month:</p>
          <ul style="color:#374151;line-height:1.8">
            <li>Monthly check-in with your assigned advisor</li>
            <li>Curated market & tax updates for your goals</li>
            <li>Priority matching on your next session booking</li>
            <li>Access to ZeroBias resources & webinars</li>
          </ul>
          <p style="color:#6b7280;font-size:13px">You can cancel anytime from your dashboard. No lock-in.</p>
          <p style="color:#374151;margin-top:24px">— Team ZeroBias</p>
        </div>
      `,
    })

    // Admin notification
    await getResend().emails.send({
      from: 'ZeroBias <hello@zerobias.in>',
      to: 'amitnvrsaydie@gmail.com',
      subject: `New Subscriber — ${name} (${email})`,
      html: `
        <div style="font-family:sans-serif;max-width:520px">
          <h2 style="color:#10b981">New ₹59/month Subscriber</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || '—'}</p>
          <p><strong>Subscription ID:</strong> ${razorpay_subscription_id}</p>
          <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscription verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
