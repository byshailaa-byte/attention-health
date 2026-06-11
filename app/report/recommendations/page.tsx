'use client'

import { useAssessmentStore } from '@/lib/store'
import Link from 'next/link'
import { Brain, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function RecommendationsPage() {
  const { scores, reportData } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Complete the assessment to see recommendations.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const recommendations = reportData?.recommendations as Array<{
    title: string; insight: string; actionable?: string; icon?: string; category?: string
  }> ?? []

  const colors = ['#1B4332', '#6C63FF', '#D97706', '#DC2626', '#0EA5E9', '#8B5CF6']

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Recommendations</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Evidence-based recommendations personalized to your attention profile. Start with Priority 1 and work your way through.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                {rec.icon ? (
                  <span className="text-xl">{rec.icon}</span>
                ) : (
                  i + 1
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{rec.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{rec.insight}</p>
                  </div>
                  <span
                    className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${colors[i % colors.length]}15`,
                      color: colors[i % colors.length],
                    }}
                  >
                    Priority {i + 1}
                  </span>
                </div>
                {rec.actionable && (
                  <div className="mt-4 flex items-start gap-2 bg-green-50 rounded-xl p-3 border border-green-100">
                    <CheckCircle2 size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-green-800 mb-0.5">Your Action Step</div>
                      <p className="text-xs text-green-700 leading-relaxed">{rec.actionable}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {recommendations.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-gray-500">Your personalized recommendations will appear here after completing your profile.</p>
            <Link href="/unlock" className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-white rounded-xl text-sm font-semibold" style={{ backgroundColor: '#1B4332' }}>
              Complete Your Profile <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      <div
        className="rounded-2xl p-6 text-white flex items-center justify-between"
        style={{ backgroundColor: '#1B4332' }}
      >
        <div>
          <div className="font-bold mb-1">Ready to implement these?</div>
          <p className="text-sm opacity-80">Get your personalized 30-day action plan.</p>
        </div>
        <Link
          href="/report/next-steps"
          className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl font-semibold text-sm flex-shrink-0"
          style={{ color: '#1B4332' }}
        >
          View 30-Day Plan <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
