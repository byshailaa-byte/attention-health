'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const CHAIN = [
  { label: 'Attention Quality', desc: 'The starting point. The clarity, depth, and stability of your attention at any given moment determines what inputs you can process and how well.' },
  { label: 'Information Processing', desc: 'How accurately and completely you can take in, filter, and interpret the information relevant to a decision. Attention quality directly governs this.' },
  { label: 'Decision Quality', desc: 'The soundness of the choices you make — weighing trade-offs, considering consequences, and acting from intention rather than impulse.' },
  { label: 'Action Quality', desc: 'How well your decisions translate into execution. Poor decisions produce poor actions; but so do well-made decisions executed with fragmented attention.' },
  { label: 'Performance Outcomes', desc: 'The measurable results — work output, relationship quality, strategic progress, health. The compounding endpoint of everything upstream.' },
]

export default function HumanDecisionModelPage() {
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
            Framework 03 · Human Decision Lab™
          </p>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
            Human Decision Model™
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.7, marginBottom: '64px' }}>
            Every outcome in your professional and personal life is the downstream result of a decision, which is the downstream result of how you processed information, which is the downstream result of the quality of your attention. The Human Decision Model™ makes this causal chain explicit — so you can intervene at the root, not the symptom.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '64px' }}>
          {CHAIN.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#3B82F620', border: '1.5px solid #3B82F655', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '13px', fontWeight: 700 }}>
                  {i + 1}
                </div>
                {i < CHAIN.length - 1 && (
                  <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(59,130,246,0.2)', margin: '4px 0' }} />
                )}
              </div>
              <div style={{ paddingTop: '6px', paddingBottom: i < CHAIN.length - 1 ? '0' : '0' }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '17px', marginBottom: '6px', letterSpacing: '-0.01em' }}>{step.label}</div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.65, margin: '0 0 32px' }}>{step.desc}</p>
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
