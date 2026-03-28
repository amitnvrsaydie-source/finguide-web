'use client';

import { use, useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { analytics } from '@/lib/analytics';

const advisors = [
  { id: 1, name: "Rajesh Sharma", city: "Bangalore", registration: "RIA", experience: 12, specializations: ["Mutual Funds", "EPF Guidance", "Inheritance Planning"], languages: ["English", "Hindi"], bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future." },
  { id: 2, name: "Priya Nair", city: "Bangalore", registration: "RIA", experience: 8, specializations: ["Mutual Funds", "NRI Services", "Global Investments"], languages: ["English", "Kannada", "Malayalam"], bio: "SEBI RIA specializing in goal-based investing and NRI financial planning." },
];

export default function AdvisorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const advisor = advisors.find((a) => a.id === parseInt(id));
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!advisor) return
    analytics.advisorViewed(advisor.id, advisor.name, advisor.city)
    fetch(`/api/advisors/${advisor.id}/view`, { method: 'POST' })
  }, [advisor?.id])  // eslint-disable-line react-hooks/exhaustive-deps

  if (!advisor) return <div className="min-h-screen bg-[#0a0a0f] p-12 text-center text-gray-500">Advisor not found.</div>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, advisorName: advisor.name }) });
    setStatus(res.ok ? 'success' : 'error');
  };

  const handleBook = () => {
    analytics.ctaClicked('book_now', 'advisor_profile')
    router.push(`/booking?advisor_id=${advisor.id}&advisor_name=${encodeURIComponent(advisor.name)}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-2xl mx-auto px-6 py-12">
        <a href="/advisors" className="text-gray-500 hover:text-emerald-400 text-sm mb-8 inline-block transition-colors">
          ← Back to Advisors
        </a>

        {/* Profile card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{advisor.name}</h1>
              <p className="text-gray-400 mt-1">{advisor.city} · {advisor.experience} years experience</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              {advisor.registration}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">{advisor.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {advisor.specializations.map(s => (
              <span key={s} className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Book a session CTA */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white font-semibold">Book a Free Session</p>
              <p className="text-gray-400 text-sm mt-0.5">First session is absolutely free · No hidden charges</p>
            </div>
            <button
              onClick={handleBook}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              Book Now →
            </button>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-4">Send a Message Instead</h2>
          {status === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
              <p className="text-emerald-400 font-medium">Message sent!</p>
              <p className="text-gray-400 text-sm mt-1">We will connect you with {advisor.name} within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" autoComplete="off" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
              <input required type="email" autoComplete="off" placeholder="Your Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
              <input required type="tel" autoComplete="off" placeholder="Your Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-[#0a0a0f] border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 placeholder:text-gray-700 transition-colors" />
              <select required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} className="w-full bg-[#0a0a0f] border border-gray-800 text-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 transition-colors">
                <option value="">Why are you reaching out?</option>
                <option>Retirement Planning</option>
                <option>Tax Planning</option>
                <option>Mutual Fund Advice</option>
                <option>General Financial Planning</option>
                <option>Other</option>
              </select>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 border border-white/10">
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
