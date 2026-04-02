'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Stage = 'email' | 'register'

export default function LoginPage() {
  const [stage, setStage] = useState<Stage>('email')
  const [isExisting, setIsExisting] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.exists) {
        setIsExisting(true)
        await sendOTP(data.name || '')
      } else {
        setIsExisting(false)
        setStage('register')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await sendOTP(name)
    setLoading(false)
  }

  const sendOTP = async (userName: string) => {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: userName, mobile: isExisting ? '' : mobile }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); return }
      sessionStorage.setItem('pending_email', email)
      sessionStorage.setItem('pending_name', userName)
      sessionStorage.setItem('pending_mobile', isExisting ? '' : mobile)
      router.push('/login/verify')
    } catch {
      setError('Network error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] bg-[#0d1117] border-r border-gray-800/50 px-14 py-12 relative overflow-hidden">

        {/* Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="text-2xl font-bold">
            <span className="text-emerald-400">Zero</span><span className="text-white">Bias</span>
          </span>
        </Link>

        {/* Hero content */}
        <div className="relative z-10 max-w-sm">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Expert advice.<br/>
            <span className="text-emerald-400">Your terms.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Fee-based, independent financial advisory across India. Book a session, get matched with an expert advisor, and take control of your finances.
          </p>

          {/* Trust points */}
          <div className="space-y-4">
            {[
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>, label: 'All India coverage', sub: 'Every city, every state' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, label: 'Independent advisors', sub: 'No product bias, ever' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: 'Secure & private', sub: 'Your data stays yours' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0 text-emerald-400">
                  {icon}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-gray-700 text-xs relative z-10">© 2026 ZeroBias. All rights reserved.</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 relative">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/">
            <span className="text-xl font-bold">
              <span className="text-emerald-400">Zero</span><span className="text-white">Bias</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto">

          {/* ── EMAIL STAGE ── */}
          {stage === 'email' && (
            <>
              <div className="mb-8">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">Welcome</p>
                <h2 className="text-3xl font-bold text-white mb-2">Sign in to ZeroBias</h2>
                <p className="text-gray-500 text-sm">New here? We&apos;ll set up your account automatically.</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder=""
                    autoFocus
                    required
                    className="w-full bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-colors placeholder-gray-700"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/25 rounded-xl px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" /></svg>
                      Checking...
                    </>
                  ) : 'Continue →'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-800/60">
                <div className="flex items-center justify-center gap-5">
                  {[
                    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, text: 'Secure' },
                    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Private' },
                    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text: 'No spam' },
                  ].map(({ icon, text }) => (
                    <span key={text} className="flex items-center gap-1.5 text-gray-600 text-xs">
                      <span className="text-gray-700">{icon}</span> {text}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── REGISTER STAGE ── */}
          {stage === 'register' && (
            <>
              <div className="mb-8">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="text-emerald-400 text-xs">Email</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-800" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <span className="text-black text-xs font-bold">2</span>
                    </div>
                    <span className="text-white text-xs font-medium">Your details</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-800" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">3</span>
                    </div>
                    <span className="text-gray-600 text-xs">OTP</span>
                  </div>
                </div>

                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">New account</p>
                <h2 className="text-3xl font-bold text-white mb-1">Create your profile</h2>
                <p className="text-gray-500 text-sm">
                  One-time setup for{' '}
                  <button onClick={() => { setStage('email'); setError('') }} className="text-emerald-400 hover:underline font-medium">
                    {email}
                  </button>
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder=""
                    autoFocus
                    required
                    className="w-full bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-colors placeholder-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Mobile number</label>
                  <div className="flex">
                    <div className="bg-[#111118] border border-r-0 border-gray-800 rounded-l-xl px-4 flex items-center text-gray-500 text-sm font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder=""
                      required
                      inputMode="numeric"
                      className="flex-1 bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white rounded-r-xl px-4 py-3.5 text-sm outline-none transition-colors placeholder-gray-700"
                    />
                  </div>
                  <p className="flex items-center gap-1.5 text-gray-600 text-xs mt-2">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#10b981">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.547a.75.75 0 0 0 .916.919l5.703-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.36-.214-3.733.963.99-3.626-.235-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Used for session updates on WhatsApp
                  </p>
                </div>

                {error && (
                  <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/25 rounded-xl px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" /></svg>
                      Sending OTP...
                    </>
                  ) : 'Create Account & Send OTP →'}
                </button>

                <p className="text-center text-gray-600 text-xs">
                  Already registered?{' '}
                  <button type="button" onClick={() => { setStage('email'); setEmail(''); setError('') }} className="text-emerald-400 hover:underline">
                    Use a different email
                  </button>
                </p>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
