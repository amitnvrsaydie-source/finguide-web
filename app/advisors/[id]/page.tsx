import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import AdvisorInteractions from '@/components/AdvisorInteractions'

function parseArr(val: unknown): string[] {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') { try { return JSON.parse(val) } catch { return [] } }
  return []
}

const SPEC_LABELS: Record<string, string> = {
  epf: 'EPF Guidance', nri: 'NRI Services', global: 'Global Investments',
  inheritance: 'Inheritance Planning', loan: 'Loan Management',
  'mutual-funds': 'Mutual Funds', insurance: 'Insurance',
  bonds: 'Bonds & FDs', nps: 'NPS', 'rsu-esop': 'RSU & ESOP',
  tax: 'Tax Advisory', retirement: 'Retirement Planning',
  'portfolio-review': 'Portfolio Review',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const { data } = await supabase
    .from('advisors')
    .select('full_name, city, bio')
    .eq('id', id)
    .single()
  if (!data) return { title: 'Advisor Not Found' }
  return {
    title: `${data.full_name} — SEBI Advisor, ${data.city}`,
    description: data.bio?.slice(0, 155),
    openGraph: {
      title: `${data.full_name} — SEBI-Registered Financial Advisor`,
      description: data.bio?.slice(0, 155),
    },
  }
}

export default async function AdvisorProfile(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: advisor } = await supabase
    .from('advisors')
    .select('id, full_name, city, sebi_reg_no, years_experience, specializations, languages, bio, fee_per_session, photo_url, booking_url')
    .eq('id', id)
    .single()

  if (!advisor) notFound()

  supabase.from('advisor_views').insert({ advisor_id: advisor.id }).then(() => {})

  const specs = parseArr(advisor.specializations)
  const langs = parseArr(advisor.languages)

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="max-w-2xl mx-auto px-6 py-12">

        <Link
          href="/advisors"
          className="text-gray-500 hover:text-emerald-400 text-sm mb-8 inline-block transition-colors"
        >
          ← Back to Advisors
        </Link>

        {/* Profile card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 animate-fade-up">

          {/* Avatar + Name */}
          <div className="flex items-start gap-5 mb-6">
            {advisor.photo_url ? (
              <img
                src={advisor.photo_url}
                alt={advisor.full_name}
                className="w-20 h-20 rounded-2xl object-cover border border-white/10 shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-3xl shrink-0">
                {advisor.full_name[0]}
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-white">{advisor.full_name}</h1>
                  <p className="text-gray-400 mt-1 text-sm">
                    {advisor.city} · {advisor.years_experience} yrs experience
                  </p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 shrink-0">
                  SEBI RIA
                </span>
              </div>
              {advisor.sebi_reg_no && (
                <p className="text-gray-600 text-xs mt-2 font-mono">Reg: {advisor.sebi_reg_no}</p>
              )}
            </div>
          </div>

          {/* Key stats row */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {advisor.fee_per_session && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-gray-500 text-xs mb-1">Session Fee</p>
                <p className="text-emerald-400 font-bold text-lg">₹{advisor.fee_per_session.toLocaleString('en-IN')}</p>
                <p className="text-gray-600 text-xs">First session free</p>
              </div>
            )}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">Experience</p>
              <p className="text-white font-bold text-lg">{advisor.years_experience} yrs</p>
              <p className="text-gray-600 text-xs">SEBI registered</p>
            </div>
            {langs.length > 0 && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 col-span-2">
                <p className="text-gray-500 text-xs mb-1">Languages</p>
                <p className="text-white text-sm">{langs.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="text-gray-300 leading-relaxed mb-6">{advisor.bio}</p>

          {/* Specializations */}
          {specs.length > 0 && (
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Specializes in</p>
              <div className="flex flex-wrap gap-2">
                {specs.map(s => (
                  <span key={s} className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                    {SPEC_LABELS[s] ?? s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking CTA — Calendly link if available */}
        {advisor.booking_url && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold mb-1">Book a Session</p>
                <p className="text-gray-400 text-sm">Schedule directly on the advisor's calendar</p>
              </div>
              <a
                href={advisor.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2.5 rounded-full text-sm transition-colors shrink-0"
              >
                Book Now →
              </a>
            </div>
          </div>
        )}

        {/* Book + Contact (client component) */}
        <AdvisorInteractions advisorId={String(advisor.id)} advisorName={advisor.full_name} />

      </section>
    </main>
  )
}
