'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function NavbarClient() {
  const [userName, setUserName] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setUserName(localStorage.getItem('user_name') || '')
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_email')
    setUserName('')
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/services' },
    { label: 'FinProfile', href: '/finprofile' },
    { label: 'About', href: '/about' },
  ]

  const firstName = userName.split(' ')[0]

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-6 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-md border-b border-emerald-500/10 shadow-lg shadow-black/20'
          : 'bg-[#0a0a0f] border-b border-gray-800'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-emerald-400">Zero</span><span className="text-white">Bias</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${pathname === href ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {label}
            </Link>
          ))}
          {userName ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
                  {firstName[0]?.toUpperCase()}
                </div>
                {firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs border border-gray-700 text-gray-500 hover:text-white hover:border-gray-500 px-3 py-1.5 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 16px rgba(52,211,153,0.4)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="rounded-lg"
            >
              <Link
                href="/login"
                className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-lg transition-colors block"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-4 pb-2 flex flex-col gap-4 px-2">
              {navLinks.map(({ label, href }) => (
                <Link key={href} href={href} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {label}
                </Link>
              ))}
              {userName ? (
                <>
                  <Link href="/dashboard" className="text-emerald-400 text-sm">
                    My Dashboard ({firstName})
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-gray-500 text-left">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-sm text-emerald-400">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
