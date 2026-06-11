'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const TOPICS = [
  'Attention Fragmentation in Remote Work',
  'Hyperfocus in High-Stakes Decision Making',
  'Recovery Patterns After Cognitive Depletion',
  'Notification Architecture and Attentional Costs',
  'The Physiology of Deep Work',
]

export default function ResearchPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '140px 24px 120px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '64px' }}
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
            Human Decision Lab™ · Research Reports
          </p>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            Research Reports
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65 }}>
            Deep-dive analyses on attention, cognition, and performance in modern work.
            Based on original research and synthesis of the scientific literature.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '64px' }}>
          {TOPICS.map((topic, i) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 500 }}>
                {topic}
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(245,158,11,0.1)',
                  color: '#F59E0B',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Clock size={10} /> Coming Soon
              </span>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
