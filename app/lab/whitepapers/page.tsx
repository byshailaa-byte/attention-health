'use client'

import { motion } from 'framer-motion'
import { Clock, FileText } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const PAPERS = [
  {
    title: 'The Attention Health Framework: A Multi-Dimensional Model of Cognitive Focus',
    desc: 'Technical documentation of the 8-dimension framework, psychometric properties, and scoring methodology.',
  },
  {
    title: 'Attention Archetypes: Classification, Validation, and Clinical Implications',
    desc: 'Development and validation of the 8 attention archetypes identified through cluster analysis.',
  },
  {
    title: 'The Erosion Loop: How Modern Work Systematically Degrades Attentional Capacity',
    desc: 'A systems model of attention degradation in knowledge work environments.',
  },
]

export default function WhitepapersPage() {
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
            Human Decision Lab™ · White Papers
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
            White Papers
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65 }}>
            Scientific framework documents and technical methodology papers from the Human Decision Lab™.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {PAPERS.map((paper, i) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#3B82F6',
                    flexShrink: 0,
                  }}
                >
                  <FileText size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '16px',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                      marginBottom: '8px',
                    }}
                  >
                    {paper.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}>
                    {paper.desc}
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
                      letterSpacing: '0.05em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Clock size={10} /> Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
