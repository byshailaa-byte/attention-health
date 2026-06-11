'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const DIMENSIONS = [
  { num: '01', label: 'Sustained Focus', desc: 'The ability to maintain concentrated attention on a single task over time without mind-wandering or distraction.' },
  { num: '02', label: 'Cognitive Filtering', desc: 'The capacity to suppress irrelevant stimuli and selectively attend to what matters — resisting the pull of distraction.' },
  { num: '03', label: 'Mental Energy', desc: 'The raw fuel for cognitive work — influenced by sleep quality, nutrition, stress load, and physical activity.' },
  { num: '04', label: 'Task Initiation', desc: 'The ability to begin meaningful work without avoidance, procrastination, or compulsive task-switching.' },
  { num: '05', label: 'Working Memory', desc: 'The capacity to hold and manipulate information in mind while thinking — essential for reasoning, planning, and decision-making.' },
  { num: '06', label: 'Cognitive Flexibility', desc: 'The ability to shift between contexts and modes of thinking without excessive switching cost or mental rigidity.' },
  { num: '07', label: 'Impulse Control', desc: 'The capacity to resist immediate gratification and override habitual responses in favor of intentional behavior.' },
  { num: '08', label: 'Recovery Capacity', desc: 'The speed and completeness with which cognitive resources are restored after periods of demanding mental work.' },
]

export default function AttentionHealthPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '140px 24px 120px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/lab/frameworks"
            style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}
          >
            <ArrowLeft size={13} /> Back to Framework Library
          </Link>
          <p style={{ color: '#3B82F6', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
            Framework 02 · Human Decision Lab™
          </p>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
            Attention Health Framework™
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.7, marginBottom: '64px' }}>
            Most conversations about focus stop at one dimension. The Attention Health Framework™ maps eight distinct cognitive capacities that together constitute a complete picture of attentional wellbeing. The Attention Health Assessment™ scores you across all eight — revealing not just how well you focus, but where your system is specifically breaking down.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '12px', marginBottom: '64px' }}>
          {DIMENSIONS.map((dim, i) => (
            <motion.div
              key={dim.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.07 }}
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: '#3B82F6', fontSize: '10px', fontWeight: 700 }}>{dim.num}</span>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>{dim.label}</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>{dim.desc}</p>
            </motion.div>
          ))}
        </div>

        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginBottom: '40px', fontStyle: 'italic' }}>
          Full framework documentation coming soon.
        </p>

        <Link
          href="/assessment"
          style={{ backgroundColor: '#3B82F6', color: 'white', textDecoration: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          Take the Assessment <ArrowRight size={15} />
        </Link>
      </section>
      <Footer />
    </div>
  )
}
