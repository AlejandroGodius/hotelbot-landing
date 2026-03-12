'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useI18n } from '@/lib/i18n'

interface AgentDef {
  id: string
  nameKey: string
  icon: string
  modelKey: string
  descKey: string
  capKeys: string[]
  color: string
}

const AGENT_DEFS: AgentDef[] = [
  {
    id: 'reception',
    nameKey: 'agent.reception',
    icon: '🏨',
    modelKey: 'agent.advanced',
    descKey: 'agent.reception.desc',
    capKeys: ['agent.reception.c1', 'agent.reception.c2', 'agent.reception.c3', 'agent.reception.c4', 'agent.reception.c5'],
    color: '#6B8AFF',
  },
  {
    id: 'concierge',
    nameKey: 'agent.concierge',
    icon: '🗺️',
    modelKey: 'agent.advanced',
    descKey: 'agent.concierge.desc',
    capKeys: ['agent.concierge.c1', 'agent.concierge.c2', 'agent.concierge.c3', 'agent.concierge.c4', 'agent.concierge.c5'],
    color: '#A78BFA',
  },
  {
    id: 'housekeeping',
    nameKey: 'agent.housekeeping',
    icon: '🧹',
    modelKey: 'agent.fast',
    descKey: 'agent.housekeeping.desc',
    capKeys: ['agent.housekeeping.c1', 'agent.housekeeping.c2', 'agent.housekeeping.c3', 'agent.housekeeping.c4', 'agent.housekeeping.c5'],
    color: '#34D399',
  },
  {
    id: 'maintenance',
    nameKey: 'agent.maintenance',
    icon: '🔧',
    modelKey: 'agent.fast',
    descKey: 'agent.maintenance.desc',
    capKeys: ['agent.maintenance.c1', 'agent.maintenance.c2', 'agent.maintenance.c3', 'agent.maintenance.c4', 'agent.maintenance.c5'],
    color: '#FB923C',
  },
  {
    id: 'upselling',
    nameKey: 'agent.upselling',
    icon: '💎',
    modelKey: 'agent.advanced',
    descKey: 'agent.upselling.desc',
    capKeys: ['agent.upselling.c1', 'agent.upselling.c2', 'agent.upselling.c3', 'agent.upselling.c4', 'agent.upselling.c5'],
    color: '#FBBF24',
  },
]

export default function Agents() {
  const [active, setActive] = useState(0)
  const { t } = useI18n()
  const agentDef = AGENT_DEFS[active]

  return (
    <section id="agents" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('agents.label')}
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('agents.title.1')}<span className="italic gradient-gold">{t('agents.title.2')}</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('agents.subtitle')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Agent selector */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {AGENT_DEFS.map((a, i) => (
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
                      {t(a.nameKey)}
                    </div>
                    <div className="text-[10px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>{t(a.modelKey)}</div>
                  </div>
                  {active === i && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />}
                </button>
              ))}
            </div>

            {/* Agent detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={agentDef.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden"
              >
                {/* Subtle glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                  style={{ background: agentDef.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{agentDef.icon}</span>
                    <div>
                      <h3 className="text-2xl font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {t(agentDef.nameKey)}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${agentDef.color}15`, color: agentDef.color, fontFamily: "'Inter', sans-serif" }}
                      >
                        {t(agentDef.modelKey)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {t(agentDef.descKey)}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {agentDef.capKeys.map((capKey, i) => (
                      <motion.div
                        key={capKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 text-sm text-gray-300"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: agentDef.color }}
                        />
                        {t(capKey)}
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
