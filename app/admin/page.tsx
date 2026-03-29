'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-bold text-2xl tracking-tight"><span className="text-emerald-400">Zero</span><span className="text-white">Bias</span></p>
          <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#111118] border border-gray-800 rounded-2xl p-8">
          <h1 className="text-white font-semibold text-lg mb-6">Sign in to Admin</h1>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full bg-[#0a0a0f] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-gray-700 text-xs text-center mt-6">
          ZeroBias Admin · Restricted Access
        </p>
      </div>
    </div>
  )
}
