'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const FRAMEWORKS = [
  {
    number: '01',
    title: 'Attention Lifecycle Framework™',
    desc: 'How attention flows through input, deployment, outcome, and recovery — and why each stage matters for performance.',
    href: '/lab/frameworks/attention-lifecycle',
    live: true,
  },
  {
    number: '02',
    title: 'Attention Health Framework™',
    desc: 'Eight dimensions of attention — a comprehensive map of cognitive performance that goes beyond "focus."',
    href: '/lab/frameworks/attention-health',
    live: true,
  },
  {
    number: '03',
    title: 'Human Decision Model™',
    desc: 'The causal chain from attention quality to decision quality to performance outcomes.',
    href: '/lab/frameworks/human-decision-model',
    live: true,
  },
  {
    number: '04',
    title: 'The Erosion Loop™',
    desc: 'How distraction, fragmented attention, and poor decisions create a self-reinforcing cycle of degraded performance.',
    href: '/lab/frameworks/erosion-loop',
    live: true,
  },
  {
    number: '05',
    title: 'The Attention Flywheel™',
    desc: 'The virtuous cycle that becomes possible when attention is restored — compounding performance over time.',
    href: '/lab/frameworks/attention-flywheel',
    live: true,
  },
  {
    number: '06',
    title: 'Attention Debt Framework™',
    desc: 'A model for understanding accumulated cognitive cost and how it compounds — like financial debt, but for your mind.',
    href: '#',
    live: false,
  },
  {
    number: '07',
    title: 'Cognitive Load Framework™',
    desc: 'How different types of mental work consume attentional resources — and how to manage load for sustained performance.',
    href: '#',
    live: false,
  },
  {
    number: '08',
    title: 'Context Switching Tax™',
    desc: 'Quantifying the hidden cost of task-switching and what it actually does to decision quality.',
    href: '#',
    live: false,
  },
  {
    number: '09',
    title: 'Founder Attention Framework™',
    desc: 'A model built specifically for founders — mapping how early-stage pressures uniquely degrade attention and decision-making.',
    href: '#',
    live: false,
  },
  {
    number: '10',
    title: 'Decision Quality Framework™',
    desc: 'A system for evaluating the quality of decisions independent of outcomes — and the role attention plays in each dimension.',
    href: '#',
    live: false,
  },
]

export default function FrameworksPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <section style={{ padding: '140px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
            Human Decision Lab™ · Framework Library
          </p>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            10 frameworks for understanding attention and performance.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65 }}>
            Original conceptual frameworks developed at The Human Decision. Built to give
            language and structure to ideas that matter but rarely get named.
          </p>
        </motion.div>
      </section>

      {/* Framework list */}
      <section style={{ padding: '0 24px 120px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FRAMEWORKS.map((fw, i) => (
            <motion.div
              key={fw.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 5) * 0.06 }}
            >
              {fw.live ? (
                <Link
                  href={fw.href}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '28px 32px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'
                    e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                  }}
                >
                  <FrameworkCardInner fw={fw} />
                </Link>
              ) : (
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '14px',
                    padding: '28px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    opacity: 0.65,
                  }}
                >
                  <FrameworkCardInner fw={fw} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FrameworkCardInner({
  fw,
}: {
  fw: { number: string; title: string; desc: string; live: boolean }
}) {
  return (
    <>
      <div
        style={{
          color: 'rgba(255,255,255,0.2)',
          fontSize: '13px',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
          width: '24px',
        }}
      >
        {fw.number}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: 'white',
            fontWeight: 700,
            fontSize: '17px',
            marginBottom: '6px',
            letterSpacing: '-0.01em',
          }}
        >
          {fw.title}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.55 }}>
          {fw.desc}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>
        {fw.live ? (
          <div
            style={{
              color: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            View <ArrowRight size={14} />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.25)',
              fontSize: '12px',
            }}
          >
            <Lock size={12} />
            Soon
          </div>
        )}
      </div>
    </>
  )
}
