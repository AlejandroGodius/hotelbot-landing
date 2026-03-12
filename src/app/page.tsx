'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Agents from '@/components/Agents'
import ChatDemo from '@/components/ChatDemo'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  useEffect(() => {
    // Force scroll to top on initial load (prevents browser scroll restoration)
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }

    // Smooth scroll for anchor links via JS (replaces CSS scroll-behavior)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <Navbar />
      <Hero />

      {/* Gold separator */}
      <div className="gold-line" />

      <Agents />
      <ChatDemo />
      <HowItWorks />
      <Stats />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
