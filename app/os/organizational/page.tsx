'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

export default function OrganizationalPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />
      <section style={{ padding: '140px 24px 120px', maxWidth: '800px', margin: '0 auto' }}>
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
            Attention OS™ · Organizational Programs
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
            Enterprise Transformation
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', lineHeight: 1.65 }}>
            Organization-wide attention health programs that systematically reduce cognitive drag,
            improve decision quality, and build a culture of sustained performance.
          </p>
        </motion.div>

        {[
          {
            title: 'Organizational Attention Audit™',
            desc: 'A comprehensive assessment across all levels — individual contributors, managers, and leadership — producing an attention health baseline for the entire organization.',
          },
          {
            title: 'Attention Operating System™ Implementation',
            desc: 'A 12-week transformation program that redesigns meeting culture, communication norms, physical and digital environments, and performance practices.',
          },
          {
            title: 'Leadership Attention Programs™',
            desc: 'Bespoke programs for C-suite and senior leadership teams — covering strategic attention allocation, decision-making under cognitive load, and modelling attention health culture.',
          },
          {
            title: 'Ongoing Advisory',
            desc: 'Quarterly reviews, updated assessments, and continuous improvement support to embed attention health as an organizational capability.',
          },
        ].map((program, i) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px 32px',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '10px' }}>
              {program.title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>
              {program.desc}
            </p>
            <span
              style={{
                backgroundColor: 'rgba(245,158,11,0.1)',
                color: '#F59E0B',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Clock size={10} /> Coming Soon
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', marginBottom: '24px' }}>
            Interested in a program for your organization?
          </p>
          <Link
            href="mailto:hello@attentionhealth.in?subject=Organizational%20Program%20Inquiry"
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Get in Touch <ArrowRight size={15} />
          </Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  )
}
