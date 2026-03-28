import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ZeroBias',
  description: 'ZeroBias is a SEBI-advisor discovery platform in India. We connect investors with verified, fee-only financial advisors — with no commissions, no bias.',
  openGraph: {
    title: 'About ZeroBias — India\'s SEBI Advisor Discovery Platform',
    description: 'We connect investors with SEBI-registered, fee-only financial advisors. No commissions, no bias.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Who we are</p>
          <h1 className="text-4xl font-bold text-white mb-4">About ZeroBias</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            ZeroBias is a discovery platform that helps investors in India find and connect with SEBI-registered financial advisors.
          </p>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-1">
          <h2 className="text-white font-semibold text-lg mb-3">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            We believe every Indian investor deserves access to a qualified, trustworthy financial advisor — not noise, not spam, not conflicted advice.
          </p>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-2">
          <h2 className="text-white font-semibold text-lg mb-4">What we are not</h2>
          <div className="space-y-3">
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-red-400">✗</span> We are not a SEBI-registered entity</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-red-400">✗</span> We do not provide investment advice</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-red-400">✗</span> We do not endorse or recommend any advisor</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-red-400">✗</span> We do not handle payments between investors and advisors</p>
          </div>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-3">
          <h2 className="text-white font-semibold text-lg mb-4">What we do</h2>
          <div className="space-y-3">
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span> Connect investors with SEBI-registered advisors</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span> Verify advisor credentials from public SEBI registry</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span> Make it easier to find qualified professionals</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span> Provide a neutral unbiased discovery platform</p>
          </div>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-10 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-4">
          <h2 className="text-white font-semibold text-lg mb-3">Contact</h2>
          <p className="text-gray-400 text-sm mb-2">For questions or advisor applications:</p>
          <a href="mailto:hello@zerobias.in" className="text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">hello@zerobias.in</a>
        </div>

        <div className="text-center animate-fade-up stagger-5">
          <Link href="/advisors" className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-8 py-3 rounded-full transition-all duration-150">
            Browse SEBI Advisors →
          </Link>
        </div>

      </div>
    </div>
  )
}