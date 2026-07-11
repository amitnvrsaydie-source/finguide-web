import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Login | ZeroBias',
  description: 'Sign in to ZeroBias with a secure OTP sent to your email. No passwords required.',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
