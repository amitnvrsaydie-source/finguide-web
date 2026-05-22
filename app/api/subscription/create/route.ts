import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Cached plan ID for the server process lifetime
let cachedPlanId: string | null = null

async function getOrCreatePlanId(): Promise<string> {
  if (process.env.RAZORPAY_SUBSCRIPTION_PLAN_ID) {
    return process.env.RAZORPAY_SUBSCRIPTION_PLAN_ID
  }
  if (cachedPlanId) return cachedPlanId

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plan = await (getRazorpay().plans as any).create({
    period: 'monthly',
    interval: 1,
    item: {
      name: 'ZeroBias Monthly Membership',
      amount: 5900, // ₹59 in paise
      currency: 'INR',
      description: 'Monthly check-ins, market updates, priority booking & resources',
    },
  })
  cachedPlanId = plan.id
  console.log('Created Razorpay plan. Set RAZORPAY_SUBSCRIPTION_PLAN_ID =', plan.id)
  return plan.id
}

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const planId = await getOrCreatePlanId()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = await (getRazorpay().subscriptions as any).create({
      plan_id: planId,
      total_count: 120, // 10 years — effectively open-ended
      quantity: 1,
      customer_notify: 1,
      notes: { name: name || '', email, phone: phone || '' },
    })

    return NextResponse.json({ subscriptionId: subscription.id })
  } catch (err) {
    console.error('Subscription create error:', err)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
