'use client'

import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [resendCount, setResendCount] = useState(0)
  const [resendTimer, setResendTimer] = useState(30)
  const [resendLoading, setResendLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  useEffect(() => {
    const pendingName = sessionStorage.getItem('pending_name') || ''
    const pendingEmail = sessionStorage.getItem('pending_email') || ''
    const pendingMobile = sessionStorage.getItem('pending_mobile') || ''
    setName(pendingName.split(' ')[0])
    setEmail(pendingEmail)
    setMobile(pendingMobile)
    // focus first box
    setTimeout(() => inputRefs.current[0]?.focus(), 100)
  }, [])

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(prev => prev - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault()
    const otpStr = otp.join('')
    if (otpStr.length < 6) { setError('Please enter the complete 6-digit OTP'); return }
    setLoading(true)
    setError('')

    try {
      const pendingName = sessionStorage.getItem('pending_name') || ''
      const pendingMobile = sessionStorage.getItem('pending_mobile') || ''

      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpStr, name: pendingName, mobile: pendingMobile }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid OTP. Please try again.')
        setOtp(['', '', '', '', '', ''])
        setTimeout(() => inputRefs.current[0]?.focus(), 50)
        return
      }

      const resolvedName = pendingName || data.name || name
      localStorage.setItem('user_name', resolvedName)
      localStorage.setItem('user_email', email)
      sessionStorage.removeItem('pending_email')
      sessionStorage.removeItem('pending_name')
      sessionStorage.removeItem('pending_mobile')
      router.push('/dashboard')

    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return
    setResendLoading(true)
    setError('')
    try {
      const pendingName = sessionStorage.getItem('pending_name') || ''
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: pendingName }),
      })
      setResendCount(c => c + 1)
      setResendTimer(60)
      setOtp(['', '', '', '', '', ''])
      setTimeout(() => inputRefs.current[0]?.focus(), 50)
    } catch {
      setError('Failed to resend. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }

  const otpStr = otp.join('')

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
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Almost there.<br/>
            <span className="text-emerald-400">One last step.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            We sent a 6-digit OTP to verify your identity. No passwords, no hassle. Just one code and you&apos;re in.
          </p>

          {/* Step indicator */}
          <div className="space-y-4">
            {[
              { done: true, label: 'Email verified', sub: email },
              { done: true, label: 'Profile ready', sub: name ? `Welcome, ${name}` : 'Account set up' },
              { done: false, label: 'OTP verification', sub: 'In progress, almost done!', active: true },
            ].map(({ done, label, sub, active }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  done
                    ? 'bg-emerald-500/15 border border-emerald-500/30'
                    : active
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/25'
                    : 'bg-gray-800 border border-gray-700'
                }`}>
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : active ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium ${done || active ? 'text-white' : 'text-gray-600'}`}>{label}</p>
                  <p className={`text-xs ${done ? 'text-emerald-400/70' : active ? 'text-gray-400' : 'text-gray-700'}`}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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

          {/* Step indicator (mobile only) */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            {['Email', 'Details', 'OTP'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${i < 2 ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-emerald-500'}`}>
                  {i < 2 ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <span className="text-black text-xs font-bold">3</span>
                  )}
                </div>
                <span className={`text-xs ${i === 2 ? 'text-white font-medium' : 'text-emerald-400'}`}>{step}</span>
                {i < 2 && <div className="flex-1 h-px bg-gray-800 w-4" />}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">Verification</p>
            <h2 className="text-3xl font-bold text-white mb-2">
              {name ? `Hi ${name}, enter OTP` : 'Enter your OTP'}
            </h2>
            <p className="text-gray-500 text-sm">
              Sent to{' '}
              <span className="text-emerald-400 font-medium">{email}</span>
              {mobile && (
                <> and <span className="text-emerald-400 font-medium">+91 {mobile}</span></>
              )}
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">

            {/* OTP Boxes */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-3">6-digit OTP</label>
              <div className="flex gap-2.5" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { inputRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    className={`flex-1 min-w-0 aspect-square bg-[#111118] border text-white text-xl font-bold text-center rounded-xl outline-none transition-all ${
                      digit
                        ? 'border-emerald-500 bg-emerald-500/5'
                        : 'border-gray-800 hover:border-gray-700 focus:border-emerald-500'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-xs mt-2">Tip: You can paste the OTP directly</p>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/25 rounded-xl px-4 py-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otpStr.length < 6}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" /></svg>
                  Verifying...
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Verify & Continue
                </>
              )}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-6 pt-5 border-t border-gray-800/60">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-xs">Didn&apos;t receive the OTP?</p>
              {resendTimer > 0 ? (
                <p className="text-gray-600 text-xs">
                  Resend in <span className="text-gray-400 font-medium tabular-nums">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {resendLoading ? (
                    <>
                      <svg className="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0110 10" /></svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
                      Resend OTP{resendCount > 0 ? ` (${resendCount + 1})` : ''}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Back */}
          <p className="text-center text-gray-600 text-xs mt-4">
            Wrong email?{' '}
            <Link href="/login" className="text-emerald-400 hover:underline">
              Go back
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
