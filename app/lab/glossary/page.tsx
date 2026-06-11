'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const TERMS = [
  {
    term: 'Attentional Control',
    def: 'The executive capacity to intentionally direct and sustain focus toward a chosen target while suppressing competing stimuli.',
  },
  {
    term: 'Cognitive Load',
    def: 'The total amount of mental effort being used in working memory at a given time. High cognitive load degrades attentional control.',
  },
  {
    term: 'Default Mode Network (DMN)',
    def: 'A brain network active during mind-wandering and self-referential thought. Its suppression is necessary for sustained attention.',
  },
  {
    term: 'Directed Attention Fatigue',
    def: 'Depletion of inhibitory capacity after prolonged effortful attention, resulting in increased distractibility and impulsivity.',
  },
  {
    term: 'Executive Function',
    def: 'Higher-order cognitive processes — including working memory, cognitive flexibility, and inhibitory control — that regulate goal-directed behavior.',
  },
  {
    term: 'Hyperfocus',
    def: 'A state of intense, prolonged absorption in a task, often associated with high intrinsic motivation. Can indicate both strength and dysregulation.',
  },
  {
    term: 'Metacognition',
    def: 'Awareness and regulation of one\'s own cognitive processes. In attention, metacognition enables real-time monitoring of focus quality.',
  },
  {
    term: 'Orienting Network',
    def: 'The attentional subsystem responsible for selecting relevant sensory information and shifting focus to new stimuli.',
  },
  {
    term: 'Task-Switching Cost',
    def: 'The performance degradation that occurs when switching from one task to another, caused by residual activation from the prior task.',
  },
  {
    term: 'Working Memory',
    def: 'A limited-capacity system for temporarily holding and manipulating information during cognitive tasks. Strongly predictive of attentional control.',
  },
]

export default function GlossaryPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '140px 24px 120px', maxWidth: '760px', margin: '0 auto' }}>
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
            Human Decision Lab™ · Glossary
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
            Key Terms
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65 }}>
            Precise definitions for the concepts used across The Human Decision research,
            assessments, and frameworks.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {TERMS.map((entry, i) => (
            <motion.div
              key={entry.term}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                padding: '24px 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h3
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  letterSpacing: '-0.01em',
                  marginBottom: '8px',
                }}
              >
                {entry.term}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.65 }}>
                {entry.def}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
