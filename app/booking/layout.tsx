import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Book your session with an expert financial advisor on ZeroBias. Choose your date, time, and meeting mode. No payment asked.',
  openGraph: {
    title: 'Book an Advisory Session — ZeroBias',
    description: 'No payment asked. No hidden charges. Book with an unbiased advisor in minutes.',
  },
}

export default function BookingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
