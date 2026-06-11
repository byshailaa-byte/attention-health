'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const STAGES = [
  { label: 'INPUT', desc: 'The information and stimuli that compete for your attention — notifications, conversations, tasks, environment.' },
  { label: 'FILTERING', desc: 'The brain\'s process of selecting what to attend to and what to suppress. Impaired by fatigue, stress, and chronic distraction.' },
  { label: 'DEPLOYMENT', desc: 'Where and how attention is actually directed — sustained focus, task-switching, or divided attention across competing demands.' },
  { label: 'OUTCOME', desc: 'The quality of work produced as a direct result of how attention was deployed. Decision quality, output depth, and creative output all live here.' },
  { label: 'RECOVERY', desc: 'The physiological and psychological processes that restore attentional capacity. Sleep, rest, and deliberate disengagement are non-negotiable.' },
]

export default function AttentionLifecyclePage() {
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
            Framework 01 · Human Decision Lab™
          </p>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
            Attention Lifecycle Framework™
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.7, marginBottom: '64px' }}>
            Attention is not a switch you flip on or off — it is a cycle. The Attention Lifecycle Framework maps how attentional capacity moves through five stages, from the moment stimuli compete for your focus through to the recovery that restores it. Understanding where your cycle breaks down is the first step to fixing it.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '64px' }}>
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              style={{ display: 'flex', gap: '24px', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div style={{ color: '#3B82F6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', width: '80px', flexShrink: 0, paddingTop: '3px' }}>
                {String(i + 1).padStart(2, '0')} {stage.label}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>{stage.desc}</p>
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
