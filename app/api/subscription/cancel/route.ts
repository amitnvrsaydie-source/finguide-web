import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, razorpay_subscription_id } = await req.json()
    if (!email || !razorpay_subscription_id) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('razorpay_subscription_id', razorpay_subscription_id)
      .eq('email', email)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscription cancel error:', err)
    return NextResponse.json({ error: 'Failed to cancel' }, { status: 500 })
  }
}
