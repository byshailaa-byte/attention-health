'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Compass,
  BarChart2,
  Target,
  Zap,
  Battery,
  AlertTriangle,
  TrendingUp,
  Moon,
  Wind,
  BookOpen,
  Users,
  FileText,
  Mail,
  Clock,
  Activity,
  Eye,
  Cpu,
  Timer,
  ShieldCheck,
  Heart,
  RefreshCw,
} from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

// Pre-computed network node positions to avoid SSR hydration issues
const NODES = [
  { id: 0, x: 10, y: 15, r: 2.5 },
  { id: 1, x: 25, y: 40, r: 3.5 },
  { id: 2, x: 48, y: 10, r: 3 },
  { id: 3, x: 62, y: 28, r: 3.5 },
  { id: 4, x: 78, y: 55, r: 3 },
  { id: 5, x: 56, y: 72, r: 4 },
  { id: 6, x: 20, y: 68, r: 3 },
  { id: 7, x: 40, y: 50, r: 5 },
  { id: 8, x: 82, y: 18, r: 2.5 },
  { id: 9, x: 5, y: 48, r: 3 },
  { id: 10, x: 52, y: 87, r: 3 },
  { id: 11, x: 92, y: 38, r: 3.5 },
  { id: 12, x: 34, y: 26, r: 4 },
  { id: 13, x: 68, y: 8, r: 2.5 },
  { id: 14, x: 14, y: 82, r: 3 },
  { id: 15, x: 87, y: 76, r: 3.5 },
  { id: 16, x: 30, y: 90, r: 2.5 },
  { id: 17, x: 72, y: 87, r: 3 },
  { id: 18, x: 95, y: 60, r: 2.5 },
  { id: 19, x: 6, y: 25, r: 3.5 },
]

const CONNECTIONS = [
  [0, 1], [0, 19], [1, 6], [1, 7], [1, 9], [2, 3], [2, 12], [2, 13],
  [3, 4], [3, 7], [3, 11], [4, 5], [4, 11], [4, 15], [5, 7], [5, 10],
  [5, 15], [5, 17], [6, 14], [6, 9], [7, 8], [7, 12], [8, 11], [8, 13],
  [9, 19], [10, 14], [10, 16], [10, 17], [11, 18], [12, 13], [14, 16],
  [15, 17], [15, 18], [16, 17],
]

