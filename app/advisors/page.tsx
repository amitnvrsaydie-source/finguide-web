"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/Skeleton";
import { analytics } from "@/lib/analytics";

function parseArr(val: unknown): string[] {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') { try { return JSON.parse(val) } catch { return [] } }
  return []
}

const SPEC_LABELS: Record<string, string> = {
  epf: "EPF Guidance", nri: "NRI Services", global: "Global Investments",
  inheritance: "Inheritance Planning", loan: "Loan Management",
  "mutual-funds": "Mutual Funds", insurance: "Insurance",
  bonds: "Bonds & FDs", nps: "NPS", "rsu-esop": "RSU & ESOP",
  tax: "Tax Advisory", retirement: "Retirement Planning",
  "portfolio-review": "Portfolio Review",
}

const FEE_OPTIONS = [
  { label: "Any Fee", value: "" },
  { label: "Under ₹2,000", value: "2000" },
  { label: "Under ₹5,000", value: "5000" },
  { label: "Under ₹10,000", value: "10000" },
]

type Advisor = {
  id: number;
  full_name: string;
  city: string;
  sebi_reg_no: string;
  years_experience: number;
  specializations: string[];
  bio: string;
  fee_per_session?: number;
  photo_url?: string;
};

function AdvisorsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const service = searchParams.get("service");
  const cityParam = searchParams.get("city") || "";
  const feeParam = searchParams.get("maxFee") || "";

  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [allAdvisors, setAllAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedFee, setSelectedFee] = useState(feeParam);

  // Fetch advisors when service changes
  useEffect(() => {
    setLoading(true);
    const url = service ? `/api/advisors?service=${service}` : "/api/advisors";
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const list: Advisor[] = data.advisors || [];
        setAllAdvisors(list);
        const uniqueCities = Array.from(new Set(list.map(a => a.city).filter(Boolean))).sort();
        setCities(uniqueCities as string[]);
      })
      .catch(() => setAllAdvisors([]))
      .finally(() => setLoading(false));
  }, [service]);

  // Apply city + fee client-side from allAdvisors
  useEffect(() => {
    let filtered = allAdvisors;
    if (selectedCity) {
      filtered = filtered.filter(a => a.city?.toLowerCase() === selectedCity.toLowerCase());
    }
    if (selectedFee) {
      const max = parseInt(selectedFee);
      filtered = filtered.filter(a => !a.fee_per_session || a.fee_per_session <= max);
    }
    setAdvisors(filtered);
  }, [allAdvisors, selectedCity, selectedFee]);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/advisors?${params.toString()}`);
  }

  if (loading) return <AdvisorsSkeleton />;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">Browse</p>
          <h1 className="text-4xl font-bold mb-3">
            {service ? `${SPEC_LABELS[service] ?? service} Advisors` : "SEBI-Verified Advisors"}
          </h1>
          <p className="text-gray-400">
            {advisors.length} advisor{advisors.length !== 1 ? "s" : ""} · All SEBI registered
          </p>
        </div>

        {/* Specialization filter pills */}
        <div className="flex flex-wrap gap-2 mb-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <a
            href="/advisors"
            className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
              !service
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
            }`}
          >
            All
          </a>
          {Object.entries(SPEC_LABELS).map(([id, label]) => (
            <a
              key={id}
              href={`/advisors?service=${id}`}
              onClick={() => analytics.filterSelected(id)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                service === id
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* City + Fee filters */}
        <div className="flex flex-wrap gap-3 mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* City */}
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <select
              value={selectedCity}
              onChange={e => { setSelectedCity(e.target.value); updateFilter("city", e.target.value); }}
              className="bg-[#111118] border border-white/10 text-gray-300 text-sm rounded-full px-4 py-1.5 focus:outline-none focus:border-emerald-500/40 cursor-pointer"
            >
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Fee */}
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 shrink-0">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
            <select
              value={selectedFee}
              onChange={e => { setSelectedFee(e.target.value); updateFilter("maxFee", e.target.value); }}
              className="bg-[#111118] border border-white/10 text-gray-300 text-sm rounded-full px-4 py-1.5 focus:outline-none focus:border-emerald-500/40 cursor-pointer"
            >
              {FEE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Clear filters */}
          {(selectedCity || selectedFee) && (
            <button
              onClick={() => { setSelectedCity(""); setSelectedFee(""); router.push(service ? `/advisors?service=${service}` : "/advisors"); }}
              className="text-xs text-gray-500 hover:text-red-400 border border-white/10 rounded-full px-3 py-1.5 transition-colors"
            >
              ✕ Clear filters
            </button>
          )}
        </div>

        {/* Empty state */}
        {advisors.length === 0 ? (
          <div className="text-center py-24 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No advisors found</h3>
            <p className="text-gray-500 text-sm mb-6">
              Try adjusting your filters or check back soon.
            </p>
            <a href="/advisors" className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-5 py-2 rounded-full text-sm transition-all duration-200">
              ← View all advisors
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {advisors.map((advisor, i) => (
              <div
                key={advisor.id}
                className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 hover:-translate-y-0.5 hover:bg-white/[0.07] transition-all duration-200 animate-fade-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg shrink-0">
                      {advisor.full_name[0]}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{advisor.full_name}</h2>
                      <p className="text-gray-400 text-sm">{advisor.city}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 shrink-0">
                    RIA
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{advisor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {parseArr(advisor.specializations).slice(0, 3).map(s => (
                    <span key={s} className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {SPEC_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-gray-500 text-xs">{advisor.years_experience} yrs exp</span>
                  <a
                    href={`/advisors/${advisor.id}`}
                    onClick={() => analytics.advisorCardClicked(advisor.id, advisor.full_name)}
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
          <div className="skeleton h-4 w-48 rounded" />
        </div>
        <div className="flex gap-2 mb-6">
          {[80, 60, 90, 70, 85, 65, 75].map((w, i) => (
            <div key={i} className="skeleton h-7 rounded-full" style={{ width: w }} />
          ))}
        </div>
        <div className="flex gap-3 mb-10">
          <div className="skeleton h-8 w-32 rounded-full" />
          <div className="skeleton h-8 w-36 rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array(6).fill(null).map((_, i) => <SkeletonCard key={i} />)}
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
