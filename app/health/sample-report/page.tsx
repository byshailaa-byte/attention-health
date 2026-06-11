'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

export default function SampleReportPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '160px 24px 120px', maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
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
            Attention Health™ · Sample Report
          </p>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            See What Your Report Looks Like
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '18px',
              lineHeight: 1.65,
              marginBottom: '48px',
            }}
          >
            A fully interactive sample report — showing exactly what you receive after completing
            the Attention Health Assessment™.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: '10px',
              padding: '14px 24px',
              color: '#F59E0B',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '40px',
            }}
          >
            <Clock size={16} /> Coming Soon
          </div>
          <div>
            <Link
              href="/assessment"
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                textDecoration: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'inline-block',
              }}
            >
              Take the Real Assessment →
            </Link>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  )
}
