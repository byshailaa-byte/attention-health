import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getArchetypeById } from '@/lib/archetype-engine'
import { DOMAIN_LABELS, DOMAIN_ICONS, getScoreLabel, getScoreColor } from '@/lib/scoring-engine'
import type { ScoreResult } from '@/lib/scoring-engine'
import type { LeadData, ReportData } from '@/lib/store'

// POST — accepts scores/lead from store directly (no DB required)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { scores, lead, reportData } = body as {
      scores: ScoreResult
      lead: LeadData
      reportData: ReportData | null
    }

    if (!scores || !lead) {
      return NextResponse.json({ error: 'Missing scores or lead data' }, { status: 400 })
    }

    const archetype = getArchetypeById(scores.archetype)
    const domains = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]

    const html = generateReportHTML({
      lead,
      scores,
      archetype,
      report: reportData ? { aiNarrative: reportData.aiNarrative, recommendations: reportData.recommendations } : null,
      domains,
    })

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Report-Generated': new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET — legacy DB-backed path (requires assessmentId)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const assessmentId = searchParams.get('assessmentId')

  if (!assessmentId) {
    return NextResponse.json({ error: 'Missing assessmentId' }, { status: 400 })
  }

  try {
    const [scoreRecord, reportRecord, leadRecord] = await Promise.all([
      prisma.score.findUnique({ where: { assessmentId } }),
      prisma.report.findUnique({ where: { assessmentId } }),
      prisma.lead.findUnique({ where: { assessmentId } }),
    ])

    if (!scoreRecord || !leadRecord) {
      return NextResponse.json({ error: 'Report data not found' }, { status: 404 })
    }

    const archetype = getArchetypeById(scoreRecord.archetype)
    const domains = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]

    const html = generateReportHTML({
      lead: leadRecord,
      scores: scoreRecord,
      archetype,
      report: reportRecord,
      domains,
    })

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Report-Generated': new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateReportHTML({ lead, scores, archetype, report, domains }: {
  lead: { name: string; email: string; occupation: string; industry: string }
  scores: {
    attentionHealthScore: number
    attentionControl: number
    executiveFunction: number
    workingMemory: number
    timeBlindness: number
    hyperfocus: number
    impulsivity: number
    emotionalRegulation: number
    functionalImpairment: number
    childhoodIndicators: number
    sleepRecovery: number
    burnoutLoad: number
    digitalEnvironment: number
    adhdRiskIndicator: number
    archetype: string
  }
  archetype: { name: string; tagline: string; description: string; strengths: string[]; blindSpots: string[] } | undefined
  report: { aiNarrative: string; recommendations: unknown } | null
  domains: [string, string][]
}) {
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const scoreColor = getScoreColor(scores.attentionHealthScore)
  const scoreLabel = getScoreLabel(scores.attentionHealthScore)

  const domainRows = domains.map(([key, label]) => {
    const score = scores[key as keyof typeof scores] as number
    const color = getScoreColor(score)
    const badge = getScoreLabel(score)
    const icon = DOMAIN_ICONS[key as keyof typeof DOMAIN_ICONS]
    return `
      <tr style="border-bottom: 1px solid #E5E7EB;">
        <td style="padding: 10px 8px; font-size: 14px;">${icon} ${label}</td>
        <td style="padding: 10px 8px; font-size: 14px; font-weight: 600; color: ${color};">${score}/100</td>
        <td style="padding: 10px 8px;">
          <span style="background: ${color}20; color: ${color}; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600;">${badge}</span>
        </td>
        <td style="padding: 10px 8px;">
          <div style="background: #E5E7EB; border-radius: 9999px; height: 6px; width: 120px;">
            <div style="background: ${color}; height: 6px; border-radius: 9999px; width: ${score}%;"></div>
          </div>
        </td>
      </tr>`
  }).join('')

  const recommendations = Array.isArray(report?.recommendations) ? report.recommendations : []

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Attention Health Report — ${lead.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #111827; background: white; }
    .page { max-width: 800px; margin: 0 auto; padding: 48px; }
    h1 { font-size: 32px; font-weight: 800; }
    h2 { font-size: 22px; font-weight: 700; }
    h3 { font-size: 16px; font-weight: 600; }
    p { font-size: 14px; line-height: 1.7; color: #374151; }
    .cover { background: #1B4332; color: white; padding: 80px 60px; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; }
    .section { margin-top: 48px; padding-top: 48px; border-top: 1px solid #E5E7EB; }
    .score-circle { width: 140px; height: 140px; border-radius: 50%; border: 8px solid ${scoreColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .card { background: #F9FAFB; border-radius: 12px; padding: 20px; margin: 12px 0; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
    .badge-green { background: #D1FAE5; color: #065F46; }
    .badge-amber { background: #FEF3C7; color: #92400E; }
    .badge-red { background: #FEE2E2; color: #991B1B; }
    table { width: 100%; border-collapse: collapse; }
    @media print {
      .page { padding: 24px; }
    }
  </style>
</head>
<body>
  <!-- COVER PAGE -->
  <div class="cover">
    <div>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 60px;">
        <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px;">🧠</div>
        <div>
          <div style="font-weight: 800; font-size: 18px; color: white;">Attention Health™</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.7);">Measure. Understand. Improve.</div>
        </div>
      </div>
      <h1 style="color: white; font-size: 42px; margin-bottom: 16px; line-height: 1.2;">Attention Health<br/>Assessment Report</h1>
      <p style="color: rgba(255,255,255,0.8); font-size: 16px;">A comprehensive analysis of your cognitive performance,<br/>attention patterns, and personalized recommendations.</p>
    </div>
    <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin-bottom: 4px;">Prepared for</p>
          <p style="color: white; font-size: 20px; font-weight: 700;">${lead.name}</p>
          <p style="color: rgba(255,255,255,0.7); font-size: 13px;">${lead.occupation} · ${lead.industry}</p>
          <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin-top: 8px;">${date}</p>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 48px; font-weight: 900; color: white;">${scores.attentionHealthScore}</div>
          <div style="font-size: 12px; color: rgba(255,255,255,0.7);">Overall Score</div>
          <div style="background: rgba(255,255,255,0.15); padding: 4px 16px; border-radius: 9999px; font-size: 13px; color: white; font-weight: 600; margin-top: 6px;">${scoreLabel}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="page">
    <!-- EXECUTIVE SUMMARY -->
    <div class="section" style="margin-top: 0; padding-top: 0; border-top: none;">
      <h2 style="color: #1B4332; margin-bottom: 16px;">Executive Summary</h2>
      <div style="display: flex; gap: 24px; align-items: flex-start;">
        <div class="score-circle">
          <span style="font-size: 36px; font-weight: 900; color: ${scoreColor};">${scores.attentionHealthScore}</span>
          <span style="font-size: 11px; color: #6B7280; font-weight: 500;">${scoreLabel}</span>
        </div>
        <div style="flex: 1;">
          <p style="margin-bottom: 12px;">${report?.aiNarrative ?? 'Your personalized narrative will appear here.'}</p>
          <div style="display: flex; gap: 12px; margin-top: 16px;">
            <div style="flex: 1; background: #D1FAE5; border-radius: 8px; padding: 12px;">
              <div style="font-size: 11px; color: #065F46; font-weight: 600; margin-bottom: 4px;">EXECUTIVE PERFORMANCE</div>
              <div style="font-size: 24px; font-weight: 800; color: #1B4332;">${scores.attentionHealthScore}</div>
            </div>
            <div style="flex: 1; background: #FEE2E2; border-radius: 8px; padding: 12px;">
              <div style="font-size: 11px; color: #991B1B; font-weight: 600; margin-bottom: 4px;">ADHD RISK</div>
              <div style="font-size: 24px; font-weight: 800; color: #DC2626;">${scores.adhdRiskIndicator}</div>
            </div>
            <div style="flex: 1; background: #FEF3C7; border-radius: 8px; padding: 12px;">
              <div style="font-size: 11px; color: #92400E; font-weight: 600; margin-bottom: 4px;">BURNOUT LOAD</div>
              <div style="font-size: 24px; font-weight: 800; color: #D97706;">${scores.burnoutLoad}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DOMAIN SCORES -->
    <div class="section">
      <h2 style="color: #1B4332; margin-bottom: 20px;">Domain Score Breakdown</h2>
      <table>
        <thead>
          <tr style="background: #F5F0E8;">
            <th style="text-align: left; padding: 10px 8px; font-size: 12px; color: #6B7280; font-weight: 600;">DOMAIN</th>
            <th style="text-align: left; padding: 10px 8px; font-size: 12px; color: #6B7280; font-weight: 600;">SCORE</th>
            <th style="text-align: left; padding: 10px 8px; font-size: 12px; color: #6B7280; font-weight: 600;">STATUS</th>
            <th style="text-align: left; padding: 10px 8px; font-size: 12px; color: #6B7280; font-weight: 600;">VISUAL</th>
          </tr>
        </thead>
        <tbody>${domainRows}</tbody>
      </table>
      <p style="font-size: 11px; color: #9CA3AF; margin-top: 12px;">Higher scores = better performance, except Burnout Load (lower is better).</p>
    </div>

    <!-- ARCHETYPE -->
    ${archetype ? `
    <div class="section">
      <h2 style="color: #1B4332; margin-bottom: 16px;">Your Attention Archetype</h2>
      <div style="background: #1B4332; color: white; border-radius: 16px; padding: 28px;">
        <div style="font-size: 32px; margin-bottom: 12px;">${archetype.name.split(' ')[1] ?? '⚡'}</div>
        <h3 style="color: white; font-size: 22px; font-weight: 800; margin-bottom: 4px;">${archetype.name}</h3>
        <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 20px;">${archetype.tagline}</p>
        <p style="color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.7;">${archetype.description}</p>
        <div style="display: flex; gap: 24px; margin-top: 24px;">
          <div style="flex: 1;">
            <div style="font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 700; margin-bottom: 8px;">STRENGTHS</div>
            ${archetype.strengths.map(s => `<div style="font-size: 13px; color: rgba(255,255,255,0.85); margin-bottom: 4px;">✓ ${s}</div>`).join('')}
          </div>
          <div style="flex: 1;">
            <div style="font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 700; margin-bottom: 8px;">BLIND SPOTS</div>
            ${archetype.blindSpots.map(b => `<div style="font-size: 13px; color: rgba(255,255,255,0.85); margin-bottom: 4px;">→ ${b}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>` : ''}

    <!-- RECOMMENDATIONS -->
    <div class="section">
      <h2 style="color: #1B4332; margin-bottom: 16px;">Top Recommendations</h2>
      ${recommendations.slice(0, 5).map((rec: unknown, i: number) => {
        const r = rec as { title?: string; insight?: string; actionable?: string; icon?: string }
        return `
        <div class="card" style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px;">
          <div style="width: 32px; height: 32px; background: #1B4332; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; flex-shrink: 0;">${i + 1}</div>
          <div>
            <h3 style="margin-bottom: 6px;">${r.title ?? 'Recommendation'}</h3>
            <p style="font-size: 13px;">${r.insight ?? ''}</p>
            ${r.actionable ? `<div style="margin-top: 8px; background: #D1FAE5; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #065F46; font-weight: 500;">→ ${r.actionable}</div>` : ''}
          </div>
        </div>`
      }).join('')}
    </div>

    <!-- DISCLAIMER -->
    <div class="section">
      <div style="background: #FEF3C7; border-radius: 8px; padding: 16px;">
        <h3 style="color: #92400E; margin-bottom: 8px;">Important Disclaimer</h3>
        <p style="font-size: 12px; color: #78350F;">This report is for informational and self-development purposes only. It is not a medical diagnosis. The ADHD Risk Indicator is a screening tool — only a qualified health professional can diagnose ADHD or any other clinical condition. If you are experiencing significant impairment, please consult a licensed healthcare provider.</p>
      </div>
    </div>

    <!-- FOOTER -->
    <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 12px; color: #9CA3AF;">© 2025 Attention Health™ · attentionhealth.in</div>
      <div style="font-size: 12px; color: #9CA3AF;">Measure. Understand. Improve.</div>
    </div>
  </div>
</body>
</html>`
}
