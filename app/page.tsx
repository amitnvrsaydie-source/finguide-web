export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center backdrop-blur-sm sticky top-0 z-50 bg-[#0a0a0f]/80">
        <a href="/" className="text-xl font-bold text-white tracking-tight">
          Fin<span className="text-emerald-400">Guide</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/advisors" className="text-gray-400 hover:text-white text-sm transition-colors">Browse Advisors</a>
          <a href="/apply" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2 rounded-full transition-colors">
            Apply as Advisor
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          India's SEBI-verified advisor network
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Find the right<br />
          <span className="text-emerald-400">financial advisor.</span><br />
          Not noise.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          FinGuide connects investors with SEBI-registered financial advisors across India. 
          Verified credentials. Real advisors. Zero conflict of interest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-cente
