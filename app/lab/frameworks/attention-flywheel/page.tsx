'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const STAGES = [
  { label: 'Better Attention', desc: 'Training and protecting attention creates the foundation for everything else. When you hold focus deliberately, your cognitive baseline rises.' },
  { label: 'Better Decisions', desc: 'Sustained attention means clearer reasoning, better working memory, and the ability to weigh trade-offs without cognitive shortcuts.' },
  { label: 'Better Actions', desc: 'Better decisions translate into intentional execution — choosing what to work on, when to respond, and where to invest energy with precision.' },
  { label: 'Better Outcomes', desc: 'Intentional action produces better results. Work is deeper, output is higher quality, and the gap between effort and impact shrinks.' },
  { label: 'Higher Motivation', desc: 'Progress is the most reliable driver of intrinsic motivation. Visible results reinforce the behaviors that made them possible — the flywheel spins faster.' },
]

export default function AttentionFlywheelPage() {
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
            Framework 05 · Human Decision Lab™
          </p>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
            The Attention Flywheel™
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.7, marginBottom: '64px' }}>
            The Attention Flywheel™ describes the virtuous cycle that becomes possible when attention is restored and protected. Unlike the Erosion Loop, which tightens under neglect, the Flywheel compounds under investment — each stage making the next easier, faster, and more sustainable. The goal of the Attention Health Assessment™ is to show you exactly where you are in this cycle, and what it would take to start the flywheel spinning.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '64px' }}>
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              style={{ padding: '22px 0', borderBottom: '1px solid rgba(59,130,246,0.1)', display: 'flex', gap: '20px' }}
            >
              <div style={{ color: '#3B82F6', fontSize: '10px', fontWeight: 700, width: '18px', flexShrink: 0, paddingTop: '4px', opacity: 0.5 }}>{i + 1}</div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>{stage.label}</div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>{stage.desc}</p>
              </div>
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
