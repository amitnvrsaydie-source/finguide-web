export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#0a0a0f]/90">
        <a href="/" className="text-xl font-bold">Fin<span className="text-emerald-400">Guide</span></a>
        <div className="flex items-center gap-4">
          <a href="/advisors" className="text-gray-400 hover:text-white text-sm">Browse Advisors</a>
          <a href="/apply" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold px-4 py-2 rounded-full">Apply as Advisor</a>
        </div>
      </nav>
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          India's SEBI-verified advisor network
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Find the right <span className="text-emerald-400">financial advisor.</span> Not noise.</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">FinGuide connects investors with SEBI-registered advisors. Verified credentials. Zero conflict of interest.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/advisors" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full text-lg">Browse Advisors</a>
          <a href="/apply" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-full text-lg">Apply as Advisor</a>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">SEBI</div>
            <div className="text-gray-400 text-sm">Verified Only</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">100%</div>
            <div className="text-gray-400 text-sm">Independent</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-1">Free</div>
            <div className="text-gray-400 text-sm">To Discover</div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-bold mb-2">Discover</h3>
            <p className="text-gray-400 text-sm">Browse SEBI-registered advisors by city and specialization.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-bold mb-2">Verify</h3>
            <p className="text-gray-400 text-sm">Every advisor is manually verified before being listed.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-bold mb-2">Connect</h3>
            <p className="text-gray-400 text-sm">Send a request directly to your chosen advisor.</p>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">FinGuide is a discovery platform only. We do not provide investment advice or recommendations. All advisors are independently SEBI registered.</p>
      </footer>
    </main>
  );
}
