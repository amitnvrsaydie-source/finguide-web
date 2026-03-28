'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    quote: "ZeroBias connected me with a SEBI-registered advisor who transformed my investment strategy completely.",
    name: "Rahul Mehta",
    title: "CTO, Bangalore Startup"
  },
  {
    quote: "Finally found an unbiased advisor with no product-pushing agenda. Pure fee-only advice.",
    name: "Priya Sharma",
    title: "Senior Manager, Infosys"
  },
  {
    quote: "The first free session was genuinely helpful. Booked 3 more sessions after that.",
    name: "Karthik Subramanian",
    title: "Entrepreneur, Hyderabad"
  }
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* HERO — Split layout like TheFynPrint */}
      <section className="relative min-h-[90vh] flex items-center border-b border-gray-800/40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,10,15,0.97) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,15,0.97) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#0a0a0f'
        }}>
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">India's SEBI-verified advisor network</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Find the right{' '}
                <span className="text-emerald-400">financial</span>{' '}
                advisor.{' '}
                <span className="text-gray-400">Not noise.</span>
              </h1>

              <div className="flex items-center gap-6 mb-8">
                {[
                  { icon: '⚖', label: 'Unbiased' },
                  { icon: '🚫', label: 'No Selling' },
                  { icon: '✓', label: 'SEBI Verified' }
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <span className="text-emerald-400">{icon}</span> {label}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/advisors"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors text-sm"
                >
                  Browse Advisors →
                </Link>
                <Link
                  href="/finprofile"
                  className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white font-semibold px-8 py-3.5 rounded-full hover:border-emerald-500 hover:text-emerald-400 transition-colors text-sm"
                >
                  Take FinProfile Quiz
                </Link>
              </div>

              {/* Free session badge */}
              <div className="mt-8 inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">First Advisory Session — <span className="text-emerald-400">Free</span></p>
                  <p className="text-gray-500 text-xs">No subscription · No recurring fees</p>
                </div>
              </div>
            </div>

            {/* Right — Testimonial */}
            <div className="hidden lg:block animate-fade-up stagger-2">
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-6">What investors say</p>
              <div className="bg-[#111118] border border-gray-800/60 rounded-2xl p-8 min-h-[220px] flex flex-col justify-between">
                <p className="text-white text-lg leading-relaxed font-light italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {testimonials[currentTestimonial].name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-500 text-xs">{testimonials[currentTestimonial].title}</p>
                  </div>
                </div>
              </div>
              {/* Dots */}
              <div className="flex gap-2 mt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-1 rounded-full transition-all ${i === currentTestimonial ? 'w-6 bg-emerald-400' : 'w-2 bg-gray-700'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR — Infinite Ticker */}
      <section className="border-b border-gray-800/40 py-6 overflow-hidden">
        <p className="text-gray-600 text-xs uppercase tracking-widest text-center mb-5">Trusted by professionals from</p>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[
              'Infosys', 'Goldman Sachs', 'Wipro', 'JPMorgan Chase', 'TCS',
              'Microsoft', 'Flipkart', 'Deloitte', 'Razorpay', 'Google',
              'HDFC Bank', 'McKinsey & Co', 'Zerodha', 'Morgan Stanley', 'Accenture',
              'Infosys', 'Goldman Sachs', 'Wipro', 'JPMorgan Chase', 'TCS',
              'Microsoft', 'Flipkart', 'Deloitte', 'Razorpay', 'Google',
              'HDFC Bank', 'McKinsey & Co', 'Zerodha', 'Morgan Stanley', 'Accenture',
            ].map((company, i) => (
              <span key={i} className="text-gray-500 text-sm font-semibold tracking-wide mx-8 shrink-0">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: 'SEBI', label: 'Verified Only' },
              { value: '100%', label: 'Independent' },
              { value: 'Free', label: 'First Session' },
            ].map(({ value, label }, i) => (
              <div key={label} className={`bg-[#111118] border border-gray-800/60 rounded-2xl py-10 animate-fade-up stagger-${i + 1}`}>
                <p className="text-4xl font-bold text-emerald-400 mb-2">{value}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">Simple process</p>
            <h2 className="text-3xl font-bold text-white">How ZeroBias Works</h2>
            <p className="text-gray-500 text-sm mt-2">Your path to the right advisor — in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Take Quiz', desc: 'Understand your financial personality with FinProfile' },
              { step: '02', title: 'Browse Advisors', desc: 'Filter by city, specialty and SEBI registration' },
              { step: '03', title: 'Book Free Session', desc: 'Video call, phone or in-person — your choice' },
              { step: '04', title: 'Get Your Plan', desc: 'Receive personalized, unbiased financial guidance' },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className={`bg-[#111118] border border-gray-800/60 rounded-2xl p-6 animate-fade-up stagger-${i + 1}`}>
                <p className="text-emerald-400 text-xs font-bold tracking-widest mb-3">{step}</p>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-4">Get started today</p>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to meet your advisor?</h2>
          <p className="text-gray-400 mb-8">First session is completely free. No commitments.</p>
          <Link
            href="/advisors"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-4 rounded-full transition-colors"
          >
            Browse Advisors →
          </Link>
        </div>
      </section>

    </div>
  )
}