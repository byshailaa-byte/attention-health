'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using The Human Decision platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.',
  },
  {
    title: 'Use of the Platform',
    body: 'The Attention Health Assessment™ is provided for personal, non-commercial use. You may not reproduce, distribute, or create derivative works from the assessment, frameworks, or reports without written permission.',
  },
  {
    title: 'Not Medical Advice',
    body: 'The assessments, reports, and content on this platform are for informational and educational purposes only. They do not constitute medical, psychological, or clinical advice. If you have concerns about your mental health or cognitive function, please consult a qualified professional.',
  },
  {
    title: 'Assessment Accuracy',
    body: 'The Attention Health Assessment™ is based on research-informed frameworks and validated psychometric methods. However, no assessment can capture the full complexity of an individual\'s cognition. Results should be interpreted as a starting point for self-understanding, not a definitive diagnosis.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content, frameworks, scoring methodologies, archetype models, and branding on this platform are the intellectual property of The Human Decision. The Attention Health Framework™, Attention Archetypes™, and Attention OS™ are proprietary models.',
  },
  {
    title: 'Limitation of Liability',
    body: 'The Human Decision provides this platform on an "as is" basis. We make no warranties regarding the accuracy, completeness, or fitness for any particular purpose. To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from use of the platform.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by the laws of India. Any disputes shall be resolved in the courts of jurisdiction relevant to the registered address of The Human Decision.',
  },
]

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '140px 24px 120px', maxWidth: '720px', margin: '0 auto' }}>
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
            Legal
          </p>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Terms of Service
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
            Last updated: June 2026
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                padding: '28px 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h2
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '17px',
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                }}
              >
                {section.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7 }}>
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '48px' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
            Questions about these terms? Email{' '}
            <a
              href="mailto:hello@attentionhealth.in"
              style={{ color: '#3B82F6', textDecoration: 'none' }}
            >
              hello@attentionhealth.in
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
