'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

const inputClass = "w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors"
const labelClass = "text-xs text-gray-500 uppercase tracking-wide block mb-1.5"

const SPECIALIZATIONS = [
  { id: 'mutual-funds', label: 'Mutual Funds' },
  { id: 'nri', label: 'NRI Services' },
  { id: 'tax', label: 'Tax Advisory' },
  { id: 'retirement', label: 'Retirement Planning' },
  { id: 'insurance', label: 'Insurance Review' },
  { id: 'rsu-esop', label: 'RSU & ESOP' },
  { id: 'portfolio-review', label: 'Portfolio Review' },
  { id: 'epf', label: 'EPF Guidance' },
  { id: 'bonds', label: 'Bonds & FDs' },
  { id: 'nps', label: 'NPS' },
  { id: 'global', label: 'Global Investments' },
  { id: 'inheritance', label: 'Inheritance Planning' },
  { id: 'loan', label: 'Loan Management' },
]

export default function ApplyForm() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    registration_type: '',
    sebi_reg_no: '',
    years_experience: '',
    bio: '',
    fee_per_session: '',
    booking_url: '',
  })
  const [specializations, setSpecializations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  function toggleSpec(id: string) {
    setSpecializations(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (specializations.length === 0) {
      setError('Please select at least one area of specialization.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          specializations,
          fee_per_session: form.fee_per_session ? parseInt(form.fee_per_session) : null,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center animate-fade-up">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
        <p className="text-gray-400 text-sm mb-2">
          We&apos;ve sent a confirmation to <span className="text-emerald-400">{form.email}</span>.
        </p>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Our team will review your SEBI registration and get back to you within 3–5 business days.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Basic info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input required type="text" placeholder="Your full name" value={form.full_name}
              onChange={e => set('full_name', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input required type="email" placeholder="your@email.com" value={form.email}
              onChange={e => set('email', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
              onChange={e => set('phone', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input type="text" placeholder="Mumbai, Delhi, Bangalore..." value={form.city}
              onChange={e => set('city', e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Registration */}
        <div>
          <label className={labelClass}>Registration Type *</label>
          <select required value={form.registration_type} onChange={e => set('registration_type', e.target.value)}
            className={`${inputClass} ${form.registration_type ? 'text-white' : 'text-gray-700'}`}>
            <option value="">Select registration type</option>
            <option value="RIA">RIA — SEBI Registered Investment Advisor</option>
            <option value="ARN">ARN — AMFI Registered Mutual Fund Distributor</option>
            <option value="RIA+ARN">Both RIA and ARN</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>SEBI Registration / ARN Number *</label>
            <input required type="text" placeholder="INA000XXXXXX or ARN-XXXXX" value={form.sebi_reg_no}
              onChange={e => set('sebi_reg_no', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Years of Experience</label>
            <input type="number" min="0" max="50" placeholder="e.g. 8" value={form.years_experience}
              onChange={e => set('years_experience', e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Fee + Booking URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Fee Per Session (₹) <span className="text-gray-700 normal-case">optional</span></label>
            <input type="number" min="0" placeholder="e.g. 2000" value={form.fee_per_session}
              onChange={e => set('fee_per_session', e.target.value)} className={inputClass} />
            <p className="text-gray-700 text-xs mt-1">Leave blank if first session is free</p>
          </div>
          <div>
            <label className={labelClass}>Your Booking / Calendar URL <span className="text-gray-700 normal-case">optional</span></label>
            <input type="url" placeholder="https://calendly.com/yourname" value={form.booking_url}
              onChange={e => set('booking_url', e.target.value)} className={inputClass} />
            <p className="text-gray-700 text-xs mt-1">Calendly, Cal.com, etc.</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className={labelClass}>Short Bio *</label>
          <textarea required placeholder="Brief description of your practice, approach, and client focus (max 200 words)" rows={4}
            value={form.bio} onChange={e => set('bio', e.target.value)}
            className={`${inputClass} resize-none`} />
        </div>

        {/* Specializations */}
        <div>
          <label className={labelClass}>Areas of Specialization * <span className="text-gray-700 normal-case">select all that apply</span></label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            {SPECIALIZATIONS.map(({ id, label }) => {
              const selected = specializations.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleSpec(id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs border transition-all ${
                    selected
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                      : 'bg-white/3 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300'
                  }`}
                >
                  {selected && <span className="mr-1">✓</span>}{label}
                </button>
              )
            })}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl text-sm transition-all duration-150">
          {loading ? 'Submitting...' : 'Submit Application →'}
        </button>

        <p className="text-xs text-gray-600 text-center">
          We review all applications within 3–5 business days · Listing is free
        </p>
      </form>
    </div>
  )
}
