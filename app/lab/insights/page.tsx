'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const TOPICS = [
  { category: 'Focus & Deep Work', count: '12 articles' },
  { category: 'Distraction & Interruption', count: '8 articles' },
  { category: 'Cognitive Recovery', count: '7 articles' },
  { category: 'Decision Making', count: '10 articles' },
  { category: 'Attention in Leadership', count: '6 articles' },
  { category: 'Tools & Systems', count: '9 articles' },
]

export default function InsightsPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '140px 24px 120px', maxWidth: '900px', margin: '0 auto' }}>
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
            Human Decision Lab™ · Insights
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
            Insights Library
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65, maxWidth: '580px', margin: '0 auto' }}>
            A curated knowledge base on attention, focus, cognition, and human performance.
            Searchable by topic, archetype, and application.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '64px',
          }}
        >
          {TOPICS.map((topic, i) => (
            <motion.div
              key={topic.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '6px' }}>
                {topic.category}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{topic.count}</p>
              <div
                style={{
                  marginTop: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(245,158,11,0.1)',
                  color: '#F59E0B',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                <Clock size={9} /> Coming Soon
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
