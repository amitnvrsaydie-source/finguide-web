"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const packages = [
  {
    id: "investment-kickstart",
    label: "Investment Kickstart",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    tagline: "Start your investment journey right",
    idealFor: "New investors & first salary earners",
    color: "emerald",
    price: 999,
    duration: "60 min session",
    includes: [
      "Goal mapping & financial health check",
      "SIP planning & fund selection",
      "Emergency fund strategy",
      "Basic insurance review",
      "Debt vs. investment prioritisation",
    ],
  },
  {
    id: "portfolio-optimizer",
    label: "Portfolio Optimizer",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    tagline: "Fine-tune your existing investments",
    idealFor: "Investors with 2+ years of portfolio",
    color: "blue",
    price: 1999,
    duration: "90 min session",
    includes: [
      "Portfolio health & overlap check",
      "Asset allocation review",
      "Rebalancing strategy",
      "Risk reassessment",
      "Underperforming fund audit",
    ],
  },
  {
    id: "tax-smart",
    label: "Tax Smart Planner",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    tagline: "Keep more of what you earn",
    idealFor: "Salaried & self-employed professionals",
    color: "amber",
    price: 1499,
    duration: "60 min session",
    includes: [
      "ITR filing strategy",
      "Capital gains tax planning",
      "ELSS & 80C optimisation",
      "HRA & deduction review",
      "Advance tax planning",
    ],
  },
  {
    id: "nri-plan",
    label: "NRI Financial Plan",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    tagline: "India finance, simplified for NRIs",
    idealFor: "NRIs in USA, UK, Middle East, Singapore",
    color: "purple",
    price: 2999,
    duration: "90 min session",
    includes: [
      "NRE / NRO account guidance",
      "DTAA & tax optimisation",
      "FBAR / FATCA reporting",
      "Repatriation planning",
      "RSU / ESOP & LRS strategy",
    ],
  },
  {
    id: "retirement-blueprint",
    label: "Retirement Blueprint",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    tagline: "Build a corpus that lasts",
    idealFor: "Professionals planning for retirement",
    color: "teal",
    price: 1999,
    duration: "90 min session",
    includes: [
      "Retirement corpus calculation",
      "NPS & EPF optimisation",
      "Systematic withdrawal strategy",
      "Senior citizen investment options",
      "Pension & annuity guidance",
    ],
  },
  {
    id: "wealth-legacy",
    label: "Wealth & Legacy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    tagline: "Protect and pass on your wealth",
    idealFor: "HNIs, business owners & families",
    color: "red",
    price: 2999,
    duration: "90 min session",
    includes: [
      "Will drafting guidance",
      "Nomination & beneficiary review",
      "Estate & inheritance planning",
      "Term & health insurance audit",
      "Estate tax optimisation",
    ],
  },
];

const colorMap: Record<string, { card: string; icon: string; badge: string; btn: string }> = {
  emerald: {
    card: "border-emerald-500/30 hover:border-emerald-500/60",
    icon: "bg-emerald-500/10 text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    btn: "bg-emerald-500 hover:bg-emerald-400 text-black",
  },
  blue: {
    card: "border-blue-500/30 hover:border-blue-500/60",
    icon: "bg-blue-500/10 text-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    btn: "bg-blue-500 hover:bg-blue-400 text-white",
  },
  amber: {
    card: "border-amber-500/30 hover:border-amber-500/60",
    icon: "bg-amber-500/10 text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    btn: "bg-amber-500 hover:bg-amber-400 text-black",
  },
  purple: {
    card: "border-purple-500/30 hover:border-purple-500/60",
    icon: "bg-purple-500/10 text-purple-400",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    btn: "bg-purple-500 hover:bg-purple-400 text-white",
  },
  teal: {
    card: "border-teal-500/30 hover:border-teal-500/60",
    icon: "bg-teal-500/10 text-teal-400",
    badge: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    btn: "bg-teal-500 hover:bg-teal-400 text-black",
  },
  red: {
    card: "border-rose-500/30 hover:border-rose-500/60",
    icon: "bg-rose-500/10 text-rose-400",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    btn: "bg-rose-500 hover:bg-rose-400 text-white",
  },
};

export default function PackagesSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();

  return (
    <section id="packages" className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Financial packages</p>
        <h2 className="text-3xl font-bold text-white mb-3">
          What do you need help with?
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
          Choose a package based on your financial goals. Fee-based, independent, time-bound advisory. We cover all of India.
        </p>
      </div>

      {/* Unbiased trust bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 mt-6">
        {[
          {
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
            text: "All India Coverage"
          },
          {
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8 8M6 8a5 5 0 000 5h3"/></svg>,
            text: "Fee-Based Advisory"
          },
          {
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            text: "Time-Bound Service"
          },
          {
            icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            text: "Independent Advisors"
          },
        ].map(({ icon, text }) => (
          <span key={text} className="flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 px-3 py-1.5 rounded-full bg-white/3">
            <span className="text-emerald-400">{icon}</span> {text}
          </span>
        ))}
      </div>

      {/* Package grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map((pkg) => {
          const c = colorMap[pkg.color];
          const isHovered = hovered === pkg.id;
          return (
            <div
              key={pkg.id}
              onMouseEnter={() => setHovered(pkg.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-[#111118] border rounded-2xl p-6 flex flex-col transition-all duration-200 cursor-default ${c.card} ${isHovered ? "shadow-lg" : ""}`}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.icon}`}>
                  {pkg.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{pkg.label}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{pkg.tagline}</p>
                </div>
              </div>

              {/* Ideal for badge */}
              <span className={`self-start text-xs px-2.5 py-1 rounded-full border mb-4 ${c.badge}`}>
                {pkg.idealFor}
              </span>

              {/* Includes */}
              <ul className="space-y-2 flex-1 mb-5">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="border-t border-white/5 pt-4 mt-1">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-white font-bold text-xl">₹{pkg.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-600 text-xs ml-1">/ session</span>
                  </div>
                  <span className="text-gray-600 text-xs flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {pkg.duration}
                  </span>
                </div>
                <button
                  onClick={() => router.push(`/booking?package=${pkg.id}&package_label=${encodeURIComponent(pkg.label)}&price=${pkg.price}`)}
                  className={`w-full font-bold text-sm py-2.5 rounded-full transition-all ${c.btn}`}
                >
                  Book a Session →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom trust note */}
      <p className="text-center text-gray-600 text-xs mt-10">
        After booking, we match you with the right advisor for your package.
        <span className="text-gray-500"> Transparent fees. No hidden charges. You pay the advisor through ZeroBias.</span>
      </p>
    </section>
  );
}
