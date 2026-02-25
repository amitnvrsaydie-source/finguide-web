export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-700">FinGuide</a>
        <a href="/advisors" className="text-gray-600 hover:text-blue-700 text-sm">Browse Advisors</a>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About FinGuide</h1>

        <p className="text-gray-700 mb-4">
          FinGuide is a discovery platform that helps investors in India find and connect with SEBI-registered financial advisors.
        </p>

        <p className="text-gray-700 mb-4">
          We believe that every Indian investor deserves access to a qualified, trustworthy financial advisor — not noise, not spam, not conflicted advice.
        </p>

        <p className="text-gray-700 mb-8">
          FinGuide does not provide investment advice, recommend specific advisors, or guarantee any financial outcomes. We simply make it easier to find registered professionals.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">What we are not</h2>
        <ul className="text-gray-600 space-y-2 mb-8 list-disc list-inside">
          <li>We are not a SEBI-registered entity</li>
          <li>We do not provide investment advice</li>
          <li>We do not endorse or recommend any advisor</li>
          <li>We do not handle payments between investors and advisors</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
        <p className="text-gray-600">For questions or advisor applications, email us at <span className="text-blue-700">hello@finguide.in</span></p>
      </section>

      <section className="bg-gray-50 border-t border-gray-200 px-6 py-8 text-center">
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          FinGuide is a discovery platform only. We do not provide investment advice, recommend advisors, or guarantee any financial outcomes.
          All advisors listed are independently registered with SEBI. Please conduct your own due diligence before engaging any advisor.
        </p>
      </section>
    </main>
  );
}
