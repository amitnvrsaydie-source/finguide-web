"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SkeletonCard } from "@/components/Skeleton";

const advisors = [
  { id: 1, name: "Rajesh Sharma", city: "Bangalore", registration: "RIA", experience: 12, specializations: ["mutual-funds", "epf", "inheritance"], specializationLabels: ["Mutual Funds", "EPF Guidance", "Inheritance Planning"], bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future." },
  { id: 2, name: "Priya Nair", city: "Bangalore", registration: "RIA", experience: 8, specializations: ["mutual-funds", "nri", "global"], specializationLabels: ["Mutual Funds", "NRI Services", "Global Investments"], bio: "SEBI RIA specializing in goal-based investing and NRI financial planning." },
];

const serviceLabels: Record<string, string> = {
  epf: "EPF Guidance",
  nri: "NRI Services",
  global: "Global Investments",
  inheritance: "Inheritance Planning",
  loan: "Loan Management",
  "mutual-funds": "Mutual Funds",
  insurance: "Insurance",
  bonds: "Bonds & FDs",
  nps: "NPS",
};

function AdvisorsContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const filtered = service ? advisors.filter((a) => a.specializations.includes(service)) : advisors;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">Browse</p>
          <h1 className="text-4xl font-bold mb-3">
            {service ? `${serviceLabels[service] ?? service} Advisors` : "SEBI-Verified Advisors"}
          </h1>
          <p className="text-gray-400">All advisors are SEBI registered. Browse and connect directly.</p>
        </div>

        {/* Service filter pills */}
        <div className="flex flex-wrap gap-2 mb-10 animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <a
            href="/advisors"
            className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${!service ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"}`}
          >
            All
          </a>
          {Object.entries(serviceLabels).map(([id, label]) => (
            <a
              key={id}
              href={`/advisors?service=${id}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${service === id ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"}`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No advisors found</h3>
            <p className="text-gray-500 text-sm mb-6">
              We&apos;re onboarding {serviceLabels[service ?? ''] ?? service} advisors. Check back soon.
            </p>
            <a
              href="/advisors"
              className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-5 py-2 rounded-full text-sm transition-all duration-200"
            >
              ← View all advisors
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((advisor, i) => (
              <div
                key={advisor.id}
                className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 hover:-translate-y-0.5 hover:bg-white/[0.07] transition-all duration-200 animate-fade-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{advisor.name}</h2>
                    <p className="text-gray-400 text-sm">{advisor.city}</p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    {advisor.registration}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{advisor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {advisor.specializationLabels.map((s) => (
                    <span key={s} className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-gray-500 text-xs">{advisor.experience} yrs experience</span>
                  <a
                    href={`/advisors/${advisor.id}`}
                    className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black text-sm font-bold px-4 py-2 rounded-full transition-all duration-150"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function AdvisorsSkeleton() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="mb-8">
          <div className="skeleton h-3 w-16 rounded mb-3" />
          <div className="skeleton h-9 w-64 rounded-lg mb-3" />
          <div className="skeleton h-4 w-72 rounded" />
        </div>
        <div className="flex gap-2 mb-10">
          {[80, 60, 90, 70, 85, 65, 75].map((w, i) => (
            <div key={i} className="skeleton h-7 rounded-full" style={{ width: w }} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array(4).fill(null).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    </main>
  );
}

export default function AdvisorsPage() {
  return (
    <Suspense fallback={<AdvisorsSkeleton />}>
      <AdvisorsContent />
    </Suspense>
  );
}
