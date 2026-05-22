import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const order = await getRazorpay().orders.create({
      amount: 5900, // ₹59 in paise
      currency: 'INR',
      receipt: `zbsub_${Date.now()}`,
      notes: { name: name || '', email, phone: phone || '', type: 'membership' },
    })

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('Subscription create error:', err)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
