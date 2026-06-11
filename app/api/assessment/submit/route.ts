import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateScores } from '@/lib/scoring-engine'
import { determineArchetype } from '@/lib/archetype-engine'
import { evaluateInsights } from '@/lib/insight-engine'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId, responses } = body as {
      sessionId: string
      responses: Record<string, number>
    }

    if (!sessionId || !responses) {
      return NextResponse.json({ error: 'Missing sessionId or responses' }, { status: 400 })
    }

    // Upsert the assessment
    const assessment = await prisma.assessment.upsert({
      where: { sessionId },
      create: {
        sessionId,
        status: 'completed',
        completedAt: new Date(),
        responses: {
          create: Object.entries(responses).map(([questionId, value]) => ({
            questionId,
            value,
          })),
        },
      },
      update: {
        status: 'completed',
        completedAt: new Date(),
      },
    })

    // Calculate scores
    const scoreResult = calculateScores(responses)
    const archetype = determineArchetype(scoreResult)
    const fullScores = { ...scoreResult, archetype: archetype.id }

    // Evaluate insights
    const allInsights = evaluateInsights(fullScores)

    // Save scores
    await prisma.score.upsert({
      where: { assessmentId: assessment.id },
      create: {
        assessmentId: assessment.id,
        ...fullScores,
      },
      update: {
        ...fullScores,
      },
    })

    return NextResponse.json({
      assessmentId: assessment.id,
      scores: fullScores,
      archetype: archetype,
      insightCount: allInsights.length,
    })
  } catch (error) {
    console.error('Assessment submit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
