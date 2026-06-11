import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getInsightsByCategory } from '@/lib/insight-engine'
import { generateNarrative } from '@/lib/openai'
import { getArchetypeById } from '@/lib/archetype-engine'
import type { LeadData } from '@/lib/store'
import type { ScoreResult } from '@/lib/scoring-engine'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { assessmentId, leadData, scores: clientScores } = body as {
      assessmentId?: string
      sessionId?: string
      scores?: ScoreResult
      leadData: LeadData
    }

    if (!leadData) {
      return NextResponse.json({ error: 'Missing leadData' }, { status: 400 })
    }

    // Try DB lookup first, fall back to client-provided scores
    let scores: ScoreResult | null = clientScores ?? null

    if (assessmentId) {
      try {
        const scoreRecord = await prisma.score.findUnique({ where: { assessmentId } })
        if (scoreRecord) {
          scores = {
            attentionHealthScore: scoreRecord.attentionHealthScore,
            executivePerformance: scoreRecord.executivePerformance,
            attentionDebtIndex: scoreRecord.attentionDebtIndex,
            burnoutLoad: scoreRecord.burnoutLoad,
            adhdRiskIndicator: scoreRecord.adhdRiskIndicator,
            attentionControl: scoreRecord.attentionControl,
            executiveFunction: scoreRecord.executiveFunction,
            workingMemory: scoreRecord.workingMemory,
            timeBlindness: scoreRecord.timeBlindness,
            hyperfocus: scoreRecord.hyperfocus,
            impulsivity: scoreRecord.impulsivity,
            emotionalRegulation: scoreRecord.emotionalRegulation,
            functionalImpairment: scoreRecord.functionalImpairment,
            childhoodIndicators: scoreRecord.childhoodIndicators,
            sleepRecovery: scoreRecord.sleepRecovery,
            digitalEnvironment: scoreRecord.digitalEnvironment,
            archetype: scoreRecord.archetype,
            confidenceRating: scoreRecord.confidenceRating,
            consistencyScore: scoreRecord.consistencyScore,
          }
        }
      } catch {
        // DB unavailable — fall through to clientScores
      }
    }

    if (!scores) {
      return NextResponse.json({ error: 'No scores available. Please complete the assessment first.' }, { status: 400 })
    }

    const archetype = getArchetypeById(scores.archetype)!

    // Save lead to DB in background (non-blocking)
    if (assessmentId) {
      prisma.lead.upsert({
        where: { assessmentId },
        create: {
          assessmentId,
          name: leadData.name,
          email: leadData.email,
          age: leadData.age,
          gender: leadData.gender,
          occupation: leadData.occupation,
          industry: leadData.industry,
          founderType: leadData.founderType,
          yearsExp: leadData.yearsExp,
          companySize: leadData.companySize,
          workMode: leadData.workMode,
        },
        update: {
          name: leadData.name,
          email: leadData.email,
          age: leadData.age,
          gender: leadData.gender,
          occupation: leadData.occupation,
          industry: leadData.industry,
          founderType: leadData.founderType,
          yearsExp: leadData.yearsExp,
          companySize: leadData.companySize,
          workMode: leadData.workMode,
        },
      }).catch(() => { /* DB unavailable — lead not persisted */ })
    }

    // Generate insights
    const patterns = getInsightsByCategory(scores, 'pattern', 6)
    const strengths = getInsightsByCategory(scores, 'strength', 5)
    const risks = getInsightsByCategory(scores, 'risk', 5)
    const recommendations = getInsightsByCategory(scores, 'recommendation', 6)

    // Generate next steps (30-day plan)
    const nextSteps = generateNextSteps(scores, archetype.id)

    // Generate AI narrative
    const aiNarrative = await generateNarrative(scores, archetype, {
      name: leadData.name,
      occupation: leadData.occupation,
      industry: leadData.industry,
      founderType: leadData.founderType,
      yearsExp: leadData.yearsExp,
    })

    // Generate a local reportId (used even if DB save fails)
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // Save report to DB in background (non-blocking)
    if (assessmentId) {
      prisma.report.upsert({
        where: { assessmentId },
        create: {
          assessmentId,
          insights: [...patterns, ...strengths, ...risks] as unknown as import('@prisma/client').Prisma.InputJsonValue,
          recommendations: recommendations as unknown as import('@prisma/client').Prisma.InputJsonValue,
          nextSteps: nextSteps as unknown as import('@prisma/client').Prisma.InputJsonValue,
          aiNarrative,
        },
        update: {
          insights: [...patterns, ...strengths, ...risks] as unknown as import('@prisma/client').Prisma.InputJsonValue,
          recommendations: recommendations as unknown as import('@prisma/client').Prisma.InputJsonValue,
          nextSteps: nextSteps as unknown as import('@prisma/client').Prisma.InputJsonValue,
          aiNarrative,
        },
      }).catch(() => { /* DB unavailable — report not persisted */ })
    }

    return NextResponse.json({
      reportId,
      fullReportData: {
        reportId,
        insights: [...patterns, ...strengths, ...risks],
        recommendations,
        nextSteps,
        aiNarrative,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Report generate error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateNextSteps(scores: ScoreResult, archetypeId: string) {
  const weeks = [
    {
      week: 1,
      theme: 'Foundation Reset',
      focus: 'Sleep & Recovery',
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
      focus: 'Planning & Follow-Through',
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
        'Review what worked in weeks 1-3 and systemize it',
        'Share one insight from your report with a trusted colleague',
        'Schedule a 30-day check-in with yourself',
        archetypeId === 'hyperfocused-achiever'
          ? 'Build your "interest bridge" for your top boring-but-important tasks'
          : 'Identify your next highest-leverage area for improvement',
      ],
    },
  ]

  return weeks
}
