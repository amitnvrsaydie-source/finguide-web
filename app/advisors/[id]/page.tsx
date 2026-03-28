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
  bonds: 'Bonds & FDs', nps: 'NPS',
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
  }
}

export default async function AdvisorProfile(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: advisor } = await supabase
    .from('advisors')
    .select('id, full_name, city, sebi_reg_no, years_experience, specializations, languages, bio')
    .eq('id', id)
    .single()

  if (!advisor) notFound()

  // Log view to Supabase directly (no HTTP self-call)
  supabase.from('advisor_views').insert({ advisor_id: advisor.id }).then(() => {})

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
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{advisor.full_name}</h1>
              <p className="text-gray-400 mt-1">
                {advisor.city} · {advisor.years_experience} yrs experience
              </p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 shrink-0">
              SEBI RIA
            </span>
          </div>

          {advisor.sebi_reg_no && (
            <p className="text-gray-600 text-xs mb-4 font-mono">Reg: {advisor.sebi_reg_no}</p>
          )}

          <p className="text-gray-300 leading-relaxed">{advisor.bio}</p>

          {parseArr(advisor.specializations).length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {parseArr(advisor.specializations).map(s => (
                <span key={s} className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                  {SPEC_LABELS[s] ?? s}
                </span>
              ))}
            </div>
          )}

          {parseArr(advisor.languages).length > 0 && (
            <p className="text-gray-600 text-xs mt-4">
              Speaks: {parseArr(advisor.languages).join(', ')}
            </p>
          )}
        </div>

        {/* Book + Contact (client component) */}
        <AdvisorInteractions advisorId={advisor.id} advisorName={advisor.full_name} />

      </section>
    </main>
  )
}
