'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useI18n } from '@/lib/i18n'

export default function Pricing() {
  const { t } = useI18n()

  const PLANS = [
    {
      nameKey: 'pricing.boutique',
      price: '149',
      descKey: 'pricing.boutique.desc',
      featureKeys: ['pricing.b1', 'pricing.b2', 'pricing.b3', 'pricing.b4', 'pricing.b5'],
      ctaKey: 'pricing.cta.start',
      featured: false,
    },
    {
      nameKey: 'pricing.premium',
      price: '349',
      descKey: 'pricing.premium.desc',
      featureKeys: ['pricing.p1', 'pricing.p2', 'pricing.p3', 'pricing.p4', 'pricing.p5', 'pricing.p6', 'pricing.p7'],
      ctaKey: 'pricing.cta.trial',
      featured: true,
    },
    {
      nameKey: 'pricing.enterprise',
      price: 'custom',
      descKey: 'pricing.enterprise.desc',
      featureKeys: ['pricing.e1', 'pricing.e2', 'pricing.e3', 'pricing.e4', 'pricing.e5', 'pricing.e6', 'pricing.e7'],
      ctaKey: 'pricing.cta.contact',
      featured: false,
    },
  ]

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('pricing.label')}
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('pricing.title.1')}<span className="italic gradient-gold">{t('pricing.title.2')}</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-lg mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('pricing.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <AnimatedSection key={plan.nameKey} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-8 h-full flex flex-col transition-all duration-500 relative overflow-hidden ${
                  plan.featured
                    ? 'bg-gradient-to-b from-[var(--gold)]/[0.08] to-transparent border border-[var(--gold-dim)]/30 shadow-[0_0_60px_rgba(201,169,110,0.08)]'
                    : 'glass glass-hover'
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t(plan.nameKey)}
                  </h3>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>{t(plan.descKey)}</p>
                </div>

                <div className="mb-8">
                  {plan.price !== 'custom' ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-gray-500">&euro;</span>
                      <span className="text-4xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {plan.price}
                      </span>
                      <span className="text-xs text-gray-500">{t('pricing.month')}</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {t('pricing.custom')}
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.featureKeys.map(key => (
                    <div key={key} className="flex items-start gap-2.5 text-sm text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="text-[var(--gold)] text-xs mt-0.5">&#10003;</span>
                      {t(key)}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all active:scale-95 ${
                    plan.featured
                      ? 'bg-[var(--gold)] text-black hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]'
                      : 'border border-white/10 text-white hover:border-[var(--gold-dim)]/40 hover:text-[var(--gold-light)]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {t(plan.ctaKey)}
                </button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
