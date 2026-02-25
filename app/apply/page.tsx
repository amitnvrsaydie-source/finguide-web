export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-700">FinGuide</a>
        <a href="/advisors" className="text-gray-600 hover:text-blue-700 text-sm">Browse Advisors</a>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply as an Advisor</h1>
        <p className="text-gray-500 mb-8">
          We list only SEBI-registered advisors. All applications are manually reviewed before publishing.
        </p>

        <div className="border border-gray-200 rounded-lg p-8">
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
              <input type="text" placeholder="Your full name" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">City</label>
              <input type="text" placeholder="Mumbai, Delhi, Bangalore..." className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Registration Type</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-gray-600">
                <option>Select registration type</option>
                <option>RIA (SEBI Registered Investment Advisor)</option>
                <option>ARN (AMFI Registered Mutual Fund Distributor)</option>
                <option>Both RIA and ARN</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">SEBI Registration / ARN Number</label>
              <input type="text" placeholder="INA000XXXXXX or ARN-XXXXX" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Years of Experience</label>
              <input type="number" placeholder="e.g. 8" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Short Bio</label>
              <textarea placeholder="Brief description of your practice (max 200 words)" rows={4} className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800">
              Submit Application
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4 text-center">
            We will review your registration details and contact you within 3-5 business days.
          </p>
        </div>
      </section>
    </main>
  );
}