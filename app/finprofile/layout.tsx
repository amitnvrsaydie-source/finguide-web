import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'FinProfile Quiz — Discover Your Investor Personality',
  description: 'Take the free FinProfile quiz to understand your financial personality — conservative, moderate, or aggressive — and get matched with the right SEBI advisor.',
  openGraph: {
    title: 'FinProfile Quiz — What Kind of Investor Are You?',
    description: 'Free 5-question quiz to discover your investment personality and get matched with a SEBI-registered advisor.',
  },
}

export default function FinprofileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
