'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    quote: "ZeroBias connected me with a SEBI-registered advisor who restructured my entire portfolio. No product pushing — just honest advice.",
    name: "Rahul Mehta",
    title: "CTO, Bangalore",
    rating: 5,
  },
  {
    quote: "Finally found an unbiased advisor. No commission products, no hidden agenda. Pure fee-only advice that actually works.",
    name: "Priya Sharma",
    title: "Senior Manager, Infosys",
    rating: 5,
  },
  {
    quote: "The free first session was genuinely useful. My advisor had done their homework before we even spoke.",
    name: "Karthik Subramanian",
    title: "Entrepreneur, Hyderabad",
    rating: 5,
  },
  {
    quote: "As an NRI, finding a trustworthy advisor in India was impossible — until ZeroBias. My advisor handles DTAA and FBAR seamlessly.",
    name: "Ananya Krishnan",
    title: "Software Engineer, USA",
    rating: 5,
  },
]

const steps = [
  {
    step: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Take FinProfile Quiz',
    desc: 'Understand your financial personality, goals and risk tolerance in 3 minutes.',
  },
  {
    step: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Browse SEBI Advisors',
    desc: 'Filter by city, specialization, and experience. Every advisor is SEBI-verified.',
  },
  {
    step: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Book a Free Session',
    desc: 'Video call, phone, or in-person. First session is completely free, no commitments.',
  },
  {
    step: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Get Your Plan',
    desc: 'Receive a personalized, unbiased financial plan built around your life goals.',
  },
]

