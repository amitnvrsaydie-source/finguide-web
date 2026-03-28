"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const advisors = [
  { id: 1, name: "Rajesh Sharma", city: "Bangalore", registration: "RIA", experience: 12, specializations: ["mutual-funds", "epf", "inheritance"], specializationLabels: ["Mutual Funds", "EPF Guidance", "Inheritance Planning"], bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future." },
  { id: 2, name: "Priya Nair", city: "Bangalore", registration: "RIA", experience: 8, specializations: ["mutual-funds", "nri", "global"], specializationLabels: ["Mutual Funds", "NRI Services", "Global Investments"], bio: "SEBI RIA specializing in goal-based investing and NRI financial planning." },
];

const serviceLabels: Record<string, string> = {
  epf: "EPF Guidance", nri: "NRI Services", global: "Global Investments",
  inheritance: "Inheritance Planning", loan: "Loan Management",
  "mutual-funds": "Mutual Funds", insurance: "Insurance", bonds: "Bonds & FDs",
};

function AdvisorsContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const filtered = service ? advisors.filter((a) => a.specializations.includes(service)) : advisors;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">
            {service ? `${serviceLabels[service] ?? service} Advisors` : "SEBI-Verified Advisors"}
          </h1>
          <p className="text-gray-400">All advisors are SEBI registered. Browse and connect directly.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          <a href="/advisors" className={`px-4 py-1.5 rounded-full text-sm border transition-all ${!service ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "border-white/10 text-gray-400 hover:border-white/20"}`}>All</a>
          {Object.entries(serviceLabels).map(([id, label]) => (
            <a key={id} href={`/advisors?service=${id}`} className={`px-4 py-1.5 rounded-full text-sm border transition-all ${service === id ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "border-white/10 text-gray-400 hover:border-white/20"}`}>{label}</a>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No advisors found for this service yet.</p>
            <p className="text-sm">We are onboarding advisors. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((advisor) => (
              <div key={advisor.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{advisor.name}</h2>
                    <p className="text-gray-400 text-sm">{advisor.city}</p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">{advisor.registration}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{advisor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {advisor.specializationLabels.map((s) => (
                    <span key={s} className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-gray-500 text-xs">{advisor.experience} years experience</span>
                  <a href={`/advisors/${advisor.id}`} className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold px-4 py-2 rounded-full transition-colors">View Profile</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">FinGuide is a discovery platform only. We do not provide investment advice. All advisors are independently SEBI registered.</p>
      </footer>
    </main>
  );
}

export default function AdvisorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <AdvisorsContent />
    </Suspense>
  );
}