import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarClient from '@/components/NavbarClient'
import PageTracker from '@/components/PageTracker'
import ChatWidget from '@/components/ChatWidget'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://zerobias.in'),
  title: {
    default: 'ZeroBias — Expert Financial Advisors Across India',
    template: '%s | ZeroBias',
  },
  description: 'Connect with expert financial advisors across India. Fee-based, independent, on-demand advisory. All India coverage.',
  keywords: ['financial advisor India', 'financial advisor near me', 'unbiased financial advice India', 'investment advisor India', 'mutual fund advisor', 'NRI financial planning', 'retirement planning India', 'financial planner India'],
  authors: [{ name: 'ZeroBias', url: 'https://zerobias.in' }],
  creator: 'ZeroBias',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://zerobias.in',
    siteName: 'ZeroBias',
    title: 'ZeroBias — Expert Financial Advisors Across India',
    description: 'Connect with expert financial advisors across India. Fee-based, independent, on-demand advisory.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ZeroBias — Find Fee-Based Financial Advisors in India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeroBias — Expert Financial Advisors Across India',
    description: 'Connect with expert financial advisors across India. Fee-based, independent advisory.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://zerobias.in/#organization",
                "name": "ZeroBias",
                "url": "https://zerobias.in",
                "logo": "https://zerobias.in/og-image.png",
                "description": "India's fee-based financial advisor discovery platform. Connect with fee-only, unbiased financial advisors.",
                "contactPoint": { "@type": "ContactPoint", "email": "hello@zerobias.in", "contactType": "customer support" },
                "sameAs": []
              },
              {
                "@type": "WebSite",
                "@id": "https://zerobias.in/#website",
                "url": "https://zerobias.in",
                "name": "ZeroBias",
                "publisher": { "@id": "https://zerobias.in/#organization" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": { "@type": "EntryPoint", "urlTemplate": "https://zerobias.in/advisors?service={search_term_string}" },
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          })}}
        />
      </head>
      <body className={`${inter.className} bg-[#0a0a0f]`}>
        <NavbarClient />
        <PageTracker />
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="bg-[#080810] border-t border-gray-800/50 pt-16 pb-8 mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

              {/* Col 1 — Brand */}
              <div className="md:col-span-1">
                <Link href="/" className="font-bold text-2xl tracking-tight">
                  <span className="text-emerald-400">Zero</span><span className="text-white">Bias</span>
                </Link>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  Expert financial advisors across India. Fee-based, independent, on-demand service.
                </p>
                <p className="text-gray-700 text-xs mt-6">© 2026 ZeroBias. All rights reserved.</p>
              </div>

              {/* Col 2 — Useful Links */}
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">Platform</p>
                <ul className="space-y-3">
                  {[
                    { label: 'Financial Packages', href: '/services' },
                    { label: 'Book a Session', href: '/booking' },
                    { label: 'FinProfile Quiz', href: '/finprofile' },
                    { label: 'About ZeroBias', href: '/about' },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-gray-500 text-sm hover:text-emerald-400 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 — Contact + Social */}
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">Connect</p>
                <p className="text-gray-500 text-sm mb-1">For queries & advisor applications:</p>
                <a href="mailto:hello@zerobias.in" className="text-emerald-400 text-sm hover:underline">
                  hello@zerobias.in
                </a>

                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mt-6 mb-3">Follow Us</p>
                <div className="flex items-center gap-3">
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/bhavna-jaiswal-7aa49a402/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-emerald-500/20 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://www.youtube.com/@ZeroBias0B" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-emerald-500/20 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080810"/>
                    </svg>
                  </a>
                  {/* X */}
                  <a href="https://x.com/zerobiasob" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-emerald-500/20 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/zerobias0b" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-emerald-500/20 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  {/* Reddit */}
                  <a href="https://www.reddit.com/user/zerobias0b/submitted/?sort=hot" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-emerald-500/20 flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path fill="#080810" d="M15.5 13.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S13.17 12 14 12s1.5.67 1.5 1.5zm-6 0c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S11.83 12 11 12s-1.5.67-1.5 1.5zm7.07-3.57A1.5 1.5 0 0118 11.5a1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5c0-.28.08-.54.21-.76C14.5 10.5 13.3 10 12 10s-2.5.5-3.21.74c.13.22.21.48.21.76A1.5 1.5 0 017.5 13a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.43-1.57C8.5 8.5 10.12 7.5 12 7.5s3.5 1 4.57 2.43zM12 16.5c-1.1 0-2-.4-2.5-.9l-.7.7c.7.7 1.9 1.2 3.2 1.2s2.5-.5 3.2-1.2l-.7-.7c-.5.5-1.4.9-2.5.9zm1-10a1 1 0 110 2 1 1 0 010-2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-gray-700 text-xs">
                ZeroBias is a financial advisor discovery platform. We connect clients with expert advisors across India.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-gray-700 text-xs flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  Secure
                </span>
                <span className="text-gray-700 text-xs flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                  All India Coverage
                </span>
              </div>
            </div>
          </div>
        </footer>
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}