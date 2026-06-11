'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const SAMPLE_ISSUES = [
  {
    number: 'Issue 01',
    title: 'The Context Switching Tax: Why Your Brain Pays a Hidden Toll',
    teaser:
      'Every time you switch tasks, you don\'t just lose the seconds it takes to refocus. You lose the depth of thought you had just built. We look at what the research actually says — and what it means for how you structure your day.',
  },
  {
    number: 'Issue 02',
    title: 'Hyperfocus is Not a Superpower. It\'s a Signal.',
    teaser:
      'The ability to enter states of intense, prolonged focus is celebrated in productivity culture. But hyperfocus is often a symptom of dysregulation — not a strength. Understanding the difference changes how you work with it.',
  },
  {
    number: 'Issue 03',
    title: 'The 23-Minute Rule: What Interruptions Really Cost You',
    teaser:
      'Gloria Mark\'s research at UC Irvine showed it takes an average of 23 minutes to fully regain focus after a single interruption. The implications for how we design our work environments are more serious than most people realize.',
  },
]

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter_page' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            Human Decision Lab™ · Newsletter
          </p>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              marginBottom: '24px',
            }}
          >
            The Attention Lens
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '18px',
              lineHeight: 1.65,
              marginBottom: '48px',
            }}
          >
            Weekly insights on attention, decisions, and human performance.
            Read by founders, leaders, and knowledge workers who take their cognition seriously.
          </p>

          {/* Sign-up form */}
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{
                backgroundColor: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <p style={{ color: '#10B981', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
                You&apos;re on the list.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                First issue coming soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '16px',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    padding: '14px 20px',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    width: '300px',
                    maxWidth: '100%',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '14px 24px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'loading')
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2563EB'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#3B82F6'
                  }}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  {status !== 'loading' && <ArrowRight size={16} />}
                </button>
              </div>
              {status === 'error' && (
                <p style={{ color: '#EF4444', fontSize: '13px' }}>
                  Something went wrong. Please try again.
                </p>
              )}
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
                No spam. Unsubscribe any time.
              </p>
            </form>
          )}
        </motion.div>
      </section>

      {/* Divider */}
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      />

      {/* Sample issues */}
      <section style={{ padding: '80px 24px 120px', maxWidth: '760px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '48px' }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '12px',
            }}
          >
            Sample Issues
          </p>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            What to expect.
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {SAMPLE_ISSUES.map((issue, i) => (
            <motion.div
              key={issue.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {issue.number}
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(245,158,11,0.12)',
                    color: '#F59E0B',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Clock size={10} /> Coming Soon
                </span>
              </div>
              <h3
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '18px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                  marginBottom: '12px',
                }}
              >
                {issue.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.65 }}>
                {issue.teaser}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
