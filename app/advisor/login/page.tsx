'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdvisorLogin() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const sendOtp = async () => {
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStep('otp')
      } else {
        setError(data.error || 'Failed to send OTP')
      }
    } catch {
      setError('Network error — please try again')
    }
    setLoading(false)
  }

  const verifyOtp = async () => {
    if (otp.length !== 6) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/advisor/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/advisor/dashboard')
      } else {
        setError(data.error || 'Invalid OTP or email not registered as an advisor')
      }
    } catch {
      setError('Network error — please try again')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="font-bold text-lg"><span className="text-emerald-400">Zero</span><span className="text-white">Bias</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Advisor Portal</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to manage your profile and bookings</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-fade-up stagger-1">
          {step === 'email' ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">
                  Registered Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  onKeyDown={e => e.key === 'Enter' && sendOtp()}
                  className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                onClick={sendOtp}
                disabled={loading || !email}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl text-sm transition-all"
              >
                {loading ? 'Sending OTP...' : 'Send OTP →'}
              </button>

              <p className="text-gray-700 text-xs text-center">
                Use the email you applied with
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 text-sm text-emerald-400">
                OTP sent to {email}
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">
                  6-Digit OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="••••••"
                  maxLength={6}
                  onKeyDown={e => e.key === 'Enter' && verifyOtp()}
                  className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-3 text-xl text-center tracking-[0.5em] focus:outline-none focus:border-emerald-500/60 transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl text-sm transition-all"
              >
                {loading ? 'Verifying...' : 'Verify & Enter Dashboard →'}
              </button>

              <button
                onClick={() => { setStep('email'); setOtp(''); setError('') }}
                className="w-full text-gray-600 hover:text-gray-400 text-sm transition-colors"
              >
                ← Use different email
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Not listed yet?{' '}
          <Link href="/apply" className="text-emerald-600 hover:text-emerald-400">Apply as an Advisor →</Link>
        </p>
      </div>
    </main>
  )
}
