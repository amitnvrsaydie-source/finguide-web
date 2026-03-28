import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Login — FinGuide',
  description: 'Sign in to FinGuide with a secure OTP sent to your email. No passwords required.',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
