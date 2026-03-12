'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { useI18n } from '@/lib/i18n'

interface ChatMessage {
  role: 'user' | 'bot' | 'system'
  text: string
  agent?: string
  agentIcon?: string
  isHandoff?: boolean
}

interface DashboardEvent {
  icon: string
  label: string
  detail: string
  color: string
  time: string
}

interface DashboardTask {
  title: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed'
  priority: 'normal' | 'high' | 'urgent'
  department: string
  time: string
}

interface Scenario {
  id: string
  label: string
  icon: string
  color: string
  messages: ChatMessage[]
  dashboardEvents: DashboardEvent[]
  dashboardTasks: DashboardTask[]
  stats: { messages: number; resolved: number; satisfaction: string }
}

const SCENARIOS: Scenario[] = [
  {
    id: 'reception',
    label: 'Reception',
    icon: '🏨',
    color: '#6B8AFF',
    stats: { messages: 8, resolved: 1, satisfaction: '98%' },
    messages: [
      { role: 'user', text: 'Hi! What time is check-in? We\'re arriving from London tomorrow.' },
      { role: 'bot', text: 'Welcome! Check-in is from 4:00 PM, with early check-in available from 2:00 PM upon request (subject to availability).\n\nWould you like me to check if early check-in is possible for tomorrow?', agent: 'Reception', agentIcon: '🏨' },
      { role: 'user', text: 'Yes please! Also, do you have any rooms with sea view? We\'re celebrating our anniversary.' },
      { role: 'bot', text: 'Happy anniversary! 🎉 For a special occasion, I\'d recommend:\n\n✨ **Zen Suite** — €549/night\nPanoramic sea view, private terrace, King bed, direct pool access\n\n💎 **Nobu Suite** — €1,200/night\nFull Mediterranean panorama, 65m², couples bathtub, private balcony\n\nBoth include complimentary breakfast at Chambao. The Nobu Suite also includes a welcome bottle of champagne.\n\nShall I check availability for your dates?', agent: 'Reception', agentIcon: '🏨' },
      { role: 'user', text: 'The Zen Suite sounds perfect. March 15-18, 2 guests. Is breakfast included?' },
      { role: 'bot', text: 'Great choice! The Zen Suite includes:\n\n🍳 Breakfast buffet at Chambao (7:30–11:00 AM)\n🏊 Direct pool & beach access\n🧖 15% discount at Six Senses Spa\n🅿️ Complimentary valet parking\n\nFor March 15-18 (3 nights), that would be **€1,647** total.\n\nWould you like me to also arrange airport transfer? We offer private Mercedes transfer from Ibiza Airport (20 min, €75).', agent: 'Reception', agentIcon: '🏨' },
      { role: 'user', text: 'Yes to the transfer! And can you book the suite? Card details: I\'d prefer to finalize over a secure channel.' },
      { role: 'bot', text: 'Absolutely — for your security, I\'ll connect you with our reservations team to finalize the booking and arrange the airport transfer.\n\n📋 **Your reservation summary:**\n• Zen Suite · March 15-18 · 2 guests\n• Airport transfer · March 15\n• Anniversary celebration\n\n🤝 **Maria from Reservations** will continue this conversation in a moment. She has all the details. Congratulations again on your anniversary!', agent: 'Reception', agentIcon: '🏨', isHandoff: true },
      { role: 'system', text: '🔔 Handed off to Maria (Reservations) · Full context transferred' },
    ],
    dashboardEvents: [
      { icon: '🔀', label: 'Routing', detail: '→ Reception (95%)', color: 'text-blue-400', time: '2s ago' },
      { icon: '💬', label: 'Message', detail: 'via Reception · 6 exchanges', color: 'text-blue-400', time: '1m ago' },
      { icon: '🔍', label: 'KB Search', detail: 'Zen Suite, pricing, amenities', color: 'text-purple-400', time: '1m ago' },
      { icon: '🤝', label: 'Handoff', detail: '→ Maria (Reservations)', color: 'text-orange-400', time: 'now' },
    ],
    dashboardTasks: [
      { title: 'Airport transfer - Mar 15, Ibiza Airport', status: 'pending', priority: 'normal', department: 'Concierge', time: '1m' },
      { title: 'Anniversary setup - Zen Suite', status: 'pending', priority: 'normal', department: 'Housekeeping', time: '1m' },
      { title: 'Pool towels restocked - Bali beds', status: 'completed', priority: 'normal', department: 'Housekeeping', time: '23m' },
      { title: 'Welcome amenities - Suite 412', status: 'completed', priority: 'normal', department: 'Reception', time: '1h' },
    ],
  },
  {
    id: 'concierge',
    label: 'Concierge',
    icon: '🗺️',
    color: '#A78BFA',
    stats: { messages: 10, resolved: 2, satisfaction: '97%' },
    messages: [
      { role: 'user', text: 'We want to plan something special for our anniversary dinner tonight. Any suggestions?' },
      { role: 'bot', text: 'How wonderful! Here are my top picks for an anniversary dinner:\n\n🌟 **Nobu Restaurant** (in-hotel)\nJapanese-Peruvian cuisine · Omakase Experience €160/person · Signature cocktails with sea views\n\n🌅 **Chambao Beach Club** (in-hotel)\nMediterranean seafood · Sunset tables available · More relaxed, romantic atmosphere\n\n⭐ **Es Tragón** (15 min drive)\nMichelin-starred · Innovative tasting menu €120/person · Intimate setting\n\nWould you like me to make a reservation at any of these?', agent: 'Concierge', agentIcon: '🗺️' },
      { role: 'user', text: 'The Omakase sounds incredible! Table for 2 at 8:30pm. Can we get a table by the window?' },
      { role: 'bot', text: 'I\'ve sent your request to Nobu Restaurant:\n\n🍽️ **Omakase Experience**\nTonight at 8:30 PM · 2 guests · Window table requested\n\nThey\'ll confirm shortly via this chat. The experience lasts approximately 2 hours — I recommend arriving 10 minutes early.\n\n💡 **Tip:** Ask for the sake pairing (€45/person) — it\'s curated specifically for each Omakase course. Guests love it.\n\nAnything else for your special evening?', agent: 'Concierge', agentIcon: '🗺️' },
      { role: 'user', text: 'Great tip! Also, we\'d love to do a boat trip to Formentera tomorrow. Something private if possible.' },
      { role: 'bot', text: 'I searched for the best options for tomorrow:\n\n🚤 **Private Speedboat to Formentera**\n4h trip · Up to 6 guests · Captain included\n€850 · Departs from Ibiza Marina (10 min from hotel)\n\n⛵ **Private Catamaran Full Day**\n8h · Formentera + hidden coves · Lunch & drinks included\n€1,400 · Pickup from hotel pier\n\n🏖️ **Shared Luxury Catamaran**\nMax 12 guests · 6h with Formentera stop · Open bar\n€180/person · Departs 10:00 AM\n\nThe private catamaran with lunch is perfect for an anniversary — you\'ll stop at Ses Illetes, consistently ranked among Europe\'s best beaches.', agent: 'Concierge', agentIcon: '🗺️' },
      { role: 'user', text: 'The private catamaran sounds amazing! Can you book it for tomorrow?' },
      { role: 'bot', text: 'Excellent choice! The private catamaran needs to be confirmed directly with the charter company for tomorrow\'s availability.\n\n⛵ **Your request:**\n• Private Catamaran · Full day\n• Tomorrow · 2 guests\n• Formentera + coves · Lunch included\n• €1,400\n\n🤝 **Carlos from our Activities desk** will take over to confirm the booking and arrange any special requests (champagne on board, specific dietary needs, etc.).\n\nHe\'ll message you within the next few minutes!', agent: 'Concierge', agentIcon: '🗺️', isHandoff: true },
      { role: 'system', text: '🔔 Handed off to Carlos (Activities) · Booking details transferred' },
    ],
    dashboardEvents: [
      { icon: '🔀', label: 'Routing', detail: '→ Concierge (92%)', color: 'text-purple-400', time: '3s ago' },
      { icon: '🌐', label: 'Web Search', detail: 'boat trips formentera private', color: 'text-cyan-400', time: '30s ago' },
      { icon: '💬', label: 'Message', detail: 'via Concierge · 6 exchanges', color: 'text-purple-400', time: '2m ago' },
      { icon: '🤝', label: 'Handoff', detail: '→ Carlos (Activities)', color: 'text-orange-400', time: 'now' },
    ],
    dashboardTasks: [
      { title: 'Catamaran booking - Formentera tomorrow', status: 'pending', priority: 'high', department: 'Activities', time: 'now' },
      { title: 'Nobu Omakase reservation - 8:30 PM tonight', status: 'assigned', priority: 'normal', department: 'Restaurant', time: '3m' },
      { title: 'Taxi to Old Town - Room 305', status: 'completed', priority: 'normal', department: 'Concierge', time: '45m' },
      { title: 'Sunset yoga booking - 3 guests', status: 'completed', priority: 'normal', department: 'Activities', time: '2h' },
    ],
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping',
    icon: '🧹',
    color: '#34D399',
    stats: { messages: 5, resolved: 3, satisfaction: '99%' },
    messages: [
      { role: 'user', text: 'Hi, our room hasn\'t been cleaned today and we have extra towels request. Room 405.' },
      { role: 'bot', text: 'I apologize for the inconvenience! I\'ve created the requests immediately:\n\n✅ **Room cleaning** — Room 405 · Priority: High\n✅ **Extra towels** — Being sent right now\n\nOur housekeeping team has been notified. Estimated arrival: **15-20 minutes**.\n\nIs there anything specific you\'d like (extra pillows, fresh bathrobes, etc.)?', agent: 'Housekeeping', agentIcon: '🧹' },
      { role: 'user', text: 'Actually yes, 2 extra pillows and the minibar needs refilling. Also, is it possible to get the room cleaned while we\'re at the pool?' },
      { role: 'bot', text: 'Of course! I\'ve updated your requests:\n\n✅ **Room cleaning** — While you\'re at the pool\n✅ **2 extra pillows** — Will be placed during cleaning\n✅ **Minibar refill** — Full restock\n\nWhen you head to the pool, just send me a message and I\'ll notify the team to start immediately. That way you\'ll return to a fresh room!\n\nWould you also like fresh flowers or any specific minibar items?', agent: 'Housekeeping', agentIcon: '🧹' },
      { role: 'user', text: 'Fresh flowers would be lovely! We\'re heading to the pool now. Oh and one more thing — the bathroom drain seems slow, might need a look.' },
      { role: 'bot', text: 'Beautiful — here\'s everything in motion:\n\n🧹 **Cleaning team** notified — starting now\n🌸 **Fresh flowers** — being arranged\n🛏️ **2 extra pillows** — ready\n🍾 **Minibar** — full restock\n\nRegarding the slow drain — I\'ve flagged this for our maintenance team:\n\n🔧 **Maintenance ticket #MT-0052**\nRoom 405 · Slow bathroom drain · Priority: Normal\n\n🤝 **Our housekeeping supervisor Ana** will oversee everything and confirm when your room is ready. Enjoy the pool!\n\nEstimated completion: ~45 minutes.', agent: 'Housekeeping', agentIcon: '🧹', isHandoff: true },
      { role: 'system', text: '🔔 Ana (Housekeeping Supervisor) notified · 5 tasks created' },
    ],
    dashboardEvents: [
      { icon: '🔀', label: 'Routing', detail: '→ Housekeeping (keyword)', color: 'text-green-400', time: '1s ago' },
      { icon: '📋', label: 'Task Created', detail: 'Room cleaning · Room 405', color: 'text-green-400', time: '2m ago' },
      { icon: '📋', label: 'Task Created', detail: 'Minibar restock · Room 405', color: 'text-green-400', time: '2m ago' },
      { icon: '🔧', label: 'Maintenance', detail: 'Slow drain · #MT-0052', color: 'text-orange-400', time: '30s ago' },
      { icon: '🤝', label: 'Handoff', detail: '→ Ana (Housekeeping)', color: 'text-orange-400', time: 'now' },
    ],
    dashboardTasks: [
      { title: 'Room cleaning - 405 (guest at pool)', status: 'in_progress', priority: 'high', department: 'Housekeeping', time: 'now' },
      { title: 'Fresh flowers + 2 pillows - Room 405', status: 'assigned', priority: 'normal', department: 'Housekeeping', time: '1m' },
      { title: 'Minibar full restock - Room 405', status: 'assigned', priority: 'normal', department: 'Housekeeping', time: '1m' },
      { title: 'Slow drain inspection - Room 405', status: 'pending', priority: 'normal', department: 'Maintenance', time: '30s' },
      { title: 'Turndown service - Suite 201', status: 'completed', priority: 'normal', department: 'Housekeeping', time: '1h' },
    ],
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    icon: '🔧',
    color: '#FB923C',
    stats: { messages: 4, resolved: 1, satisfaction: '96%' },
    messages: [
      { role: 'user', text: 'The air conditioning in room 203 isn\'t working at all. It\'s really hot and my kids can\'t sleep.' },
      { role: 'bot', text: 'I\'m very sorry about that — especially with children trying to sleep. I\'ve created an **urgent** maintenance request:\n\n🔴 **Ticket #MT-0053**\nRoom 203 · AC not functioning · Priority: **URGENT**\n\nOur maintenance team has been alerted immediately.\n\nIn the meantime, I\'m sending up:\n• Portable fan\n• Cold water bottles\n• Ice bucket\n\nEstimated maintenance arrival: **10-15 minutes**.\n\nWould you like me to check if we have another room available in case the repair takes longer?', agent: 'Maintenance', agentIcon: '🔧' },
      { role: 'user', text: 'Yes please check for another room. And there\'s also a strange noise coming from the bathroom pipes when we turn on the hot water.' },
      { role: 'bot', text: 'I\'ve added the pipe issue to your ticket:\n\n🔴 **Ticket #MT-0053** (updated)\n1. AC not functioning — URGENT\n2. Bathroom pipe noise on hot water — Normal\n\nRegarding the room change — I need to check availability with our reception team.\n\n🤝 **I\'m connecting you with Pedro, our Maintenance Supervisor.** He\'ll come personally to assess both issues and, if needed, coordinate a room change with reception.\n\nThe portable fan and cold water are on their way right now. Pedro will be there within 10 minutes.\n\nAgain, I sincerely apologize for the discomfort.', agent: 'Maintenance', agentIcon: '🔧', isHandoff: true },
      { role: 'system', text: '🔴 URGENT · Pedro (Maintenance) alerted · Room change being evaluated' },
    ],
    dashboardEvents: [
      { icon: '🔀', label: 'Routing', detail: '→ Maintenance (keyword)', color: 'text-orange-400', time: '1s ago' },
      { icon: '⚠️', label: 'Issue Detected', detail: 'AC failure · Room 203 · URGENT', color: 'text-red-400', time: '2m ago' },
      { icon: '📋', label: 'Task Created', detail: 'AC repair + pipe noise · #MT-0053', color: 'text-orange-400', time: '2m ago' },
      { icon: '🔔', label: 'Staff Alert', detail: 'Pedro (Maintenance) paged', color: 'text-red-400', time: '1m ago' },
      { icon: '🤝', label: 'Handoff', detail: '→ Pedro (Maintenance Supervisor)', color: 'text-orange-400', time: 'now' },
    ],
    dashboardTasks: [
      { title: 'AC repair URGENT - Room 203 (kids)', status: 'assigned', priority: 'urgent', department: 'Maintenance', time: 'now' },
      { title: 'Pipe noise investigation - Room 203', status: 'pending', priority: 'normal', department: 'Maintenance', time: '1m' },
      { title: 'Emergency supplies - fan + water → 203', status: 'in_progress', priority: 'urgent', department: 'Housekeeping', time: '2m' },
      { title: 'Lighting repair - Restaurant terrace', status: 'completed', priority: 'high', department: 'Maintenance', time: '3h' },
      { title: 'Pool heater maintenance', status: 'completed', priority: 'normal', department: 'Maintenance', time: '5h' },
    ],
  },
  {
    id: 'upselling',
    label: 'Upselling',
    icon: '💎',
    color: '#FBBF24',
    stats: { messages: 6, resolved: 1, satisfaction: '95%' },
    messages: [
      { role: 'bot', text: '✨ Good morning, Sarah! Day 2 at Nobu — we hope you\'re enjoying your stay!\n\nWe\'d love to offer you something special:\n\n🧖 **Six Senses Spa** — Couples Harmony Ritual\n90 min · Hot stones + aromatherapy massage\n**€350** for two (normally €420)\n\nThe perfect way to celebrate your anniversary. Available today and tomorrow.\n\nInterested?', agent: 'Upselling', agentIcon: '💎' },
      { role: 'user', text: 'That sounds really nice! Tell me more about the spa options.' },
      { role: 'bot', text: 'Our Six Senses Spa is truly special:\n\n🌿 **Couples Harmony Ritual** — €350 (save €70)\n90 min · Hot stones + aromatherapy · Private suite with sea view\n\n💆 **Individual Deep Relaxation** — €180\n60 min · Full body massage · Choice of essential oils\n\n🌺 **Ibiza Sunset Experience** — €280/person\n120 min · Body scrub + massage + facial · Terrace with sunset views\n\nAll treatments include access to the thermal circuit (sauna, steam room, ice pool, heated loungers).\n\nThe Couples Harmony is our most popular for anniversaries — guests often say it\'s the highlight of their stay!', agent: 'Upselling', agentIcon: '💎' },
      { role: 'user', text: 'The Couples Harmony sounds perfect! Can we book it for tomorrow afternoon, around 3pm?' },
      { role: 'bot', text: 'Wonderful choice! Tomorrow at 3:00 PM — let me check availability with the spa.\n\n🧖 **Booking request:**\n• Couples Harmony Ritual · 90 min\n• Tomorrow, 3:00 PM\n• 2 guests · Private suite\n• €350 (anniversary special)\n\n💡 **Tip:** Arrive 20 minutes early to enjoy the thermal circuit before your treatment. Robes and slippers will be waiting in your room.\n\n🤝 **I\'m connecting you with our Spa Reception** to confirm the slot and any preferences (pressure level, allergies, etc.).\n\nYou\'re going to love it!', agent: 'Upselling', agentIcon: '💎', isHandoff: true },
      { role: 'system', text: '🔔 Spa Reception notified · €350 upsell captured · Anniversary flag' },
    ],
    dashboardEvents: [
      { icon: '📣', label: 'Campaign', detail: 'Spa offer sent · Day 2 trigger', color: 'text-yellow-400', time: '15m ago' },
      { icon: '🔀', label: 'Routing', detail: '→ Upselling (campaign reply)', color: 'text-yellow-400', time: '12m ago' },
      { icon: '💰', label: 'Revenue', detail: '€350 spa booking captured', color: 'text-emerald-400', time: '1m ago' },
      { icon: '🤝', label: 'Handoff', detail: '→ Spa Reception', color: 'text-orange-400', time: 'now' },
    ],
    dashboardTasks: [
      { title: 'Spa booking - Couples Harmony tomorrow 3PM', status: 'pending', priority: 'high', department: 'Spa', time: 'now' },
      { title: 'Anniversary amenities - Room 307', status: 'in_progress', priority: 'normal', department: 'Housekeeping', time: '20m' },
      { title: 'Late checkout offer - Room 412 (sent)', status: 'completed', priority: 'normal', department: 'Upselling', time: '2h' },
      { title: 'Restaurant upsell - Omakase for 4', status: 'completed', priority: 'normal', department: 'Upselling', time: '4h' },
    ],
  },
]

