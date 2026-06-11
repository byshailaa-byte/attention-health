'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer
      style={{
        backgroundColor: '#060A14',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '80px 24px 40px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '17px',
                letterSpacing: '-0.025em',
                marginBottom: '8px',
              }}
            >
              The Human Decision
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '13px',
                marginBottom: '4px',
              }}
            >
              A Human Performance Research Company
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: '13px',
                fontStyle: 'italic',
              }}
            >
              Attention shapes everything.
            </div>
          </div>

          {/* Attention Health */}
          <div>
            <div
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              Attention Health™
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Assessment', href: '/assessment' },
                { label: 'Sample Report', href: '/health/sample-report' },
                { label: 'Archetypes', href: '/health/archetypes' },
                { label: 'Methodology', href: '/health/methodology' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Human Decision Lab */}
          <div>
            <div
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              Human Decision Lab™
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Framework Library', href: '/lab/frameworks' },
                { label: 'Research Reports', href: '/lab/research' },
                { label: 'White Papers', href: '/lab/whitepapers' },
                { label: 'Newsletter', href: '/lab/newsletter' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Attention OS */}
          <div>
            <div
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              Attention OS™
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Workshops', href: '/os/workshops' },
                { label: 'Team Programs', href: '/os/team-programs' },
                { label: 'About', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              Newsletter
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Weekly insights on attention and performance.
            </p>
            {status === 'success' ? (
              <p style={{ color: '#10B981', fontSize: '13px', fontWeight: 600 }}>
                You&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: 'white',
                    fontSize: '13px',
                    outline: 'none',
                    width: '100%',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'opacity 0.2s',
                  }}
                >
                  Subscribe <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            © 2025 The Human Decision. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Scientific Framework', href: '/api/whitepaper/pdf' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
