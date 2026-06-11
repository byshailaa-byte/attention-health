'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const ARCHETYPES = [
  {
    name: 'The Hyperfocused Achiever',
    tagline: 'Deep work mastery with variable sustainability',
    color: '#3B82F6',
    icon: '⚡',
  },
  {
    name: 'The Scattered Visionary',
    tagline: 'Abundant ideas, diffuse execution',
    color: '#8B5CF6',
    icon: '🌀',
  },
  {
    name: 'The Deliberate Processor',
    tagline: 'Methodical depth with slow context switching',
    color: '#10B981',
    icon: '🔬',
  },
  {
    name: 'The Reactive Responder',
    tagline: 'High throughput, low recovery',
    color: '#F59E0B',
    icon: '⚙️',
  },
  {
    name: 'The Calm Strategist',
    tagline: 'Sustained focus with strong regulation',
    color: '#06B6D4',
    icon: '🧭',
  },
  {
    name: 'The Distracted Achiever',
    tagline: 'High output despite fragmented attention',
    color: '#EF4444',
    icon: '🎯',
  },
  {
    name: 'The Reflective Builder',
    tagline: 'Intentional pacing with deep memory integration',
    color: '#F97316',
    icon: '🏗️',
  },
  {
    name: 'The Adaptive Operator',
    tagline: 'Flexible attention across varied contexts',
    color: '#84CC16',
    icon: '🔄',
  },
]

export default function ArchetypesPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />

      <section style={{ padding: '140px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
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
            Attention Health™ · Archetypes
          </p>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            8 Attention Archetypes
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '18px',
              lineHeight: 1.65,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Every person has a distinct attention profile. The assessment identifies which of these
            8 archetypes matches your cognitive patterns, strengths, and risk areas.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '80px',
          }}
        >
          {ARCHETYPES.map((archetype, i) => (
            <motion.div
              key={archetype.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: archetype.color,
                }}
              />
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{archetype.icon}</div>
              <h3
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  letterSpacing: '-0.01em',
                  marginBottom: '8px',
                }}
              >
                {archetype.name}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.55 }}>
                {archetype.tagline}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', marginBottom: '24px' }}>
            Detailed archetype profiles — traits, strengths, risk areas, and tailored interventions — coming soon.
          </p>
          <Link
            href="/assessment"
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              display: 'inline-block',
            }}
          >
            Discover Your Archetype →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
