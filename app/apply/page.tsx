'use client';
import { useState } from 'react';

export default function ApplyPage() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', city: '', registration_type: '', sebi_reg_no: '', years_experience: '', bio: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-3xl font-bold mb-4">Application Received!</h2>
        <p className="text-gray-400 mb-8">We will review your SEBI credentials and contact you within 3-5 business days.</p>
        <a href="/" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Back to Home</a>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#0a0a0f]/90">
        <a href="/" className="text-xl font-bold">Fin<span className="text-emerald-400">Guide</span></a>
        <a href="/advisors" className="text-gray-400 hover:text-white text-sm">Browse Advisors</a>
      </nav>
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Apply as an Advisor</h1>
          <p className="text-gray-400">We list only SEBI-registered advisors. All applications are manually reviewed.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
            <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Your full name" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
              <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
            <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Mumbai, Delhi, Bangalore..." value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Registration Type *</label>
              <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" value={form.registration_type} onChange={e => setForm({...form, registration_type: e.target.value})}>
                <option value="" className="bg-[#0a0a0f]">Select type</option>
                <option value="RIA" className="bg-[#0a0a0f]">RIA (SEBI)</option>
                <option value="ARN" className="bg-[#0a0a0f]">ARN (AMFI)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">SEBI/ARN Number *</label>
              <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="INA000XXXXXX" value={form.sebi_reg_no} onChange={e => setForm({...form, sebi_reg_no: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
            <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. 8" value={form.years_experience} onChange={e => setForm({...form, years_experience: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="Tell investors about your expertise and approach..." value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} />
          </div>
          <button type="submit" disabled={status === 'loading'} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold py-4 rounded-xl text-lg transition-colors">
            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
          </button>
          {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
        </form>
      </section>
    </main>
  );
}
