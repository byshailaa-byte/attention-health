import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding sample assessment data...')

  const sessionId = `seed_session_${Date.now()}`

  const assessment = await prisma.assessment.create({
    data: {
      sessionId,
      status: 'completed',
      completedAt: new Date(),
    },
  })

  await prisma.score.create({
    data: {
      assessmentId: assessment.id,
      attentionHealthScore: 72,
      executivePerformance: 74,
      attentionDebtIndex: 45,
      burnoutLoad: 58,
      adhdRiskIndicator: 42,
      attentionControl: 68,
      executiveFunction: 74,
      workingMemory: 79,
      timeBlindness: 62,
      hyperfocus: 82,
      impulsivity: 65,
      emotionalRegulation: 70,
      functionalImpairment: 75,
      childhoodIndicators: 45,
      sleepRecovery: 64,
      digitalEnvironment: 60,
      archetype: 'hyperfocused-achiever',
      confidenceRating: 0.92,
      consistencyScore: 87,
    },
  })

  await prisma.lead.create({
    data: {
      assessmentId: assessment.id,
      name: 'Demo User',
      email: 'demo@attentionhealth.in',
      age: 32,
      gender: 'Male',
      occupation: 'Founder & CEO',
      industry: 'Technology / SaaS',
      founderType: 'Founder',
      yearsExp: 8,
      companySize: '11–50 people',
      workMode: 'Hybrid',
    },
  })

  await prisma.report.create({
    data: {
      assessmentId: assessment.id,
      insights: [],
      recommendations: [],
      nextSteps: [],
      aiNarrative:
        'Your attention profile reveals a distinctive pattern common among driven founders: exceptional depth when engaged, significant challenges with consistency across less stimulating work. Your working memory is a genuine strength, allowing you to hold complex problems in mind while planning.',
    },
  })

  console.log('✅ Seed complete. Assessment ID:', assessment.id)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
