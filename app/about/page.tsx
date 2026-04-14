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

        {/* Header */}
        <div className="animate-fade-up mb-10">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Who we are</p>
          <h1 className="text-4xl font-bold text-white mb-4">About <span className="text-emerald-400">Zero</span>Bias</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            ZeroBias is a discovery platform that connects investors across India with qualified, fee-based financial advisors — advisors who work for you, not for a product house.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-1">
          <h2 className="text-white font-semibold text-lg mb-3">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            Every Indian investor deserves access to a qualified, trustworthy financial advisor — one whose advice is driven purely by the merit of their financial situation, not by commissions or product incentives. We exist to make fee-based, independent guidance accessible to every investor across India, honest and entirely on their terms.
          </p>
        </div>

        {/* The Problem We Solve */}
        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-2">
          <h2 className="text-white font-semibold text-lg mb-3">The Problem We Solve</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Most financial advice in India is quietly commission-driven. Advisors are incentivised by banks, AMCs, and insurance companies to push specific products — not because those products are right for you, but because they pay the highest commissions.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The result: investors end up in the wrong funds, over-insured, under-invested, or simply confused — with no one in their corner who is truly unbiased. ZeroBias exists to fix that.
          </p>
        </div>

        {/* How We Vet Advisors */}
        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-3">
          <h2 className="text-white font-semibold text-lg mb-4">How We Vet Advisors</h2>
          <p className="text-gray-400 leading-relaxed mb-5">
            Not everyone who claims to be a financial advisor makes it onto ZeroBias. Every advisor goes through a manual review before being listed on our platform.
          </p>
          <div className="space-y-3">
            {[
              { title: 'Qualification check', desc: 'We verify relevant financial qualifications and certifications.' },
              { title: 'No commission structures', desc: 'Advisors on ZeroBias operate on a fee-only basis — no product selling, no trailing commissions.' },
              { title: 'Independence verified', desc: 'Advisors must not be employed by or affiliated with any bank, AMC, or insurance company in a sales capacity.' },
              { title: 'Ongoing accountability', desc: 'Advisors who receive poor feedback or operate outside our standards are removed.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="text-white font-medium">{title} — </span>{desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-4">
          <h2 className="text-white font-semibold text-lg mb-5">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8 8M6 8a5 5 0 000 5h3"/></svg>,
                title: 'Fee-Based Only',
                desc: 'You pay for advice. Nothing else.',
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: 'Fully Independent',
                desc: 'No banks. No AMCs. No agendas.',
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: 'On Your Terms',
                desc: 'Book when you need it. No lock-ins.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/3 border border-white/8 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">{icon}</div>
                <p className="text-white text-sm font-semibold mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-10 hover:border-gray-700 transition-colors duration-200 animate-fade-up stagger-5">
          <h2 className="text-white font-semibold text-lg mb-3">Get in Touch</h2>
          <p className="text-gray-400 text-sm mb-2">For questions, partnerships, or advisor applications:</p>
          <a href="mailto:hello@zerobias.in" className="text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">hello@zerobias.in</a>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-up">
          <Link href="/services" className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-bold px-8 py-3 rounded-full transition-all duration-150">
            Explore Packages →
          </Link>
        </div>

      </div>
    </div>
  )
}
