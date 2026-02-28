const advisors = [
  {
    id: 1,
    name: "Rajesh Sharma",
    city: "Mumbai",
    registration: "RIA",
    experience: 12,
    specializations: ["Retirement Planning", "Tax Planning"],
    languages: ["English", "Hindi"],
    bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future.",
  },
  {
    id: 2,
    name: "Priya Nair",
    city: "Bangalore",
    registration: "ARN",
    experience: 8,
    specializations: ["Mutual Funds", "SIP Planning"],
    languages: ["English", "Kannada", "Malayalam"],
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
      <section className="max-w-5xl mx-auto px-6 pt-1
