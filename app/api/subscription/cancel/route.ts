import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Razorpay from 'razorpay'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const { email, razorpay_subscription_id } = await req.json()
    if (!email || !razorpay_subscription_id) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Cancel at Razorpay (cancel_at_cycle_end = 1 means it runs until current period ends)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (getRazorpay().subscriptions as any).cancel(razorpay_subscription_id, true)

    // Mark cancelled in DB
    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('razorpay_subscription_id', razorpay_subscription_id)
      .eq('email', email)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscription cancel error:', err)
    return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 500 })
  }
}