const STATUS_CFG: Record<string, { labelKey: string; color: string; bg: string; icon: string }> = {
  pending: { labelKey: 'task.new', color: 'text-red-400', bg: 'bg-red-500/20', icon: '🔴' },
  assigned: { labelKey: 'task.received', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: '👀' },
  in_progress: { labelKey: 'task.attending', color: 'text-blue-400', bg: 'bg-blue-500/20', icon: '🔧' },
  completed: { labelKey: 'task.resolved', color: 'text-emerald-400', bg: 'bg-emerald-500/20', icon: '✅' },
}

const PRIORITY_CFG: Record<string, { color: string; pulse: boolean }> = {
  normal: { color: 'border-white/5', pulse: false },
  high: { color: 'border-orange-500/20', pulse: false },
  urgent: { color: 'border-red-500/40', pulse: true },
}

export default function ChatDemo() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [dashboardVisible, setDashboardVisible] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  const scenario = SCENARIOS[activeScenario]

  useEffect(() => {
    setVisibleMessages(0)
    setIsTyping(false)
    setDashboardVisible(0)

    const timers: NodeJS.Timeout[] = []
    let msgDelay = 400

    scenario.messages.forEach((msg, i) => {
      if (msg.role === 'bot' || msg.role === 'system') {
        timers.push(setTimeout(() => setIsTyping(true), msgDelay))
        msgDelay += 1200
      }
      timers.push(setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(i + 1)
        // Reveal dashboard events progressively
        setDashboardVisible(prev => Math.min(prev + 1, scenario.dashboardEvents.length))
      }, msgDelay))
      msgDelay += msg.role === 'user' ? 1800 : 2200
    })

    return () => timers.forEach(clearTimeout)
  }, [activeScenario, scenario.messages, scenario.dashboardEvents.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleMessages, isTyping])

  return (
    <section id="demo" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('demo.label')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('demo.title.1')}<span className="italic gradient-gold">{t('demo.title.2')}</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t('demo.subtitle.1')}
            <br className="hidden md:block" />
            <span className="text-white">{t('demo.subtitle.2')}</span>
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {/* Agent tabs */}
          <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all whitespace-nowrap ${
                  activeScenario === i
                    ? 'bg-white/[0.07] border border-white/10 text-white'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>{s.icon}</span>
                <span>{t(`agent.${s.id}`)}</span>
                {activeScenario === i && (
                  <span className="w-1.5 h-1.5 rounded-full ml-1" style={{ background: s.color }} />
                )}
              </button>
            ))}
          </div>

          {/* Dual view: Phone + Dashboard */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* LEFT: Phone mockup */}
            <div className="max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <div className="text-center mb-3">
                <span className="text-xs text-gray-600 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t('demo.guest')}
                </span>
              </div>
              <div className="glass rounded-[2rem] p-1 shadow-2xl shadow-black/40">
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
                    <div className="w-9 h-9 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-sm">🏨</div>
                    <div>
                      <div className="text-sm font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>Nobu Hotel Ibiza Bay</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {t('demo.online')}
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-[480px] overflow-y-auto px-3 py-4 space-y-3">
                    <AnimatePresence mode="popLayout">
                      {scenario.messages.slice(0, visibleMessages).map((msg, i) => (
                        <motion.div
                          key={`${activeScenario}-${i}`}
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}
                        >
                          {msg.role === 'system' ? (
                            <div className="text-[10px] text-gray-500 bg-white/[0.03] rounded-lg px-3 py-1.5 max-w-[90%]" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {msg.text}
                            </div>
                          ) : (
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                                msg.role === 'user'
                                  ? 'bg-[#005c4b] text-white rounded-br-md'
                                  : 'bg-[#1a1a1f] text-gray-200 rounded-bl-md'
                              } ${msg.isHandoff ? 'border border-[var(--gold-dim)]/20' : ''}`}
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {msg.agent && (
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <span className="text-xs">{msg.agentIcon}</span>
                                  <span className="text-[10px] text-[var(--gold)] font-medium">{msg.agent}</span>
                                  {msg.isHandoff && <span className="text-[9px] bg-[var(--gold)]/10 text-[var(--gold)] px-1.5 py-0.5 rounded ml-1">HANDOFF</span>}
                                </div>
                              )}
                              <span className="whitespace-pre-line">{msg.text}</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {isTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-[#1a1a1f] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-gray-500 typing-dot" />
                          <div className="w-2 h-2 rounded-full bg-gray-500 typing-dot" />
                          <div className="w-2 h-2 rounded-full bg-gray-500 typing-dot" />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input bar */}
                  <div className="px-3 py-3 border-t border-white/5">
                    <div className="flex items-center gap-2 bg-[#1a1a1f] rounded-full px-4 py-2.5">
                      <span className="text-gray-600 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{t('demo.type')}</span>
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

            {/* RIGHT: Dashboard mockup */}
            <div className="max-w-lg mx-auto lg:mx-0 lg:mr-auto">
              <div className="text-center mb-3">
                <span className="text-xs text-gray-600 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t('demo.dashboard')}
                </span>
              </div>
              <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                {/* Dashboard header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>HotelBot</span>
                    <span className="text-[9px] text-gray-600">Operations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-gray-500">{t('demo.live')}</span>
                    </div>
                  </div>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-2 p-3 border-b border-white/5">
                  <div className="bg-white/[0.02] rounded-lg p-2.5 text-center">
                    <div className="text-lg font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{scenario.stats.messages}</div>
                    <div className="text-[9px] text-gray-500">{t('demo.messages')}</div>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-2.5 text-center">
                    <div className="text-lg font-semibold text-emerald-400" style={{ fontFamily: "'Inter', sans-serif" }}>{scenario.stats.resolved}</div>
                    <div className="text-[9px] text-gray-500">{t('demo.resolved')}</div>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-2.5 text-center">
                    <div className="text-lg font-semibold text-[var(--gold)]" style={{ fontFamily: "'Inter', sans-serif" }}>{scenario.stats.satisfaction}</div>
                    <div className="text-[9px] text-gray-500">{t('demo.satisfaction')}</div>
                  </div>
                </div>

                {/* Live feed */}
                <div className="border-b border-white/5">
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{t('demo.feed')}</span>
                  </div>
                  <div className="max-h-[160px] overflow-y-auto">
                    <AnimatePresence>
                      {scenario.dashboardEvents.slice(0, dashboardVisible).map((event, i) => (
                        <motion.div
                          key={`${activeScenario}-evt-${i}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2.5 px-4 py-2 border-b border-white/[0.02] hover:bg-white/[0.01]"
                        >
                          <span className="text-xs">{event.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-medium ${event.color}`} style={{ fontFamily: "'Inter', sans-serif" }}>{event.label}</span>
                              <span className="text-[10px] text-gray-600 truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{event.detail}</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-gray-700 whitespace-nowrap">{event.time}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-[11px] font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{t('demo.tasks')}</span>
                    <span className="text-[9px] text-gray-600">{scenario.dashboardTasks.length} {t('demo.total')}</span>
                  </div>
                  <div className="max-h-[230px] overflow-y-auto pb-2">
                    {scenario.dashboardTasks.map((task, i) => {
                      const stCfg = STATUS_CFG[task.status]
                      const prCfg = PRIORITY_CFG[task.priority]
                      return (
                        <motion.div
                          key={`${activeScenario}-task-${i}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.5 }}
                          className={`mx-3 mb-2 p-3 rounded-lg border bg-white/[0.01] ${prCfg.color} ${prCfg.pulse ? 'animate-pulse-subtle' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${stCfg.bg} ${stCfg.color}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                                  {stCfg.icon} {t(stCfg.labelKey)}
                                </span>
                                {task.priority !== 'normal' && (
                                  <span className={`text-[9px] ${task.priority === 'urgent' ? 'text-red-400' : 'text-orange-400'}`}>
                                    {task.priority === 'urgent' ? 'URGENT' : 'HIGH'}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-300 truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{task.title}</p>
                              <span className="text-[9px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>{task.department}</span>
                            </div>
                            <span className="text-[9px] text-gray-700">{task.time}</span>
                          </div>
                          {/* Action buttons for non-completed tasks */}
                          {task.status !== 'completed' && (
                            <div className="flex gap-1.5 mt-2">
                              {task.status === 'pending' && (
                                <div className="text-[9px] px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" style={{ fontFamily: "'Inter', sans-serif" }}>
                                  {t('task.received')}
                                </div>
                              )}
                              {task.status === 'assigned' && (
                                <div className="text-[9px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20" style={{ fontFamily: "'Inter', sans-serif" }}>
                                  {t('task.attending')}
                                </div>
                              )}
                              {task.status === 'in_progress' && (
                                <>
                                  <div className="text-[9px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {t('task.resolved')}
                                  </div>
                                  <div className="text-[9px] px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {t('task.unresolved')}
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
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
