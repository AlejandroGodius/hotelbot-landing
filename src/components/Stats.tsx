'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

function AnimatedNumber({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{value}{suffix}</span>
}

const STATS = [
  { value: 80, suffix: '%', label: 'Queries fully automated', description: 'Without any human intervention' },
  { value: 3, suffix: 's', label: 'Average response time', description: 'Faster than any human receptionist' },
  { value: 90, suffix: '%', label: 'Guest satisfaction', description: 'Based on post-stay surveys' },
  { value: 70, suffix: '%', label: 'Cost reduction', description: 'In front desk repetitive workload' },
]

export default function Stats() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="glass rounded-2xl p-10 md:p-16 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--gold)]/[0.03] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                The Impact
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-white text-center mb-16"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Numbers that <span className="italic gradient-gold">speak</span>
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {STATS.map((stat, i) => (
                  <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
                    <div
                      className="text-4xl md:text-5xl font-light text-white mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-white mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {stat.description}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
