import { QUESTIONS, getDomainQuestions } from './questions'

export interface DomainScores {
  attentionControl: number
  executiveFunction: number
  workingMemory: number
  timeBlindness: number
  hyperfocus: number
  impulsivity: number
  emotionalRegulation: number
  functionalImpairment: number
  childhoodIndicators: number
  sleepRecovery: number
  burnoutLoad: number
  digitalEnvironment: number
}

export interface ScoreResult extends DomainScores {
  attentionHealthScore: number
  executivePerformance: number
  attentionDebtIndex: number
  adhdRiskIndicator: number
  archetype: string
  confidenceRating: number
  consistencyScore: number
}

export type ResponseMap = Record<string, number>

const DOMAIN_WEIGHTS: Record<keyof DomainScores, number> = {
  attentionControl: 0.12,
  executiveFunction: 0.14,
  workingMemory: 0.10,
  timeBlindness: 0.08,
  hyperfocus: 0.08,
  impulsivity: 0.10,
  emotionalRegulation: 0.10,
  functionalImpairment: 0.12,
  childhoodIndicators: 0.06,
  sleepRecovery: 0.08,
  burnoutLoad: 0.08,
  digitalEnvironment: 0.04,
}

const MAX_LIKERT = 5
const MIN_LIKERT = 1

function scoreQuestion(questionId: string, rawValue: number): number {
  const question = QUESTIONS.find((q) => q.id === questionId)
  if (!question) return rawValue

  let value = rawValue
  // yes_no: 1=Yes, 0=No → convert to 1–5 scale (Yes=5, No=1 for childhoodIndicators)
  if (question.type === 'yes_no') {
    value = rawValue === 1 ? 5 : 1
  }

  if (question.reverseScored) {
    value = MAX_LIKERT + MIN_LIKERT - value
  }

  return value
}

function scoreDomain(domain: string, responses: ResponseMap): number {
  const domainQuestions = getDomainQuestions(domain)
  if (domainQuestions.length === 0) return 50

  let weightedSum = 0
  let totalWeight = 0

  for (const q of domainQuestions) {
    const rawValue = responses[q.id]
    if (rawValue === undefined) continue

    const scored = scoreQuestion(q.id, rawValue)
    weightedSum += scored * q.weight
    totalWeight += q.weight
  }

  if (totalWeight === 0) return 50

  const rawAvg = weightedSum / totalWeight
  // Normalize to 0–100
  const normalized = ((rawAvg - MIN_LIKERT) / (MAX_LIKERT - MIN_LIKERT)) * 100
  return Math.round(Math.max(0, Math.min(100, normalized)))
}

function checkConsistency(responses: ResponseMap): { score: number; confidence: number } {
  const consistencyQuestions = QUESTIONS.filter((q) => q.consistencyPairId)
  let totalDelta = 0
  let checked = 0

  for (const cq of consistencyQuestions) {
    const pairedId = cq.consistencyPairId!
    const cqValue = responses[cq.id]
    const pqValue = responses[pairedId]

    if (cqValue === undefined || pqValue === undefined) continue

    const cqScored = scoreQuestion(cq.id, cqValue)
    const pqScored = scoreQuestion(pairedId, pqValue)

    const cqNorm = ((cqScored - MIN_LIKERT) / (MAX_LIKERT - MIN_LIKERT)) * 100
    const pqNorm = ((pqScored - MIN_LIKERT) / (MAX_LIKERT - MIN_LIKERT)) * 100

    totalDelta += Math.abs(cqNorm - pqNorm)
    checked++
  }

  if (checked === 0) return { score: 100, confidence: 1.0 }

  const avgDelta = totalDelta / checked
  const consistencyScore = Math.max(0, 100 - avgDelta)

  // Confidence degrades if avg delta > 25
  let confidence: number
  if (avgDelta <= 15) confidence = 1.0
  else if (avgDelta <= 25) confidence = 0.85
  else if (avgDelta <= 40) confidence = 0.70
  else confidence = 0.55

  return { score: Math.round(consistencyScore), confidence }
}

