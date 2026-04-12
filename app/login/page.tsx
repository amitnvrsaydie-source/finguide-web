'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Tab = 'login' | 'register'

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const switchTab = (t: Tab) => { setTab(t); setError(''); setEmail(''); setName(''); setMobile('') }

  const handleLogin = async (e: FormEvent) => {
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
      if (!data.exists) {
        setError('No account found. Please register first.')
        setLoading(false)
        return
      }
      await sendOTP(data.name || '', true)
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  const handleRegister = async (e: FormEvent) => {
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
        setError('Account already exists. Please use the Login tab.')
        setLoading(false)
        return
      }
      await sendOTP(name, false)
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  const sendOTP = async (userName: string, isLogin: boolean) => {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: userName, mobile: isLogin ? '' : mobile }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Something went wrong'); return }
    sessionStorage.setItem('pending_email', email)
    sessionStorage.setItem('pending_name', userName)
    sessionStorage.setItem('pending_mobile', isLogin ? '' : mobile)
    router.push('/login/verify')
  }

  const trustBadges = [
    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, text: 'Secure' },
    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Private' },
    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text: 'No spam' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] bg-[#0d1117] border-r border-gray-800/50 px-14 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <Link href="/" className="relative z-10">
          <span className="text-2xl font-bold">
            <span className="text-emerald-400">Zero</span><span className="text-white">Bias</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-sm">
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
          <div className="space-y-4">
            {[
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>, label: 'All India coverage', sub: 'Every city, every state' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, label: 'Independent advisors', sub: 'No product bias, ever' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: 'Secure & private', sub: 'Your data stays yours' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0 text-emerald-400">{icon}</div>
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-700 text-xs relative z-10">© 2026 ZeroBias. All rights reserved.</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/"><span className="text-xl font-bold"><span className="text-emerald-400">Zero</span><span className="text-white">Bias</span></span></Link>
        </div>

        <div className="w-full max-w-sm mx-auto">

          {/* ── TABS ── */}
          <div className="flex bg-[#111118] border border-gray-800 rounded-xl p-1 mb-8">
            {(['login', 'register'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                  tab === t ? 'bg-emerald-500 text-black' : 'text-gray-500 hover:text-white'
                }`}
              >
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {/* ── LOGIN FORM ── */}
          {tab === 'login' && (
            <>
              <div className="mb-8">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">Welcome back</p>
                <h2 className="text-3xl font-bold text-white mb-2">Sign in to ZeroBias</h2>
                <p className="text-gray-500 text-sm">Enter your registered email to receive an OTP.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    required
                    className="w-full bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/25 rounded-xl px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <p className="text-red-400 text-xs">
                      {error}{' '}
                      {error.includes('register') && (
                        <button type="button" onClick={() => switchTab('register')} className="text-emerald-400 underline">Register here</button>
                      )}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  {loading
                    ? <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10"/></svg>Checking...</>
                    : 'Send OTP →'
                  }
                </button>

                <p className="text-center text-gray-600 text-xs">
                  New to ZeroBias?{' '}
                  <button type="button" onClick={() => switchTab('register')} className="text-emerald-400 hover:underline">Create an account</button>
                </p>
              </form>
            </>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === 'register' && (
            <>
              <div className="mb-8">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">New account</p>
                <h2 className="text-3xl font-bold text-white mb-2">Create your profile</h2>
                <p className="text-gray-500 text-sm">One-time setup. We&apos;ll send an OTP to verify.</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    required
                    className="w-full bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Mobile number</label>
                  <div className="flex">
                    <div className="bg-[#111118] border border-r-0 border-gray-800 rounded-l-xl px-4 flex items-center text-gray-500 text-sm font-medium">+91</div>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                      inputMode="numeric"
                      className="flex-1 bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white rounded-r-xl px-4 py-3.5 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/25 rounded-xl px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <p className="text-red-400 text-xs">
                      {error}{' '}
                      {error.includes('Login') && (
                        <button type="button" onClick={() => switchTab('login')} className="text-emerald-400 underline">Login here</button>
                      )}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  {loading
                    ? <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10"/></svg>Sending OTP...</>
                    : 'Create Account & Send OTP →'
                  }
                </button>

                <p className="text-center text-gray-600 text-xs">
                  Already registered?{' '}
                  <button type="button" onClick={() => switchTab('login')} className="text-emerald-400 hover:underline">Login instead</button>
                </p>
              </form>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-gray-800/60">
            <div className="flex items-center justify-center gap-5">
              {trustBadges.map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-gray-600 text-xs">
                  <span className="text-gray-700">{icon}</span> {text}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
