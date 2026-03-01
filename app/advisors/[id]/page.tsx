'use client';
import { useState } from 'react';

const advisors = [
  { id: "1", name: "Rajesh Sharma", city: "Mumbai", registration: "RIA", experience: 12, specializations: ["Retirement Planning", "Tax Planning"], languages: ["English", "Hindi"], bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future." },
  { id: "2", name: "Priya Nair", city: "Bangalore", registration: "ARN", experience: 8, specializations: ["Mutual Funds", "SIP Planning"], languages: ["English", "Kannada", "Malayalam"], bio: "SEBI registered distributor specializing in goal-based mutual fund investments for young professionals." },
];

export default function AdvisorProfile({ params }: { params: { id: string } }) {
  const advisor = advisors.find((a) => a.id === params.id);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, advisor_name: advisor?.name, advisor_id: advisor?.id }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (!advisor) return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      <p>Advisor not found.</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#0a0a0f]/90">
        <a href="/" className="text-xl font-bold">Fin<span className="text-emerald-400">Guide</span></a>
        <div className="flex items-center gap-4">
          <a href="/advisors" className="text-gray-400 hover:text-white text-sm">Back to Advisors</a>
          <a href="/apply" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold px-4 py-2 rounded-full">Apply as Advisor</a>
        </div>
      </nav>
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">{advisor.name}</h1>
              <p className="text-gray-400">{advisor.city} · {advisor.experience} years experience</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-500/30">{advisor.registration}</span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">{advisor.bio}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {advisor.specializations.map((s) => (
              <span key={s} className="bg-white/10 text-gray-300 text-sm px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
          <div className="pt-6 border-t border-white/10">
            <p className="text-gray-500 text-sm">Languages: {advisor.languages.join(', ')}</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
              <p className="text-gray-400">We have notified {advisor.name}. You will hear back within 2-3 business days.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Request a Connection</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Your Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Your Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="What would you like to discuss?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                <button type="submit" disabled={status === 'loading'} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold py-4 rounded-xl text-lg transition-colors">
                  {status === 'loading' ? 'Sending...' : 'Send Connection Request'}
                </button>
                {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
              </form>
            </>
          )}
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">FinGuide is a discovery platform only. We do not provide investment advice. All advisors are independently SEBI registered.</p>
      </footer>
    </main>
  );
}
