'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const SERVICES = [
  'Mutual Funds', 'EPF Guidance', 'NRI Services',
  'Global Investments', 'Inheritance Planning',
  'Loan Management', 'Insurance', 'Bonds & FDs', 'NPS'
]

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const IconVideo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
)

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
  </svg>
)

const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
)

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconLock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)

const IconShield = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconGift = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
)

const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

function CompactCalendar({ selected, onSelect }: { selected: string, onSelect: (d: string) => void }) {
  const today = new Date()
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const formatDate = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day)
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < t || d.getDay() === 0
  }

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-800 transition-colors"
        >
          <IconChevronLeft />
        </button>
        <span className="text-white text-sm font-medium">{MONTHS[month]} {year}</span>
        <button
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-800 transition-colors"
        >
          <IconChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-xs text-gray-600 py-1 font-medium">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const day = i + 1
          const dateStr = formatDate(day)
          const disabled = isDisabled(day)
          const isSelected = selected === dateStr
          const todayDate = isToday(day)

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`
                w-full aspect-square rounded-md text-xs font-medium transition-all flex items-center justify-center
                ${disabled ? 'text-gray-700 cursor-not-allowed' : 'hover:bg-emerald-500/20 hover:text-emerald-400 cursor-pointer'}
                ${isSelected ? '!bg-emerald-500 !text-white font-semibold' : ''}
                ${todayDate && !isSelected ? 'text-emerald-400 font-semibold' : ''}
                ${!isSelected && !todayDate && !disabled ? 'text-gray-400' : ''}
              `}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function BookingPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '',
    meeting_mode: 'video',
    meeting_date: '', meeting_time: '',
    advisor_name: 'Rajesh Sharma',
    advisor_id: 'rajesh-sharma'
  })

  useEffect(() => {
    const advisorName = searchParams.get('advisor_name')
    const advisorId = searchParams.get('advisor_id')
    if (advisorName || advisorId) {
      setForm(f => ({
        ...f,
        advisor_name: advisorName ?? f.advisor_name,
        advisor_id: advisorId ?? f.advisor_id,
      }))
    }
  }, [searchParams])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Booking failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <IconCheck />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Booking Confirmed</h1>
          <p className="text-gray-400 text-sm mb-6">
            Confirmation sent to <span className="text-emerald-400">{form.email}</span>
          </p>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-5 text-left mb-6 space-y-3">
            {[
              ['Advisor', form.advisor_name],
              ['Date', form.meeting_date],
              ['Time', form.meeting_time],
              ['Mode', form.meeting_mode],
              ['Service', form.service],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500 text-sm">{label}</span>
                <span className="text-white text-sm capitalize font-medium">{value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/advisors')}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Browse More Advisors
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-10 px-4">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-medium">Free Session</p>
          <h1 className="text-2xl font-bold text-white">Book with {form.advisor_name}</h1>
          <p className="text-gray-500 text-sm mt-1">SEBI Registered Investment Advisor · Bangalore</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {['Details', 'Schedule', 'Confirm'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 ${step >= i + 1 ? 'text-emerald-400' : 'text-gray-700'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                  ${step > i + 1 ? 'bg-emerald-500 text-white' : step === i + 1 ? 'border-2 border-emerald-500 text-emerald-400' : 'border border-gray-700 text-gray-700'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs hidden sm:block">{label}</span>
              </div>
              {i < 2 && <div className={`w-6 h-px ${step > i + 1 ? 'bg-emerald-500' : 'bg-gray-800'}`} />}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-[#0d0d18] border border-gray-800/60 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Your Details</h2>
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter your full name' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'Enter your email address' },
              { label: 'Phone', key: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 transition-colors placeholder-gray-700"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Service Needed</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60"
              >
                <option value="">Select a service...</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.name || !form.email || !form.service}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors mt-2"
            >
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="bg-[#0d0d18] border border-gray-800/60 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Pick a Schedule</h2>

            <div className="flex gap-2">
              {[
                { id: 'video', icon: <IconVideo />, label: 'Video' },
                { id: 'phone', icon: <IconPhone />, label: 'Phone' },
                { id: 'in-person', icon: <IconBuilding />, label: 'In Person' }
              ].map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setForm({ ...form, meeting_mode: id })}
                  className={`flex-1 py-2 px-2 rounded-lg border text-xs font-medium transition-all flex items-center justify-center gap-1.5
                    ${form.meeting_mode === id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-400'}`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            <div className="bg-[#0a0a0f] border border-gray-800/60 rounded-xl p-4">
              <CompactCalendar
                selected={form.meeting_date}
                onSelect={(d) => setForm({ ...form, meeting_date: d, meeting_time: '' })}
              />
            </div>

            {form.meeting_date && (
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Available slots · <span className="text-emerald-400">{form.meeting_date}</span>
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setForm({ ...form, meeting_time: slot })}
                      className={`py-1.5 rounded-lg text-xs border transition-all font-medium
                        ${form.meeting_time === slot
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-400'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-800 text-gray-500 py-2.5 rounded-lg text-sm hover:border-gray-700 transition-colors">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.meeting_date || !form.meeting_time}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="bg-[#0d0d18] border border-gray-800/60 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">Review & Confirm</h2>
            <div className="space-y-2.5 mb-5">
              {[
                ['Advisor', form.advisor_name],
                ['Name', form.name],
                ['Email', form.email],
                ['Phone', form.phone],
                ['Service', form.service],
                ['Mode', form.meeting_mode],
                ['Date', form.meeting_date],
                ['Time', form.meeting_time],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-800/40">
                  <span className="text-gray-600 text-xs uppercase tracking-wide">{label}</span>
                  <span className="text-white text-xs font-medium capitalize">{value}</span>
                </div>
              ))}
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-3 mb-5">
              <p className="text-emerald-400 text-xs font-medium">First session is absolutely free</p>
              <p className="text-gray-600 text-xs mt-0.5">No subscription · No hidden charges</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 border border-gray-800 text-gray-500 py-2.5 rounded-lg text-sm hover:border-gray-700">
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-150"
              >
                {loading ? 'Confirming...' : 'Confirm Booking ✓'}
              </button>
            </div>
            {error && (
              <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <span className="text-gray-700 text-xs flex items-center gap-1.5">
            <IconLock /> Secure
          </span>
          <span className="text-gray-700 text-xs flex items-center gap-1.5">
            <IconShield /> SEBI Verified
          </span>
          <span className="text-gray-700 text-xs flex items-center gap-1.5">
            <IconGift /> Free Session
          </span>
        </div>
      </div>
    </div>
  )
}

import { Suspense } from 'react'

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <BookingPageInner />
    </Suspense>
  )
}