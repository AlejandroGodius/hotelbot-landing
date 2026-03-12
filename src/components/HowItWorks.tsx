'use client'

import AnimatedSection from './AnimatedSection'

const STEPS = [
  {
    number: '01',
    title: 'Connect',
    description: 'Link your hotel\'s WhatsApp Business number. No app downloads, no portals — your guests already have WhatsApp open.',
    detail: 'Works with any WhatsApp Business API provider. Setup takes under 10 minutes.',
    icon: '📱',
  },
  {
    number: '02',
    title: 'Teach',
    description: 'Upload your rooms, services, pricing, policies, and local recommendations. The AI learns your property inside and out.',
    detail: 'Onboarding wizard guides you step by step. Everything is vectorized for instant retrieval.',
    icon: '🧠',
  },
  {
    number: '03',
    title: 'Go live',
    description: 'Activate and your AI concierge starts handling guest messages immediately. Monitor everything from the operations dashboard.',
    detail: 'Real-time monitoring, task management, and staff notifications from day one.',
    icon: '✨',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Getting Started
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Three steps to <span className="italic gradient-gold">brilliance</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
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
                  {step.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step.description}
                </p>

                <p className="text-xs text-gray-600 border-t border-white/5 pt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step.detail}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
