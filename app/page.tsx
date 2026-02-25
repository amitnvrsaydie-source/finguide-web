export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-700">FinGuide</span>
        <div className="flex gap-4">
          <a href="/advisors" className="text-gray-600 hover:text-blue-700 text-sm">Browse Advisors</a>
          <a href="/apply" className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800">Apply as Advisor</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-6 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find the right financial advisor.<br />Not noise.
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          FinGuide helps investors discover and connect with SEBI-registered financial advisors.
          We do not provide investment advice or recommendations.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/advisors" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800">
            Browse Advisors
          </a>
          <a href="/apply" className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
            Apply as Advisor
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-50 border-t border-gray-200 px-6 py-8 text-center">
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          FinGuide is a discovery platform only. We do not provide investment advice, recommend advisors, or guarantee any financial outcomes.
          All advisors listed are independently registered with SEBI. Please conduct your own due diligence before engaging any advisor.
        </p>
      </section>
    </main>
  );
}