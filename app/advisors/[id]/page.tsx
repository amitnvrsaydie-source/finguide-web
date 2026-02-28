const advisors = [
  {
    id: "1",
    name: "Rajesh Sharma",
    city: "Mumbai",
    registration: "RIA",
    experience: 12,
    specializations: ["Retirement Planning", "Tax Planning"],
    languages: ["English", "Hindi"],
    bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future.",
  },
  {
    id: "2",
    name: "Priya Nair",
    city: "Bangalore",
    registration: "ARN",
    experience: 8,
    specializations: ["Mutual Funds", "SIP Planning"],
    languages: ["English", "Kannada", "Malayalam"],
    bio: "AMFI registered distributor specializing in goal-based mutual fund investments for young professionals.",
  },
];

export default async function AdvisorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const advisor = advisors.find((a) => a.id === id);

  if (!advisor) return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      <p>Advisor not found.</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#0a0a0f]/90">
        <a href="/" className="text-xl font-bold">Fin<span className="text-emerald-400">Guide</span></a>
        <div className="flex items-center gap-4">
          <a href="/advisors" className="text-gray-400 hover:text-white text-sm">Back to Advisors</a>
          <a href="/apply" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold px-4 py-2 rounded-full">Apply as Advisor</a>
        </div>
      </nav>
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">{advisor.name}</h1>
              <p className="text-gray-400">{advisor.city} · {advisor.experience} years experience</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/30">{advisor.registration}</span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">{advisor.bio}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {advisor.specializations.map((s) => (
              <span key={s} className="bg-white/10 text-gray-300 text-sm px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
          <div className="pt-6 border-t border-white/10">
            <p className="text-gray-500 text-sm">Languages: {advisor.languages.join(', ')}</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Request a Connection</h2>
          <form className="space-y-4">
            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Your Name" />
            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Your Email" />
            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Your Phone" />
            <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="What would you like to discuss?" />
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl text-lg transition-colors">Send Connection Request</button>
          </form>
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">FinGuide is a discovery platform only. We do not provide investment advice. All advisors are independently SEBI registered.</p>
      </footer>
    </main>
  );
}
