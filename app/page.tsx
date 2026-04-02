'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    quote: "ZeroBias connected me with an expert advisor who restructured my entire portfolio. No product pushing — just honest advice.",
    name: "Rahul Mehta",
    title: "CTO, Bangalore",
    rating: 5,
  },
  {
    quote: "Finally found an unbiased advisor. No hidden products, no agenda. Pure honest advice that actually works.",
    name: "Priya Sharma",
    title: "Senior Manager, Infosys",
    rating: 5,
  },
  {
    quote: "The first session was genuinely useful. My advisor had done their homework before we even spoke.",
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
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: 'Choose a Package',
    desc: 'Pick a financial package that matches your goal — investing, tax, NRI planning, retirement, or more.',
  },
  {
    step: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Book an Appointment',
    desc: 'Select your preferred date and time. No commitments, no pressure.',
  },
  {
    step: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'We Assign Your Advisor',
    desc: 'We match you with an expert advisor best suited to your package. Unbiased. No sales pitch.',
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
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    title: 'All India Coverage',
    desc: 'Advisors available across every state and city in India. Wherever you are, we have someone for you.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Fee-Based Advisory',
    desc: 'Transparent, fee-based service. You pay for advice — not commissions, not products, not hidden charges.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Independent & On-Demand',
    desc: 'Advisors work for you, not for any bank or product house. Book when you need it — no long-term tie-ins.',
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
                <span className="text-emerald-400 text-sm font-medium">India&apos;s unbiased financial advisor network</span>
              </div>

              <h1 className="text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-6">
                Find the right{' '}
                <span className="text-emerald-400">financial</span>{' '}
                advisor.{' '}
                <span className="text-gray-500">Not noise.</span>
              </h1>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                Fee-based advisory. Independent. Time-bound. On-demand. Professional financial guidance across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full transition-colors text-sm"
                >
                  Explore Packages →
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white font-semibold px-8 py-4 rounded-full hover:border-emerald-500/60 hover:text-emerald-400 transition-colors text-sm"
                >
                  Book a Session
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  {
                    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
                    label: 'All India Coverage'
                  },
                  {
                    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8 8M6 8a5 5 0 000 5h3"/></svg>,
                    label: 'Fee-Based Advisory'
                  },
                  {
                    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    label: 'Time-Bound Service'
                  },
                  {
                    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                    label: 'Independent Advisors'
                  },
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
              { value: '50+', label: 'Expert Advisors', sub: 'across India' },
              { value: 'All India', label: 'Coverage', sub: 'every city, every state' },
              { value: '100%', label: 'Fee-Based', sub: 'transparent advisory fees' },
              { value: '0', label: 'Commissions', sub: 'no product incentives' },
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
              Choose a package, book your session, and we assign an expert advisor — unbiased, no sales pitch.
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
                Most financial advice comes with a hidden agenda — products pushed for commissions, unsolicited follow-ups, and pressure to invest. ZeroBias is different. We connect you with advisors who are here purely to help you — no selling, no follow-up, just honest guidance.
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
                  Are you an unbiased financial advisor?
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Join India&apos;s growing network of expert, unbiased advisors. Get discovered by serious investors who are actively looking for honest financial guidance.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'No listing fees, no monthly charges',
                    'Direct bookings from genuine clients',
                    'Showcase your expertise and credentials',
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
                  { label: 'Required', value: 'Qualified financial advisor' },
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
            Choose a package, book your session — fee-based, independent, on-demand advisory across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-10 py-4 rounded-full transition-colors"
            >
              Explore Packages →
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white font-semibold px-10 py-4 rounded-full hover:border-emerald-500/60 hover:text-emerald-400 transition-colors"
            >
              Book a Session
            </Link>
          </div>
          <p className="text-gray-700 text-xs mt-6">Fee-based · Independent · Time-bound · All India coverage</p>
        </div>
      </section>

    </div>
  )
}
