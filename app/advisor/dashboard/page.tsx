'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const SPEC_LABELS: Record<string, string> = {
  epf: 'EPF Guidance', nri: 'NRI Services', global: 'Global Investments',
  inheritance: 'Inheritance Planning', loan: 'Loan Management',
  'mutual-funds': 'Mutual Funds', insurance: 'Insurance',
  bonds: 'Bonds & FDs', nps: 'NPS', 'rsu-esop': 'RSU & ESOP',
  tax: 'Tax Advisory', retirement: 'Retirement Planning',
  'portfolio-review': 'Portfolio Review',
}

function parseArr(val: unknown): string[] {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') { try { return JSON.parse(val) } catch { return [] } }
  return []
}

type Advisor = {
  id: number
  full_name: string
  city: string
  sebi_reg_no: string
  years_experience: number
  specializations: unknown
  bio: string
  fee_per_session: number | null
  photo_url: string | null
  email: string
}

type Booking = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  meeting_date: string
  meeting_time: string
  meeting_mode: string
  status: string
  created_at: string
}

export default function AdvisorDashboard() {
  const router = useRouter()
  const [advisor, setAdvisor] = useState<Advisor | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings')
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/advisor/me').then(r => r.json()),
      fetch('/api/advisor/bookings').then(r => r.json()),
    ]).then(([me, bkgs]) => {
      if (me.error) { router.push('/advisor/login'); return }
      setAdvisor(me.advisor)
      setBookings(bkgs.bookings || [])
      setLoading(false)
    }).catch(() => {
      router.push('/advisor/login')
    })
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/advisor/verify', { method: 'DELETE' })
    router.push('/advisor/login')
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !advisor) return
    setUploading(true)
    setUploadMsg('')

    const form = new FormData()
    form.append('photo', file)
    form.append('advisor_id', String(advisor.id))

    const res = await fetch('/api/advisor/upload-photo', { method: 'POST', body: form })
    const data = await res.json()

    if (res.ok) {
      setAdvisor(prev => prev ? { ...prev, photo_url: data.photo_url } : prev)
      setUploadMsg('Photo updated!')
    } else {
      setUploadMsg(data.error || 'Upload failed')
    }
    setUploading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!advisor) return null

  const specs = parseArr(advisor.specializations)
  const upcoming = bookings.filter(b => new Date(b.meeting_date) >= new Date())
  const past = bookings.filter(b => new Date(b.meeting_date) < new Date())

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Header */}
      <div className="border-b border-gray-800/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold"><span className="text-emerald-400">Zero</span><span className="text-white">Bias</span></span>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400 text-sm">Advisor Portal</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-400 text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Profile card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-fade-up">
          <div className="flex items-start gap-5 flex-wrap">

            {/* Photo + upload */}
            <div className="relative shrink-0">
              {advisor.photo_url ? (
                <Image
                  src={advisor.photo_url}
                  alt={advisor.full_name}
                  width={72}
                  height={72}
                  className="w-18 h-18 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-2xl">
                  {advisor.full_name[0]}
                </div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-400 transition-colors"
                title="Upload photo"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold text-white">{advisor.full_name}</h1>
                  <p className="text-gray-400 text-sm mt-0.5">{advisor.city} · {advisor.years_experience} yrs · {advisor.sebi_reg_no}</p>
                  {advisor.fee_per_session && (
                    <p className="text-emerald-400 text-sm mt-1">₹{advisor.fee_per_session.toLocaleString('en-IN')} / session</p>
                  )}
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  Fee-Based Advisor ✓
                </span>
              </div>
              {uploading && <p className="text-gray-500 text-xs mt-2">Uploading photo...</p>}
              {uploadMsg && <p className={`text-xs mt-2 ${uploadMsg.includes('failed') || uploadMsg.includes('error') ? 'text-red-400' : 'text-emerald-400'}`}>{uploadMsg}</p>}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Bookings', value: bookings.length },
            { label: 'Upcoming', value: upcoming.length },
            { label: 'Completed', value: past.length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 mb-6 w-fit">
          {(['bookings', 'profile'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-emerald-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'bookings' ? `Bookings (${bookings.length})` : 'My Profile'}
            </button>
          ))}
        </div>

        {/* Bookings tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-3 animate-fade-up">
            {bookings.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                <p className="text-gray-500">No bookings yet</p>
                <p className="text-gray-700 text-sm mt-1">Clients will appear here once they book a session with you</p>
              </div>
            ) : (
              bookings.map(b => {
                const isPast = new Date(b.meeting_date) < new Date()
                return (
                  <div key={b.id} className={`bg-white/5 border rounded-xl p-5 flex items-start justify-between gap-4 flex-wrap ${isPast ? 'border-white/5 opacity-70' : 'border-white/10'}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-semibold text-sm">{b.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isPast ? 'bg-gray-800 text-gray-500' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isPast ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs">{b.email} · {b.phone}</p>
                      <p className="text-gray-400 text-xs mt-1">{b.service} · {b.meeting_mode}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white text-sm font-medium">{b.meeting_date}</p>
                      <p className="text-gray-500 text-xs">{b.meeting_time}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* Profile tab */}
        {activeTab === 'profile' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 animate-fade-up">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Bio</p>
              <p className="text-gray-300 text-sm leading-relaxed">{advisor.bio || 'No bio added yet.'}</p>
            </div>
            {specs.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {specs.map(s => (
                    <span key={s} className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                      {SPEC_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-gray-500 text-xs mb-1">SEBI Reg No.</p>
                <p className="text-white text-sm font-mono">{advisor.sebi_reg_no}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Fee / Session</p>
                <p className="text-white text-sm">{advisor.fee_per_session ? `₹${advisor.fee_per_session.toLocaleString('en-IN')}` : 'Not set'}</p>
              </div>
            </div>
            <p className="text-gray-700 text-xs pt-2">
              To update your profile details, write to <span className="text-emerald-700">hello@zerobias.in</span>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
