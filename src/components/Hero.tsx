'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

export default function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated glow orbs */}
      <div className="hero-glow" style={{ top: '30%', left: '60%' }} />
      <div className="hero-glow-2" style={{ top: '60%', left: '30%' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold-dim)]/30 bg-[var(--gold)]/5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-light)]">
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-white">{t('hero.title.1')}</span>
          <br />
          <span className="text-white">{t('hero.title.2')}</span>
          <span className="gradient-gold italic font-medium">{t('hero.title.3')}</span>
          <span className="text-white">{t('hero.title.4')}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {t('hero.subtitle.1')}
          <br className="hidden md:block" />
          {t('hero.subtitle.2')}{' '}
          <span className="text-white">{t('hero.subtitle.3')}</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#demo"
            className="btn-glow relative px-8 py-4 bg-[var(--gold)] text-black text-sm font-semibold tracking-wider uppercase rounded-full transition-all hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] active:scale-95"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t('hero.cta.primary')}
          </a>
          <a
            href="#how"
            className="px-8 py-4 text-sm font-medium tracking-wider uppercase text-gray-400 hover:text-white transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t('hero.cta.secondary')}
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: '< 3s', label: t('hero.stat.response') },
            { value: '24/7', label: t('hero.stat.availability') },
            { value: '40+', label: t('hero.stat.languages') },
            { value: '80%', label: t('hero.stat.automated') },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-[var(--gold)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
