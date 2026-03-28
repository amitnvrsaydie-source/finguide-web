export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          India&apos;s SEBI-verified advisor network
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Find the right <span className="text-emerald-400">financial advisor.</span> Not noise.
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
          FinGuide connects investors with SEBI-registered advisors. Verified credentials. Zero conflict of interest.
        </p>

        {/* ACTION 3: Free session hook + reassurance */}
        <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl px-6 py-4 mb-8 inline-block">
          <p className="text-white font-semibold text-lg mb-1">
            🎯 First Advisory Session — <span className="text-emerald-400">Absolutely Free</span>
          </p>
          <p className="text-gray-400 text-sm">No subscription · No recurring fees · No hidden charges</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/advisors" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full text-lg transition-colors">
            Browse Advisors →
          </a>
          <a href="/finprofile" className="border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-semibold px-8 py-4 rounded-full text-lg transition-colors">
            Take FinProfile Quiz ✦
          </a>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-6 mb-16">
          {[
            { value: "SEBI", label: "Verified Only" },
            { value: "100%", label: "Independent" },
            { value: "Free", label: "First Session" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* ACTION 7: 5-step visual journey */}
        <h2 className="text-3xl font-bold text-center mb-4">How FinGuide Works</h2>
        <p className="text-gray-400 text-center mb-12">Your path to the right advisor — in 5 simple steps</p>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-500/10 via-emerald-500/50 to-emerald-500/10 z-0"></div>
          <div className="grid md:grid-cols-5 gap-4 relative z-10">
            {[
              { step: "1", icon: "🎯", title: "FinProfile Quiz", desc: "Understand your financial personality" },
              { step: "2", icon: "🔍", title: "Browse Advisors", desc: "Filter by city & specialty" },
              { step: "3", icon: "✅", title: "Choose Freely", desc: "Verify SEBI registration" },
              { step: "4", icon: "📅", title: "Book a Meet", desc: "Video call or in-person" },
              { step: "5", icon: "🚀", title: "Get Your Plan", desc: "Personalised financial plan" },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-2xl mb-3 relative">
                  {icon}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full text-[10px] font-bold text-black flex items-center justify-center">{step}</span>
                </div>
                <h3 className="text-sm font-bold mb-1 text-white">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION 4: FinProfile quiz CTA */}
        <div className="mt-16 bg-gradient-to-br from-emerald-500/10 to-emerald-900/10 border border-emerald-500/20 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-4 right-8 text-yellow-400 text-2xl opacity-60">✦</div>
          <div className="absolute top-8 right-16 text-yellow-300 text-sm opacity-40">✦</div>
          <div className="absolute bottom-6 left-8 text-yellow-400 text-xl opacity-50">✦</div>
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-2xl font-bold mb-2">Discover Your FinProfile</h3>
          <p className="text-gray-400 mb-2 max-w-md mx-auto">5 questions. 2 minutes. Know your financial personality before meeting any advisor.</p>
          <p className="text-emerald-400 text-sm italic mb-6">&ldquo;Know yourself first — then find the advisor who matches you.&rdquo;</p>
          <a href="/finprofile" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3 rounded-full transition-colors">
            Start FinProfile Quiz — Free →
          </a>
        </div>

        {/* ACTION 6: Sample Financial Plan */}
        <div className="mt-8 bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📄</div>
            <div>
              <h4 className="font-bold text-white">Sample Financial Plan</h4>
              <p className="text-gray-400 text-sm">See exactly what a SEBI advisor-prepared plan looks like</p>
            </div>
          </div>
          <a href="/sample-plan" className="flex-shrink-0 border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors">
            View Sample Plan →
          </a>
        </div>

        {/* ACTION 5: Meeting mode */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white/4 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">💻</span>
              <h4 className="font-bold text-white">Video Call</h4>
            </div>
            <p className="text-gray-400 text-sm">Meet your advisor via Google Meet from anywhere in India. Most available within 48 hours.</p>
          </div>
          <div className="bg-white/4 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🤝</span>
              <h4 className="font-bold text-white">In-Person Meet</h4>
            </div>
            <p className="text-gray-400 text-sm">Prefer face-to-face? Filter by city and schedule a physical meeting at their office.</p>
          </div>
        </div>
      </section>

      {/* ACTIONS 1 & 2: Security trust strip */}
      <section style={{ background: 'rgba(29,158,117,0.04)', borderTop: '1px solid rgba(29,158,117,0.15)', borderBottom: '1px solid rgba(29,158,117,0.15)', padding: '28px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Your data security is our top priority
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {[
              { label: 'SSL Secured', icon: '🔒' },
              { label: 'AWS Hosted', icon: '☁️' },
              { label: 'SEBI Compliant', icon: '📋' },
              { label: 'Encrypted Data', icon: '🛡️' },
              { label: 'SEBI RIA Registered', icon: '✅' },
            ].map(({ label, icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '6px 14px' }}>
                <span style={{ fontSize: '14px' }}>{icon}</span>
                <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '600' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why FinGuide */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Why FinGuide?</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Unlike platforms that assign you an advisor, FinGuide lets you choose — like Practo for doctors.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🎯", title: "You Choose Your Advisor", desc: "Browse all SEBI RIAs. Read profiles. Decide. No system assignment — full control." },
            { icon: "🛡️", title: "100% SEBI Verified", desc: "Every advisor is cross-checked against the SEBI RIA registry. Zero unregulated advisors." },
            { icon: "💰", title: "Transparent Fees", desc: "Advisors list consultation fees upfront. No surprises, no hidden costs, no commission conflicts." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-xl mb-5">{icon}</div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
