'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#agents', label: 'Agents' },
  { href: '#demo', label: 'Demo' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-[#08080a]/80 backdrop-blur-xl border-b border-white/[0.03]' : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span
              className="text-lg font-medium text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              HotelBot
            </span>
            <span className="hidden sm:inline text-[10px] text-[var(--gold-dim)] tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              AI Concierge
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-white transition-colors tracking-wider uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="px-5 py-2 text-xs font-medium tracking-wider uppercase rounded-full border border-[var(--gold-dim)]/30 text-[var(--gold-light)] hover:bg-[var(--gold)]/10 transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`w-5 h-px bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-5 h-px bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#08080a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-white font-light"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-[var(--gold)] text-black text-sm font-semibold tracking-wider uppercase rounded-full"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
