'use client'

import { useAssessmentStore } from '@/lib/store'
import { DOMAIN_LABELS, DOMAIN_ICONS, getScoreColor, getScoreLabel } from '@/lib/scoring-engine'
import Link from 'next/link'
import { Brain, ArrowRight, Rocket, Calendar, Zap, Phone } from 'lucide-react'

export default function NextStepsPage() {
  const { scores, reportData } = useAssessmentStore()

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Brain size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Complete the assessment to see your next steps.</p>
        <Link href="/assessment" className="px-6 py-3 text-white rounded-xl font-semibold text-sm" style={{ backgroundColor: '#1B4332' }}>
          Take the Assessment
        </Link>
      </div>
    )
  }

  const nextSteps = reportData?.nextSteps as Array<{
    week: number; theme: string; focus: string; actions: string[]
  }> ?? generateDefaultNextSteps(scores)

  // Top 3 priority domains (lowest scoring)
  const domainEntries = Object.entries(DOMAIN_LABELS) as [keyof typeof DOMAIN_LABELS, string][]
  const priorities = domainEntries
    .map(([key, label]) => ({ key, label, score: scores[key] as number, icon: DOMAIN_ICONS[key] }))
    .filter(d => d.key !== 'hyperfocus')
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  const priorityBorders = ['#EF4444', '#F59E0B', '#3B82F6']
  const priorityBgs = ['#FEF2F2', '#FFFBEB', '#EFF6FF']

  const dailyActions = [
    { icon: '🌅', action: '5-min morning clarity ritual (no phone for first 30 min)' },
    { icon: '⏱️', action: 'Write 3 priorities before checking email or messages' },
    { icon: '🧘', action: '10-min mindfulness or breath-work session' },
    { icon: '📴', action: 'Digital sunset: screens off 90 min before bed' },
  ]

  const nextStepCards = [
    {
      icon: '📋',
      title: 'Personalized Action Plan',
      description: 'Get a custom 90-day attention optimization plan tailored to your archetype.',
      cta: 'Get Your Plan →',
      bg: '#F0FDF4',
      color: '#1B4332',
    },
    {
      icon: '🧠',
      title: 'Attention Operating System™',
      description: 'Our flagship program for building sustainable high performance habits.',
      cta: 'Learn More →',
      bg: '#F5F3FF',
      color: '#6C63FF',
    },
    {
      icon: '🎯',
      title: '1:1 Coaching',
      description: 'Work with a certified Attention Health coach for personalized guidance.',
      cta: 'Book a Call →',
      bg: '#FFF7ED',
      color: '#D97706',
    },
    {
      icon: '👥',
      title: 'Team Attention Audit',
      description: 'Assess your team\'s collective attention health and unlock group performance.',
      cta: 'Request Audit →',
      bg: '#FFF1F2',
      color: '#DC2626',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">What&apos;s Next 🚀</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Your personalized action roadmap based on your attention profile.
          Focus on small, consistent actions that compound over time.
        </p>
      </div>

      {/* Banner */}
      <div
        className="rounded-2xl p-5 flex items-center justify-between text-white"
        style={{ backgroundColor: '#1B4332' }}
      >
        <div>
          <div className="font-bold mb-1">Focus on small, consistent actions</div>
          <p className="text-sm opacity-80">
            The biggest gains come from building sustainable habits, not dramatic overhauls.
          </p>
        </div>
        <Link
          href="/report/recommendations"
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-semibold flex-shrink-0"
          style={{ color: '#1B4332' }}
        >
          View Your Action Plan <ArrowRight size={14} />
        </Link>
      </div>

      {/* Your Priorities */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">Your Priorities</h2>
        <div className="grid grid-cols-3 gap-4">
          {priorities.map(({ key, label, score, icon }, i) => (
            <div
              key={key}
              className="rounded-2xl border-l-4 p-5"
              style={{ backgroundColor: priorityBgs[i], borderLeftColor: priorityBorders[i] }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${priorityBorders[i]}20`,
                    color: priorityBorders[i],
                  }}
                >
                  Priority {i + 1}
                </span>
              </div>
              <div className="font-bold text-gray-900 mb-1">{label}</div>
              <div className="text-2xl font-black mb-2" style={{ color: getScoreColor(score) }}>
                {score}/100
              </div>
              <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                {score < 50
                  ? 'Significant improvement opportunity with high leverage.'
                  : 'Moderate challenge — targeted effort will yield strong results.'}
              </div>
              <Link
                href="/report/recommendations"
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: priorityBorders[i] }}
              >
                Take Action <ArrowRight size={11} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Plan */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} style={{ color: '#1B4332' }} />
            <h2 className="font-bold text-gray-900">Your 30-Day Focus Plan</h2>
          </div>
          <div className="space-y-4">
            {nextSteps.map((week, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: '#1B4332' }}
                  >
                    {week.week}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Week {week.week}: {week.theme}</div>
                    <div className="text-xs text-gray-500">Focus: {week.focus}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {week.actions.map((action, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#1B4332' }} />
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Rocket size={14} style={{ color: '#1B4332' }} />
              <h3 className="font-bold text-sm text-gray-900">Recommended Next Steps</h3>
            </div>
            <div className="space-y-3">
              {nextStepCards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 border"
                  style={{ backgroundColor: card.bg, borderColor: `${card.color}30` }}
                >
                  <div className="text-xl mb-2">{card.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{card.title}</div>
                  <p className="text-xs text-gray-600 mb-2 leading-relaxed">{card.description}</p>
                  <span className="text-xs font-semibold" style={{ color: card.color }}>
                    {card.cta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily micro actions */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-amber-500" />
              <h3 className="font-bold text-sm text-gray-900">Daily Micro Actions</h3>
            </div>
            <div className="space-y-2.5">
              {dailyActions.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="rounded-2xl p-6 text-center bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
        <h2 className="text-xl font-bold mb-2">Want expert guidance?</h2>
        <p className="text-sm opacity-80 mb-4 max-w-md mx-auto">
          Our certified Attention Health coaches specialize in helping high performers
          implement these strategies and achieve lasting results.
        </p>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-sm mx-auto"
          style={{ color: '#1B4332' }}
        >
          <Phone size={16} />
          Book a Free Discovery Call →
        </button>
      </div>
    </div>
  )
}

function generateDefaultNextSteps(scores: { burnoutLoad: number; sleepRecovery: number; executiveFunction: number; attentionControl: number }) {
  return [
    {
      week: 1,
      theme: 'Foundation Reset',
      focus: scores.sleepRecovery < 55 ? 'Sleep & Recovery' : 'Environment Setup',
      actions: [
        'Set a consistent sleep schedule (same time ±30 min)',
        'Turn off all notifications after 9pm',
        'Identify your top 3 cognitive energy drains',
        'Start a 5-minute morning clarity ritual',
      ],
    },
    {
      week: 2,
      theme: 'Environment Design',
      focus: 'Focus Architecture',
      actions: [
        'Block 2 uninterrupted focus hours every morning',
        'Clean and organize your primary work environment',
        'Install a website blocker for your top 3 distractions',
        'Create a "shutdown ritual" at end of each workday',
      ],
    },
    {
      week: 3,
      theme: 'Execution Systems',
      focus: scores.executiveFunction < 60 ? 'Planning & Follow-Through' : 'Deep Work Habits',
      actions: [
        'Implement a weekly review every Sunday (30 min)',
        'Write 3 priority items each morning before checking email',
        'Double your time estimates for all tasks this week',
        'Establish a capture system for all thoughts and tasks',
      ],
    },
    {
      week: 4,
      theme: 'Sustainable Performance',
      focus: 'Long-Term Habits',
      actions: [
        'Review what worked in weeks 1-3 and systematize it',
        'Share one insight from your report with a trusted colleague',
        'Schedule a 30-day check-in with yourself',
        'Identify your next highest-leverage improvement area',
      ],
    },
  ]
}
