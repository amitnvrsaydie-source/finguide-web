import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Book a Free Session',
  description: 'Book your first free session with a SEBI-registered financial advisor on ZeroBias. Choose your date, time, and meeting mode.',
  openGraph: {
    title: 'Book a Free Advisory Session — ZeroBias',
    description: 'First session is absolutely free. No hidden charges. Book with a SEBI-registered advisor in minutes.',
  },
}

export default function BookingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
