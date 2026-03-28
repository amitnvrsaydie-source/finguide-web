'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

const inputClass = "w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors"
const labelClass = "text-xs text-gray-500 uppercase tracking-wide block mb-1.5"

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
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center animate-fade-up">
        <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Application Submitted!</h2>
        <p className="text-gray-400 text-sm mb-1">
          We've sent a confirmation to <span className="text-emerald-400">{form.email}</span>.
        </p>
        <p className="text-gray-500 text-sm">
          Our team will review your SEBI registration and get back to you within 3–5 business days.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input required type="text" placeholder="Your full name" value={form.full_name}
              onChange={e => set('full_name', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
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

        <div>
          <label className={labelClass}>Registration Type</label>
          <select required value={form.registration_type} onChange={e => set('registration_type', e.target.value)}
            className={`${inputClass} text-${form.registration_type ? 'white' : 'gray-700'}`}>
            <option value="">Select registration type</option>
            <option value="RIA">RIA (SEBI Registered Investment Advisor)</option>
            <option value="ARN">ARN (AMFI Registered Mutual Fund Distributor)</option>
            <option value="RIA+ARN">Both RIA and ARN</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>SEBI Registration / ARN Number</label>
            <input required type="text" placeholder="INA000XXXXXX or ARN-XXXXX" value={form.sebi_reg_no}
              onChange={e => set('sebi_reg_no', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Years of Experience</label>
            <input type="number" min="0" max="50" placeholder="e.g. 8" value={form.years_experience}
              onChange={e => set('years_experience', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Short Bio</label>
          <textarea required placeholder="Brief description of your practice (max 200 words)" rows={4}
            value={form.bio} onChange={e => set('bio', e.target.value)}
            className={`${inputClass} resize-none`} />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-sm transition-all duration-150">
          {loading ? 'Submitting...' : 'Submit Application →'}
        </button>
      </form>
      <p className="text-xs text-gray-600 mt-4 text-center">
        We will review your registration details and contact you within 3–5 business days.
      </p>
    </div>
  )
}
