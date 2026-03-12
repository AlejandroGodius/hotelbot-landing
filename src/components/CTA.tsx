'use client'

import AnimatedSection from './AnimatedSection'
import { useI18n } from '@/lib/i18n'

export default function CTA() {
  const { t } = useI18n()

  return (
    <section className="py-32 px-6 relative">
      <div className="gold-line mb-32" />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--gold)]/[0.04] blur-3xl pointer-events-none" />

        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('cta.label')}
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('cta.title.1')}<br />
            <span className="italic gradient-gold">{t('cta.title.2')}</span>{t('cta.title.3')}
          </h2>
          <p className="mt-8 text-lg text-gray-400 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('cta.subtitle')}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="btn-glow px-10 py-4 bg-[var(--gold)] text-black text-sm font-semibold tracking-wider uppercase rounded-full transition-all hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] active:scale-95"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t('cta.primary')}
            </a>
            <a
              href="#"
              className="px-10 py-4 text-sm font-medium tracking-wider uppercase text-gray-400 hover:text-white transition-colors border border-white/10 rounded-full hover:border-[var(--gold-dim)]/40"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t('cta.secondary')}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
