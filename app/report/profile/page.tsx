'use client'

import { useAssessmentStore } from '@/lib/store'
import { DomainRadar } from '@/components/report/DomainRadar'
import { StatusBadge } from '@/components/report/StatusBadge'
import { DOMAIN_LABELS, DOMAIN_ICONS, DOMAIN_DESCRIPTIONS } from '@/lib/scoring-engine'
import { getArchetypeById } from '@/lib/archetype-engine'
import Link from 'next/link'
import { Brain, Info, ArrowRight } from 'lucide-react'

const RADAR_DOMAINS = [
  'attentionControl',
  'executiveFunction',
  'workingMemory',
  'timeBlindness',
  'hyperfocus',
  'impulsivity',
  'emotionalRegulation',
  'sleepRecovery',
] as const

export default function ProfilePage() {
  const { scores } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">No report data found.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const archetype = getArchetypeById(scores.archetype)

  const radarData = RADAR_DOMAINS.map((key) => ({
    domain: DOMAIN_LABELS[key],
    score: scores[key],
    average: 58,
  }))

  const domainInsights = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]

  const keyTakeaways = [
    scores.hyperfocus > 65
      ? 'Your hyperfocus capability is a significant asset — protect and channel it deliberately.'
      : 'Building deeper focus habits will unlock substantial performance gains.',
    scores.executiveFunction > 65
      ? 'Strong executive function gives you a reliable foundation for complex work.'
      : 'Improving executive function through external systems will have the highest leverage.',
    scores.sleepRecovery < 55
      ? 'Recovery is your most pressing priority — everything else improves when sleep does.'
      : 'Your recovery practices are supporting your performance well.',
    archetype
      ? `As ${archetype.name}, your primary opportunity is: ${archetype.blindSpots[0].toLowerCase()}.`
      : 'Understanding your archetype unlocks targeted improvement strategies.',
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Attention Profile</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Your attention profile shows how you perform across key cognitive domains.
            The radar chart compares your scores to population averages.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 max-w-xs">
          <div className="flex items-center gap-1.5 mb-1">
            <Info size={12} className="text-blue-600" />
            <span className="text-xs font-semibold text-blue-800">How to read this</span>
          </div>
          <p className="text-xs text-blue-700">
            Green fill = your scores. Dotted line = population average (58). Larger shape = stronger performance.
          </p>
        </div>
      </div>

      {/* Radar + Domain Insights */}
      <div className="grid grid-cols-2 gap-6">
        {/* Radar chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Cognitive Profile Map</h2>
          <DomainRadar data={radarData} />
        </div>

        {/* Domain insights table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Domain Insights</h2>
          <div className="space-y-2">
            {domainInsights.map(([key, label]) => {
              const score = scores[key]
              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{DOMAIN_ICONS[key]}</span>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">{label}</div>
                      <div className="text-[10px] text-gray-400 truncate max-w-[180px]">
                        {DOMAIN_DESCRIPTIONS[key]}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge score={score} />
                    <ArrowRight size={12} className="text-gray-300" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-3">Profile Summary</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Your cognitive profile shows{' '}
          <strong>
            {scores.attentionHealthScore >= 70 ? 'strong' : scores.attentionHealthScore >= 55 ? 'moderate' : 'developing'}
          </strong>{' '}
          overall attention health (score: {scores.attentionHealthScore}/100). Your top performing domains are{' '}
          <strong>
            {Object.entries(DOMAIN_LABELS)
              .map(([k, v]) => ({ key: k, label: v, score: scores[k as keyof typeof scores] as number }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 2)
              .map(d => d.label)
              .join(' and ')}
          </strong>
          , while your greatest growth opportunities lie in{' '}
          <strong>
            {Object.entries(DOMAIN_LABELS)
              .map(([k, v]) => ({ key: k, label: v, score: scores[k as keyof typeof scores] as number }))
              .sort((a, b) => a.score - b.score)
              .slice(0, 2)
              .map(d => d.label)
              .join(' and ')}
          </strong>
          . Your executive performance score of <strong>{scores.executivePerformance}/100</strong> places you{' '}
          {scores.executivePerformance >= 65 ? 'above' : 'below'} the population average.
        </p>
      </div>

      {/* Archetype card */}
      {archetype && (
        <div
          className="rounded-2xl p-6 text-white"
          style={{ backgroundColor: archetype.color }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-3xl mb-2">{archetype.emoji}</div>
              <h2 className="text-xl font-bold">{archetype.name}</h2>
              <p className="text-sm opacity-80 mt-1">{archetype.tagline}</p>
            </div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
              Your Archetype
            </span>
          </div>
          <p className="text-sm leading-relaxed opacity-90 mb-4">{archetype.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold opacity-60 uppercase mb-2">Strengths</div>
              {archetype.strengths.slice(0, 3).map((s) => (
                <div key={s} className="text-xs opacity-85 mb-1">✓ {s}</div>
              ))}
            </div>
            <div>
              <div className="text-xs font-bold opacity-60 uppercase mb-2">Blind Spots</div>
              {archetype.blindSpots.slice(0, 3).map((b) => (
                <div key={b} className="text-xs opacity-85 mb-1">→ {b}</div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs italic opacity-70">&ldquo;{archetype.quote}&rdquo;</p>
          </div>
        </div>
      )}

      {/* Key Takeaways */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">Key Takeaways</h2>
        <div className="space-y-3">
          {keyTakeaways.map((takeaway, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: '#1B4332' }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{takeaway}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
