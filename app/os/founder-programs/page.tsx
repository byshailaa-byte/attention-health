'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

export default function FounderProgramsPage() {
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
            Attention OS™ · Founder Programs
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
            Built for Founders
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65 }}>
            Founders face a unique set of attention demands: context-switching at scale,
            high-stakes decisions under uncertainty, and the cognitive weight of ownership.
            These programs are built specifically for that reality.
          </p>
        </motion.div>

        {[
          {
            title: 'Founder Attention Audit™',
            desc: 'A rigorous individual assessment — 88 questions, full archetype profile, 8 domain scores, and a personalised 30-day roadmap. Followed by a 1:1 debrief session.',
            tag: 'Individual',
          },
          {
            title: 'Founder Focus Protocol',
            desc: 'A 4-week intensive program that restructures how you allocate attention across strategy, operations, and people — based on your specific archetype and risk profile.',
            tag: '4 weeks',
          },
          {
            title: 'Attention Operating System for Founders',
            desc: 'The complete 12-week program. Covers assessment, environment design, decision-making architecture, recovery protocols, and ongoing coaching.',
            tag: '12 weeks',
          },
        ].map((program, i) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px 32px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.01em' }}>
                {program.title}
              </h3>
              <span
                style={{
                  backgroundColor: 'rgba(59,130,246,0.1)',
                  color: '#3B82F6',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  flexShrink: 0,
                  marginLeft: '16px',
                }}
              >
                {program.tag}
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>
              {program.desc}
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Start with the Assessment <ArrowRight size={15} />
          </Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  )
}
