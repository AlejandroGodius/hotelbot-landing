'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const AGENTS = [
  {
    id: 'reception',
    name: 'Reception',
    icon: '🏨',
    model: 'Advanced AI',
    description: 'Your digital front desk. Answers everything about the property — rooms, rates, amenities, check-in procedures, policies. Draws from a rich knowledge base loaded with your real data.',
    capabilities: ['Room information & pricing', 'Check-in/out procedures', 'Hotel policies & amenities', 'Restaurant reservations', 'Full knowledge base access'],
    color: '#6B8AFF',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    icon: '🗺️',
    model: 'Advanced AI',
    description: 'Local expertise on demand. Recommends restaurants, books taxis, suggests tours and activities. Searches the web in real-time when your knowledge base doesn\'t have the answer.',
    capabilities: ['Restaurant recommendations', 'Taxi & transport booking', 'Tours & activities', 'Real-time web search', 'Local area expertise'],
    color: '#A78BFA',
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    icon: '🧹',
    model: 'Fast AI',
    description: 'Instant response to room needs. Towels, pillows, cleaning requests — automatically creates tasks and notifies the right staff member. No call needed.',
    capabilities: ['Extra towels & pillows', 'Room cleaning requests', 'Minibar refills', 'Amenity delivery', 'Auto-task creation'],
    color: '#34D399',
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: '🔧',
    model: 'Fast AI',
    description: 'Reports issues before they escalate. AC not working? Leak in the bathroom? The bot creates an urgent task, alerts the maintenance team, and keeps the guest informed.',
    capabilities: ['AC & heating issues', 'Plumbing problems', 'Electrical faults', 'Urgent task creation', 'Staff alerting system'],
    color: '#FB923C',
  },
  {
    id: 'upselling',
    name: 'Upselling',
    icon: '💎',
    model: 'Advanced AI',
    description: 'Revenue without pressure. Responds to campaign messages with personalized offers — spa treatments, dining experiences, room upgrades. Gentle, contextual, effective.',
    capabilities: ['Campaign responses', 'Spa & dining offers', 'Room upgrades', 'Special experiences', 'Revenue optimization'],
    color: '#FBBF24',
  },
]

export default function Agents() {
  const [active, setActive] = useState(0)
  const agent = AGENTS[active]

  return (
    <section id="agents" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            The Intelligence
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Five minds, <span className="italic gradient-gold">one voice</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            Each guest message is analyzed and routed to the specialist best
            equipped to handle it — in under 500ms.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Agent selector */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {AGENTS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap min-w-fit lg:min-w-0 ${
                    active === i
                      ? 'glass border-[var(--gold-dim)]/30 shadow-[0_0_30px_rgba(201,169,110,0.05)]'
                      : 'border border-transparent hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <div className={`text-sm font-medium ${active === i ? 'text-white' : 'text-gray-400'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                      {a.name}
                    </div>
                    <div className="text-[10px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>{a.model}</div>
                  </div>
                  {active === i && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />}
                </button>
              ))}
            </div>

            {/* Agent detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden"
              >
                {/* Subtle glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                  style={{ background: agent.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{agent.icon}</span>
                    <div>
                      <h3 className="text-2xl font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {agent.name}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${agent.color}15`, color: agent.color, fontFamily: "'Inter', sans-serif" }}
                      >
                        {agent.model}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {agent.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {agent.capabilities.map((cap, i) => (
                      <motion.div
                        key={cap}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 text-sm text-gray-300"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: agent.color }}
                        />
                        {cap}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
