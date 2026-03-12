'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const PLANS = [
  {
    name: 'Boutique',
    price: '149',
    description: 'Perfect for boutique hotels and small villas',
    features: [
      '1 property',
      'Up to 500 conversations/mo',
      '3 AI agents (Reception, Housekeeping, Maintenance)',
      'Operations dashboard',
      'Email support',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Premium',
    price: '349',
    description: 'For luxury properties that demand the best',
    features: [
      '1 property',
      'Up to 2,000 conversations/mo',
      'All 5 AI agents',
      'Automated campaigns & reviews',
      'Operations dashboard + analytics',
      'Multi-language campaigns',
      'Priority support',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Multi-property groups and hotel chains',
    features: [
      'Unlimited properties',
      'Unlimited conversations',
      'All 5 AI agents + custom agents',
      'White-label option',
      'API access',
      'Dedicated account manager',
      'Custom integrations (PMS, CRM)',
    ],
    cta: 'Contact us',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Investment
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Simple, <span className="italic gradient-gold">transparent</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-lg mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Less than the cost of one night shift. More reliable than any hire.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.12}>
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
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>{plan.description}</p>
                </div>

                <div className="mb-8">
                  {plan.price !== 'Custom' ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-gray-500">€</span>
                      <span className="text-4xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {plan.price}
                      </span>
                      <span className="text-xs text-gray-500">/month</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Custom
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map(feat => (
                    <div key={feat} className="flex items-start gap-2.5 text-sm text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="text-[var(--gold)] text-xs mt-0.5">&#10003;</span>
                      {feat}
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
                  {plan.cta}
                </button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
