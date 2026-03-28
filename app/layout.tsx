import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarClient from '@/components/NavbarClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinGuide — Find the right financial advisor',
  description: 'Connect with SEBI-registered financial advisors in India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <NavbarClient />
        <main>{children}</main>
        <footer className="w-full bg-[#0a0a0f] border-t border-gray-800 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 FinGuide. Not a SEBI-registered entity.
            </p>
            <div className="flex items-center gap-4">
              {/* LinkedIn */}
              <a href="#" className="text-gray-500 hover:text-emerald-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-gray-500 hover:text-emerald-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0f"/>
                </svg>
              </a>
              {/* X */}
              <a href="#" className="text-gray-500 hover:text-emerald-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}