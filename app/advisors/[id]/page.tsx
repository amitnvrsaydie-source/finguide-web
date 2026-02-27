'use client';

import { use, useState } from 'react';

const advisors = [
  { id: 1, name: "Rajesh Sharma", city: "Mumbai", registration: "RIA", experience: 12, specializations: ["Retirement Planning", "Tax Planning"], languages: ["English", "Hindi"], bio: "SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals plan their financial future." },
  { id: 2, name: "Priya Nair", city: "Bangalore", registration: "ARN", experience: 8, specializations: ["Mutual Funds", "Goal-based Investing"], languages: ["English", "Kannada", "Malayalam"], bio: "Certified financial planner focused on goal-based investing for young professionals and families." },
];

export default function AdvisorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const advisor = advisors.find((a) => a.id === parseInt(id));
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '' });
  const [status, setStatus] = useState('');
  if (!advisor) return <div className="p-12 text-center text-gray-500">Advisor not found.</div>;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, advisorName: advisor.name }) });
    setStatus(res.ok ? 'success' : 'error');
  };
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-700">FinGuide</a>
        <a href="/advisors" className="text-gray-600 hover:text-blue-700 text-sm">Back to Advisors</a>
      </nav>
      <section className="max-w-2xl mx-auto px-6 py-12">
        <div className="border border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900">{advisor.name}</h1>
          <p className="text-gray-500 mt-1">{advisor.city} · {advisor.registration} · {advisor.experience} years</p>
          <p className="text-gray-700 mt-6">{advisor.bio}</p>
          <div className="mt-6 flex flex-wrap gap-2">{advisor.specializations.map(s => <span key={s} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">{s}</span>)}</div>
          <div className="mt-8 border-t pt-8">
            <h2 className="text-lg font-semibold mb-4">Request a Connection</h2>
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-700 font-medium">Request sent!</p>
                <p className="text-green-600 text-sm mt-1">We will connect you with {advisor.name} within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
                <input required type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
                <input required type="tel" placeholder="Your Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
                <select required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-gray-600">
                  <option value="">Why are you reaching out?</option>
                  <option>Retirement Planning</option>
                  <option>Tax Planning</option>
                  <option>Mutual Fund Advice</option>
                  <option>General Financial Planning</option>
                  <option>Other</option>
                </select>
                <button type="submit" disabled={status === 'sending'} className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50">{status === 'sending' ? 'Sending...' : 'Request Connect'}</button>
                {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Try again.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}