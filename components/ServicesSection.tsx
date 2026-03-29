"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const services = [
  { id: "epf", label: "EPF Guidance", icon: "🏦", color: "teal", summary: "Provident fund withdrawal, transfer & nomination help.", covered: ["EPF withdrawal process", "PF transfer between jobs", "Nomination update", "UAN activation"], notCovered: ["Employer PF disputes", "Legal representation"] },
  { id: "nri", label: "NRI Services", icon: "✈️", color: "blue", summary: "Tax, investments & repatriation for NRIs.", covered: ["NRE/NRO account guidance", "DTAA & tax optimisation", "Repatriation of funds", "RNOR golden window planning", "US Estate Tax guidance", "401k / IRA to India transfer", "FBAR & FATCA reporting"], notCovered: ["Overseas tax filing", "Visa & immigration"] },
  { id: "global", label: "Global Investments", icon: "🌐", color: "purple", summary: "Invest in US stocks, ETFs & international funds.", covered: ["US stocks & ETFs", "International mutual funds", "LRS remittance planning", "Currency risk management"], notCovered: ["Crypto investments", "Offshore banking"] },
  { id: "inheritance", label: "Inheritance Planning", icon: "🏛️", color: "red", summary: "Will, nomination & estate transfer planning.", covered: ["Will drafting guidance", "Nomination review", "Asset transfer planning", "Joint account structuring"], notCovered: ["Legal drafting fees", "Court representation"] },
  { id: "loan", label: "Loan Management", icon: "💳", color: "blue", summary: "Home loan, personal loan & debt restructuring.", covered: ["Home loan planning", "Debt consolidation", "EMI optimisation", "Prepayment strategy"], notCovered: ["Loan sourcing", "Credit repair"] },
  { id: "mutual-funds", label: "Mutual Funds", icon: "📈", color: "green", summary: "SIP, lumpsum & goal-based fund selection.", covered: ["Fund selection & review", "SIP planning", "Goal-based investing", "Portfolio rebalancing"], notCovered: ["Direct stock tips", "F&O advice"] },
  { id: "insurance", label: "Insurance", icon: "🛡️", color: "olive", summary: "Term, health & life cover review.", covered: ["Term insurance sizing", "Health cover review", "Uncover riders & add-ons", "Upgrade or switch policy", "Audit my insurance", "Claim assistance guidance"], notCovered: ["Insurance selling", "Policy issuance"] },
  { id: "bonds", label: "Bonds & FDs", icon: "💰", color: "amber", summary: "Fixed income, bonds & FD laddering strategy.", covered: ["Government bond guidance", "Corporate bond review", "FD laddering strategy", "RBI bonds & SGBs"], notCovered: ["Chit funds", "Unregulated deposits"] },
  { id: "nps", label: "NPS", icon: "🏦", color: "purple", summary: "National Pension System guidance and planning.", covered: ["NPS account opening", "Tier 1 & Tier 2 guidance", "Fund manager selection", "Tax benefits under 80CCD(1B)"], notCovered: ["Guaranteed returns", "Early withdrawal assistance"] },
  { id: "rsu-esop", label: "RSU & ESOP", icon: "📊", color: "purple", summary: "Equity compensation planning for employees with RSUs and ESOPs.", covered: ["RSU vesting & tax strategy", "ESOP exercise planning", "LRS for global equity", "Capital gains optimisation"], notCovered: ["Legal disputes on ESOP grants", "IPO allotment advice"] },
  { id: "tax", label: "Tax Advisory", icon: "📋", color: "blue", summary: "ITR filing strategy, DTAA, FA Schedule & capital gains planning.", covered: ["ITR filing strategy", "DTAA tax advisory", "FA Schedule (foreign assets)", "Capital gains planning"], notCovered: ["Audit representation", "GST & business tax"] },
  { id: "retirement", label: "Retirement Planning", icon: "🌅", color: "amber", summary: "Build a corpus for retirement across EPF, NPS, MF & more.", covered: ["Retirement corpus planning", "Withdrawal strategy", "Senior citizen investment options", "Pension & annuity guidance"], notCovered: ["Guaranteed pension products", "Insurance pension plans"] },
  { id: "portfolio-review", label: "Portfolio Review", icon: "📉", color: "teal", summary: "Analyse & rebalance your existing investment portfolio.", covered: ["Portfolio health check", "Asset allocation review", "Rebalancing strategy", "Overlap & risk analysis"], notCovered: ["Stock tips", "F&O advice"] },
];

const colorMap: Record<string, string> = {
  teal: "border-teal-500/40 text-teal-400 bg-teal-500/10",
  blue: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  purple: "border-purple-500/40 text-purple-400 bg-purple-500/10",
  red: "border-red-500/40 text-red-400 bg-red-500/10",
  green: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  olive: "border-yellow-600/40 text-yellow-500 bg-yellow-600/10",
  amber: "border-amber-500/40 text-amber-400 bg-amber-500/10",
};

export default function ServicesSection() {
  const [selected, setSelected] = useState(services[0]);
  const router = useRouter();

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">What do you need help with?</h2>
        <p className="text-gray-400">Select a service to find the right SEBI-registered advisor.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s)}
            className={`rounded-xl border p-4 text-left transition-all ${selected.id === s.id ? colorMap[s.color] : "border-white/10 bg-white/5 hover:border-white/20"}`}
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-sm font-semibold text-white">{s.label}</div>
          </button>
        ))}
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <h3 className="text-xl font-bold">{selected.label}</h3>
            <p className="text-gray-400 text-sm">{selected.summary}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">What&apos;s Covered</p>
            <ul className="space-y-2">
              {selected.covered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-emerald-400 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Not Included</p>
            <ul className="space-y-2">
              {selected.notCovered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-red-400 mt-0.5">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={() => router.push(`/advisors?service=${selected.id}`)}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Find {selected.label} Advisors
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {["SEBI Registered Advisors Only", "No Commission Bias", "Direct Connect"].map((badge) => (
          <span key={badge} className="text-xs text-gray-400 border border-white/10 px-3 py-1 rounded-full">
            ✓ {badge}
          </span>
        ))}
      </div>
    </section>
  );
}