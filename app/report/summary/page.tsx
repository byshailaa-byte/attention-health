'use client'

import { useAssessmentStore } from '@/lib/store'
import { ScoreRing } from '@/components/report/ScoreRing'
import { DomainCard } from '@/components/report/DomainCard'
import { ADHDGauge } from '@/components/report/ADHDGauge'
import { StatusBadge } from '@/components/report/StatusBadge'
import { DOMAIN_LABELS, DOMAIN_ICONS, DOMAIN_DESCRIPTIONS, getPercentileRank } from '@/lib/scoring-engine'
import { getArchetypeById } from '@/lib/archetype-engine'
import Link from 'next/link'
import { Brain, TrendingUp, AlertCircle, ArrowRight, Sparkles } from 'lucide-react'

export default function SummaryPage() {
  const { scores, lead, reportData } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Report Data Found</h2>
        <p className="text-gray-500 mb-6">Complete the assessment to see your personalized report.</p>
        <Link
          href="/assessment"
          className="px-6 py-3 text-white rounded-xl font-semibold text-sm"
          style={{ backgroundColor: '#1B4332' }}
        >
          Take the Assessment →
        </Link>
      </div>
    )
  }

  const archetype = getArchetypeById(scores.archetype)
  const percentile = getPercentileRank(scores.attentionHealthScore)
  const insights = reportData?.insights as Array<{ id: string; title: string; insight: string; category: string; icon?: string }> ?? []
  const strengths = insights.filter((i) => i.category === 'strength').slice(0, 3)
  const patterns = insights.filter((i) => i.category === 'pattern').slice(0, 3)
  const risks = insights.filter((i) => i.category === 'risk').slice(0, 3)
  const recommendations = reportData?.recommendations as Array<{ title: string; insight: string; actionable?: string; icon?: string }> ?? []

  const domains = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]

  const domainScores = domains.map(([key, label]) => ({
    key,
    label,
    score: scores[key] as number,
    icon: DOMAIN_ICONS[key],
    description: DOMAIN_DESCRIPTIONS[key],
  }))

  const topStrengths = [...domainScores].sort((a, b) => b.score - a.score).slice(0, 3)
  const topChallenges = [...domainScores].sort((a, b) => a.score - b.score).slice(0, 3)

  const microInsights = [
    'Small daily habits compound into lasting cognitive change.',
    'Recovery is not optional — it is the foundation of performance.',
    'Understanding your attention profile is the first step to transforming it.',
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Your Attention Health Report — Executive Summary 👋
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
          This report provides a comprehensive analysis of your attention, cognitive performance, and mental energy.
          Use it as a roadmap to understand your patterns and unlock your potential.
        </p>
      </div>

      {/* Snapshot + Score */}
      <div className="grid grid-cols-3 gap-6">
        {/* Snapshot card */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} style={{ color: '#1B4332' }} />
            <h2 className="font-bold text-gray-900">Your Attention Snapshot</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            {reportData?.aiNarrative ??
              `Your attention profile reveals a unique combination of strengths and growth areas.
              Understanding these patterns is the foundation of high performance.`}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-black" style={{ color: '#1B4332' }}>
                {scores.executivePerformance}
              </div>
              <div className="text-xs text-green-700 font-medium mt-0.5">Executive Performance</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-amber-600">{scores.attentionDebtIndex}</div>
              <div className="text-xs text-amber-700 font-medium mt-0.5">Attention Debt Index</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-red-500">{scores.adhdRiskIndicator}</div>
              <div className="text-xs text-red-700 font-medium mt-0.5">ADHD Risk Indicator</div>
            </div>
          </div>
        </div>

        {/* Score ring */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center">
          <ScoreRing score={scores.attentionHealthScore} size={140} />
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Percentile Rank</div>
            <div className="font-bold text-gray-800">{percentile}</div>
          </div>
          {archetype && (
            <div
              className="mt-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: archetype.color }}
            >
              {archetype.emoji} {archetype.name.split(' ').slice(1).join(' ')}
            </div>
          )}
        </div>
      </div>

      {/* Domain Scores */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Your Domain Scores</h2>
          <Link href="/report/domain-scores" className="text-xs font-medium flex items-center gap-1" style={{ color: '#1B4332' }}>
            View Detail <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {domainScores.map(({ key, label, score, icon, description }) => (
            <DomainCard
              key={key}
              icon={icon}
              label={label}
              score={score}
              description={description}
              compact
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          * Scores range from 0–100. Higher scores = better performance, except Burnout Load (lower = better resilience).
        </p>
      </div>

      {/* Strengths / Challenges / Patterns */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-green-600" />
            <h3 className="font-bold text-sm text-gray-900">Top Strengths</h3>
          </div>
          <div className="space-y-3">
            {topStrengths.map(({ key, label, score, icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className="text-xs font-medium text-gray-700">{label}</span>
                </div>
                <StatusBadge score={score} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={16} className="text-amber-500" />
            <h3 className="font-bold text-sm text-gray-900">Key Areas to Improve</h3>
          </div>
          <div className="space-y-3">
            {topChallenges.map(({ key, label, score, icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className="text-xs font-medium text-gray-700">{label}</span>
                </div>
                <StatusBadge score={score} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} style={{ color: '#1B4332' }} />
            <h3 className="font-bold text-sm text-gray-900">Attention Patterns</h3>
          </div>
          <div className="space-y-2">
            {(patterns.length ? patterns : strengths).slice(0, 3).map((insight) => (
              <div key={insight.id} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-base leading-none flex-shrink-0">{insight.icon ?? '→'}</span>
                <span className="leading-relaxed">{insight.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADHD + Recommendations */}
      <div className="grid grid-cols-2 gap-6">
        {/* ADHD Risk */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-1">ADHD Risk Indicator</h3>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Based on your response patterns across attention, impulsivity, and childhood indicators.
          </p>
          <div className="flex justify-center mb-4">
            <ADHDGauge score={scores.adhdRiskIndicator} />
          </div>
          <div className="space-y-1.5 mb-4">
            {[
              `Attention Control: ${scores.attentionControl}/100`,
              `Impulse Regulation: ${scores.impulsivity}/100`,
              `Childhood Indicators: ${scores.childhoodIndicators}/100`,
              `Time Awareness: ${scores.timeBlindness}/100`,
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> This is not a diagnosis. Only a qualified health professional
              can diagnose ADHD. If these patterns are significantly impacting your daily life,
              we recommend seeking a professional evaluation.
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Personalized Recommendations</h3>
            <Link href="/report/recommendations" className="text-xs font-medium flex items-center gap-1" style={{ color: '#1B4332' }}>
              All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recommendations.slice(0, 5).map((rec, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: '#1B4332' }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-800 mb-0.5">
                    {rec.icon} {rec.title}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {rec.insight}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/report/next-steps"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white rounded-xl transition-colors"
            style={{ backgroundColor: '#1B4332' }}
          >
            View Your 30-Day Action Plan <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Micro insights strip */}
      <div className="grid grid-cols-3 gap-4">
        {microInsights.map((insight, i) => (
          <div
            key={i}
            className="rounded-xl p-4 text-white text-xs font-medium leading-relaxed"
            style={{ backgroundColor: i === 0 ? '#1B4332' : i === 1 ? '#2D6A4F' : '#40916C' }}
          >
            ✦ {insight}
          </div>
        ))}
      </div>
    </div>
  )
}
