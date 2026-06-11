'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const WORKSHOPS = [
  {
    title: 'Attention Fundamentals',
    duration: '90 min',
    desc: 'An introduction to the science of attention — what it is, how it degrades, and what you can do about it.',
  },
  {
    title: 'Deep Work Design',
    duration: '2 hours',
    desc: 'Practical frameworks for structuring your environment and schedule to enable sustained, high-quality focus.',
  },
  {
    title: 'The Distraction Audit',
    duration: '3 hours',
    desc: 'A systematic workshop to identify, measure, and eliminate the sources of attention fragmentation in your work.',
  },
  {
    title: 'Recovery Architecture',
    duration: '90 min',
    desc: 'Science-backed protocols for restoring attentional capacity between focused work periods.',
  },
]

export default function WorkshopsPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '140px 24px 120px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '72px' }}
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
            Attention OS™ · Workshops
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
            Live Learning Sessions
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65, maxWidth: '580px' }}>
            Interactive workshops that translate attention science into practical skills.
            For individuals, teams, and organizations.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          {WORKSHOPS.map((ws, i) => (
            <motion.div
              key={ws.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px 24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <h3
                  style={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '17px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {ws.title}
                </h3>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '12px',
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}
                >
                  {ws.duration}
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                {ws.desc}
              </p>
              <span
                style={{
                  backgroundColor: 'rgba(245,158,11,0.1)',
                  color: '#F59E0B',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Clock size={10} /> Coming Soon
              </span>
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
            Join the waitlist to be notified when workshops open.
          </p>
          <Link
            href="/#attention-os"
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Join Waitlist <ArrowRight size={15} />
          </Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  )
}
