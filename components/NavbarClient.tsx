'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavbarClient() {
  const [userName, setUserName] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const name = localStorage.getItem('user_name') || ''
    setUserName(name)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('user_name')
    setUserName('')
  }

  return (
    <nav className="w-full bg-[#0a0a0f] border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-emerald-400 font-bold text-xl">
          FinGuide
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-[#cccccc] hover:text-white text-sm">Home</Link>
          <Link href="/advisors" className="text-[#cccccc] hover:text-white text-sm">Browse Advisors</Link>
          <Link href="/services" className="text-[#cccccc] hover:text-white text-sm">Services</Link>
          <Link href="/about" className="text-[#cccccc] hover:text-white text-sm">About</Link>
          {userName ? (
            <>
              <span className="text-emerald-400 text-sm">Hi, {userName}</span>
              <button
                onClick={handleLogout}
                className="text-sm border border-gray-600 text-gray-300 px-3 py-1 rounded hover:border-gray-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-[#cccccc]"></span>
          <span className="w-6 h-0.5 bg-[#cccccc]"></span>
          <span className="w-6 h-0.5 bg-[#cccccc]"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-2">
          <Link href="/" className="text-[#cccccc] text-sm">Home</Link>
          <Link href="/advisors" className="text-[#cccccc] text-sm">Browse Advisors</Link>
          <Link href="/services" className="text-[#cccccc] text-sm">Services</Link>
          <Link href="/about" className="text-[#cccccc] text-sm">About</Link>
          {userName ? (
            <>
              <span className="text-emerald-400 text-sm">Hi, {userName}</span>
              <button onClick={handleLogout} className="text-sm text-gray-300 text-left">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-emerald-400">Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}