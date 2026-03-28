'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, mobile }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      sessionStorage.setItem('pending_email', email)
      sessionStorage.setItem('pending_name', name)
      sessionStorage.setItem('pending_mobile', mobile)
      router.push('/login/verify')

    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to ZeroBias</h1>
          <p className="text-gray-400">Enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="off"
              required
              className="w-full bg-[#1a1a2e] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              autoComplete="off"
              required
              className="w-full bg-[#1a1a2e] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Mobile Number</label>
            <div className="flex">
              <span className="bg-[#1a1a2e] border border-r-0 border-gray-700 text-gray-400 rounded-l-lg px-3 flex items-center text-sm">+91</span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit mobile number"
                autoComplete="off"
                required
                className="w-full bg-[#1a1a2e] border border-gray-700 text-white rounded-r-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Send OTP →'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          OTP will be sent to your email and mobile
        </p>
      </div>
    </div>
  )
}