export function calculateScores(responses: ResponseMap): Omit<ScoreResult, 'archetype'> {
  const domains = Object.keys(DOMAIN_WEIGHTS) as (keyof DomainScores)[]

  const domainScores = {} as DomainScores
  for (const domain of domains) {
    domainScores[domain] = scoreDomain(domain, responses)
  }

  // burnoutLoad is stored as a resilience score: high = resilient (good), low = burned out (bad)
  domainScores.burnoutLoad = 100 - domainScores.burnoutLoad

  // Composite: Attention Health Score — all domains now high=good, no inversion needed
  let weightedTotal = 0
  let totalWeight = 0
  for (const domain of domains) {
    const weight = DOMAIN_WEIGHTS[domain]
    const score = domainScores[domain]
    weightedTotal += score * weight
    totalWeight += weight
  }
  const attentionHealthScore = Math.round(weightedTotal / totalWeight)

  // Executive Performance: executiveFunction 40% + workingMemory 30% + attentionControl 30%
  const executivePerformance = Math.round(
    domainScores.executiveFunction * 0.4 +
    domainScores.workingMemory * 0.3 +
    domainScores.attentionControl * 0.3
  )

  // Attention Debt Index: low burnout resilience + low sleep + high functional impairment = high debt
  const burnoutContrib = (100 - domainScores.burnoutLoad) * 0.4
  const sleepContrib = (100 - domainScores.sleepRecovery) * 0.35
  const impairmentContrib = (100 - domainScores.functionalImpairment) * 0.25
  const attentionDebtIndex = Math.round(burnoutContrib + sleepContrib + impairmentContrib)

  // ADHD Risk: low attention control + high impulsivity + childhood indicators + low exec fn + time blindness
  const adhdRiskIndicator = Math.round(
    (100 - domainScores.attentionControl) * 0.25 +
    domainScores.impulsivity * 0.20 +
    domainScores.childhoodIndicators * 0.25 +
    (100 - domainScores.executiveFunction) * 0.15 +
    (100 - domainScores.timeBlindness) * 0.15
  )

  const { score: consistencyScore, confidence: confidenceRating } = checkConsistency(responses)

  return {
    ...domainScores,
    attentionHealthScore: Math.max(0, Math.min(100, attentionHealthScore)),
    executivePerformance: Math.max(0, Math.min(100, executivePerformance)),
    attentionDebtIndex: Math.max(0, Math.min(100, attentionDebtIndex)),
    adhdRiskIndicator: Math.max(0, Math.min(100, adhdRiskIndicator)),
    confidenceRating,
    consistencyScore,
  }
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Strength'
  if (score >= 65) return 'Good'
  if (score >= 50) return 'Fair'
  if (score >= 35) return 'Needs Attention'
  return 'High Risk'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#1B4332'
  if (score >= 65) return '#22C55E'
  if (score >= 50) return '#F59E0B'
  if (score >= 35) return '#F97316'
  return '#EF4444'
}

export function getPercentileRank(score: number): string {
  // Based on population distribution (approximated)
  if (score >= 90) return 'Top 5%'
  if (score >= 80) return 'Top 15%'
  if (score >= 70) return 'Top 30%'
  if (score >= 60) return 'Top 45%'
  if (score >= 50) return 'Top 55%'
  if (score >= 40) return 'Top 70%'
  return 'Bottom 30%'
}

export function getADHDRiskLevel(score: number): string {
  if (score >= 75) return 'High'
  if (score >= 55) return 'Moderate'
  if (score >= 35) return 'Low-Moderate'
  return 'Low'
}

export const DOMAIN_LABELS: Record<keyof DomainScores, string> = {
  attentionControl: 'Attention Control',
  executiveFunction: 'Executive Function',
  workingMemory: 'Working Memory',
  timeBlindness: 'Time Awareness',
  hyperfocus: 'Hyperfocus',
  impulsivity: 'Impulse Control',
  emotionalRegulation: 'Emotional Regulation',
  functionalImpairment: 'Daily Functioning',
  childhoodIndicators: 'Childhood Patterns',
  sleepRecovery: 'Sleep & Recovery',
  burnoutLoad: 'Burnout Resilience',
  digitalEnvironment: 'Digital Discipline',
}

export const DOMAIN_ICONS: Record<keyof DomainScores, string> = {
  attentionControl: '🎯',
  executiveFunction: '⚙️',
  workingMemory: '🧠',
  timeBlindness: '⏱️',
  hyperfocus: '⚡',
  impulsivity: '🌊',
  emotionalRegulation: '❤️',
  functionalImpairment: '📊',
  childhoodIndicators: '🌱',
  sleepRecovery: '🌙',
  burnoutLoad: '🔥',
  digitalEnvironment: '📱',
}

export const DOMAIN_DESCRIPTIONS: Record<keyof DomainScores, string> = {
  attentionControl: 'Ability to direct and sustain focus on chosen tasks',
  executiveFunction: 'Planning, organizing, and completing complex tasks',
  workingMemory: 'Holding and manipulating information in real-time',
  timeBlindness: 'Perceiving and managing time accurately',
  hyperfocus: 'Ability to enter deep, sustained focus states',
  impulsivity: 'Resisting distractions and thinking before acting',
  emotionalRegulation: 'Managing emotions to maintain consistent performance',
  functionalImpairment: 'Real-world impact of attention patterns',
  childhoodIndicators: 'Long-standing attention patterns from early life',
  sleepRecovery: 'Cognitive restoration through sleep and rest',
  burnoutLoad: 'Resilience to sustained cognitive and emotional demands',
  digitalEnvironment: 'Managing digital distractions and notifications',
}
