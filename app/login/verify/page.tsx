'use client'

import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyPage() {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const pendingName = sessionStorage.getItem('pending_name') || ''
    const pendingEmail = sessionStorage.getItem('pending_email') || ''
    setName(pendingName.split(' ')[0])
    setEmail(pendingEmail)
  }, [])

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid OTP')
        return
      }

      localStorage.setItem('user_name', name)
      sessionStorage.removeItem('pending_email')
      sessionStorage.removeItem('pending_name')
      router.push('/advisors')

    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hi {name}, check your email
          </h1>
          <p className="text-gray-400">
            We sent a 6-digit OTP to <span className="text-emerald-400">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
              required
              className="w-full bg-[#1a1a2e] border border-gray-700 text-white rounded-lg px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-emerald-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP →'}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Wrong email?{' '}
            <a href="/login" className="text-emerald-400 hover:underline">
              Go back
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}