const whyUs = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'SEBI Verified Only',
    desc: 'Every advisor is manually verified against SEBI\'s registration database before being listed.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Fee-Only Advice',
    desc: 'Our advisors earn only from client fees — never from product commissions or referral kickbacks.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: 'Zero Bias, Zero Selling',
    desc: 'No hidden agendas. Advisors on ZeroBias are contractually prohibited from product-pushing.',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* ── HERO ── */}
      <section
        className="relative min-h-[92vh] flex items-center border-b border-gray-800/40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,10,15,0.97) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,15,0.97) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#0a0a0f',
        }}
      >
        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">India&apos;s SEBI-verified advisor network</span>
              </div>

              <h1 className="text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-6">
                Find the right{' '}
                <span className="text-emerald-400">financial</span>{' '}
                advisor.{' '}
                <span className="text-gray-500">Not noise.</span>
              </h1>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                Connect with SEBI-registered, fee-only advisors who earn from your success — not from product commissions.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/advisors"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full transition-colors text-sm"
                >
                  Browse Advisors →
                </Link>
                <Link
                  href="/finprofile"
                  className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white font-semibold px-8 py-4 rounded-full hover:border-emerald-500/60 hover:text-emerald-400 transition-colors text-sm"
                >
                  Take FinProfile Quiz
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: '⚖', label: 'Unbiased' },
                  { icon: '🚫', label: 'No Commissions' },
                  { icon: '✓', label: 'SEBI Verified' },
                  { icon: '★', label: 'Free First Session' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <span className="text-emerald-400">{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Testimonial card */}
            <div className="hidden lg:block animate-fade-up">
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-5">What investors say</p>
              <div className="relative bg-[#111118] border border-gray-800/60 rounded-2xl p-8 min-h-[240px] flex flex-col justify-between transition-all">
                <div>
                  <StarRating count={testimonials[currentTestimonial].rating} />
                  <p className="text-white text-lg leading-relaxed font-light italic mt-4">
                    &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {testimonials[currentTestimonial].name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-500 text-xs">{testimonials[currentTestimonial].title}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-emerald-400' : 'w-2 bg-gray-700 hover:bg-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-b border-gray-800/40 py-8 overflow-hidden">
        <p className="text-gray-600 text-xs uppercase tracking-widest text-center mb-6">Trusted by professionals from</p>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center animate-ticker whitespace-nowrap">
            {[
              'Infosys', 'Goldman Sachs', 'Wipro', 'JPMorgan', 'TCS',
              'Microsoft', 'Flipkart', 'Deloitte', 'Razorpay', 'Google',
              'HDFC Bank', 'Zerodha', 'Morgan Stanley', 'Accenture', 'McKinsey & Co',
              'Infosys', 'Goldman Sachs', 'Wipro', 'JPMorgan', 'TCS',
              'Microsoft', 'Flipkart', 'Deloitte', 'Razorpay', 'Google',
              'HDFC Bank', 'Zerodha', 'Morgan Stanley', 'Accenture', 'McKinsey & Co',
            ].map((name, i) => (
              <span key={i} className="shrink-0 mx-10 text-gray-500 font-semibold text-sm tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '50+', label: 'SEBI-Verified Advisors', sub: 'manually screened' },
              { value: '20+', label: 'Cities Covered', sub: 'pan-India' },
              { value: '100%', label: 'Fee-Only', sub: 'zero commissions' },
              { value: 'Free', label: 'First Session', sub: 'no credit card needed' },
            ].map(({ value, label, sub }, i) => (
              <div key={label} className={`bg-[#111118] border border-gray-800/60 rounded-2xl p-6 text-center animate-fade-up stagger-${i + 1}`}>
                <p className="text-3xl font-bold text-emerald-400 mb-1">{value}</p>
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-gray-600 text-xs mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Simple process</p>
            <h2 className="text-3xl font-bold text-white">How ZeroBias Works</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              From discovery to personalized plan — your path to the right advisor in 4 steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, icon, title, desc }, i) => (
              <div key={step} className={`relative bg-[#111118] border border-gray-800/60 rounded-2xl p-6 animate-fade-up stagger-${i + 1}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    {icon}
                  </div>
                  <span className="text-emerald-400 text-xs font-bold tracking-widest">{step}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-gray-700 text-lg">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ZEROBIAS ── */}
      <section className="py-20 border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Why us</p>
              <h2 className="text-3xl font-bold text-white mb-4">
                Built differently.<br />For investors who demand more.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Traditional financial platforms are ridden with conflicts of interest — advisors earn from the products they sell you. ZeroBias flips this model. Every advisor on our platform is fee-only, SEBI-registered, and contractually unbiased.
              </p>
              <Link href="/about"
                className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
                Learn about our vetting process →
              </Link>
            </div>
            <div className="space-y-4">
              {whyUs.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111118] border border-gray-800/60 rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (mobile) ── */}
      <section className="py-16 border-b border-gray-800/40 lg:hidden">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-6 text-center">What investors say</p>
          <div className="bg-[#111118] border border-gray-800/60 rounded-2xl p-6">
            <StarRating count={testimonials[currentTestimonial].rating} />
            <p className="text-white text-base leading-relaxed font-light italic mt-3 mb-5">
              &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                {testimonials[currentTestimonial].name[0]}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-500 text-xs">{testimonials[currentTestimonial].title}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-1 rounded-full transition-all ${i === currentTestimonial ? 'w-6 bg-emerald-400' : 'w-2 bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR ADVISORS ── */}
      <section className="py-20 border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#111118] border border-gray-800/60 rounded-3xl p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">For advisors</p>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Are you a SEBI-registered advisor?
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Join India&apos;s growing network of verified, fee-only advisors. Get discovered by serious investors who are actively looking for unbiased financial guidance.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'Free listing — no monthly fees',
                    'Direct bookings from verified investors',
                    'Showcase your SEBI credentials',
                    'Manage your profile and availability',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-bold px-8 py-3.5 rounded-full transition-colors text-sm"
                >
                  Apply to Join →
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Review timeline', value: '3–5 business days' },
                  { label: 'Listing fee', value: '₹0 — completely free' },
                  { label: 'Required', value: 'Active SEBI RIA or ARN registration' },
                  { label: 'Commission taken', value: 'None — keep 100% of your fees' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className="text-white text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-4">Get started today</p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Your financial plan starts here.
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Book a free session with a SEBI-verified advisor. No commitments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/advisors"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-10 py-4 rounded-full transition-colors"
            >
              Browse Advisors →
            </Link>
            <Link
              href="/finprofile"
              className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white font-semibold px-10 py-4 rounded-full hover:border-emerald-500/60 hover:text-emerald-400 transition-colors"
            >
              Take FinProfile Quiz
            </Link>
          </div>
          <p className="text-gray-700 text-xs mt-6">First session is always free · No credit card required</p>
        </div>
      </section>

    </div>
  )
}
