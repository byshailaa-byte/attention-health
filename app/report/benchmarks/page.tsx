'use client'

import { useAssessmentStore } from '@/lib/store'
import { DOMAIN_LABELS, DOMAIN_ICONS, getPercentileRank } from '@/lib/scoring-engine'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import Link from 'next/link'
import { Brain, Users } from 'lucide-react'

const POPULATION_AVERAGES: Record<string, number> = {
  attentionControl: 58,
  executiveFunction: 62,
  workingMemory: 60,
  timeBlindness: 55,
  hyperfocus: 52,
  impulsivity: 61,
  emotionalRegulation: 59,
  functionalImpairment: 64,
  childhoodIndicators: 45,
  sleepRecovery: 56,
  burnoutLoad: 48,
  digitalEnvironment: 54,
}

const PERCENTILE_CONTEXT = [
  { range: '90-100', label: 'Top 10%', description: 'Elite cognitive performance', color: '#1B4332' },
  { range: '75-89', label: 'Top 25%', description: 'High performer', color: '#22C55E' },
  { range: '55-74', label: 'Above Average', description: 'Strong overall performance', color: '#84CC16' },
  { range: '40-54', label: 'Average', description: 'Room for meaningful growth', color: '#F59E0B' },
  { range: '25-39', label: 'Below Average', description: 'Significant improvement opportunity', color: '#F97316' },
  { range: '0-24', label: 'Needs Focus', description: 'Priority area for intervention', color: '#EF4444' },
]

export default function BenchmarksPage() {
  const { scores } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Complete the assessment to see benchmarks.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const domains = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]
  const chartData = domains.map(([key, label]) => ({
    domain: label.split(' ').map(w => w.slice(0, 4)).join(' '),
    fullLabel: label,
    yours: scores[key] as number,
    average: POPULATION_AVERAGES[key] ?? 58,
    diff: (scores[key] as number) - (POPULATION_AVERAGES[key] ?? 58),
  }))

  const percentile = getPercentileRank(scores.attentionHealthScore)
  const aboveAvg = chartData.filter(d => d.diff > 0).length
  const belowAvg = chartData.filter(d => d.diff < 0).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Benchmarks</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          See how your scores compare to population averages across all 12 cognitive domains.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-3xl font-black" style={{ color: '#1B4332' }}>{scores.attentionHealthScore}</div>
          <div className="text-xs text-gray-500 mt-1">Your Overall Score</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-3xl font-black text-gray-600">58</div>
          <div className="text-xs text-gray-500 mt-1">Population Average</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-xl font-black" style={{ color: '#1B4332' }}>{percentile}</div>
          <div className="text-xs text-gray-500 mt-1">Your Percentile</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <div className="text-2xl font-black text-green-600">{aboveAvg}</div>
          <div className="text-xs text-gray-500 mt-1">Domains Above Avg</div>
        </div>
      </div>

      {/* Bar chart comparison */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-2">
          <Users size={16} style={{ color: '#1B4332' }} />
          <h2 className="font-bold text-gray-900">Your Scores vs. Population Average</h2>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1B4332' }} />
            <span className="text-xs text-gray-600">Your Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-gray-300" />
            <span className="text-xs text-gray-600">Population Average</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="domain" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
            <Tooltip
              formatter={(value, name) => [value, name === 'yours' ? 'Your Score' : 'Population Average']}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.fullLabel ?? label}
            />
            <ReferenceLine y={58} stroke="#9CA3AF" strokeDasharray="4 2" />
            <Bar dataKey="yours" fill="#1B4332" radius={[4, 4, 0, 0]} name="yours" />
            <Bar dataKey="average" fill="#E5E7EB" radius={[4, 4, 0, 0]} name="average" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Domain comparison table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Domain-by-Domain Comparison</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {chartData.map((d) => (
            <div key={d.domain} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 w-48">
                <span>{DOMAIN_ICONS[Object.keys(DOMAIN_LABELS).find(k => DOMAIN_LABELS[k as keyof typeof DOMAIN_LABELS] === d.fullLabel) as keyof typeof DOMAIN_ICONS]}</span>
                <span className="text-sm font-medium text-gray-700">{d.fullLabel}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right w-16">
                  <div className="font-bold text-gray-900">{d.yours}</div>
                  <div className="text-xs text-gray-400">Yours</div>
                </div>
                <div className="text-right w-16">
                  <div className="font-bold text-gray-400">{d.average}</div>
                  <div className="text-xs text-gray-400">Average</div>
                </div>
                <div className="w-20 text-right">
                  <span
                    className="text-xs font-bold"
                    style={{ color: d.diff >= 0 ? '#16A34A' : '#DC2626' }}
                  >
                    {d.diff >= 0 ? '+' : ''}{d.diff}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Percentile scale */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">Percentile Scale Reference</h2>
        <div className="space-y-2">
          {PERCENTILE_CONTEXT.map((p) => (
            <div key={p.range} className="flex items-center gap-4">
              <div className="w-16 text-xs font-bold text-right" style={{ color: p.color }}>{p.range}</div>
              <div className="w-28 text-xs font-semibold" style={{ color: p.color }}>{p.label}</div>
              <div className="text-xs text-gray-500">{p.description}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Based on data from 2,000+ assessments completed by founders, executives, and knowledge workers across India.
        </p>
      </div>
    </div>
  )
}
