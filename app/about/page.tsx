import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3">Who we are</p>
        <h1 className="text-4xl font-bold text-white mb-4">About FinGuide</h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          FinGuide is a discovery platform that helps investors in India find and connect with SEBI-registered financial advisors.
        </p>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6">
          <h2 className="text-white font-semibold text-lg mb-3">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            We believe every Indian investor deserves access to a qualified, trustworthy financial advisor — not noise, not spam, not conflicted advice.
          </p>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6">
          <h2 className="text-white font-semibold text-lg mb-4">What we are not</h2>
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">✗ We are not a SEBI-registered entity</p>
            <p className="text-gray-400 text-sm">✗ We do not provide investment advice</p>
            <p className="text-gray-400 text-sm">✗ We do not endorse or recommend any advisor</p>
            <p className="text-gray-400 text-sm">✗ We do not handle payments between investors and advisors</p>
          </div>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6">
          <h2 className="text-white font-semibold text-lg mb-4">What we do</h2>
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">✓ Connect investors with SEBI-registered advisors</p>
            <p className="text-gray-400 text-sm">✓ Verify advisor credentials from public SEBI registry</p>
            <p className="text-gray-400 text-sm">✓ Make it easier to find qualified professionals</p>
            <p className="text-gray-400 text-sm">✓ Provide a neutral unbiased discovery platform</p>
          </div>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-10">
          <h2 className="text-white font-semibold text-lg mb-3">Contact</h2>
          <p className="text-gray-400 text-sm mb-2">For questions or advisor applications:</p>
          <a href="mailto:hello@finguide.in" className="text-emerald-400 hover:underline">hello@finguide.in</a>
        </div>

        <div className="text-center">
          <Link href="/advisors" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Browse SEBI Advisors →
          </Link>
        </div>

      </div>
    </div>
  )
}