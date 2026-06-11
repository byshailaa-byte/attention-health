'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const STAGES = [
  { label: 'Distraction', desc: 'Constant interruptions pull you away before deep work can begin. Each distraction resets the mental runway needed for your best thinking.' },
  { label: 'Fragmented Attention', desc: 'Repeated distraction trains the brain to expect interruption. Over time, even in quiet moments, attention splinters — making sustained focus feel effortful.' },
  { label: 'Poor Decisions', desc: 'Fragmented attention degrades working memory and pattern recognition — the exact capabilities that quality decisions depend on.' },
  { label: 'Reduced Performance', desc: 'Poor decisions compound into poor outputs. The gap between potential and actual performance widens with every cognitive cycle lost to distraction.' },
  { label: 'Stress', desc: 'Underperforming against your own standards triggers a stress response. Cortisol rises, sleep degrades, and the nervous system shifts toward threat-detection.' },
  { label: 'Lower Recovery', desc: 'Chronic stress impairs the physiological systems that restore cognitive capacity. You start each day with a smaller attention budget — and the loop tightens.' },
]

export default function ErosionLoopPage() {
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
          <p style={{ color: '#EF4444', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
            Framework 04 · Human Decision Lab™
          </p>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
            The Erosion Loop™
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.7, marginBottom: '64px' }}>
            The Erosion Loop™ describes the self-reinforcing cycle through which modern environments destroy cognitive performance. Each stage feeds the next — distraction fragments attention, which degrades decisions, which reduces output, which generates stress, which impairs recovery, which makes you more vulnerable to distraction. Most interventions treat individual symptoms. The Erosion Loop shows why addressing the root cause — attention — is the only way to break the cycle.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '64px' }}>
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              style={{ padding: '22px 0', borderBottom: '1px solid rgba(239,68,68,0.1)', display: 'flex', gap: '20px' }}
            >
              <div style={{ color: '#EF4444', fontSize: '10px', fontWeight: 700, width: '18px', flexShrink: 0, paddingTop: '4px', opacity: 0.5 }}>{i + 1}</div>
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
