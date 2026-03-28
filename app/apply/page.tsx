import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply as an Advisor',
  description: 'Join FinGuide as a SEBI-registered advisor. Apply to be listed on India\'s trusted fee-only advisor discovery platform.',
  openGraph: {
    title: 'Apply as a SEBI Advisor — FinGuide',
    description: 'Join FinGuide\'s network of verified, fee-only SEBI RIAs. Applications reviewed within 3–5 business days.',
  },
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Apply as an Advisor</h1>
        <p className="text-gray-400 mb-8">
          We list only SEBI-registered advisors. All applications are manually reviewed before publishing.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">Full Name</label>
              <input type="text" placeholder="Your full name" className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">Phone</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">City</label>
              <input type="text" placeholder="Mumbai, Delhi, Bangalore..." className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">Registration Type</label>
              <select className="w-full bg-[#0a0a0f] border border-gray-800 text-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 transition-colors">
                <option>Select registration type</option>
                <option>RIA (SEBI Registered Investment Advisor)</option>
                <option>ARN (AMFI Registered Mutual Fund Distributor)</option>
                <option>Both RIA and ARN</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">SEBI Registration / ARN Number</label>
              <input type="text" placeholder="INA000XXXXXX or ARN-XXXXX" className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">Years of Experience</label>
              <input type="number" placeholder="e.g. 8" className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1.5">Short Bio</label>
              <textarea placeholder="Brief description of your practice (max 200 words)" rows={4} className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold text-sm transition-colors">
              Submit Application
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-4 text-center">
            We will review your registration details and contact you within 3–5 business days.
          </p>
        </div>
      </section>
    </main>
  );
}
