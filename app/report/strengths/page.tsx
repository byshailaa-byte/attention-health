'use client'

import { useAssessmentStore } from '@/lib/store'
import { DOMAIN_LABELS, DOMAIN_ICONS, DOMAIN_DESCRIPTIONS, getScoreColor } from '@/lib/scoring-engine'
import { getInsightsByCategory } from '@/lib/insight-engine'
import Link from 'next/link'
import { Brain, Star } from 'lucide-react'

export default function StrengthsPage() {
  const { scores, reportData } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Complete the assessment to see your strengths.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const insights = reportData?.insights as Array<{ id: string; title: string; insight: string; category: string; icon?: string }> ?? []
  const strengthInsights = insights.filter((i) => i.category === 'strength')

  const domains = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]
  const topStrengths = domains
    .map(([key, label]) => ({ key, label, score: scores[key] as number, icon: DOMAIN_ICONS[key], desc: DOMAIN_DESCRIPTIONS[key] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Strengths ⭐</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          These are your cognitive advantages — the domains where you consistently outperform and where your greatest leverage lies.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {topStrengths.map(({ key, label, score, icon, desc }) => {
          const color = getScoreColor(score)
          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5"
                style={{ backgroundColor: color, transform: 'translate(30%, -30%)' }}
              />
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                <div
                  className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Star size={10} />
                  {score >= 80 ? 'Elite' : score >= 70 ? 'Strong' : 'Good'}
                </div>
              </div>
              <div className="font-bold text-gray-900 mb-1">{label}</div>
              <div className="text-xs text-gray-500 mb-3">{desc}</div>
              <div className="text-3xl font-black" style={{ color }}>{score}<span className="text-sm font-medium text-gray-400">/100</span></div>
              <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
              </div>
            </div>
          )
        })}
      </div>

      {strengthInsights.length > 0 && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Strength Insights</h2>
          <div className="space-y-3">
            {strengthInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{insight.icon ?? '⭐'}</span>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">{insight.title}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{insight.insight}</p>
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
