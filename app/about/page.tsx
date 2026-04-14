import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ZeroBias',
  description: 'ZeroBias is a financial advisor discovery platform in India. We connect investors with expert, unbiased financial advisors — no sales pitch, no hidden agenda.',
  openGraph: {
    title: 'About ZeroBias — India\'s Unbiased Financial Advisor Platform',
    description: 'We connect investors with expert, unbiased financial advisors across India. No sales pitch, no hidden agenda.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Who we are</p>
          <h1 className="text-4xl font-bold text-white mb-4">About <span className="text-emerald-400">Zero</span>Bias</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            ZeroBias is a discovery platform that helps investors in India find and connect with expert, unbiased financial advisors.
          </p>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-1">
          <h2 className="text-white font-semibold text-lg mb-3">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Every Indian investor deserves access to a qualified, trustworthy financial advisor — one whose sole purpose is to serve the client&apos;s best interest, not the interest of a product house or commission structure.
          </p>
          <p className="text-gray-400 leading-relaxed">
            At ZeroBias, we believe advice should be driven by the merit of your financial situation, not by who pays the highest commission. We exist to make fee-based, independent financial guidance accessible to every investor across India — honest, transparent, and entirely on your terms.
          </p>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-2">
          <h2 className="text-white font-semibold text-lg mb-4">What we do</h2>
          <div className="space-y-3">
            {[
              'Connect investors with expert, unbiased financial advisors',
              'Verify advisor expertise and credentials',
              'Make it easier to find qualified professionals across India',
              'Provide a neutral, unbiased discovery platform',
            ].map(item => (
              <p key={item} className="text-gray-400 text-sm flex items-center gap-2">
                <span className="text-emerald-400 shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-10 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-4">
          <h2 className="text-white font-semibold text-lg mb-3">Contact</h2>
          <p className="text-gray-400 text-sm mb-2">For questions or advisor applications:</p>
          <a href="mailto:hello@zerobias.in" className="text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">hello@zerobias.in</a>
        </div>

        <div className="text-center animate-fade-up stagger-5">
          <Link href="/services" className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-8 py-3 rounded-full transition-all duration-150">
            Explore Packages →
          </Link>
        </div>

      </div>
    </div>
  )
}