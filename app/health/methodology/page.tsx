'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const PILLARS = [
  {
    num: '01',
    title: 'Attentional Control',
    desc: 'The capacity to direct and sustain focus intentionally, resisting distraction and maintaining task engagement.',
  },
  {
    num: '02',
    title: 'Executive Function',
    desc: 'Higher-order cognitive processes including planning, working memory, and cognitive flexibility.',
  },
  {
    num: '03',
    title: 'Hyperfocus Capacity',
    desc: 'The ability to enter and sustain deep states of absorption, and to exit them voluntarily.',
  },
  {
    num: '04',
    title: 'Recovery Capacity',
    desc: 'The speed and depth at which attentional resources are restored after depletion.',
  },
  {
    num: '05',
    title: 'Context Switching',
    desc: 'The efficiency with which attention is redirected across tasks, roles, and cognitive domains.',
  },
  {
    num: '06',
    title: 'Distraction Resistance',
    desc: 'Robustness of focus in the presence of internal and external interruptions.',
  },
  {
    num: '07',
    title: 'Motivational Drive',
    desc: 'The degree to which intrinsic motivation sustains attention across effortful or low-salience tasks.',
  },
  {
    num: '08',
    title: 'Metacognitive Awareness',
    desc: 'The ability to observe, evaluate, and regulate one\'s own attentional states in real time.',
  },
]

export default function MethodologyPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />

      <section style={{ padding: '140px 24px 80px', maxWidth: '800px', margin: '0 auto' }}>
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
            Attention Health™ · Methodology
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
            The Scientific Framework
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '18px',
              lineHeight: 1.65,
            }}
          >
            The Attention Health Assessment™ measures 8 dimensions of attentional function derived
            from cognitive neuroscience, clinical psychology, and organizational performance research.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '80px' }}>
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  color: '#3B82F6',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                  paddingTop: '2px',
                  minWidth: '28px',
                }}
              >
                {pillar.num}
              </div>
              <div>
                <h3
                  style={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '16px',
                    marginBottom: '6px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pillar.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#F59E0B',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            <Clock size={14} /> Full methodology paper coming soon
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.6 }}>
            The complete technical documentation — including item development, psychometric validation,
            scoring algorithms, and normative data — will be published here.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
