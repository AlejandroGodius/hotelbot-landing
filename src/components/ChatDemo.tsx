'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  agent?: string
  agentIcon?: string
  delay: number
}

const SCENARIOS: { label: string; icon: string; messages: ChatMessage[] }[] = [
  {
    label: 'Guest inquiry',
    icon: '🏨',
    messages: [
      { role: 'user', text: 'Hi! What time is check-in? And do you have rooms with sea view available for next week?', delay: 0 },
      { role: 'bot', text: 'Welcome! Check-in is from 4:00 PM, with early check-in available from 2:00 PM upon request.\n\nFor next week, we have our Zen Suite (€549/night) and Nobu Suite (€1,200/night), both with stunning Mediterranean views. Shall I check specific dates for you?', agent: 'Reception', agentIcon: '🏨', delay: 1800 },
      { role: 'user', text: 'The Zen Suite sounds perfect. Is breakfast included?', delay: 4000 },
      { role: 'bot', text: 'The Zen Suite includes a complimentary breakfast buffet at Chambao restaurant (7:30–11:00 AM). It features a private terrace, King bed, and direct pool access.\n\nWould you like me to put you in touch with our reservations team to secure your dates?', agent: 'Reception', agentIcon: '🏨', delay: 5800 },
    ],
  },
  {
    label: 'Maintenance issue',
    icon: '🔧',
    messages: [
      { role: 'user', text: 'The AC in room 203 is not cooling at all, it\'s really hot in here', delay: 0 },
      { role: 'bot', text: 'I\'m sorry about that! I\'ve created an urgent maintenance request right now.\n\n🔧 **Ticket #MT-0047**\nRoom 203 — AC not cooling\nPriority: Urgent\n\nOur maintenance team has been notified and will be there as soon as possible. In the meantime, I can have extra fans sent up. Would that help?', agent: 'Maintenance', agentIcon: '🔧', delay: 1600 },
      { role: 'user', text: 'Yes please, and some cold water too', delay: 3500 },
      { role: 'bot', text: 'Done! I\'ve requested:\n\n✅ Portable fan → being sent now\n✅ Complimentary cold water\n\nOur team will keep you updated on the AC repair. We apologize for the inconvenience.', agent: 'Maintenance', agentIcon: '🔧', delay: 5200 },
    ],
  },
  {
    label: 'Concierge',
    icon: '🗺️',
    messages: [
      { role: 'user', text: 'Can you recommend a nice restaurant nearby for a romantic dinner tonight?', delay: 0 },
      { role: 'bot', text: 'For a romantic dinner, I\'d suggest:\n\n🌟 **Nobu Restaurant** (in-hotel) — World-class Japanese-Peruvian cuisine. The Omakase experience (€160) is exceptional.\n\n🌅 **Chambao Beach Club** — Mediterranean seafood with sunset views, more relaxed atmosphere.\n\nFor something outside the hotel, **Es Tragón** in Ibiza Town is a Michelin-starred gem.\n\nShall I make a reservation for tonight?', agent: 'Concierge', agentIcon: '🗺️', delay: 2000 },
      { role: 'user', text: 'The Omakase sounds amazing! Table for 2 at 8pm', delay: 4200 },
      { role: 'bot', text: 'Excellent choice! I\'ve forwarded your request to Nobu Restaurant:\n\n🍽️ **Omakase Experience**\nTonight at 8:00 PM · 2 guests\n\nOur restaurant team will confirm shortly via WhatsApp. The experience lasts approximately 2 hours — I recommend arriving 10 minutes early for the full experience.', agent: 'Concierge', agentIcon: '🗺️', delay: 6000 },
    ],
  },
]

export default function ChatDemo() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const scenario = SCENARIOS[activeScenario]

  useEffect(() => {
    setVisibleMessages(0)
    setIsTyping(false)

    const timers: NodeJS.Timeout[] = []

    scenario.messages.forEach((msg, i) => {
      if (msg.role === 'bot' && i > 0) {
        // Show typing before bot message
        timers.push(setTimeout(() => setIsTyping(true), msg.delay - 1200))
      }
      timers.push(
        setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages(i + 1)
        }, msg.delay)
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [activeScenario, scenario.messages])

  return (
    <section id="demo" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Live Preview
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            See it <span className="italic gradient-gold">in action</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {/* Scenario tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {SCENARIOS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveScenario(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeScenario === i
                    ? 'bg-[var(--gold)]/10 border border-[var(--gold-dim)]/30 text-[var(--gold-light)]'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Phone mockup */}
          <div className="max-w-sm mx-auto">
            <div className="glass rounded-[2rem] p-1 shadow-2xl shadow-black/40">
              {/* Phone frame */}
              <div className="bg-[#111114] rounded-[1.8rem] overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-2">
                  <span className="text-[10px] text-gray-500">9:41</span>
                  <div className="w-20 h-5 bg-black rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-3.5 h-1.5 bg-gray-600 rounded-sm" />
                  </div>
                </div>

                {/* Chat header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                  <div className="w-9 h-9 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-sm">
                    🏨
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>Nobu Hotel Ibiza Bay</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Online
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-[420px] overflow-y-auto px-3 py-4 space-y-3">
                  <AnimatePresence>
                    {scenario.messages.slice(0, visibleMessages).map((msg, i) => (
                      <motion.div
                        key={`${activeScenario}-${i}`}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-[#005c4b] text-white rounded-br-md'
                              : 'bg-[#1a1a1f] text-gray-200 rounded-bl-md'
                          }`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {msg.agent && (
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <span className="text-xs">{msg.agentIcon}</span>
                              <span className="text-[10px] text-[var(--gold)] font-medium">{msg.agent}</span>
                            </div>
                          )}
                          <span className="whitespace-pre-line">{msg.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-[#1a1a1f] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-gray-500 typing-dot" />
                          <div className="w-2 h-2 rounded-full bg-gray-500 typing-dot" />
                          <div className="w-2 h-2 rounded-full bg-gray-500 typing-dot" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input bar */}
                <div className="px-3 py-3 border-t border-white/5">
                  <div className="flex items-center gap-2 bg-[#1a1a1f] rounded-full px-4 py-2.5">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Type a message...</span>
                    <div className="ml-auto w-8 h-8 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[var(--gold)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
