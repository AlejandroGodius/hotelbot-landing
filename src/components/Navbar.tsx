'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n, LANGUAGES } from '@/lib/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { t, lang, setLang } = useI18n()

  const NAV_LINKS = [
    { href: '#agents', label: t('nav.agents') },
    { href: '#demo', label: t('nav.demo') },
    { href: '#how', label: t('nav.how') },
    { href: '#pricing', label: t('nav.pricing') },
  ]

  const currentLang = LANGUAGES.find(l => l.code === lang)!

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
              {t('footer.tagline')}
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

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--gold-light)] border border-[var(--gold-dim)]/20 rounded-full hover:border-[var(--gold-dim)]/40 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>{currentLang.flag}</span>
                <span className="uppercase tracking-wider">{lang}</span>
                <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 bg-[#12121a] border border-[var(--gold-dim)]/20 rounded-lg overflow-hidden shadow-xl"
                  >
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs tracking-wider transition-colors ${
                          lang === l.code
                            ? 'text-[var(--gold-light)] bg-[var(--gold)]/10'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span>{l.flag}</span>
                        <span className="uppercase">{l.code}</span>
                        <span className="text-gray-600 normal-case">{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#pricing"
              className="px-5 py-2 text-xs font-medium tracking-wider uppercase rounded-full border border-[var(--gold-dim)]/30 text-[var(--gold-light)] hover:bg-[var(--gold)]/10 transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t('nav.cta')}
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
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 mb-4">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                    lang === l.code
                      ? 'bg-[var(--gold)]/15 text-[var(--gold-light)] border border-[var(--gold-dim)]/40'
                      : 'text-gray-500 border border-white/10 hover:text-white'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>{l.flag}</span>
                  <span>{l.code}</span>
                </button>
              ))}
            </div>

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
              {t('nav.cta')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
