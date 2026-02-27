'use client';

import { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', city: '',
    registration_type: '', sebi_reg_no: '', years_experience: '', bio: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Application submitted! We will review and contact you within 3-5 business days.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

        {status === 'success' ? (
          <div className="border border-green-200 bg-green-50 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-green-800 mb-2">Application Received!</h2>
            <p className="text-green-700">{message}</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name *</label>
                <input required name="full_name" value={formData.full_name} onChange={handleChange} type="text" placeholder="Your full name" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email *</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="your@email.com" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Phone *</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 XXXXX XXXXX" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">City *</label>
                <input required name="city" value={formData.city} onChange={handleChange} type="text" placeholder="Mumbai, Delhi, Bangalore..." className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Registration Type *</label>
                <select required name="registration_type" value={formData.registration_type} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-gray-600">
                  <option value="">Select registration type</option>
                  <option>RIA (SEBI Registered Investment Advisor)</option>
                  <option>ARN (AMFI Registered Mutual Fund Distributor)</option>
                  <option>Both RIA and ARN</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">SEBI Registration / ARN Number *</label>
                <input required name="sebi_reg_no" value={formData.sebi_reg_no} onChange={handleChange} type="text" placeholder="INA000XXXXXX or ARN-XXXXX" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Years of Experience</label>
                <input name="years_experience" value={formData.years_experience} onChange={handleChange} type="number" placeholder="e.g. 8" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Short Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Brief description of your practice (max 200 words)" rows={4} className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
              </div>
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">{message}</div>
              )}
              <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50">
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4 text-center">
              We will review your registration details and contact you within 3-5 business days.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
