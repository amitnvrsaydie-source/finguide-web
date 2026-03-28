'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM'
]

const SERVICES = [
  'Mutual Funds', 'EPF Guidance', 'NRI Services',
  'Global Investments', 'Inheritance Planning',
  'Loan Management', 'Insurance', 'Bonds & FDs'
]

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    meeting_mode: 'video',
    meeting_date: '',
    meeting_time: '',
    advisor_name: 'Rajesh Sharma',
    advisor_id: 'rajesh-sharma'
  })

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSuccess(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h1>
          <p className="text-gray-400 mb-2">A confirmation email has been sent to <span className="text-emerald-400">{form.email}</span></p>
          <p className="text-gray-400 mb-8">Your advisor will contact you shortly.</p>
          <button
            onClick={() => router.push('/advisors')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Browse More Advisors
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Book a Session</h1>
          <p className="text-gray-400">with <span className="text-emerald-400">{form.advisor_name}</span></p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 ${step > s ? 'bg-emerald-500' : 'bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 — Your Details */}
        {step === 1 && (
          <div className="bg-[#1a1a2e] rounded-2xl p-8 space-y-5">
            <h2 className="text-xl font-semibold text-white mb-6">Your Details</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="Amit Kumar"
                className="w-full bg-[#0a0a0f] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="you@example.com"
                className="w-full bg-[#0a0a0f] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                placeholder="+91 98765 43210"
                className="w-full bg-[#0a0a0f] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Service Needed</label>
              <select
                value={form.service}
                onChange={(e) => setForm({...form, service: e.target.value})}
                className="w-full bg-[#0a0a0f] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select a service</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.name || !form.email || !form.service}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 mt-4"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 — Pick Slot */}
        {step === 2 && (
          <div className="bg-[#1a1a2e] rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">Pick a Slot</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Meeting Mode</label>
              <div className="flex gap-4">
                {['video', 'phone', 'in-person'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setForm({...form, meeting_mode: mode})}
                    className={`flex-1 py-3 rounded-lg border text-sm font-medium capitalize ${form.meeting_mode === mode ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-gray-700 text-gray-400'}`}
                  >
                    {mode === 'video' ? '📹 Video' : mode === 'phone' ? '📞 Phone' : '🏢 In-Person'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input
                type="date"
                value={form.meeting_date}
                onChange={(e) => setForm({...form, meeting_date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#0a0a0f] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Time Slot</label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setForm({...form, meeting_time: slot})}
                    className={`py-2 px-3 rounded-lg text-sm border ${form.meeting_time === slot ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-700 text-gray-400 py-3 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.meeting_date || !form.meeting_time}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Confirm */}
        {step === 3 && (
          <div className="bg-[#1a1a2e] rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Confirm Booking</h2>

            <div className="space-y-4 mb-8">
              {[
                { label: 'Advisor', value: form.advisor_name },
                { label: 'Name', value: form.name },
                { label: 'Email', value: form.email },
                { label: 'Phone', value: form.phone },
                { label: 'Service', value: form.service },
                { label: 'Mode', value: form.meeting_mode },
                { label: 'Date', value: form.meeting_date },
                { label: 'Time', value: form.meeting_time },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="text-white text-sm font-medium capitalize">{value}</span>
                </div>
              ))}
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
              <p className="text-emerald-400 text-sm">🎯 First Advisory Session — <strong>Absolutely Free</strong></p>
              <p className="text-gray-400 text-xs mt-1">No subscription · No recurring fees · No hidden charges</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-700 text-gray-400 py-3 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Confirming...' : 'Confirm Booking ✓'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}