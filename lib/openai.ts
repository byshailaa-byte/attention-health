import type { ScoreResult } from './scoring-engine'
import type { Archetype } from './archetype-engine'

interface LeadContext {
  name: string
  occupation: string
  industry: string
  founderType: string
  yearsExp: number
}

export async function generateNarrative(
  scores: ScoreResult,
  archetype: Archetype,
  lead: LeadContext
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return generateFallbackNarrative(scores, archetype, lead)
  }

  try {
    const prompt = buildPrompt(scores, archetype, lead)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are the lead behavioral scientist at Attention Health. You write
              personalized, empathetic, and insightful cognitive assessment narratives.
              Your tone is warm, intelligent, and actionable — like a brilliant coach who
              sees you clearly. You never use generic advice. Every sentence must feel
              specifically written for this person. Write in second person (you/your).
              Never diagnose. Keep length to 3 paragraphs (200-250 words total).`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.75,
        max_tokens: 400,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content ?? generateFallbackNarrative(scores, archetype, lead)
  } catch (error) {
    console.error('OpenAI narrative generation failed:', error)
    return generateFallbackNarrative(scores, archetype, lead)
  }
}

function buildPrompt(scores: ScoreResult, archetype: Archetype, lead: LeadContext): string {
  const topStrengths = getTopDomains(scores, true)
  const topChallenges = getTopDomains(scores, false)

  return `
Write a personalized attention health narrative for this person:

PROFILE:
- Name: ${lead.name}
- Role: ${lead.occupation} in ${lead.industry}
- Experience: ${lead.yearsExp} years
- Type: ${lead.founderType}
- Archetype: ${archetype.name} — "${archetype.tagline}"

SCORES (0-100):
- Overall Attention Health: ${scores.attentionHealthScore}/100
- Executive Performance: ${scores.executivePerformance}/100
- Attention Debt Index: ${scores.attentionDebtIndex}/100
- ADHD Risk Indicator: ${scores.adhdRiskIndicator}/100
- Burnout Load: ${scores.burnoutLoad}/100
- Sleep & Recovery: ${scores.sleepRecovery}/100
- Hyperfocus: ${scores.hyperfocus}/100
- Impulse Control: ${scores.impulsivity}/100
- Emotional Regulation: ${scores.emotionalRegulation}/100
- Executive Function: ${scores.executiveFunction}/100
- Attention Control: ${scores.attentionControl}/100
- Working Memory: ${scores.workingMemory}/100

TOP STRENGTHS: ${topStrengths.join(', ')}
KEY CHALLENGES: ${topChallenges.join(', ')}

Write 3 paragraphs:
1. What this profile reveals about how ${lead.name} operates (specific, not generic)
2. The most important pattern to understand — what is driving current performance or challenges
3. The single most impactful change that would create leverage for this specific profile

Make it feel like you know them. Reference their archetype naturally. Be honest about challenges without being discouraging.
  `.trim()
}

function getTopDomains(scores: ScoreResult, highest: boolean): string[] {
  const domainMap: Record<string, number> = {
    'Attention Control': scores.attentionControl,
    'Executive Function': scores.executiveFunction,
    'Working Memory': scores.workingMemory,
    'Time Awareness': scores.timeBlindness,
    Hyperfocus: scores.hyperfocus,
    'Impulse Control': scores.impulsivity,
    'Emotional Regulation': scores.emotionalRegulation,
    'Sleep & Recovery': scores.sleepRecovery,
  }

  const sorted = Object.entries(domainMap).sort((a, b) =>
    highest ? b[1] - a[1] : a[1] - b[1]
  )

  return sorted.slice(0, 3).map(([name]) => name)
}

function generateFallbackNarrative(
  scores: ScoreResult,
  archetype: Archetype,
  lead: LeadContext
): string {
  const ahs = scores.attentionHealthScore
  const performance = ahs >= 70 ? 'strong' : ahs >= 55 ? 'moderate' : 'challenged'
  const burnoutNote =
    scores.burnoutLoad > 65
      ? ' However, elevated burnout is currently limiting your access to these capabilities.'
      : ' Your energy management appears to be supporting rather than undermining your potential.'

  const hyperfocusNote =
    scores.hyperfocus > 68
      ? `One of your most distinctive traits as ${archetype.name} is your capacity for deep, interest-driven focus. When engaged, you produce work that most people cannot match — but this same intensity creates consistency challenges when motivation is absent.`
      : `Your attention profile shows a more distributed pattern — not the dramatic peaks of hyperfocus, but the steady, intentional focus of someone who has built reliable systems. This consistency has real value.`

  const closingNote =
    scores.sleepRecovery < 55
      ? `The highest-leverage change available to you right now is improving your sleep and recovery. Every other metric in your profile would improve measurably with adequate recovery — it is the foundation everything else rests on.`
      : scores.burnoutLoad > 65
      ? `Reducing your cognitive load and protecting recovery time would have the most immediate and dramatic impact on your performance. Your baseline capability is strong — you need space to express it.`
      : `Building deliberate deep work habits — protecting 2+ hours daily for your most cognitively demanding tasks — would likely create the biggest performance leap given your current profile.`

  return `${lead.name}, your Attention Health assessment reveals a ${performance} overall profile that reflects both genuine cognitive strengths and specific patterns worth understanding. As ${archetype.name}, you experience attention in a distinctive way that shapes how you work, lead, and perform.${burnoutNote}

${hyperfocusNote} Your executive function and attention control scores suggest ${scores.executiveFunction > 65 ? 'strong planning and organizational capability' : 'room for improvement in planning and systematic execution'}, while your ${scores.emotionalRegulation > 65 ? 'emotional regulation is a genuine strength' : 'emotional regulation presents opportunities for growth'}.

${closingNote} The patterns in your report are not fixed — they are a starting point for intentional development. The most effective interventions for your specific profile are detailed in your recommendations section.`
}
