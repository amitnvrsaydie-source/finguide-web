'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Application = {
  id: string
  full_name: string
  email: string
  phone: string
  city: string
  sebi_reg_no: string
  registration_type: string
  years_experience: number
  bio: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

type Booking = {
  id: string
  name: string
  email: string
  phone: string
  advisor_name: string
  service: string
  meeting_mode: string
  meeting_date: string
  meeting_time: string
  status: string
  created_at: string
}

const STATUS_BADGE: Record<string, string> = {
  pending:  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  confirmed:'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<'applications' | 'bookings' | 'advisors'>('applications')
  const [applications, setApplications] = useState<Application[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [appsRes, bookingsRes] = await Promise.all([
        fetch('/api/admin/applications'),
        fetch('/api/admin/bookings'),
      ])
      if (appsRes.status === 401) { router.push('/admin'); return }
      const appsData = await appsRes.json()
      const bookingsData = await bookingsRes.json()
      setApplications(appsData.applications || [])
      setBookings(bookingsData.bookings || [])
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleAction(id: string, action: 'approve' | 'reject') {
    setActionLoading(id + action)
    await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    })
    setActionLoading(null)
    fetchData()
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin')
  }

  const filteredApps = applications.filter(a => filter === 'all' ? true : a.status === filter)
  const pendingCount = applications.filter(a => a.status === 'pending').length

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Top bar */}
      <div className="bg-[#111118] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold text-lg">ZeroBias</span>
          <span className="text-gray-600 text-sm">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          {pendingCount > 0 && (
            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {pendingCount} pending
            </span>
          )}
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 text-sm transition-colors">
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: applications.length, color: 'text-white' },
            { label: 'Pending Review', value: pendingCount, color: 'text-yellow-400' },
            { label: 'Total Bookings', value: bookings.length, color: 'text-emerald-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#111118] border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#111118] border border-gray-800 rounded-xl p-1 w-fit">
          {(['applications', 'bookings'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                tab === t ? 'bg-emerald-500 text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t}
              {t === 'applications' && pendingCount > 0 && (
                <span className="ml-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (

          <>
            {/* APPLICATIONS TAB */}
            {tab === 'applications' && (
              <div>
                {/* Filter pills */}
                <div className="flex gap-2 mb-5">
                  {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize border transition-all ${
                        filter === f ? 'bg-white/10 text-white border-white/20' : 'text-gray-500 border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      {f} {f !== 'all' && `(${applications.filter(a => a.status === f).length})`}
                    </button>
                  ))}
                </div>

                {filteredApps.length === 0 ? (
                  <div className="text-center py-16 text-gray-600">No {filter} applications</div>
                ) : (
                  <div className="space-y-4">
                    {filteredApps.map(app => (
                      <div key={app.id} className="bg-[#111118] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                              <h3 className="text-white font-semibold">{app.full_name}</h3>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${STATUS_BADGE[app.status]}`}>
                                {app.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                              <span>{app.email}</span>
                              {app.phone && <span>{app.phone}</span>}
                              {app.city && <span>📍 {app.city}</span>}
                              <span className="font-mono text-gray-400">{app.sebi_reg_no}</span>
                              <span>{app.years_experience} yrs exp</span>
                            </div>
                            {app.bio && (
                              <p className="text-gray-400 text-sm line-clamp-2">{app.bio}</p>
                            )}
                            <p className="text-gray-700 text-xs mt-2">
                              Applied {new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>

                          {app.status === 'pending' && (
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => handleAction(app.id, 'approve')}
                                disabled={actionLoading !== null}
                                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                              >
                                {actionLoading === app.id + 'approve' ? '...' : '✓ Approve'}
                              </button>
                              <button
                                onClick={() => handleAction(app.id, 'reject')}
                                disabled={actionLoading !== null}
                                className="bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 text-red-400 border border-red-500/30 font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                              >
                                {actionLoading === app.id + 'reject' ? '...' : '✕ Reject'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BOOKINGS TAB */}
            {tab === 'bookings' && (
              <div>
                {bookings.length === 0 ? (
                  <div className="text-center py-16 text-gray-600">No bookings yet</div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map(b => (
                      <div key={b.id} className="bg-[#111118] border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                              <h3 className="text-white font-semibold">{b.name}</h3>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${STATUS_BADGE[b.status] ?? STATUS_BADGE.confirmed}`}>
                                {b.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                              <span>{b.email}</span>
                              {b.phone && <span>{b.phone}</span>}
                              <span>→ {b.advisor_name}</span>
                              <span>{b.service}</span>
                            </div>
                            <div className="flex gap-4 text-xs text-gray-600 mt-2">
                              <span>📅 {b.meeting_date} at {b.meeting_time}</span>
                              <span>📡 {b.meeting_mode}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-xs shrink-0">
                            {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