function AttentionNetworkBg() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: 0.35,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <style>{`
            @keyframes nodePulse {
              0%, 100% { opacity: 0.4; r: attr(r); }
              50% { opacity: 0.9; }
            }
            @keyframes nodeFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-0.5px); }
            }
            .node-pulse { animation: nodePulse 3s ease-in-out infinite; }
            .node-pulse-slow { animation: nodePulse 5s ease-in-out infinite; }
          `}</style>
        </defs>
        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#3B82F6"
            strokeWidth="0.12"
            opacity="0.4"
          />
        ))}
        {NODES.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.r * 0.25}
            fill="#3B82F6"
            className={node.id % 3 === 0 ? 'node-pulse' : 'node-pulse-slow'}
            style={{ animationDelay: `${node.id * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

function ScoreRing({ score }: { score: number }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <svg width="110" height="110" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="7" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="7"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">
        {score}
      </text>
      <text x="50" y="58" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
        /100
      </text>
    </svg>
  )
}

// ─── SCORE HELPERS ───────────────────────────────────────────────────────────
function scoreColor(s: number) {
  if (s >= 80) return '#10B981'
  if (s >= 65) return '#3B82F6'
  if (s >= 50) return '#F59E0B'
  return '#EF4444'
}
function scoreLabel(s: number) {
  if (s >= 80) return 'Excellent'
  if (s >= 65) return 'Good'
  if (s >= 50) return 'Fair'
  return 'Needs Attention'
}
function scorePercentile(s: number) {
  if (s >= 80) return 'Top 15th percentile'
  if (s >= 65) return 'Top 38th percentile'
  if (s >= 50) return 'Top 62nd percentile'
  return 'Top 85th percentile'
}

const REPORT_CARDS = [
  {
    archetype: 'The Hyperfocused Achiever',
    score: 72,
    domains: [
      { label: 'Attentional Control', score: 68 },
      { label: 'Executive Function', score: 74 },
      { label: 'Hyperfocus', score: 88 },
      { label: 'Recovery Capacity', score: 55 },
    ],
  },
  {
    archetype: 'The Burned-Out Operator',
    score: 54,
    domains: [
      { label: 'Attentional Control', score: 48 },
      { label: 'Executive Function', score: 52 },
      { label: 'Burnout Load', score: 78 },
      { label: 'Recovery Capacity', score: 41 },
    ],
  },
  {
    archetype: 'The Consistent Builder',
    score: 81,
    domains: [
      { label: 'Attentional Control', score: 84 },
      { label: 'Executive Function', score: 79 },
      { label: 'Working Memory', score: 77 },
      { label: 'Recovery Capacity', score: 83 },
    ],
  },
  {
    archetype: 'The Distracted Performer',
    score: 61,
    domains: [
      { label: 'Attentional Control', score: 58 },
      { label: 'Executive Function', score: 63 },
      { label: 'Impulsivity', score: 71 },
      { label: 'Recovery Capacity', score: 59 },
    ],
  },
]

const ARCHETYPE_CARDS = [
  {
    name: 'The Hyperfocused Achiever',
    color: '#6C63FF',
    icon: '⚡',
    tagline: 'Deep focus, inconsistent execution',
    strength: 'Exceptional depth of focus when engaged',
    challenge: 'Sustaining attention on low-interest tasks',
  },
  {
    name: 'The Burned-Out Operator',
    color: '#EF4444',
    icon: '🔋',
    tagline: 'High output, depleting reserves',
    strength: 'Strong execution under pressure',
    challenge: 'Recovery and sustainable performance',
  },
  {
    name: 'The Consistent Builder',
    color: '#10B981',
    icon: '🏗️',
    tagline: 'Steady, reliable, systematic',
    strength: 'Reliable follow-through and execution',
    challenge: 'Breaking out of comfort zone for innovation',
  },
  {
    name: 'The Reactive Executor',
    color: '#F59E0B',
    icon: '⚡',
    tagline: 'Fast response, scattered focus',
    strength: 'Rapid response and adaptability',
    challenge: 'Deep work and sustained concentration',
  },
]

// ─── REPORT CAROUSEL ─────────────────────────────────────────────────────────
function ReportCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % REPORT_CARDS.length), 3000)
    return () => clearInterval(timer)
  }, [])

  const card = REPORT_CARDS[current]
  const color = scoreColor(card.score)
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (card.score / 100) * circ

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* Fixed height + overflow:hidden prevents cards stacking during AnimatePresence transitions */}
      <div style={{ position: 'relative', width: '340px', height: '420px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '24px 28px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 60px rgba(59,130,246,0.07)',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Attention Health Report
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <svg width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={r} fill="none" stroke={color + '25'} strokeWidth="8" />
                <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 50 50)" />
                <text x="50" y="46" textAnchor="middle" fill="white" fontSize="19" fontWeight="700">{card.score}</text>
                <text x="50" y="59" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">/100</text>
              </svg>
              <div>
                <div style={{ backgroundColor: color + '20', color, fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', marginBottom: '5px', display: 'inline-block', border: `1px solid ${color}40` }}>
                  {scoreLabel(card.score)}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{scorePercentile(card.score)}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {card.domains.map(({ label, score: ds }) => {
                const dc = scoreColor(ds)
                return (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{label}</span>
                      <span style={{ color: dc, fontSize: '12px', fontWeight: 700 }}>{ds}</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                      <div style={{ width: `${ds}%`, height: '100%', backgroundColor: dc, borderRadius: '2px' }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ backgroundColor: color + '12', border: `1px solid ${color}28`, borderRadius: '10px', padding: '11px 14px' }}>
              <div style={{ color: color, fontSize: '11px', fontWeight: 700, marginBottom: '3px' }}>Attention Archetype</div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{card.archetype}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {REPORT_CARDS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '20px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: i === current ? '#3B82F6' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  )
}

// ─── ARCHETYPE CAROUSEL ───────────────────────────────────────────────────────
function ArchetypeCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % ARCHETYPE_CARDS.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const card = ARCHETYPE_CARDS[current]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* Fixed height + overflow:hidden prevents cards stacking during AnimatePresence transitions */}
      <div style={{ position: 'relative', width: '340px', height: '380px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ height: '4px', backgroundColor: card.color }} />
            <div style={{ padding: '26px 28px 28px', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '19px', letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '6px' }}>{card.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontStyle: 'italic', marginBottom: '22px' }}>&ldquo;{card.tagline}&rdquo;</div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: card.color, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '5px' }}>Your Top Strength</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.55 }}>{card.strength}</div>
              </div>
              <div style={{ marginBottom: '22px' }}>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '5px' }}>Your Key Challenge</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.55 }}>{card.challenge}</div>
              </div>
              <Link href="/assessment" style={{ color: card.color, fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                Discover Your Archetype <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {ARCHETYPE_CARDS.map((ac, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '20px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: i === current ? ac.color : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  const headline = 'Better Human Performance Starts With Better Attention.'
  const words = headline.split(' ')

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 80px',
        backgroundColor: '#0D0D0F',
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(79,142,247,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(52,211,153,0.05) 0%, transparent 50%),
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, 60px 60px, 60px 60px',
      }}
    >
      <AttentionNetworkBg />
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              color: '#3B82F6',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
                display: 'inline-block',
              }}
            />
            Human Performance Research
          </motion.p>

          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(38px, 5.5vw, 76px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.07,
              marginBottom: '24px',
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '19px',
              lineHeight: 1.65,
              marginBottom: '36px',
              maxWidth: '520px',
            }}
          >
            Understanding how attention shapes decisions, performance, and outcomes
            in a distracted world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}
          >
            <Link
              href="/assessment"
              style={{
                background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'box-shadow 0.2s, transform 0.15s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(79,142,247,0.28)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.3), 0 8px 28px rgba(79,142,247,0.42)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(79,142,247,0.28)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Take the Attention Health Assessment™ <ArrowRight size={16} />
            </Link>
            <Link
              href="/lab/frameworks"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(248,248,248,0.8)',
                textDecoration: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.14)',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
                e.currentTarget.style.color = '#F8F8F8'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                e.currentTarget.style.color = 'rgba(248,248,248,0.8)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
            >
              Explore The Human Decision Lab™
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}
          >
            84 questions · 12–15 minutes · Instant personalized report
          </motion.p>
        </div>

        {/* Right: Auto-scrolling report carousel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
          className="hidden lg:flex"
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <ReportCarousel />
        </motion.div>
      </div>
    </section>
  )
}

// ─── HUMAN DECISION MODEL ─────────────────────────────────────────────────────
function HumanDecisionModel() {
  const steps = [
    {
      id: 'attention',
      icon: <Brain size={20} />,
      label: 'ATTENTION',
      color: '#3B82F6',
      bg: 'rgba(59,130,246,0.12)',
      border: 'rgba(59,130,246,0.3)',
      points: ['Quality of focus', 'Breadth vs. depth', 'Attention regulation'],
    },
    {
      id: 'decisions',
      icon: <Compass size={20} />,
      label: 'DECISIONS',
      color: 'white',
      bg: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.15)',
      points: ['Clarity of thinking', 'Speed vs. quality', 'Cognitive bias load'],
    },
    {
      id: 'performance',
      icon: <BarChart2 size={20} />,
      label: 'PERFORMANCE',
      color: 'white',
      bg: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.15)',
      points: ['Output quality', 'Execution depth', 'Sustained capacity'],
    },
    {
      id: 'outcomes',
      icon: <Target size={20} />,
      label: 'OUTCOMES',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.25)',
      points: ['Results achieved', 'Long-term momentum', 'Impact created'],
    },
  ]

  return (
    <section
      style={{
        backgroundColor: '#0D0D0F',
        padding: '120px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{
            color: '#4F8EF7',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            background: 'rgba(79,142,247,0.08)',
            border: '1px solid rgba(79,142,247,0.2)',
            borderRadius: '100px',
          }}
        >
          The Human Decision Model™
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            color: 'white',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '64px',
          }}
        >
          How attention becomes outcomes.
        </motion.h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.id}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                style={{
                  backgroundColor: step.bg,
                  border: `1px solid ${step.border}`,
                  borderRadius: '12px',
                  padding: '20px 32px',
                  width: '100%',
                  maxWidth: '380px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'default',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ color: step.color }}>{step.icon}</div>
                  <span
                    style={{
                      color: step.color,
                      fontWeight: 700,
                      fontSize: '15px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {step.points.map((pt) => (
                    <div
                      key={pt}
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '11px',
                        display: 'none',
                      }}
                    >
                      {pt}
                    </div>
                  ))}
                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-end',
                      maxWidth: '180px',
                    }}
                  >
                    {step.points.map((pt) => (
                      <span
                        key={pt}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.45)',
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.12 + 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '6px 0',
                    transformOrigin: 'top',
                  }}
                >
                  <div
                    style={{
                      width: '1px',
                      height: '24px',
                      background:
                        'linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(59,130,246,0.1))',
                    }}
                  />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '6px solid rgba(59,130,246,0.4)',
                    }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            lineHeight: 1.7,
            marginTop: '56px',
            fontStyle: 'italic',
          }}
        >
          Every decision you make is downstream of your attention. Improve the quality
          of attention, and you improve the quality of everything else.
        </motion.p>
      </div>
    </section>
  )
}

// ─── HIDDEN ATTENTION CRISIS ──────────────────────────────────────────────────
function HiddenAttentionCrisis() {
  const stats = [
    {
      value: 23,
      suffix: ' minutes',
      label: 'Average recovery time after a single interruption',
      source: 'Gloria Mark, UC Irvine',
    },
    {
      value: 3,
      suffix: ' minutes',
      label: 'How often knowledge workers switch tasks',
      source: 'Gloria Mark, UC Irvine',
    },
    {
      value: 40,
      suffix: '%',
      label: 'Productivity lost to context switching',
      source: 'McKinsey Global Institute',
    },
    {
      value: 6,
      suffix: ' hours',
      label: 'Average daily digital distraction',
      source: 'McKinsey Global Institute',
    },
  ]

  const fragmentedDay = [
    'Email', 'Task', 'Slack', 'Meeting', 'Email', 'Task', 'Notification',
    'Slack', 'Task', 'Email', 'Meeting', 'Task', 'Notification',
  ]

  return (
    <section
      style={{
        backgroundColor: '#141416',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <p
            style={{
              color: '#F87171',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.2)',
              borderRadius: '100px',
            }}
          >
            The Hidden Attention Crisis
          </p>
          <h2
            style={{
              color: '#F8F8F8',
              fontSize: 'clamp(26px, 4vw, 46px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            The modern workplace is systematically destroying attention.
          </h2>
        </motion.div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginBottom: '72px',
          }}
        >
          {stats.map((stat, i) => {
            const topColors = ['#4F8EF7', '#F87171', '#FBBF24', '#34D399']
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  borderTop: `2px solid ${topColors[i]}`,
                  boxShadow: '0 1px 1px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(48px, 5vw, 72px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: '10px',
                    background: 'linear-gradient(135deg, #F8F8F8 0%, rgba(248,248,248,0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <CountUp target={stat.value} />
                  {stat.suffix}
                </div>
                <div
                  style={{
                    color: 'rgba(248,248,248,0.6)',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    marginBottom: '10px',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    color: 'rgba(248,248,248,0.25)',
                    fontSize: '11px',
                    fontStyle: 'italic',
                  }}
                >
                  — {stat.source}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Attention fragmentation visualization */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px',
            }}
          >
            A typical knowledge worker&apos;s day
          </div>
          <div style={{ display: 'flex', gap: '3px', marginBottom: '8px', flexWrap: 'nowrap', overflowX: 'auto' }}>
            {fragmentedDay.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  minWidth: '42px',
                  height: '40px',
                  backgroundColor: item === 'Task' ? 'rgba(59,130,246,0.3)' : 'rgba(239,68,68,0.2)',
                  border: `1px solid ${item === 'Task' ? 'rgba(59,130,246,0.4)' : 'rgba(239,68,68,0.3)'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: item === 'Task' ? 'rgba(59,130,246,0.9)' : 'rgba(239,68,68,0.8)',
                  fontWeight: 600,
                  textAlign: 'center',
                  padding: '2px',
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: '20px',
              marginBottom: '8px',
            }}
          >
            What focused attention looks like
          </div>
          <div
            style={{
              height: '40px',
              backgroundColor: 'rgba(16,185,129,0.2)',
              border: '1px solid rgba(16,185,129,0.35)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '16px',
            }}
          >
            <span style={{ color: '#10B981', fontSize: '12px', fontWeight: 700 }}>
              Deep Work — Uninterrupted Focus
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── ATTENTION LIFECYCLE FRAMEWORK ────────────────────────────────────────────
function AttentionLifecycle() {
  const stages = [
    {
      icon: <Moon size={18} />,
      label: 'INPUTS',
      desc: 'Sleep, environment, stress, nutrition',
      color: '#8B5CF6',
    },
    {
      icon: <Brain size={18} />,
      label: 'ATTENTION ENGINE',
      desc: 'Focus, control, regulation',
      color: '#3B82F6',
    },
    {
      icon: <Cpu size={18} />,
      label: 'ATTENTION DEPLOYMENT',
      desc: 'Task execution, decision-making',
      color: '#06B6D4',
    },
    {
      icon: <Target size={18} />,
      label: 'OUTCOMES',
      desc: 'Performance, creativity, learning',
      color: '#F59E0B',
    },
    {
      icon: <Wind size={18} />,
      label: 'RECOVERY',
      desc: 'Rest, restoration, sleep',
      color: '#10B981',
    },
  ]

  return (
    <section style={{ backgroundColor: '#0D0D0F', padding: '120px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <p
            style={{
              color: '#4F8EF7',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(79,142,247,0.08)',
              border: '1px solid rgba(79,142,247,0.2)',
              borderRadius: '100px',
            }}
          >
            Attention Lifecycle Framework™
          </p>
          <h2
            style={{
              color: '#F8F8F8',
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
            }}
          >
            Attention is not a switch. It&apos;s a cycle.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
          }}
        >
          {stages.map((stage, i) => (
            <div
              key={stage.label}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${stage.color}33`,
                  borderRadius: '12px',
                  padding: '18px 28px',
                  width: '100%',
                  maxWidth: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: stage.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stage.color,
                    flexShrink: 0,
                  }}
                >
                  {stage.icon}
                </div>
                <div>
                  <div
                    style={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.06em',
                      marginBottom: '3px',
                    }}
                  >
                    {stage.label}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                    {stage.desc}
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    backgroundColor: stage.color,
                    borderRadius: '3px 0 0 3px',
                    opacity: 0.6,
                  }}
                />
              </motion.div>

              {i < stages.length - 1 ? (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.1 + 0.25 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transformOrigin: 'top',
                    margin: '3px 0',
                  }}
                >
                  <div
                    style={{
                      width: '1px',
                      height: '20px',
                      backgroundColor: 'rgba(255,255,255,0.12)',
                    }}
                  />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderTop: '5px solid rgba(255,255,255,0.15)',
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  style={{
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '12px',
                  }}
                >
                  <RefreshCw size={14} />
                  <span>cycles back to Inputs</span>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ATTENTION HEALTH FRAMEWORK ───────────────────────────────────────────────
function AttentionHealthFramework() {
  const domains = [
    { icon: <Eye size={20} />, name: 'Attentional Control', desc: 'The ability to direct and sustain focus' },
    { icon: <Cpu size={20} />, name: 'Executive Function', desc: 'Planning, prioritization, and follow-through' },
    { icon: <Activity size={20} />, name: 'Working Memory', desc: 'Holding and manipulating information in real time' },
    { icon: <Timer size={20} />, name: 'Time Perception', desc: 'Accuracy of time estimation and management' },
    { icon: <Zap size={20} />, name: 'Hyperfocus', desc: 'Patterns of deep, interest-driven engagement' },
    { icon: <ShieldCheck size={20} />, name: 'Impulse Regulation', desc: 'Resistance to reactive, impulsive responses' },
    { icon: <Heart size={20} />, name: 'Emotional Regulation', desc: 'Managing emotional interference with attention' },
    { icon: <Battery size={20} />, name: 'Recovery Capacity', desc: 'Effectiveness of attentional restoration' },
  ]

  return (
    <section style={{ backgroundColor: '#141416', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p
            style={{
              color: '#4F8EF7',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(79,142,247,0.08)',
              border: '1px solid rgba(79,142,247,0.2)',
              borderRadius: '100px',
            }}
          >
            Attention Health Framework™
          </p>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(26px, 4vw, 46px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Eight dimensions. One complete picture.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Each dimension is measured independently across 84 research-informed questions.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {domains.map((domain, i) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.07 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '24px',
                cursor: 'default',
                transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
              }}
              whileHover={{
                backgroundColor: 'rgba(59,130,246,0.06)',
                borderColor: 'rgba(59,130,246,0.3)',
                boxShadow: '0 0 24px rgba(59,130,246,0.1)',
              }}
            >
              <div
                style={{
                  color: '#3B82F6',
                  marginBottom: '14px',
                  display: 'inline-flex',
                  padding: '10px',
                  backgroundColor: 'rgba(59,130,246,0.1)',
                  borderRadius: '10px',
                }}
              >
                {domain.icon}
              </div>
              <div
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '15px',
                  marginBottom: '6px',
                }}
              >
                {domain.name}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.5, marginBottom: '14px' }}>
                {domain.desc}
              </div>
              {/* Decorative score bar */}
              <div
                style={{
                  height: '3px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${55 + (i * 7) % 40}%`,
                    background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
                    borderRadius: '2px',
                    opacity: 0.5,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/assessment"
            style={{
              background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 32px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2563EB')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#3B82F6')
            }
          >
            Measure all 8 dimensions <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── CIRCULAR LOOP HELPER ─────────────────────────────────────────────────────
type LoopItem = { label: string; icon: React.ReactNode; color: string; description?: string }

// Fixed node positions for hexagon (6 items) and pentagon (5 items) in 600×600 space
const HEX_POSITIONS = [
  { x: 300, y: 60 },
  { x: 500, y: 180 },
  { x: 500, y: 420 },
  { x: 300, y: 540 },
  { x: 100, y: 420 },
  { x: 100, y: 180 },
]
const PENTA_POSITIONS = [
  { x: 300, y: 60 },
  { x: 510, y: 220 },
  { x: 420, y: 480 },
  { x: 180, y: 480 },
  { x: 90, y: 220 },
]

function CircularLoop({
  items,
  centerLabel,
  animDelay = 0,
}: {
  items: LoopItem[]
  centerLabel: string
  animDelay?: number
}) {
  const positions = items.length === 6 ? HEX_POSITIONS : PENTA_POSITIONS
  const centerY = items.length === 6 ? 300 : 280
  const [top, ...rest] = centerLabel.split(' ')

  return (
    // overflow: visible so nodes at edges are never clipped
    <div style={{ position: 'relative', width: '100%', maxWidth: '520px', margin: '0 auto', overflow: 'visible' }}>
      {/* SVG for connecting lines — scales to container width */}
      <svg
        viewBox="0 0 600 600"
        style={{ width: '100%', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            @keyframes dashFlowLoop { to { stroke-dashoffset: -24; } }
            .dfl { animation: dashFlowLoop 1.4s linear infinite; }
          `}</style>
        </defs>
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % positions.length]
          return (
            <line
              key={i}
              x1={pos.x} y1={pos.y}
              x2={next.x} y2={next.y}
              stroke={items[i].color}
              strokeWidth="1.5"
              strokeOpacity="0.28"
              strokeDasharray="6 6"
              className="dfl"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          )
        })}
        {/* Center label in SVG so it scales with diagram */}
        <text x="300" y={centerY - 7} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="11" fontWeight="700" letterSpacing="1.2">{top}</text>
        <text x="300" y={centerY + 9} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="11" fontWeight="700" letterSpacing="1.2">{rest.join(' ')}</text>
      </svg>

      {/* Node overlays — percentage positions mirror the 600×600 SVG space */}
      {positions.map((pos, i) => (
        <motion.div
          key={items[i].label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: animDelay + i * 0.1 }}
          style={{
            position: 'absolute',
            left: `${(pos.x / 600) * 100}%`,
            top: `${(pos.y / 600) * 100}%`,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            textAlign: 'center',
            width: '84px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: items[i].color + '1e',
              border: `1.5px solid ${items[i].color}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: items[i].color,
              flexShrink: 0,
            }}
          >
            {items[i].icon}
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: '9.5px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.25,
            }}
          >
            {items[i].label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── LOOP ACCORDION ───────────────────────────────────────────────────────────
function LoopAccordion({ items }: { items: LoopItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '560px', margin: '40px auto 0', textAlign: 'left' }}>
      {items.map((item, i) => (
        <div key={item.label}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: openIdx === i ? item.color + '12' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${openIdx === i ? item.color + '45' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.18s',
              textAlign: 'left',
            }}
          >
            <span style={{ color: item.color, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11.5px', fontWeight: 700, flex: 1, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {item.label}
            </span>
            <ArrowRight
              size={14}
              style={{
                color: openIdx === i ? item.color : 'rgba(255,255,255,0.25)',
                transform: openIdx === i ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s, color 0.2s',
                flexShrink: 0,
              }}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIdx === i && item.description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  padding: '10px 16px 14px 44px',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  borderLeft: `2px solid ${item.color}35`,
                  marginLeft: '8px',
                  marginTop: '3px',
                }}>
                  {item.description}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ─── EROSION LOOP ─────────────────────────────────────────────────────────────
function ErosionLoop() {
  const items: LoopItem[] = [
    {
      label: 'DISTRACTION',
      icon: <Zap size={16} />,
      color: '#EF4444',
      description: 'Constant interruptions — notifications, context-switching, open-plan noise — pull you away before deep work can even begin. Each distraction resets the mental runway needed to do your best thinking.',
    },
    {
      label: 'FRAGMENTED ATTENTION',
      icon: <Brain size={16} />,
      color: '#F97316',
      description: 'Repeated distraction trains the brain to expect interruption. Over time, even in quiet moments, attention splinters — making sustained focus feel effortful or impossible.',
    },
    {
      label: 'POOR DECISIONS',
      icon: <AlertTriangle size={16} />,
      color: '#EF4444',
      description: 'Fragmented attention degrades working memory, pattern recognition, and the capacity to hold competing considerations simultaneously — the exact capabilities that quality decisions depend on.',
    },
    {
      label: 'REDUCED PERFORMANCE',
      icon: <TrendingUp size={16} />,
      color: '#F97316',
      description: 'Poor decisions compound into poor outputs — missed deadlines, shallow work, reactive rather than strategic behavior. The gap between potential and output widens with every cognitive cycle lost to distraction.',
    },
    {
      label: 'STRESS',
      icon: <Activity size={16} />,
      color: '#EF4444',
      description: 'Underperforming against your own standards triggers a stress response. Cortisol rises, sleep quality drops, and the nervous system shifts toward threat-detection — making focus even harder to access.',
    },
    {
      label: 'LOWER RECOVERY',
      icon: <Battery size={16} />,
      color: '#F97316',
      description: 'Chronic stress impairs the physiological recovery systems that restore cognitive capacity overnight. You start each day with a smaller attention budget — and the loop tightens.',
    },
  ]

  return (
    <section style={{ backgroundColor: '#0D0D0F', padding: '120px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p
            style={{
              color: '#F87171',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.2)',
              borderRadius: '100px',
            }}
          >
            The Erosion Loop™
          </p>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '56px',
            }}
          >
            How modern environments destroy performance.
          </h2>
        </motion.div>

        <div className="hidden md:block">
          <CircularLoop items={items} centerLabel="The Performance Drain" animDelay={0.2} />
        </div>

        <LoopAccordion items={items} />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            lineHeight: 1.7,
            marginTop: '48px',
            maxWidth: '560px',
            margin: '48px auto 0',
          }}
        >
          Most interventions treat the symptoms. We measure and address the root cause:{' '}
          <span style={{ color: 'white', fontWeight: 600 }}>attention.</span>
        </motion.p>
      </div>
    </section>
  )
}

// ─── ATTENTION FLYWHEEL ───────────────────────────────────────────────────────
function AttentionFlywheel() {
  const items: LoopItem[] = [
    {
      label: 'BETTER ATTENTION',
      icon: <Eye size={16} />,
      color: '#3B82F6',
      description: 'Training and protecting attention creates the foundation for everything else. When you can hold focus deliberately — sustaining it where it matters and withdrawing it from where it doesn\'t — your cognitive baseline rises.',
    },
    {
      label: 'BETTER DECISIONS',
      icon: <Compass size={16} />,
      color: '#06B6D4',
      description: 'Sustained attention means better working memory, clearer reasoning, and the ability to weigh trade-offs without cognitive shortcuts. The quality of every decision you make is upstream of your ability to think clearly.',
    },
    {
      label: 'BETTER ACTIONS',
      icon: <Zap size={16} />,
      color: '#10B981',
      description: 'Better decisions translate directly into better execution. You act from intention rather than impulse — choosing what to work on, when to respond, and where to invest your energy with greater precision.',
    },
    {
      label: 'BETTER OUTCOMES',
      icon: <Target size={16} />,
      color: '#10B981',
      description: 'Intentional action produces better results. Work is deeper, output is higher quality, relationships are stronger, and the gap between effort and impact shrinks. You start to outperform not by working more, but by thinking better.',
    },
    {
      label: 'HIGHER MOTIVATION',
      icon: <TrendingUp size={16} />,
      color: '#3B82F6',
      description: 'Progress is the most reliable driver of intrinsic motivation. When your actions produce visible results, the reward system reinforces the behavior — and you want to protect the conditions that made it possible. The flywheel spins faster.',
    },
  ]

  return (
    <section style={{ backgroundColor: '#141416', padding: '120px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p
            style={{
              color: '#4F8EF7',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(79,142,247,0.08)',
              border: '1px solid rgba(79,142,247,0.2)',
              borderRadius: '100px',
            }}
          >
            The Attention Flywheel™
          </p>
          <h2
            style={{
              color: '#F8F8F8',
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '56px',
            }}
          >
            What becomes possible when attention is restored.
          </h2>
        </motion.div>

        <div className="hidden md:block">
          <CircularLoop items={items} centerLabel="The Performance Compound" animDelay={0.2} />
        </div>

        <LoopAccordion items={items} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          style={{ marginTop: '48px' }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '16px',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 auto 32px',
            }}
          >
            The Attention Health Assessment™ shows you exactly where you are in this cycle
            — and what to do next.
          </p>
          <Link
            href="/assessment"
            style={{
              backgroundColor: 'transparent',
              color: '#3B82F6',
              textDecoration: 'none',
              padding: '13px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              border: '1px solid rgba(59,130,246,0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.1)'
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.7)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
            }}
          >
            Discover Your Attention Profile <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── ASSESSMENT PREVIEW ───────────────────────────────────────────────────────
function AssessmentPreview() {
  return (
    <section style={{ backgroundColor: '#0D0D0F', padding: '120px 24px' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gap: '60px',
          alignItems: 'center',
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              color: '#3B82F6',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '16px',
            }}
          >
            Attention Health Assessment™
          </p>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '32px',
            }}
          >
            The most comprehensive attention assessment available.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {[
              {
                icon: <BookOpen size={16} />,
                text: '84 research-informed questions across 8 dimensions',
              },
              {
                icon: <Users size={16} />,
                text: 'Personalized Attention Archetype and domain scores',
              },
              {
                icon: <TrendingUp size={16} />,
                text: 'Science-backed recommendations and 30-day roadmap',
              },
            ].map((point) => (
              <div
                key={point.text}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}
              >
                <div
                  style={{
                    color: '#3B82F6',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    padding: '8px',
                    borderRadius: '8px',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  {point.icon}
                </div>
                <span
                  style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.5 }}
                >
                  {point.text}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/assessment"
            style={{
              background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2563EB')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#3B82F6')
            }
          >
            Take the Assessment — Free <ArrowRight size={16} />
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            12–15 minutes · Instant report · 100% private
          </p>
        </motion.div>

        {/* Right: Auto-scrolling archetype carousel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden lg:flex"
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <ArchetypeCarousel />
        </motion.div>
      </div>
    </section>
  )
}

// ─── HUMAN DECISION LAB ───────────────────────────────────────────────────────
function HumanDecisionLab() {
  const cards = [
    {
      icon: <BookOpen size={22} />,
      title: 'Framework Library',
      desc: '10+ original frameworks on attention and performance',
      href: '/lab/frameworks',
      coming: false,
    },
    {
      icon: <FileText size={22} />,
      title: 'Research Reports',
      desc: 'Deep-dive analyses on attention in modern work',
      href: '/lab/research',
      coming: false,
    },
    {
      icon: <FileText size={22} />,
      title: 'White Papers',
      desc: 'Scientific framework documents and methodology',
      href: '/lab/whitepapers',
      coming: false,
    },
    {
      icon: <Mail size={22} />,
      title: 'The Newsletter',
      desc: 'Weekly insights on attention, decisions, and performance',
      href: '/lab/newsletter',
      coming: false,
    },
    {
      icon: <Activity size={22} />,
      title: 'Experiments',
      desc: 'Behavioral experiments and findings',
      href: '/lab/experiments',
      coming: true,
    },
    {
      icon: <BarChart2 size={22} />,
      title: 'Benchmark Center',
      desc: 'Population and industry attention benchmarks',
      href: '/lab/benchmarks',
      coming: true,
    },
  ]

  return (
    <section style={{ backgroundColor: '#141416', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p
            style={{
              color: '#4F8EF7',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(79,142,247,0.08)',
              border: '1px solid rgba(79,142,247,0.2)',
              borderRadius: '100px',
            }}
          >
            Human Decision Lab™
          </p>
          <h2
            style={{
              color: '#F8F8F8',
              fontSize: 'clamp(26px, 4vw, 46px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Research, frameworks, and insights on human attention and performance.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            An open library of thinking on how attention shapes human potential.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={card.coming ? '#' : card.href}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'border-color 0.2s, background-color 0.2s',
                  cursor: card.coming ? 'default' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!card.coming) {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                    e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.04)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                }}
              >
                <div
                  style={{
                    color: '#3B82F6',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    padding: '10px',
                    borderRadius: '10px',
                    display: 'inline-flex',
                    marginBottom: '16px',
                  }}
                >
                  {card.icon}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}
                >
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: '16px', margin: 0 }}>
                    {card.title}
                  </h3>
                  {card.coming && (
                    <span
                      style={{
                        backgroundColor: 'rgba(245,158,11,0.15)',
                        color: '#F59E0B',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Soon
                    </span>
                  )}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.5, marginBottom: '16px', margin: '0 0 16px' }}>
                  {card.desc}
                </p>
                {!card.coming && (
                  <div
                    style={{
                      color: '#3B82F6',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Explore <ArrowRight size={13} />
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ATTENTION OS ─────────────────────────────────────────────────────────────
function AttentionOS() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'os_waitlist' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const programs = [
    {
      title: 'Founder Attention Audit™',
      desc: 'Individual deep-dive for founders and leaders',
    },
    {
      title: 'Team Attention Audit™',
      desc: 'Collective assessment for high-performance teams',
    },
    {
      title: 'Attention Operating System™',
      desc: '12-week organizational transformation program',
    },
    {
      title: 'Leadership Attention Programs™',
      desc: 'Bespoke programs for senior leadership teams',
    },
  ]

  return (
    <section style={{ backgroundColor: '#0D0D0F', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p
            style={{
              color: '#4F8EF7',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(79,142,247,0.08)',
              border: '1px solid rgba(79,142,247,0.2)',
              borderRadius: '100px',
            }}
          >
            Attention Operating System™
          </p>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(26px, 4vw, 46px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            For teams and organizations serious about performance.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                boxShadow: '0 1px 1px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                padding: '28px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(245,158,11,0.12)',
                  color: '#F59E0B',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  display: 'inline-block',
                  marginBottom: '16px',
                }}
              >
                Coming Soon
              </div>
              <h3
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}
              >
                {program.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.5 }}>
                {program.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Waitlist */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: 'rgba(59,130,246,0.06)',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: '20px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
            Currently in private beta.
          </p>
          <h3
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Join the waitlist.
          </h3>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '15px',
              marginBottom: '28px',
            }}
          >
            Be first to know when programs open.
          </p>

          {status === 'success' ? (
            <p style={{ color: '#10B981', fontWeight: 700, fontSize: '16px' }}>
              ✓ You&apos;re on the list! We&apos;ll be in touch.
            </p>
          ) : (
            <>
              <form
                onSubmit={handleWaitlist}
                style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '12px 18px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    width: '280px',
                    maxWidth: '100%',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {status === 'loading' ? 'Joining...' : <>{`Join Waitlist`} <ArrowRight size={15} /></>}
                </button>
              </form>
              {status === 'error' && (
                <p style={{ color: '#EF4444', fontSize: '13px', marginTop: '10px' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Human Decision',
  description: 'A Human Performance Research Company exploring how attention shapes decisions, performance, and outcomes.',
  url: 'https://www.thehumandecision.in',
  foundingDate: '2025',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  sameAs: [],
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Human Decision',
  url: 'https://www.thehumandecision.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.thehumandecision.in/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Attention Health Assessment™',
  description: '84 research-informed questions across 8 dimensions. Get your personalized Attention Health Score and Attention Archetype.',
  brand: { '@type': 'Brand', name: 'The Human Decision' },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: 'https://www.thehumandecision.in/assessment',
  },
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Attention Health Assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Attention Health Assessment™ is an 84-question self-report instrument that measures attention functioning across 8 dimensions: Attentional Control, Executive Function, Working Memory, Time Perception, Hyperfocus, Impulse Regulation, Emotional Regulation, and Recovery Capacity. It generates a personalized Attention Health Score, Attention Archetype, and 30-day improvement roadmap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Attention Health Assessment a diagnosis for ADHD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The Attention Health Assessment™ is not a clinical diagnostic tool and does not diagnose ADHD or any neurological condition. It measures functional attention patterns in general adult populations. If you suspect ADHD or experience significant functional impairment, please consult a qualified healthcare professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the Attention Health Assessment take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The assessment takes 12-15 minutes to complete and generates an instant personalized report.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the 8 Attention Archetypes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 8 Attention Archetypes are: 1) Hyperfocused Achiever (deep focus, inconsistent execution), 2) Distracted Performer (high potential, scattered attention), 3) Overloaded Founder (capable but cognitively overwhelmed), 4) Burned-Out Operator (depleted reserves, high drive), 5) Reactive Executor (fast response, low sustained focus), 6) Consistent Builder (steady, reliable, systematic), 7) Hidden ADHD Profile (masked patterns, compensating systems), 8) Attention Athlete (peak attentional performance).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is The Human Decision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Human Decision is a Human Performance Research Company that explores how attention shapes decisions, performance, and outcomes. We build research-backed tools, frameworks, and programs to help individuals and organizations improve their attention health and cognitive performance.',
      },
    },
  ],
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0D0D0F', minHeight: '100vh' }}>
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      <Script id="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <Navigation />
      <HeroSection />
      <HumanDecisionModel />
      <HiddenAttentionCrisis />
      <AttentionLifecycle />
      <AttentionHealthFramework />
      <ErosionLoop />
      <AttentionFlywheel />
      <AssessmentPreview />
      <HumanDecisionLab />
      <AttentionOS />
      <Footer />
    </div>
  )
}
