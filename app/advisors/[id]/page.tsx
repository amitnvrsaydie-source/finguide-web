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

export default async function AdvisorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const advisor = advisors.find((a) => a.id === parseInt(id));

  if (!advisor) {
    return <div className="p-12 text-center text-gray-500">Advisor not found.</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-700">FinGuide</a>
        <a href="/advisors" className="text-gray-600 hover:text-blue-700 text-sm">← Back to Advisors</a>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <div className="border border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900">{advisor.name}</h1>
          <p className="text-gray-500 mt-1">{advisor.city} · {advisor.registration} · {advisor.experience} years experience</p>

          <p className="text-gray-700 mt-6">{advisor.bio}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Specializations</p>
            <div className="flex flex-wrap gap-2">
              {advisor.specializations.map((s) => (
                <span key={s} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Languages</p>
            <p className="text-sm text-gray-600">{advisor.languages.join(", ")}</p>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request a Connection</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              <input type="tel" placeholder="Your Phone" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              <select className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-gray-600">
                <option>Why are you reaching out?</option>
                <option>Retirement Planning</option>
                <option>Tax Planning</option>
                <option>Mutual Fund Advice</option>
                <option>General Financial Planning</option>
                <option>Other</option>
              </select>
              <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800">
                Request Connect
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4 text-center">
              FinGuide will manually connect you with this advisor. We do not guarantee a response.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}