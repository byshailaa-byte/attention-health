import type { DomainScores, ScoreResult } from './scoring-engine'

export interface Archetype {
  id: string
  name: string
  tagline: string
  color: string
  bgColor: string
  icon: string
  emoji: string
  description: string
  deepDive: string
  strengths: string[]
  blindSpots: string[]
  risks: string[]
  quote: string
  strategies: string[]
  famousExamples: string[]
  matchCriteria: ArchetypeCondition[]
  priority: number
}

interface ArchetypeCondition {
  domain: keyof DomainScores | 'attentionHealthScore' | 'adhdRiskIndicator' | 'burnoutLoad'
  operator: '>' | '<' | '>=' | '<='
  value: number
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'attention-athlete',
    name: 'The Attention Athlete',
    tagline: 'Peak cognitive performance across all domains',
    color: '#1B4332',
    bgColor: '#D1FAE5',
    icon: '🏆',
    emoji: '🏆',
    description:
      'You operate at the highest level of cognitive function. Your attention is sharp, your executive skills are strong, and you have built systems that protect and amplify your mental performance. You are in the top tier of attention health.',
    deepDive:
      'Attention Athletes have developed both natural cognitive gifts and disciplined habits. You understand your peak performance windows, protect them fiercely, and recover well. Your challenge is maintaining this edge as demands increase.',
    strengths: [
      'Consistently high focus and execution',
      'Strong working memory and planning',
      'Excellent emotional self-regulation',
      'Effective recovery and rest habits',
    ],
    blindSpots: [
      'May underestimate others\' cognitive struggles',
      'Perfectionism can slow output',
      'Overconfidence in capacity during high-demand periods',
    ],
    risks: [
      'Burnout if high standards are applied without limits',
      'Performance cliff if sleep or recovery routines slip',
    ],
    quote: 'You\'ve built the machine. Now run it sustainably.',
    strategies: [
      'Maintain your recovery rituals as a non-negotiable',
      'Share your systems — teach others how you perform',
      'Build resilience plans for high-pressure seasons',
      'Use your edge for your highest-leverage work',
    ],
    famousExamples: ['Satya Nadella', 'Indra Nooyi', 'Bill Gates'],
    matchCriteria: [
      { domain: 'attentionHealthScore', operator: '>=', value: 78 },
      { domain: 'executiveFunction', operator: '>=', value: 70 },
      { domain: 'attentionControl', operator: '>=', value: 68 },
    ],
    priority: 1,
  },
  {
    id: 'consistent-builder',
    name: 'The Consistent Builder',
    tagline: 'Steady, reliable execution with room to accelerate',
    color: '#2D6A4F',
    bgColor: '#DCFCE7',
    icon: '🏗️',
    emoji: '🏗️',
    description:
      'You have strong execution skills and deliver reliably. Your systems work, your focus is dependable, and you meet your commitments. You may not have explosive bursts, but your consistency compounds over time into exceptional outcomes.',
    deepDive:
      'Consistent Builders are the backbone of high-performing teams and organizations. You show up, execute, and build momentum. Your opportunity is to unlock the next level — deeper focus states and higher-leverage prioritization.',
    strengths: [
      'Reliable, predictable execution',
      'Strong planning and organizational skills',
      'Good work-life balance and recovery',
      'High follow-through on commitments',
    ],
    blindSpots: [
      'May avoid the risk and discomfort of high-stakes deep work',
      'Can get stuck in routines that have diminishing returns',
      'Underestimates own capacity for breakthrough performance',
    ],
    risks: [
      'Plateau effect — consistency without growth',
      'Missed opportunities from not pursuing stretch goals',
    ],
    quote: 'Your consistency is your superpower. Now find your rocket fuel.',
    strategies: [
      'Introduce deliberate deep work blocks (90-minute sprints)',
      'Identify your single highest-leverage daily task',
      'Experiment with new focus techniques (Pomodoro, time-boxing)',
      'Find accountability partners who push you toward bigger goals',
    ],
    famousExamples: ['Warren Buffett', 'Jeff Bezos (early years)', 'Narayana Murthy'],
    matchCriteria: [
      { domain: 'executiveFunction', operator: '>=', value: 65 },
      { domain: 'attentionControl', operator: '>=', value: 62 },
      { domain: 'burnoutLoad', operator: '<=', value: 55 },
    ],
    priority: 2,
  },
  {
    id: 'hyperfocused-achiever',
    name: 'The Hyperfocused Achiever',
    tagline: 'Deep focus, inconsistent execution',
    color: '#6C63FF',
    bgColor: '#EDE9FE',
    icon: '⚡',
    emoji: '⚡',
    description:
      'You have the ability to go extraordinarily deep and produce exceptional work when engaged. When you\'re in flow, you\'re unstoppable. But consistency is your biggest challenge — your performance is highly dependent on interest and inspiration.',
    deepDive:
      'Hyperfocused Achievers have a genuine neurological gift: the ability to enter flow states that most people can only dream of. The challenge is that this same wiring makes routine, low-stimulation work feel nearly impossible. Learning to bridge this gap is the key to your next level.',
    strengths: [
      'Exceptional deep focus on engaging work',
      'Breakthrough output during flow states',
      'Creative problem-solving and innovation',
      'Passion-driven execution quality',
    ],
    blindSpots: [
      'Severe inconsistency on low-interest tasks',
      'Time blindness during focus episodes',
      'Difficulty transitioning between tasks',
      'Underdelivering on "boring" but important work',
    ],
    risks: [
      'Burnout from intensity cycles',
      'Missed deadlines on admin or routine tasks',
      'Team frustration from unpredictable output',
      'Important work neglected for interesting work',
    ],
    quote: 'Your greatest asset is also your greatest liability — learn to channel it.',
    strategies: [
      'Build "interest bridges" — connect boring tasks to meaningful outcomes',
      'Use external accountability for low-interest critical tasks',
      'Time-box your hyperfocus sessions to prevent burnout',
      'Create a "minimum viable output" standard for routine work',
    ],
    famousExamples: ['Elon Musk', 'Steve Jobs', 'Richard Branson'],
    matchCriteria: [
      { domain: 'hyperfocus', operator: '>', value: 68 },
      { domain: 'executiveFunction', operator: '<', value: 62 },
      { domain: 'attentionControl', operator: '>', value: 52 },
    ],
    priority: 3,
  },
  {
    id: 'overloaded-founder',
    name: 'The Overloaded Founder',
    tagline: 'High capability under unsustainable cognitive load',
    color: '#D97706',
    bgColor: '#FEF3C7',
    icon: '🌋',
    emoji: '🌋',
    description:
      'You are highly capable but currently operating beyond your cognitive capacity. The demands on your attention far exceed what any human system can sustain. Your performance is strong in bursts but the load is creating invisible damage beneath the surface.',
    deepDive:
      'The Overloaded Founder pattern is extremely common in high-growth environments. High executive function masked by chronic overload creates a false sense of control. The risk is that cognitive debt is accumulating faster than you can repay it.',
    strengths: [
      'High drive and ambition',
      'Above-average executive function',
      'Can handle complex, multi-threaded challenges',
      'Strong results orientation',
    ],
    blindSpots: [
      'Chronic overcommitment and boundary issues',
      'Underestimating personal cognitive limits',
      'Neglecting recovery in favor of output',
      'Delegating too late or too little',
    ],
    risks: [
      'Acute burnout and cognitive breakdown',
      'Decision quality degrading under load',
      'Leadership effectiveness declining silently',
      'Health consequences from sustained overload',
    ],
    quote: 'The bottleneck is not your team. It\'s your bandwidth.',
    strategies: [
      'Ruthlessly audit your commitments — cut or delegate 20%',
      'Protect your peak cognitive hours as non-negotiable',
      'Implement a weekly cognitive recovery ritual',
      'Build decision-making systems to reduce daily choices',
    ],
    famousExamples: ['Jack Dorsey (running Twitter + Square)', 'Many Series A/B founders'],
    matchCriteria: [
      { domain: 'burnoutLoad', operator: '>', value: 62 },
      { domain: 'executiveFunction', operator: '>=', value: 58 },
      { domain: 'functionalImpairment', operator: '<', value: 60 },
    ],
    priority: 4,
  },
  {
    id: 'burned-out-operator',
    name: 'The Burned-Out Operator',
    tagline: 'Running on reserves with depleted cognitive fuel',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    icon: '🔥',
    emoji: '🔥',
    description:
      'You are experiencing significant cognitive depletion. What were once strengths are now inconsistent. You are running on borrowed energy, and the gap between your potential and current performance is widening. Recovery is not optional — it is urgent.',
    deepDive:
      'Burnout is not weakness — it is the inevitable outcome of sustained output without adequate input. Your nervous system has been in overdrive for too long. The good news: cognitive recovery is real and faster than most people expect with the right interventions.',
    strengths: [
      'High historical capacity and drive',
      'Deep knowledge and expertise in your domain',
      'Resilience built from experience',
    ],
    blindSpots: [
      'Normalizing exhaustion as the price of success',
      'Underestimating how much burnout costs in real output',
      'Pride preventing asking for help or reducing load',
      'Confusing busyness with productivity',
    ],
    risks: [
      'Cascading failure across cognitive domains',
      'Serious health consequences',
      'Relationship damage from emotional unavailability',
      'Loss of the passion that originally drove success',
    ],
    quote: 'You cannot pour from an empty vessel. Recovery is strategy.',
    strategies: [
      'Take an immediate 3-day complete cognitive rest (no decisions)',
      'Identify and eliminate your highest-drain activities',
      'Seek professional support — coach, therapist, or physician',
      'Build a sustainable operating rhythm starting with sleep',
    ],
    famousExamples: ['Arianna Huffington before her sleep collapse', 'Many high-performers post-IPO'],
    matchCriteria: [
      { domain: 'burnoutLoad', operator: '>', value: 70 },
      { domain: 'sleepRecovery', operator: '<', value: 48 },
      { domain: 'emotionalRegulation', operator: '<', value: 55 },
    ],
    priority: 5,
  },
  {
    id: 'hidden-adhd-profile',
    name: 'The Hidden ADHD Profile',
    tagline: 'Unrecognized attention patterns with high compensatory effort',
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    icon: '🔍',
    emoji: '🔍',
    description:
      'Your score pattern is consistent with unrecognized attention challenges that have been masked by high intelligence, strong motivation, or compensatory strategies. You may have succeeded despite these challenges, not because of them — and the effort required is significant.',
    deepDive:
      'Many high-achievers with ADHD go undiagnosed for decades because they compensate brilliantly. The cost is enormous invisible effort: the mental energy spent managing symptoms that neurotypical peers don\'t have to spend. Identification opens the door to targeted, effective strategies.',
    strengths: [
      'High intelligence and creativity',
      'Exceptional performance under pressure (acute stress = dopamine)',
      'Unique pattern recognition and lateral thinking',
      'Resilience built from overcoming challenges',
    ],
    blindSpots: [
      'Attributing struggles to laziness or lack of discipline',
      'Unaware of the cognitive tax being paid daily',
      'Inconsistent performance puzzling to self and others',
      'Hypersensitivity to rejection or criticism',
    ],
    risks: [
      'Continued underperformance relative to potential',
      'Burnout from excessive compensatory effort',
      'Anxiety and self-esteem issues from misattributed failures',
      'Missing targeted interventions that could transform performance',
    ],
    quote: 'This is not a character flaw. It is a cognitive pattern — and it is addressable.',
    strategies: [
      'Consult a mental health professional for a formal evaluation',
      'Research ADHD coaching and evidence-based interventions',
      'Build external scaffolding to reduce compensatory effort',
      'Connect with communities of high-achieving adults with ADHD',
    ],
    famousExamples: ['Richard Branson', 'Simone Biles', 'Justin Timberlake', 'Emma Watson'],
    matchCriteria: [
      { domain: 'adhdRiskIndicator', operator: '>', value: 68 },
      { domain: 'childhoodIndicators', operator: '>', value: 60 },
      { domain: 'attentionControl', operator: '<', value: 55 },
    ],
    priority: 6,
  },
  {
    id: 'reactive-executor',
    name: 'The Reactive Executor',
    tagline: 'High output but driven by urgency rather than priorities',
    color: '#F97316',
    bgColor: '#FFEDD5',
    icon: '🌊',
    emoji: '🌊',
    description:
      'You get things done, but you operate in reaction mode. Your days are shaped by what is urgent rather than what is important. You are productive but not strategic — spending cognitive energy on other people\'s priorities rather than your own highest-leverage work.',
    deepDive:
      'Reactive Executors are often highly valued by organizations because they are responsive and get things done. The hidden cost is that your own most important work — the work that only you can do — gets pushed to the margins. This pattern is sustainable in the short term but limiting in the long term.',
    strengths: [
      'High responsiveness and reliability',
      'Good at handling complexity and multiple demands',
      'Strong relationship orientation',
      'Gets results even under pressure',
    ],
    blindSpots: [
      'Over-indexing on urgency vs. importance',
      'Saying yes to others\' priorities too readily',
      'Shallow work masquerading as busyness',
      'Insufficient time for strategic thinking',
    ],
    risks: [
      'Career plateau from operational rather than strategic work',
      'Resentment from chronic over-commitment',
      'Missing highest-impact opportunities from busyness',
    ],
    quote: 'Productivity without strategy is just well-organized noise.',
    strategies: [
      'Block 2 hours daily for your single most important task (before email)',
      'Practice saying no using a 24-hour delay rule',
      'Weekly review: is your effort matching your actual priorities?',
      'Identify your top 3 goals and protect 50% of your time for them',
    ],
    famousExamples: ['Many high-performing managers who never become executives'],
    matchCriteria: [
      { domain: 'impulsivity', operator: '<', value: 55 },
      { domain: 'emotionalRegulation', operator: '<', value: 55 },
      { domain: 'executiveFunction', operator: '<', value: 60 },
    ],
    priority: 7,
  },
  {
    id: 'distracted-performer',
    name: 'The Distracted Performer',
    tagline: 'Capable but chronically fragmented attention',
    color: '#EF4444',
    bgColor: '#FEE2E2',
    icon: '🌪️',
    emoji: '🌪️',
    description:
      'You have significant capability but your attention is chronically scattered. The modern digital environment, combined with your natural attention patterns, creates constant fragmentation. Your performance has real upside if you can build the systems to protect your focus.',
    deepDive:
      'Distracted Performers often know exactly what they need to do — the challenge is actually doing it without getting pulled in other directions. This pattern is increasingly common in always-on, notification-saturated work environments and can be dramatically improved with environmental design.',
    strengths: [
      'Broad awareness and social connectivity',
      'Ability to context-switch rapidly',
      'High responsiveness',
      'Genuine capability in core work',
    ],
    blindSpots: [
      'Underestimating the cost of fragmented attention',
      'Digital environment enabling distraction',
      'Starting many things without completing them',
      'Mistaking activity for progress',
    ],
    risks: [
      'Chronic underperformance relative to capability',
      'Cognitive fatigue from constant switching',
      'Loss of deep work capability over time',
    ],
    quote: 'Your attention is your most valuable asset — you\'re giving it away for free.',
    strategies: [
      'Aggressive digital hygiene: turn off all non-essential notifications',
      'Design a focus-first morning routine before checking messages',
      'Use time-blocking to protect 2-hour focus blocks',
      'One task at a time rule: close all unrelated tabs and apps',
    ],
    famousExamples: ['Many knowledge workers in open-plan offices'],
    matchCriteria: [
      { domain: 'attentionControl', operator: '<', value: 52 },
      { domain: 'digitalEnvironment', operator: '<', value: 52 },
      { domain: 'executiveFunction', operator: '<', value: 58 },
    ],
    priority: 8,
  },
]

export function determineArchetype(scores: Omit<ScoreResult, 'archetype'>): Archetype {
  const sortedArchetypes = [...ARCHETYPES].sort((a, b) => a.priority - b.priority)

  for (const archetype of sortedArchetypes) {
    const matches = archetype.matchCriteria.every((condition) => {
      const score = scores[condition.domain as keyof typeof scores] as number
      if (score === undefined) return false

      switch (condition.operator) {
        case '>': return score > condition.value
        case '<': return score < condition.value
        case '>=': return score >= condition.value
        case '<=': return score <= condition.value
        default: return false
      }
    })

    if (matches) return archetype
  }

  // Fallback: score-based closest match using attentionHealthScore
  const ahs = scores.attentionHealthScore
  if (ahs >= 70) return ARCHETYPES.find((a) => a.id === 'consistent-builder')!
  if (ahs >= 55) return ARCHETYPES.find((a) => a.id === 'reactive-executor')!
  return ARCHETYPES.find((a) => a.id === 'distracted-performer')!
}

export function getArchetypeById(id: string): Archetype | undefined {
  return ARCHETYPES.find((a) => a.id === id)
}
