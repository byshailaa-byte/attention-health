'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'

type DropdownItem = { label: string; href: string; desc?: string }
type NavLink = { label: string; href?: string; items?: DropdownItem[] }

const NAV_LINKS: NavLink[] = [
  {
    label: 'Attention Health™',
    href: '/assessment',
    items: [
      { label: 'Assessment', href: '/assessment', desc: 'Take the 84-question assessment' },
      { label: 'Sample Report', href: '/health/sample-report', desc: 'Preview a complete report' },
      { label: 'Attention Archetypes', href: '/health/archetypes', desc: 'Explore 8 attention profiles' },
      { label: 'Methodology', href: '/health/methodology', desc: 'The scientific framework' },
    ],
  },
  {
    label: 'Human Decision Lab™',
    href: '/lab/frameworks',
    items: [
      { label: 'Framework Library', href: '/lab/frameworks', desc: '10+ original frameworks' },
      { label: 'Research Reports', href: '/lab/research', desc: 'Deep-dive analyses' },
      { label: 'White Papers', href: '/lab/whitepapers', desc: 'Scientific documentation' },
      { label: 'Newsletter', href: '/lab/newsletter', desc: 'The Attention Lens' },
      { label: 'Insights Library', href: '/lab/insights', desc: 'Curated knowledge base' },
      { label: 'Glossary', href: '/lab/glossary', desc: 'Key terms defined' },
    ],
  },
  {
    label: 'Attention OS™',
    href: '/os/workshops',
    items: [
      { label: 'Workshops', href: '/os/workshops', desc: 'Live learning sessions' },
      { label: 'Team Programs', href: '/os/team-programs', desc: 'For high-performance teams' },
      { label: 'Founder Programs', href: '/os/founder-programs', desc: 'Built for founders' },
      { label: 'Organizational Programs', href: '/os/organizational', desc: 'Enterprise transformation' },
    ],
  },
  { label: 'About', href: '/about' },
]

export default function Navigation() {
  const [active, setActive] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(13,13,15,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.04)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '17px',
              letterSpacing: '-0.025em',
              flexShrink: 0,
            }}
          >
            The Human Decision
          </Link>

          {/* Desktop Links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
            className="hidden lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => link.items && setActive(link.label)}
                onMouseLeave={() => setActive(null)}
              >
                {link.href && !link.items ? (
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      padding: '8px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s',
                      borderRadius: '8px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                  >
                    {link.label}
                  </Link>
                ) : link.href && link.items ? (
                  <Link
                    href={link.href}
                    style={{
                      color: active === link.label ? 'white' : 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      padding: '8px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s',
                      borderRadius: '8px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => {
                      if (active !== link.label)
                        e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      style={{
                        transition: 'transform 0.2s',
                        transform: active === link.label ? 'rotate(180deg)' : 'rotate(0deg)',
                        flexShrink: 0,
                      }}
                    />
                  </Link>
                ) : (
                  <button
                    style={{
                      color: active === link.label ? 'white' : 'rgba(255,255,255,0.65)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: '8px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s',
                      borderRadius: '8px',
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      style={{
                        transition: 'transform 0.2s',
                        transform: active === link.label ? 'rotate(180deg)' : 'rotate(0deg)',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                )}

                <AnimatePresence>
                  {link.items && active === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '4px',
                        width: '240px',
                        backgroundColor: '#141416',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset',
                        overflow: 'hidden',
                        zIndex: 100,
                      }}
                    >
                      {link.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          style={{
                            display: 'block',
                            padding: '12px 16px',
                            textDecoration: 'none',
                            transition: 'background-color 0.15s',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                              'rgba(255,255,255,0.05)')
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                              'transparent')
                          }
                        >
                          <div style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>
                            {item.label}
                          </div>
                          {item.desc && (
                            <div
                              style={{
                                color: 'rgba(255,255,255,0.38)',
                                fontSize: '11px',
                                marginTop: '2px',
                              }}
                            >
                              {item.desc}
                            </div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/assessment"
              className="hidden lg:flex"
              style={{
                background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'box-shadow 0.2s, transform 0.15s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(79,142,247,0.28)',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.3), 0 8px 20px rgba(79,142,247,0.4)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(79,142,247,0.28)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Take Assessment <ArrowRight size={14} />
            </Link>
            <button
              onClick={() => setMobile(true)}
              className="lg:hidden"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                padding: '8px',
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: '#0D0D0F',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '17px',
                  letterSpacing: '-0.025em',
                }}
              >
                The Human Decision
              </span>
              <button
                onClick={() => setMobile(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  padding: '8px',
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.href && !link.items ? (
                    <Link
                      href={link.href}
                      onClick={() => setMobile(false)}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '24px',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <>
                      {link.href ? (
                        <Link
                          href={link.href}
                          onClick={() => setMobile(false)}
                          style={{
                            color: 'rgba(255,255,255,0.5)',
                            textDecoration: 'none',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '14px',
                            display: 'block',
                          }}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <div
                          style={{
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '14px',
                          }}
                        >
                          {link.label}
                        </div>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          paddingLeft: '8px',
                        }}
                      >
                        {link.items?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobile(false)}
                            style={{
                              color: 'rgba(255,255,255,0.75)',
                              textDecoration: 'none',
                              fontSize: '18px',
                              fontWeight: 500,
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/assessment"
              onClick={() => setMobile(false)}
              style={{
                marginTop: '32px',
                background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '18px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(79,142,247,0.3)',
              }}
            >
              Take the Assessment <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
