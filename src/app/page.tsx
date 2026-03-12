'use client'

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
