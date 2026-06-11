'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: 'When you take the Attention Health Assessment™, we collect the information you provide (name, email, occupation, and your assessment responses). We use this to generate your personalised report and to improve our research. We do not collect any payment information directly.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your assessment data is used to calculate your Attention Health score, generate your personalised archetype report, and provide tailored recommendations. Aggregated, anonymised data may be used for research purposes. We will never sell your personal data to third parties.',
  },
  {
    title: 'Data Storage',
    body: 'Your data is stored securely on Neon PostgreSQL infrastructure. Assessment responses are linked to your email address so you can access your report. We use industry-standard encryption in transit and at rest.',
  },
  {
    title: 'Communications',
    body: 'If you subscribe to The Attention Lens newsletter or join a waitlist, we will send you relevant communications. You can unsubscribe at any time. We will not send you unsolicited marketing.',
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, correct, or delete your personal data at any time. To exercise these rights, email us at hello@attentionhealth.in. We will respond within 30 days.',
  },
  {
    title: 'Cookies',
    body: 'We use minimal cookies necessary for site functionality. We do not use advertising or tracking cookies. We do not use third-party analytics that track you across other websites.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this policy as our practices evolve. Significant changes will be communicated via email to registered users. Continued use of the site after changes constitutes acceptance.',
  },
]

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
            Last updated: June 2026
          </p>
        </motion.div>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.7, marginBottom: '48px' }}>
          The Human Decision is committed to protecting your privacy. This policy explains what
          information we collect, how we use it, and your rights regarding that information.
        </p>

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
            Questions about this policy? Email{' '}
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
