'use client'

import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { analytics } from '@/lib/analytics'

type Props = { advisorId: number; advisorName: string }

const inputClass = "w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors"

export default function AdvisorInteractions({ advisorId, advisorName }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    analytics.advisorViewed(advisorId, advisorName, '')
  }, [advisorId, advisorName])

  const handleBook = () => {
    analytics.ctaClicked('book_now', 'advisor_profile')
    router.push(`/booking?advisor_id=${advisorId}&advisor_name=${encodeURIComponent(advisorName)}`)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, advisorName }),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <>
      {/* Book CTA */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 mb-6 animate-fade-up stagger-1">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white font-semibold">Book a Free Session</p>
            <p className="text-gray-400 text-sm mt-0.5">First session is absolutely free · No hidden charges</p>
          </div>
          <button
            onClick={handleBook}
            className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all whitespace-nowrap"
          >
            Book Now →
          </button>
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-fade-up stagger-2">
        <h2 className="text-lg font-semibold text-white mb-4">Send a Message Instead</h2>
        {status === 'success' ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
            <p className="text-emerald-400 font-medium">Message sent!</p>
            <p className="text-gray-400 text-sm mt-1">We'll connect you with {advisorName} within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" autoComplete="off" placeholder="Your Name"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
            <input required type="email" autoComplete="off" placeholder="Your Email"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
            <input required type="tel" autoComplete="off" placeholder="Your Phone"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            <select required value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}
              className="w-full bg-[#0a0a0f] border border-gray-800 text-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 transition-colors">
              <option value="">Why are you reaching out?</option>
              <option>Retirement Planning</option>
              <option>Tax Planning</option>
              <option>Mutual Fund Advice</option>
              <option>General Financial Planning</option>
              <option>Other</option>
            </select>
            <button type="submit" disabled={status === 'sending'}
              className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 border border-white/10">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
          </form>
        )}
      </div>
    </>
  )
}
