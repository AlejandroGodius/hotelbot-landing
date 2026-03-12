'use client'

import AnimatedSection from './AnimatedSection'

const FEATURES = [
  {
    icon: '🌍',
    title: 'Every Language',
    description: 'Guests write in their language, the bot responds fluently. No configuration needed — it just works.',
  },
  {
    icon: '🤝',
    title: 'Smart Handoff',
    description: 'When a human touch is needed, the bot seamlessly transfers to the right staff member with full context.',
  },
  {
    icon: '📊',
    title: 'Operations Dashboard',
    description: 'Real-time monitoring by department. Interactive task management with status workflow for your entire team.',
  },
  {
    icon: '📣',
    title: 'Automated Campaigns',
    description: 'Welcome messages, upselling offers, and review requests — triggered automatically at the perfect moment.',
  },
  {
    icon: '⭐',
    title: 'Review Collection',
    description: 'Capture guest satisfaction at checkout. Happy guests are redirected to Google and TripAdvisor. Unhappy ones reach your manager first.',
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'All data encrypted at rest and in transit. GDPR compliant. No guest data is used for AI training.',
  },
  {
    icon: '🎙️',
    title: 'Voice Messages',
    description: 'Guests can send voice notes. The AI transcribes and responds intelligently — no text required.',
  },
  {
    icon: '📋',
    title: 'Task Automation',
    description: 'Guest requests become trackable tasks. Staff gets notified, updates status in real-time. Nothing falls through the cracks.',
  },
]

export default function Features() {
  return (
    <section className="py-32 px-6 relative">
      {/* Separator */}
      <div className="gold-line mb-32" />

      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Everything You Need
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Built for <span className="italic gradient-gold">excellence</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feat, i) => (
            <AnimatedSection key={feat.title} delay={i * 0.08}>
              <div className="glass glass-hover rounded-xl p-6 h-full transition-all duration-500 group">
                <span className="text-2xl block mb-4 group-hover:scale-110 transition-transform duration-500">
                  {feat.icon}
                </span>
                <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feat.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feat.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
