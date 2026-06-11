'use client'

import { useAssessmentStore } from '@/lib/store'
import { DOMAIN_LABELS, DOMAIN_ICONS, DOMAIN_DESCRIPTIONS, getScoreColor, getScoreLabel } from '@/lib/scoring-engine'
import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function DomainScoresPage() {
  const { scores } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Complete the assessment to see domain scores.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const domains = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Domain Score Breakdown</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Detailed analysis of all 12 cognitive domains. Each score reflects your patterns across 5–10 targeted questions.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {domains.map(([key, label]) => {
          const score = scores[key] as number
          const color = getScoreColor(score)
          const badge = getScoreLabel(score)
          const icon = DOMAIN_ICONS[key]
          const desc = DOMAIN_DESCRIPTIONS[key]
          const isInverted = key === 'burnoutLoad'

          return (
            <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-bold text-gray-900">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {badge}
                </span>
              </div>

              <div className="flex items-end gap-3 mb-3">
                <span className="text-4xl font-black" style={{ color }}>{score}</span>
                <span className="text-gray-400 font-medium pb-1">/ 100</span>
                {isInverted && <span className="text-xs text-gray-400 pb-1">(lower = better)</span>}
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
                <div
                  className="h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${score}%`, backgroundColor: color }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Population avg: 58</span>
                <span className={score > 58 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                  {score > 58 ? `+${score - 58} above avg` : `${score - 58} below avg`}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
        <p className="text-xs text-amber-800">
          <strong>Note:</strong> Scores range from 0–100. Higher scores indicate better performance for all domains except{' '}
          <strong>Burnout Load</strong> (where lower scores indicate higher resilience and less burnout).
          Population averages are based on assessment data from 2,000+ participants.
        </p>
      </div>
    </div>
  )
}
