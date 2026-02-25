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
    specializations: ["Mutual Funds", "Goal-based Investing"],
    languages: ["English", "Kannada", "Malayalam"],
    bio: "Certified financial planner focused on goal-based investing for young professionals and families.",
  },
];

export default function AdvisorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-700">FinGuide</a>
        <a href="/apply" className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800">Apply as Advisor</a>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find an Advisor</h1>
        <p className="text-gray-500 mb-8">Browse SEBI-registered financial advisors. All profiles show verified information only.</p>

        <div className="grid gap-6">
          {advisors.map((advisor) => (
            <div key={advisor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{advisor.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">{advisor.city} · {advisor.registration} · {advisor.experience} years experience</p>
                </div>
                <a href={`/advisors/${advisor.id}`} className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800">
                  View Profile
                </a>
              </div>
              <p className="text-gray-600 mt-3 text-sm">{advisor.bio}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {advisor.specializations.map((s) => (
                  <span key={s} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-200 px-6 py-6 text-center">
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          FinGuide is a discovery platform only. We do not recommend advisors or guarantee outcomes. Please conduct your own due diligence.
        </p>
      </section>
    </main>
  );
}