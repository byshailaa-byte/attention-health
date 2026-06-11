'use client'

import { useAssessmentStore } from '@/lib/store'
import { DomainRadar } from '@/components/report/DomainRadar'
import { DOMAIN_LABELS } from '@/lib/scoring-engine'
import { getArchetypeById } from '@/lib/archetype-engine'
import Link from 'next/link'
import { Brain, Info } from 'lucide-react'

export default function PatternsPage() {
  const { scores, reportData } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Complete the assessment to see your patterns.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const archetype = getArchetypeById(scores.archetype)
  const insights = reportData?.insights as Array<{ id: string; title: string; insight: string; category: string; icon?: string }> ?? []
  const patternInsights = insights.filter((i) => i.category === 'pattern')

  const radarData = [
    { domain: 'Attention Control', score: scores.attentionControl, average: 58 },
    { domain: 'Executive Function', score: scores.executiveFunction, average: 62 },
    { domain: 'Working Memory', score: scores.workingMemory, average: 60 },
    { domain: 'Time Awareness', score: scores.timeBlindness, average: 55 },
    { domain: 'Hyperfocus', score: scores.hyperfocus, average: 52 },
    { domain: 'Impulse Control', score: scores.impulsivity, average: 61 },
    { domain: 'Emotional Regulation', score: scores.emotionalRegulation, average: 59 },
    { domain: 'Sleep & Recovery', score: scores.sleepRecovery, average: 56 },
  ]

  const topPatterns = [
    {
      icon: '⏱️',
      title: 'Time Blindness',
      score: scores.timeBlindness,
      description: scores.timeBlindness < 55
        ? 'Time estimation is a consistent challenge, affecting deadlines and planning accuracy.'
        : 'Your sense of time is reasonably calibrated, supporting reliable scheduling.',
      color: scores.timeBlindness < 55 ? '#F97316' : '#22C55E',
    },
    {
      icon: '⚙️',
      title: 'Executive Load',
      score: scores.executiveFunction,
      description: scores.executiveFunction < 60
        ? 'Planning and execution demands are stretching your executive capacity.'
        : 'Your executive function handles planning and execution demands effectively.',
      color: scores.executiveFunction < 60 ? '#F59E0B' : '#1B4332',
    },
    {
      icon: '⚡',
      title: 'Hyperfocus',
      score: scores.hyperfocus,
      description: scores.hyperfocus > 65
        ? 'Strong flow state capability — exceptional depth when engaged with meaningful work.'
        : 'Moderate hyperfocus tendency — some depth capacity but not highly consistent.',
      color: scores.hyperfocus > 65 ? '#6C63FF' : '#9CA3AF',
    },
    {
      icon: '🔋',
      title: 'Recovery Deficit',
      score: 100 - scores.sleepRecovery,
      description: scores.sleepRecovery < 55
        ? 'Recovery is compromised, creating a cognitive deficit that amplifies all other challenges.'
        : 'Recovery practices are adequate, providing a reasonable performance foundation.',
      color: scores.sleepRecovery < 55 ? '#EF4444' : '#22C55E',
    },
  ]

  const behavioralInsights = {
    triggers: scores.hyperfocus > 65
      ? ['Intellectually stimulating problems', 'High-stakes deadlines', 'Creative challenges', 'Passionate causes']
      : ['Clear, structured tasks', 'Social accountability', 'Time-bounded challenges', 'Meaningful outcomes'],
    disruptors: scores.digitalEnvironment < 55
      ? ['Notification overload', 'Context switching', 'Open-plan environments', 'Meeting-heavy days']
      : ['Ambiguous priorities', 'Energy depletion', 'Emotional stress', 'Unclear expectations'],
    energy: scores.burnoutLoad > 60
      ? ['Morning peak (declining by afternoon)', 'Post-meal dip is significant', 'Weekend recovery helps but incomplete', 'High variability day to day']
      : ['Stable morning-to-midday peak', 'Post-lunch moderate dip', 'Evening secondary window possible', 'Consistent day-to-day baseline'],
    focus: scores.attentionControl > 60
      ? ['Deep work in 90-120 min blocks', 'Morning hours most effective', 'Quiet environments amplify performance', 'Interest-alignment boosts duration']
      : ['Short sprints (25-45 min) work better', 'Structured environments help', 'External accountability improves focus', 'Reduces significantly under stress'],
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Patterns & Insights ℹ️</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Deep analysis of your cognitive patterns — how attention, energy, and performance interact in your specific profile.
        </p>
      </div>

      {/* Radar + Key Insight */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-2">Cognitive Pattern Map</h2>
          <DomainRadar data={radarData} size={320} />
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-1.5 mb-1">
              <Info size={12} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-600">What this means</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              The shape of your profile reveals where cognitive energy flows and where it gets blocked.
              Areas below the dotted line represent relative challenges vs. population.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {patternInsights.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Key Insight</h2>
              <div className="text-2xl mb-2">{patternInsights[0].icon ?? '💡'}</div>
              <h3 className="font-bold text-gray-800 mb-2">{patternInsights[0].title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{patternInsights[0].insight}</p>
              {patternInsights.length > 1 && (
                <div className="mt-4 space-y-2">
                  {patternInsights.slice(1, 3).map((insight) => (
                    <div key={insight.id} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                      <span className="text-base flex-shrink-0">{insight.icon ?? '→'}</span>
                      <div>
                        <div className="text-xs font-semibold text-gray-700">{insight.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{insight.insight}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {archetype && (
            <div
              className="rounded-2xl p-5 text-white"
              style={{ backgroundColor: archetype.color }}
            >
              <div className="text-2xl mb-2">{archetype.emoji}</div>
              <div className="font-bold mb-1">{archetype.name}</div>
              <p className="text-xs opacity-80 leading-relaxed">{archetype.description.slice(0, 120)}...</p>
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="text-xs opacity-60 font-semibold mb-1">Core Pattern</div>
                <div className="text-xs opacity-85">{archetype.tagline}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Patterns */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">Top Patterns Detected</h2>
        <div className="grid grid-cols-2 gap-4">
          {topPatterns.map((pattern) => (
            <div key={pattern.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{pattern.icon}</span>
                <div>
                  <div className="font-bold text-gray-900">{pattern.title}</div>
                  <div className="text-2xl font-black" style={{ color: pattern.color }}>
                    {pattern.score}<span className="text-sm font-medium text-gray-400">/100</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{pattern.description}</p>
              <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${pattern.score}%`, backgroundColor: pattern.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Behavioral Insights */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">Behavioral Insights</h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm">⚡</span>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">Performance Triggers</div>
            </div>
            <div className="space-y-2">
              {behavioralInsights.triggers.map((t) => (
                <div key={t} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm">⚠️</span>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">Common Disruptors</div>
            </div>
            <div className="space-y-2">
              {behavioralInsights.disruptors.map((d) => (
                <div key={d} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  {d}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm">🔋</span>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">Energy Patterns</div>
            </div>
            <div className="space-y-2">
              {behavioralInsights.energy.map((e) => (
                <div key={e} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  {e}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm">🎯</span>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">Focus Sweet Spot</div>
            </div>
            <div className="space-y-2">
              {behavioralInsights.focus.map((f) => (
                <div key={f} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
