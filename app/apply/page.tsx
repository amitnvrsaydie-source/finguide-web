import type { Metadata } from 'next'
import ApplyForm from '@/components/ApplyForm'

export const metadata: Metadata = {
  title: 'Apply as an Advisor',
  description: 'Join ZeroBias as a SEBI-registered advisor. Apply to be listed on India\'s trusted fee-only advisor discovery platform.',
  openGraph: {
    title: 'Apply as a SEBI Advisor — ZeroBias',
    description: 'Join ZeroBias\'s network of verified, fee-only SEBI RIAs. Applications reviewed within 3–5 business days.',
  },
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-2xl mx-auto px-6 py-12">

        <div className="animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Join ZeroBias</p>
          <h1 className="text-3xl font-bold mb-2">Apply as an Advisor</h1>
          <p className="text-gray-400 mb-8">
            We list only SEBI-registered advisors. All applications are manually reviewed before publishing.
          </p>
        </div>

        <div className="animate-fade-up stagger-1">
          <ApplyForm />
        </div>

      </section>
    </main>
  )
}
