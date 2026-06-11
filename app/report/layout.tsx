'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  ClipboardList,
  Target,
  BarChart2,
  Star,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  Rocket,
  Users,
  Compass,
  Download,
  Share2,
  Phone,
  Brain,
  RefreshCcw,
  Check,
  Loader2,
} from 'lucide-react'
import { useAssessmentStore } from '@/lib/store'
import { calculateScores } from '@/lib/scoring-engine'
import { determineArchetype } from '@/lib/archetype-engine'

const NAV_ITEMS = [
  { href: '/report/summary', label: 'Executive Summary', icon: ClipboardList },
  { href: '/report/profile', label: 'Attention Profile', icon: Target },
  { href: '/report/domain-scores', label: 'Domain Scores', icon: BarChart2 },
  { href: '/report/strengths', label: 'Strengths', icon: Star },
  { href: '/report/risk-areas', label: 'Risk Areas', icon: AlertTriangle },
  { href: '/report/patterns', label: 'Patterns & Insights', icon: Sparkles },
  { href: '/report/recommendations', label: 'Recommendations', icon: Lightbulb },
  { href: '/report/next-steps', label: 'Next Steps', icon: Rocket },
  { href: '/report/benchmarks', label: 'Benchmarks', icon: Users },
]

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { lead, scores, responses, reportData, setScores } = useAssessmentStore()
  const [pdfLoading, setPdfLoading] = useState(false)
  const [shareLabel, setShareLabel] = useState<'Share Report' | 'Copied!'>('Share Report')

  // Recalculate scores from stored responses on every report load so fixes to the
  // scoring engine are reflected immediately without needing to retake the assessment.
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      const fresh = calculateScores(responses)
      const archetype = determineArchetype(fresh)
      setScores({ ...fresh, archetype: archetype.id })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initials = lead?.name
    ? lead.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AH'

  const assessmentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  const handlePDF = async () => {
    if (!scores || !lead || pdfLoading) return
    setPdfLoading(true)
    try {
      const res = await fetch('/api/report/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores, lead, reportData }),
      })
      if (!res.ok) return
      const html = await res.text()
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    } finally {
      setPdfLoading(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My Attention Health Report', url })
      } else {
        await navigator.clipboard.writeText(url)
        setShareLabel('Copied!')
        setTimeout(() => setShareLabel('Share Report'), 2000)
      }
    } catch {
      // user cancelled share dialog
    }
  }

  const handleCall = () => {
    window.open('mailto:hello@attentionhealth.in?subject=1:1%20Coaching%20Session%20Request&body=Hi%2C%20I%20just%20completed%20the%20Attention%20Health%20Assessment%20and%20would%20love%20to%20book%20a%201%3A1%20session.', '_blank')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col bg-white border-r border-gray-100 overflow-y-auto"
        style={{ minHeight: '100vh' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: '#1B4332' }}
            >
              <Brain size={16} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">The Human Decision — Attention Health™</div>
              <div className="text-[10px] text-gray-400">Measure. Understand. Improve.</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                style={active ? { backgroundColor: '#1B4332' } : undefined}
              >
                <Icon size={15} className={active ? 'text-white' : 'text-gray-400'} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User card */}
        {lead && (
          <div className="mx-3 mb-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: '#1B4332' }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-800 truncate">{lead.name}</div>
                <div className="text-[10px] text-gray-500 truncate">{lead.occupation}</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-400 space-y-0.5">
              <div>📅 {assessmentDate}</div>
              <div>📊 84 questions</div>
              {scores && (
                <div>
                  🎯 Overall:{' '}
                  <span className="font-semibold text-gray-600">{scores.attentionHealthScore}/100</span>
                </div>
              )}
            </div>
            <Link
              href="/assessment"
              className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 mt-2 transition-colors"
            >
              <RefreshCcw size={10} />
              Retake Assessment
            </Link>
          </div>
        )}

        {/* Motivational card */}
        <div className="mx-3 mb-4 p-3 rounded-xl text-white text-xs" style={{ backgroundColor: '#1B4332' }}>
          <div className="font-semibold mb-1">💡 Remember</div>
          <div className="text-green-100 leading-relaxed">
            Attention is trainable. Small changes today, big results tomorrow.
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Brain size={16} style={{ color: '#1B4332' }} />
            <span className="text-sm font-bold" style={{ color: '#1B4332' }}>
              The Human Decision — Attention Health™
            </span>
            {scores && (
              <span className="ml-2 text-xs text-gray-400">
                Report Score:{' '}
                <span className="font-semibold text-gray-700">{scores.attentionHealthScore}/100</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePDF}
              disabled={!scores || !lead || pdfLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {pdfLoading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
              {pdfLoading ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {shareLabel === 'Copied!' ? <Check size={12} className="text-green-600" /> : <Share2 size={12} />}
              {shareLabel}
            </button>
            <button
              onClick={handleCall}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: '#1B4332' }}
            >
              <Phone size={12} />
              Book a 1:1 Call
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto report-content">
          <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
