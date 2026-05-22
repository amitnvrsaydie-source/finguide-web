'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Booking = {
  id: number
  advisor_name: string
  service: string
  meeting_mode: string
  meeting_date: string
  meeting_time: string
}

type Subscription = {
  id: number
  status: string
  start_date: string
  razorpay_subscription_id: string
}

const MODE_ICONS: Record<string, React.ReactNode> = {
  video: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  phone: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>,
  'in-person': <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [cancellingSubscription, setCancellingSubscription] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem('user_name')
    const email = localStorage.getItem('user_email')
    if (!name || !email) {
      router.replace('/login')
      return
    }
    setUser({ name, email })

    fetch(`/api/user/bookings?email=${encodeURIComponent(email)}`)
      .then(r => r.json())
      .then(data => setBookings(data.bookings || []))
      .catch(() => {})
      .finally(() => setLoading(false))

    fetch(`/api/subscription/status?email=${encodeURIComponent(email)}`)
      .then(r => r.json())
      .then(data => { if (data.subscribed) setSubscription(data.subscription) })
      .catch(() => {})
  }, [router])

  const handleCancelSubscription = async () => {
    if (!user || !subscription) return
    if (!confirm('Cancel your ₹59/month membership? You will keep access until the current period ends.')) return
    setCancellingSubscription(true)
    try {
      const res = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, razorpay_subscription_id: subscription.razorpay_subscription_id }),
      })
      if (res.ok) setSubscription(null)
    } catch { /* silent */ } finally {
      setCancellingSubscription(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_email')
    router.push('/')
  }

  if (!user) return <div className="min-h-screen bg-[#0a0a0f]" />

  const firstName = user.name.split(' ')[0]

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 animate-fade-up">
          <div>
            <p className="text-emerald-400 text-xs uppercase tracking-widest mb-1">My Account</p>
            <h1 className="text-3xl font-bold text-white">Welcome, {firstName}</h1>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 px-4 py-2 rounded-lg text-sm transition-colors mt-1"
          >
            Logout
          </button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 mb-10 animate-fade-up stagger-1">
          <Link
            href="/services"
            className="bg-[#111118] border border-gray-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors group"
          >
            <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">Explore</p>
            <p className="text-white font-semibold group-hover:text-emerald-400 transition-colors">View Packages →</p>
            <p className="text-gray-600 text-xs mt-1">Browse financial packages</p>
          </Link>
          <Link
            href="/booking"
            className="bg-[#111118] border border-gray-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors group"
          >
            <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">Book</p>
            <p className="text-white font-semibold group-hover:text-emerald-400 transition-colors">New Session →</p>
            <p className="text-gray-600 text-xs mt-1">Schedule an advisory session</p>
          </Link>
        </div>

        {/* Membership */}
        <div className="mb-10 animate-fade-up stagger-1">
          <h2 className="text-white font-semibold text-lg mb-4">Membership</h2>
          {subscription ? (
            <div className="bg-[#111118] border border-amber-500/20 rounded-2xl p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold flex items-center gap-2">
                    Monthly Membership
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Active</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">₹59/month · Check-ins, updates, priority booking & resources</p>
                  <p className="text-gray-600 text-xs mt-1">Started {new Date(subscription.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <button
                onClick={handleCancelSubscription}
                disabled={cancellingSubscription}
                className="text-gray-600 hover:text-red-400 text-xs transition-colors shrink-0 mt-1 disabled:opacity-50"
              >
                {cancellingSubscription ? 'Cancelling...' : 'Cancel'}
              </button>
            </div>
          ) : (
            <Link
              href="/services#packages"
              className="bg-[#111118] border border-gray-800 rounded-2xl p-5 hover:border-amber-500/30 transition-colors group flex items-center justify-between"
            >
              <div>
                <p className="text-white font-semibold group-hover:text-amber-400 transition-colors text-sm">Monthly Membership · ₹59/month</p>
                <p className="text-gray-600 text-xs mt-1">Check-ins · Updates · Priority booking · Resources</p>
              </div>
              <span className="text-amber-400 text-sm">→</span>
            </Link>
          )}
        </div>

        {/* Bookings */}
        <div className="animate-fade-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-lg">My Bookings</h2>
            {bookings.length > 0 && (
              <span className="text-gray-600 text-xs">{bookings.length} session{bookings.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="skeleton h-20 rounded-2xl" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-[#111118] border border-gray-800 rounded-2xl p-10 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm mb-4">No bookings yet.</p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-5 py-2 rounded-full text-sm transition-all"
              >
                Explore packages and book your first session →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map(b => (
                <div
                  key={b.id}
                  className="bg-[#111118] border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white font-medium">{b.advisor_name}</p>
                      <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1.5">
                        <span className="text-gray-600">{MODE_ICONS[b.meeting_mode] || null}</span>
                        {b.meeting_mode}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-emerald-400 text-sm font-medium">{b.meeting_date}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{b.meeting_time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
