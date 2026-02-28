const advisors = [
  {
    id: 1,
    name: "Rajesh Sharma",
    city: "Mumbai",
    registration: "RIA",
    experience: 12,
    specializations: ["Retirement Planning", "Tax Planning"],
    bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future.",
  },
  {
    id: 2,
    name: "Priya Nair",
    city: "Bangalore",
    registration: "ARN",
    experience: 8,
    specializations: ["Mutual Funds", "SIP Planning"],
    bio: "AMFI registered distributor specializing in goal-based mutual fund investments for young professionals.",
  },
];

export default function AdvisorsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#0a0a0f]/90">
        <a href="/" className="text-xl font-bold">Fin<span className="text-emerald-400">Guide</span></a>
        <div className="flex items-center gap-4">
          <a href="/advisors" className="text-emerald-400 text-sm font-semibold">Browse Advisors</a>
          <a href="/apply" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold px-4 py-2 rounded-full">Apply as Advisor</a>
        </div>
      </nav>
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">SEBI-Verified Advisors</h1>
          <p className="text-gray-400">All advisors are manually verified before listing. Browse and connect directly.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {advisors.map((advisor) => (
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
                {advisor.specializations.map((s) => (
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
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">FinGuide is a discovery platform only. We do not provide investment advice. All advisors are independently SEBI registered.</p>
      </footer>
    </main>
  );
}
