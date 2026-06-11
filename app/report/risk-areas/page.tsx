'use client'

import { useAssessmentStore } from '@/lib/store'
import { DOMAIN_LABELS, DOMAIN_ICONS, DOMAIN_DESCRIPTIONS, getScoreColor } from '@/lib/scoring-engine'
import Link from 'next/link'
import { Brain, AlertTriangle, ArrowRight } from 'lucide-react'

export default function RiskAreasPage() {
  const { scores, reportData } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Complete the assessment to see risk areas.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const insights = reportData?.insights as Array<{ id: string; title: string; insight: string; category: string; icon?: string; actionable?: string }> ?? []
  const riskInsights = insights.filter((i) => i.category === 'risk')

  const domains = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]
  const riskDomains = domains
    .map(([key, label]) => ({ key, label, score: scores[key] as number, icon: DOMAIN_ICONS[key], desc: DOMAIN_DESCRIPTIONS[key] }))
    .filter(d => d.score < 60)
    .sort((a, b) => a.score - b.score)

  const getRiskLevel = (score: number) => {
    if (score < 40) return { label: 'Critical', color: '#EF4444', bg: '#FEE2E2' }
    if (score < 50) return { label: 'High Risk', color: '#F97316', bg: '#FFF7ED' }
    return { label: 'Moderate Risk', color: '#F59E0B', bg: '#FFFBEB' }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Risk Areas ⚠️</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          These domains are flagged for attention. Addressing these systematically will have the highest impact on your overall performance.
        </p>
      </div>

      {riskDomains.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {riskDomains.map(({ key, label, score, icon, desc }) => {
            const risk = getRiskLevel(score)
            return (
              <div
                key={key}
                className="rounded-2xl border p-5"
                style={{ backgroundColor: risk.bg, borderColor: `${risk.color}30` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{icon}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${risk.color}20`, color: risk.color }}
                  >
                    {risk.label}
                  </span>
                </div>
                <div className="font-bold text-gray-900 mb-1">{label}</div>
                <div className="text-xs text-gray-600 mb-3">{desc}</div>
                <div className="text-3xl font-black mb-3" style={{ color: risk.color }}>
                  {score}<span className="text-sm font-medium text-gray-400">/100</span>
                </div>
                <div className="w-full bg-white/60 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${score}%`, backgroundColor: risk.color }} />
                </div>
                <Link
                  href="/report/recommendations"
                  className="mt-3 flex items-center gap-1 text-xs font-semibold"
                  style={{ color: risk.color }}
                >
                  See Recommendations <ArrowRight size={11} />
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-green-50 rounded-2xl border border-green-100 p-8 text-center">
          <div className="text-3xl mb-3">🎉</div>
          <div className="font-bold text-green-800 mb-2">No Critical Risk Areas</div>
          <p className="text-sm text-green-700">All your domain scores are above the concern threshold. Focus on optimization rather than remediation.</p>
        </div>
      )}

      {riskInsights.length > 0 && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Risk Insights</h2>
          <div className="space-y-3">
            {riskInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-xl border border-red-100 shadow-sm p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{insight.icon ?? '⚠️'}</span>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">{insight.title}</div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">{insight.insight}</p>
                    {insight.actionable && (
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                        <p className="text-xs text-amber-800">→ <strong>Action:</strong> {insight.actionable}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
