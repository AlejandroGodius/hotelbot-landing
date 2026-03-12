'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useI18n } from '@/lib/i18n'

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

const STAT_DEFS = [
  { value: 80, suffix: '%', labelKey: 'stats.1.label', descKey: 'stats.1.desc' },
  { value: 3, suffix: 's', labelKey: 'stats.2.label', descKey: 'stats.2.desc' },
  { value: 90, suffix: '%', labelKey: 'stats.3.label', descKey: 'stats.3.desc' },
  { value: 70, suffix: '%', labelKey: 'stats.4.label', descKey: 'stats.4.desc' },
]

export default function Stats() {
  const { t } = useI18n()

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="glass rounded-2xl p-10 md:p-16 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--gold)]/[0.03] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t('stats.label')}
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-white text-center mb-16"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t('stats.title.1')}<span className="italic gradient-gold">{t('stats.title.2')}</span>
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {STAT_DEFS.map((stat, i) => (
                  <AnimatedSection key={stat.labelKey} delay={i * 0.1} className="text-center">
                    <div
                      className="text-4xl md:text-5xl font-light text-white mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-white mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {t(stat.labelKey)}
                    </div>
                    <div className="text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {t(stat.descKey)}
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
