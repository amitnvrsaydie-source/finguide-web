'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { analytics } from '@/lib/analytics'

type Props = { advisorId: string; advisorName: string }

export default function AdvisorInteractions({ advisorId, advisorName }: Props) {
  const router = useRouter()

  useEffect(() => {
    analytics.advisorViewed(0, advisorName, '')
  }, [advisorName])

  const handleBook = () => {
    analytics.ctaClicked('book_now', 'advisor_profile')
    router.push(`/booking?advisor_id=${advisorId}&advisor_name=${encodeURIComponent(advisorName)}`)
  }

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 animate-fade-up stagger-1">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-white font-semibold">Book a Free Session</p>
          <p className="text-gray-400 text-sm mt-0.5">First session is absolutely free · No hidden charges</p>
        </div>
        <button
          onClick={handleBook}
          className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all whitespace-nowrap"
        >
          Book Now →
        </button>
      </div>
    </div>
  )
}
