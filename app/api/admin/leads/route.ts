import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format')

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
      include: {
        assessment: {
          include: {
            scores: true,
          },
        },
      },
    })

    const data = leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      age: lead.age,
      gender: lead.gender,
      occupation: lead.occupation,
      industry: lead.industry,
      founderType: lead.founderType,
      yearsExp: lead.yearsExp,
      companySize: lead.companySize,
      workMode: lead.workMode,
      createdAt: lead.createdAt,
      score: lead.assessment?.scores?.attentionHealthScore ?? null,
      archetype: lead.assessment?.scores?.archetype ?? null,
      burnoutLoad: lead.assessment?.scores?.burnoutLoad ?? null,
      adhdRisk: lead.assessment?.scores?.adhdRiskIndicator ?? null,
    }))

    if (format === 'csv') {
      const headers = [
        'Name', 'Email', 'Age', 'Gender', 'Occupation', 'Industry',
        'Founder Type', 'Years Exp', 'Company Size', 'Work Mode',
        'Date', 'Overall Score', 'Archetype', 'Burnout Load', 'ADHD Risk'
      ]
      const rows = data.map((d) => [
        d.name, d.email, d.age, d.gender, d.occupation, d.industry,
        d.founderType, d.yearsExp, d.companySize, d.workMode,
        new Date(d.createdAt).toLocaleDateString(),
        d.score, d.archetype, d.burnoutLoad, d.adhdRisk
      ].map((v) => `"${v ?? ''}"`).join(','))

      const csv = [headers.join(','), ...rows].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="attention-health-leads-${Date.now()}.csv"`,
        },
      })
    }

    // Stats for dashboard
    const totalAssessments = await prisma.assessment.count()
    const avgScore = data.length > 0
      ? Math.round(data.reduce((sum, d) => sum + (d.score ?? 0), 0) / data.filter(d => d.score).length)
      : 0

    const archetypeCounts = data.reduce((acc, d) => {
      if (d.archetype) {
        acc[d.archetype] = (acc[d.archetype] ?? 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const mostCommonArchetype = Object.entries(archetypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A'

    return NextResponse.json({
      stats: {
        totalAssessments,
        leadsCollected: data.length,
        avgScore,
        mostCommonArchetype,
        archetypeDistribution: archetypeCounts,
      },
      leads: data,
    })
  } catch (error) {
    console.error('Admin leads error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
