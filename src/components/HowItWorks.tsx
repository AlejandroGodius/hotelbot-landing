'use client'

import AnimatedSection from './AnimatedSection'
import { useI18n } from '@/lib/i18n'

const STEP_DEFS = [
  {
    number: '01',
    titleKey: 'how.step1.title',
    descKey: 'how.step1.desc',
    detailKey: 'how.step1.detail',
    icon: '📱',
  },
  {
    number: '02',
    titleKey: 'how.step2.title',
    descKey: 'how.step2.desc',
    detailKey: 'how.step2.detail',
    icon: '🧠',
  },
  {
    number: '03',
    titleKey: 'how.step3.title',
    descKey: 'how.step3.desc',
    detailKey: 'how.step3.detail',
    icon: '✨',
  },
]

export default function HowItWorks() {
  const { t } = useI18n()

  return (
    <section id="how" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('how.label')}
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('how.title.1')}<span className="italic gradient-gold">{t('how.title.2')}</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {STEP_DEFS.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.15}>
              <div className="glass glass-hover rounded-2xl p-8 h-full flex flex-col transition-all duration-500 group">
                {/* Number */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-5xl font-light text-white/[0.06]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.number}
                  </span>
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </span>
                </div>

                <h3
                  className="text-2xl font-medium text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t(step.titleKey)}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t(step.descKey)}
                </p>

                <p className="text-xs text-gray-600 border-t border-white/5 pt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t(step.detailKey)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
