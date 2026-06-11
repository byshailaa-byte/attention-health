'use client'

import { motion } from 'framer-motion'
import { Brain, Microscope, Zap } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', maxWidth: '860px', margin: '0 auto' }}>
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
              marginBottom: '20px',
            }}
          >
            About
          </p>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(34px, 5vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '28px',
            }}
          >
            We study how attention shapes human potential.
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '18px',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}
          >
            The Human Decision is a Human Performance Research Company. We believe attention
            is the most underexplored variable in human performance — and that understanding
            it is the key to unlocking better decisions, deeper work, and more meaningful outcomes.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.7 }}>
            We measure attention across eight evidence-informed dimensions, identify patterns
            that most people have never seen named, and provide a framework for improvement
            grounded in behavioral science and cognitive psychology.
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '0 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      />

      {/* What We're Building */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '56px' }}
        >
          <p
            style={{
              color: '#3B82F6',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '14px',
            }}
          >
            What We&apos;re Building
          </p>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
            }}
          >
            Three pillars. One mission.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              icon: <Brain size={22} />,
              number: '01',
              title: 'Measure',
              subtitle: 'Attention Health Assessment™',
              description:
                'A comprehensive, evidence-informed assessment that maps your attention across eight dimensions — giving you the clearest picture of your cognitive performance available anywhere.',
            },
            {
              icon: <Microscope size={22} />,
              number: '02',
              title: 'Understand',
              subtitle: 'Human Decision Lab™',
              description:
                'A growing library of frameworks, research, and insights about how attention shapes decisions, performance, and outcomes. Open to everyone who wants to think more clearly about how the mind works.',
            },
            {
              icon: <Zap size={22} />,
              number: '03',
              title: 'Improve',
              subtitle: 'Attention Operating System™',
              description:
                'Programs for founders, teams, and organizations to systematically restore and strengthen attention — building the conditions for sustained high performance.',
            },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  color: '#3B82F6',
                  backgroundColor: 'rgba(59,130,246,0.1)',
                  padding: '10px',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  marginBottom: '16px',
                }}
              >
                {pillar.icon}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '6px',
                }}
              >
                {pillar.number}
              </div>
              <h3
                style={{
                  color: 'white',
                  fontSize: '22px',
                  fontWeight: 700,
                  marginBottom: '4px',
                  letterSpacing: '-0.015em',
                }}
              >
                {pillar.title}
              </h3>
              <div style={{ color: '#3B82F6', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
                {pillar.subtitle}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.65 }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Philosophy */}
      <section
        style={{
          backgroundColor: '#0F1629',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p
              style={{
                color: '#3B82F6',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '14px',
              }}
            >
              Research Philosophy
            </p>
            <h2
              style={{
                color: 'white',
                fontSize: 'clamp(24px, 3.5vw, 38px)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                marginBottom: '40px',
              }}
            >
              Rigor over reach. Clarity over complexity.
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              {
                title: 'Evidence-informed, not evidence-limited',
                body: 'We draw from cognitive neuroscience, behavioral psychology, and occupational research. We do not manufacture claims. Where the science is uncertain, we say so clearly.',
              },
              {
                title: 'Frameworks, not formulas',
                body: 'We build conceptual frameworks that help people think more clearly, not algorithmic prescriptions. The goal is better mental models, not compliance with a system.',
              },
              {
                title: 'Honest about what we are',
                body: 'This is an assessment and research platform, not a medical diagnostic tool. We measure patterns and tendencies. We describe — we do not diagnose.',
              },
              {
                title: 'Categories matter',
                body: 'We are not building a productivity app, a wellness product, or a coaching service. We are building a new category: Human Performance Research. That distinction shapes every decision we make.',
              },
            ].map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  paddingLeft: '24px',
                  borderLeft: '2px solid rgba(59,130,246,0.35)',
                }}
              >
                <div
                  style={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '16px',
                    marginBottom: '8px',
                  }}
                >
                  {point.title}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '15px',
                    lineHeight: 1.65,
                  }}
                >
                  {point.body}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom note */}
      <section style={{ padding: '80px 24px 100px', maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: 'rgba(59,130,246,0.06)',
            border: '1px solid rgba(59,130,246,0.18)',
            borderRadius: '20px',
            padding: '48px 40px',
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '14px',
            }}
          >
            A note on where we are
          </p>
          <p
            style={{
              color: 'white',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              marginBottom: '16px',
            }}
          >
            Early stage. Serious about the science.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.7 }}>
            We are building this carefully. The Attention Health Assessment™ is live.
            The Human Decision Lab™ is growing. The Attention Operating System™ is in
            private beta. We would rather go slowly and be right than move fast and be wrong.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
