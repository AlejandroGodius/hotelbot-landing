'use client'

import AnimatedSection from './AnimatedSection'
import { useI18n } from '@/lib/i18n'

export default function Features() {
  const { t } = useI18n()

  const FEATURES = [
    { icon: '\u{1F30D}', titleKey: 'feat.lang.title', descKey: 'feat.lang.desc' },
    { icon: '\u{1F91D}', titleKey: 'feat.handoff.title', descKey: 'feat.handoff.desc' },
    { icon: '\u{1F4CA}', titleKey: 'feat.dashboard.title', descKey: 'feat.dashboard.desc' },
    { icon: '\u{1F4E3}', titleKey: 'feat.campaigns.title', descKey: 'feat.campaigns.desc' },
    { icon: '\u2B50', titleKey: 'feat.reviews.title', descKey: 'feat.reviews.desc' },
    { icon: '\u{1F512}', titleKey: 'feat.security.title', descKey: 'feat.security.desc' },
    { icon: '\u{1F399}\uFE0F', titleKey: 'feat.voice.title', descKey: 'feat.voice.desc' },
    { icon: '\u{1F4CB}', titleKey: 'feat.tasks.title', descKey: 'feat.tasks.desc' },
  ]

  return (
    <section className="py-32 px-6 relative">
      {/* Separator */}
      <div className="gold-line mb-32" />

      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('features.label')}
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('features.title.1')}<span className="italic gradient-gold">{t('features.title.2')}</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feat, i) => (
            <AnimatedSection key={feat.titleKey} delay={i * 0.08}>
              <div className="glass glass-hover rounded-xl p-6 h-full transition-all duration-500 group">
                <span className="text-2xl block mb-4 group-hover:scale-110 transition-transform duration-500">
                  {feat.icon}
                </span>
                <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t(feat.titleKey)}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t(feat.descKey)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
