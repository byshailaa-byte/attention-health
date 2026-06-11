import type { ScoreResult, DomainScores } from './scoring-engine'

export type InsightCategory = 'pattern' | 'strength' | 'risk' | 'recommendation'

export interface InsightRule {
  id: string
  conditions: ScoreCondition[]
  title: string
  insight: string
  category: InsightCategory
  priority: number
  actionable?: string
  icon?: string
}

interface ScoreCondition {
  domain: keyof ScoreResult
  operator: '>' | '<' | '>=' | '<='
  value: number
}

export interface EvaluatedInsight {
  id: string
  title: string
  insight: string
  category: InsightCategory
  priority: number
  actionable?: string
  icon?: string
}

export const INSIGHT_RULES: InsightRule[] = [
  // ─── PATTERNS (40 rules) ──────────────────────────────────────────────────
  {
    id: 'p01',
    conditions: [
      { domain: 'hyperfocus', operator: '>', value: 70 },
      { domain: 'burnoutLoad', operator: '>', value: 65 },
      { domain: 'executiveFunction', operator: '<', value: 55 },
    ],
    title: 'Interest-Driven Focus Cycle',
    insight:
      'You are capable of exceptional focus, but your attention is driven by interest rather than priorities. This creates cycles of intense productivity followed by exhaustion and avoidance — a classic high-performance trap.',
    category: 'pattern',
    priority: 1,
    actionable: 'Use the "interest bridge" technique: identify the meaningful outcome behind each boring task before starting.',
    icon: '🔄',
  },
  {
    id: 'p02',
    conditions: [
      { domain: 'sleepRecovery', operator: '<', value: 50 },
      { domain: 'burnoutLoad', operator: '>', value: 70 },
    ],
    title: 'Cognitive Deficit Spiral',
    insight:
      'Your brain is running on borrowed energy. Inadequate recovery combined with high burnout creates a compounding deficit — each day you start at a lower baseline, amplifying every other attention challenge.',
    category: 'pattern',
    priority: 1,
    actionable: 'Make sleep non-negotiable for 14 days. Track how your focus, mood, and productivity shift.',
    icon: '💔',
  },
  {
    id: 'p03',
    conditions: [
      { domain: 'attentionControl', operator: '<', value: 50 },
      { domain: 'digitalEnvironment', operator: '<', value: 50 },
    ],
    title: 'Digital Fragmentation Pattern',
    insight:
      'Your natural attention challenges are being significantly amplified by your digital environment. Notifications, apps, and constant connectivity are creating a fragmented attention state that makes deep work nearly impossible.',
    category: 'pattern',
    priority: 2,
    actionable: 'Do a 7-day notification audit: turn off all non-essential notifications and measure your focus improvement.',
    icon: '📱',
  },
  {
    id: 'p04',
    conditions: [
      { domain: 'executiveFunction', operator: '<', value: 55 },
      { domain: 'timeBlindness', operator: '<', value: 55 },
    ],
    title: 'Planning-Execution Gap',
    insight:
      'You likely know what needs to be done but struggle to translate plans into consistent action. The gap between your intentions and outcomes is wider than it should be — and it costs you more cognitive energy than most people realize.',
    category: 'pattern',
    priority: 2,
    actionable: 'Implement a 3-item daily priority list (no more). Commit to completing them before anything else.',
    icon: '📋',
  },
  {
    id: 'p05',
    conditions: [
      { domain: 'impulsivity', operator: '<', value: 50 },
      { domain: 'emotionalRegulation', operator: '<', value: 55 },
    ],
    title: 'Reactive Decision Pattern',
    insight:
      'Your decisions and reactions tend to be driven by immediate emotion or impulse rather than considered judgment. This creates inconsistent outcomes and can damage relationships and professional opportunities.',
    category: 'pattern',
    priority: 2,
    actionable: 'Introduce a 24-hour rule for significant decisions. Practice the "name it to tame it" technique for emotional triggers.',
    icon: '🌊',
  },
  {
    id: 'p06',
    conditions: [
      { domain: 'workingMemory', operator: '<', value: 50 },
      { domain: 'executiveFunction', operator: '<', value: 55 },
    ],
    title: 'Cognitive Load Overload',
    insight:
      'Your working memory and executive function scores suggest you are carrying too much information in your head. This creates mental clutter that impairs both your moment-to-moment focus and your strategic thinking.',
    category: 'pattern',
    priority: 2,
    actionable: 'Adopt a "capture everything" system (e.g., a single trusted inbox) to externalize cognitive load from your brain.',
    icon: '🧠',
  },
  {
    id: 'p07',
    conditions: [
      { domain: 'hyperfocus', operator: '>', value: 65 },
      { domain: 'timeBlindness', operator: '<', value: 50 },
    ],
    title: 'Time Distortion During Flow',
    insight:
      'When you enter deep focus, time disappears entirely. While powerful for output, this creates significant problems: missed meetings, delayed responses, and the inability to allocate time proportionally across priorities.',
    category: 'pattern',
    priority: 2,
    actionable: 'Use a physical timer (not phone) to create "focus containers" — work deeply for 90 minutes, then surface.',
    icon: '⏱️',
  },
  {
    id: 'p08',
    conditions: [
      { domain: 'burnoutLoad', operator: '>', value: 60 },
      { domain: 'functionalImpairment', operator: '<', value: 55 },
    ],
    title: 'Silent Performance Degradation',
    insight:
      'Your burnout level is affecting your daily functioning, but the impact may be invisible to others. You are compensating, but at a hidden cost. The gap between what you produce and what you are capable of is quietly widening.',
    category: 'pattern',
    priority: 3,
    actionable: 'Track your "best work" vs. "typical work" for one week. The difference reveals your recovery debt.',
    icon: '📉',
  },
  {
    id: 'p09',
    conditions: [
      { domain: 'childhoodIndicators', operator: '>', value: 60 },
      { domain: 'attentionControl', operator: '<', value: 55 },
    ],
    title: 'Long-Standing Attention Pattern',
    insight:
      'Your attention challenges appear to have roots in early life. This is not a product of your current environment — it is a consistent pattern that has been with you for many years. Recognizing this is the first step to addressing it effectively.',
    category: 'pattern',
    priority: 3,
    actionable: 'Consider a formal evaluation to understand whether structured support could dramatically improve your performance.',
    icon: '🌱',
  },
  {
    id: 'p10',
    conditions: [
      { domain: 'emotionalRegulation', operator: '<', value: 55 },
      { domain: 'burnoutLoad', operator: '>', value: 65 },
    ],
    title: 'Emotional Amplification Under Stress',
    insight:
      'When your cognitive resources are depleted, your emotional regulation deteriorates further. Burnout is amplifying your emotional reactivity, creating a cycle where stress impairs your ability to manage stress.',
    category: 'pattern',
    priority: 3,
    actionable: 'Develop a "recovery micro-practice": 5 minutes of intentional decompression between demanding tasks.',
    icon: '💥',
  },
  {
    id: 'p11',
    conditions: [
      { domain: 'attentionControl', operator: '<', value: 55 },
      { domain: 'workingMemory', operator: '<', value: 55 },
      { domain: 'executiveFunction', operator: '<', value: 55 },
    ],
    title: 'Broad Executive Function Challenge',
    insight:
      'Multiple executive function domains are showing strain simultaneously. This triple challenge — attention, memory, and planning — suggests a systemic pattern rather than isolated weaknesses. Targeted interventions addressing all three will be more effective than isolated fixes.',
    category: 'pattern',
    priority: 1,
    actionable: 'Consider working with a cognitive coach or occupational therapist who specializes in executive function.',
    icon: '🔺',
  },
  {
    id: 'p12',
    conditions: [
      { domain: 'hyperfocus', operator: '>', value: 60 },
      { domain: 'impulsivity', operator: '<', value: 55 },
    ],
    title: 'Interest-Impulsivity Combination',
    insight:
      'You switch between hyperfocused states and impulsive task-jumping depending on engagement levels. This creates an inconsistent output pattern where your best work and worst work can occur in the same day.',
    category: 'pattern',
    priority: 3,
    actionable: 'Build a "temptation bundling" practice: pair interesting tasks with important but boring ones.',
    icon: '🎯',
  },
  {
    id: 'p13',
    conditions: [
      { domain: 'sleepRecovery', operator: '<', value: 55 },
      { domain: 'workingMemory', operator: '<', value: 55 },
    ],
    title: 'Sleep-Memory Connection',
    insight:
      'Sleep is your brain\'s memory consolidation engine. Your low sleep recovery score directly explains your working memory challenges — your brain is not getting the restoration it needs to encode and retrieve information effectively.',
    category: 'pattern',
    priority: 2,
    actionable: 'Prioritize 7.5 hours of sleep for 30 days. Track memory and focus improvements weekly.',
    icon: '🌙',
  },
  {
    id: 'p14',
    conditions: [
      { domain: 'timeBlindness', operator: '<', value: 50 },
      { domain: 'functionalImpairment', operator: '<', value: 60 },
    ],
    title: 'Deadline-Driven Impairment',
    insight:
      'Your time perception challenges are creating real-world functional consequences. Late submissions, rushed work, and last-minute crises are not just inconvenient — they are compounding your cognitive load and harming your professional reputation.',
    category: 'pattern',
    priority: 2,
    actionable: 'Install a visible countdown timer for all major deadlines. The visual cue bypasses time blindness.',
    icon: '⏰',
  },
  {
    id: 'p15',
    conditions: [
      { domain: 'emotionalRegulation', operator: '<', value: 50 },
      { domain: 'impulsivity', operator: '<', value: 50 },
    ],
    title: 'Emotional Impulsivity Cluster',
    insight:
      'Both your emotional regulation and impulse control are showing challenges. This combination often results in words or actions you later regret, damaged relationships, and a reputation for unpredictability.',
    category: 'pattern',
    priority: 1,
    actionable: 'Practice the STOP technique before reactions: Stop, Think, Observe, Plan. Even 3 seconds changes outcomes.',
    icon: '🚨',
  },
  {
    id: 'p16',
    conditions: [
      { domain: 'attentionHealthScore', operator: '<', value: 45 },
    ],
    title: 'Comprehensive Attention Challenge',
    insight:
      'Your overall attention health score indicates broad-based challenges across multiple domains. This level of cognitive challenge requires a comprehensive approach — not quick fixes but a systematic rebuilding of your attention foundation.',
    category: 'pattern',
    priority: 1,
    actionable: 'Start with the single highest-impact change: sleep. Nothing else improves until recovery does.',
    icon: '🔴',
  },
  {
    id: 'p17',
    conditions: [
      { domain: 'attentionControl', operator: '>=', value: 70 },
      { domain: 'burnoutLoad', operator: '>', value: 65 },
    ],
    title: 'Burnout Masking Peak Capacity',
    insight:
      'You have strong innate attention control, but burnout is masking your true capacity. You are performing well below your ceiling. When recovered, your attention performance would be exceptional.',
    category: 'pattern',
    priority: 2,
    actionable: 'Book at least 3 full "cognitive rest" days in the next month. No decisions, no meetings, real rest.',
    icon: '🌅',
  },
  {
    id: 'p18',
    conditions: [
      { domain: 'hyperfocus', operator: '>', value: 75 },
      { domain: 'workingMemory', operator: '<', value: 55 },
    ],
    title: 'Focus-Memory Paradox',
    insight:
      'You can go incredibly deep on tasks, yet struggle to remember details outside of your focus zone. When not hyperfocused, your working memory is significantly compromised — creating a jarring gap between your best and everyday performance.',
    category: 'pattern',
    priority: 3,
    actionable: 'Keep a "capture pad" next to you at all times. Externalize memory to free cognitive bandwidth.',
    icon: '🎭',
  },
  {
    id: 'p19',
    conditions: [
      { domain: 'digitalEnvironment', operator: '<', value: 45 },
      { domain: 'burnoutLoad', operator: '>', value: 60 },
    ],
    title: 'Digital Burnout Acceleration',
    insight:
      'Your digital environment is accelerating your burnout. Constant connectivity, notifications, and digital demands are consuming cognitive resources that your brain needs for recovery — even during supposed rest time.',
    category: 'pattern',
    priority: 2,
    actionable: 'Implement a "digital sunset": all screens off 90 minutes before sleep. No exceptions for 21 days.',
    icon: '🌑',
  },
  {
    id: 'p20',
    conditions: [
      { domain: 'functionalImpairment', operator: '<', value: 45 },
    ],
    title: 'High-Impact Daily Impairment',
    insight:
      'Your attention challenges are creating significant daily life and work impairment. This is beyond inconvenience — it is affecting your career trajectory, relationships, and wellbeing. Structured professional support would have a high return on investment.',
    category: 'pattern',
    priority: 1,
    actionable: 'Schedule a conversation with your doctor or a mental health professional this month.',
    icon: '🚩',
  },
  {
    id: 'p21',
    conditions: [
      { domain: 'timeBlindness', operator: '<', value: 45 },
    ],
    title: 'Severe Time Blindness',
    insight:
      'Time estimation is a significant challenge for you. You consistently underestimate durations, arrive late, and are surprised by deadlines. This is not a discipline problem — it is a genuine cognitive difference that requires structural compensation.',
    category: 'pattern',
    priority: 2,
    actionable: 'Double your time estimates for all tasks. Implement time-stamped transitions: set alarms for every context switch.',
    icon: '🕰️',
  },
  {
    id: 'p22',
    conditions: [
      { domain: 'executiveFunction', operator: '>=', value: 65 },
      { domain: 'hyperfocus', operator: '>', value: 68 },
    ],
    title: 'High-Performing Versatility',
    insight:
      'You combine strong executive function with hyperfocus capability — a rare and powerful combination. You can both go deep on important work AND execute systematically. Your primary challenge is sustaining this across different energy states.',
    category: 'pattern',
    priority: 4,
    actionable: 'Map your energy levels hourly for one week. Schedule hyperfocus work during peak windows.',
    icon: '⭐',
  },
  {
    id: 'p23',
    conditions: [
      { domain: 'impulsivity', operator: '>=', value: 70 },
      { domain: 'emotionalRegulation', operator: '>=', value: 68 },
    ],
    title: 'Controlled Responsiveness',
    insight:
      'You respond quickly but thoughtfully — a competitive advantage in fast-paced environments. Your impulse control and emotional regulation work together to create considered responsiveness rather than reactive chaos.',
    category: 'pattern',
    priority: 4,
    actionable: 'Leverage this strength in high-stakes negotiations or crisis situations where others struggle to stay calm.',
    icon: '🎯',
  },
  {
    id: 'p24',
    conditions: [
      { domain: 'childhoodIndicators', operator: '>', value: 65 },
      { domain: 'executiveFunction', operator: '>=', value: 60 },
    ],
    title: 'Compensated Attention Profile',
    insight:
      'You show long-standing attention patterns from childhood, yet you have developed strong executive function — likely through years of compensatory effort. Your systems and habits are doing the work your attention naturally struggles with.',
    category: 'pattern',
    priority: 3,
    actionable: 'Protect and systematize your compensatory strategies. When they slip (illness, stress), performance will drop quickly.',
    icon: '🛡️',
  },
  {
    id: 'p25',
    conditions: [
      { domain: 'attentionControl', operator: '<', value: 55 },
      { domain: 'hyperfocus', operator: '>', value: 65 },
    ],
    title: 'Selective Attention Profile',
    insight:
      'Your attention is not globally impaired — it is highly selective. You can focus intensely on what engages you, but routine attention control is inconsistent. This selectivity is a double-edged sword that requires careful management.',
    category: 'pattern',
    priority: 2,
    actionable: 'Build an "interest audit" of your work. Reorganize your role to maximize high-engagement tasks.',
    icon: '🔦',
  },
  {
    id: 'p26',
    conditions: [
      { domain: 'sleepRecovery', operator: '>=', value: 70 },
      { domain: 'burnoutLoad', operator: '<', value: 45 },
    ],
    title: 'Strong Recovery Foundation',
    insight:
      'Your sleep and recovery practices are a genuine strength. This protective foundation means your attention health has more resilience than average — when other challenges arise, you recover faster and from a stronger baseline.',
    category: 'pattern',
    priority: 5,
    actionable: 'Protect your recovery rituals during high-demand periods. They are your performance insurance policy.',
    icon: '🏋️',
  },
  {
    id: 'p27',
    conditions: [
      { domain: 'workingMemory', operator: '>=', value: 70 },
      { domain: 'executiveFunction', operator: '>=', value: 68 },
    ],
    title: 'Cognitive Infrastructure Strength',
    insight:
      'Your working memory and executive function form a powerful cognitive infrastructure. You can hold complex problems in mind while planning and executing — the hallmark of effective strategists and complex problem-solvers.',
    category: 'pattern',
    priority: 4,
    actionable: 'Use your strength for your most cognitively demanding strategic work. Protect this time from operational demands.',
    icon: '🏛️',
  },
  {
    id: 'p28',
    conditions: [
      { domain: 'emotionalRegulation', operator: '<', value: 55 },
      { domain: 'functionalImpairment', operator: '<', value: 58 },
    ],
    title: 'Emotional-Functional Intersection',
    insight:
      'Emotional regulation challenges are directly impacting your daily functioning. Mood volatility, emotional reactions to setbacks, and difficulty recovering from criticism are creating friction in your professional and personal effectiveness.',
    category: 'pattern',
    priority: 2,
    actionable: 'Identify your 3 most common emotional triggers at work. Build a specific response plan for each.',
    icon: '💢',
  },
  {
    id: 'p29',
    conditions: [
      { domain: 'digitalEnvironment', operator: '>=', value: 72 },
      { domain: 'attentionControl', operator: '>=', value: 65 },
    ],
    title: 'Digital-Attention Alignment',
    insight:
      'Your digital discipline supports your attention control — a combination many high performers lack. You have built an environment that protects rather than fragments your focus, giving you a significant advantage.',
    category: 'pattern',
    priority: 5,
    actionable: 'Share your digital hygiene practices with your team. You may be modeling something they need.',
    icon: '✅',
  },
  {
    id: 'p30',
    conditions: [
      { domain: 'attentionControl', operator: '<', value: 50 },
      { domain: 'impulsivity', operator: '<', value: 50 },
      { domain: 'timeBlindness', operator: '<', value: 50 },
    ],
    title: 'ADHD Signature Cluster',
    insight:
      'Your score pattern across attention control, impulse regulation, and time awareness forms a constellation consistent with attention-deficit presentations. This three-way challenge is not random — it suggests a unified underlying pattern worth exploring professionally.',
    category: 'pattern',
    priority: 1,
    actionable: 'Request a comprehensive evaluation from a psychiatrist or neuropsychologist experienced with adult ADHD.',
    icon: '🔬',
  },
  {
    id: 'p31',
    conditions: [
      { domain: 'hyperfocus', operator: '>=', value: 72 },
      { domain: 'burnoutLoad', operator: '<=', value: 45 },
    ],
    title: 'Sustainable Flow State',
    insight:
      'You have the ability to enter deep focus without the accompanying burnout that many hyperfocused individuals experience. This sustainable flow state is a significant cognitive asset and positions you for exceptional long-term output.',
    category: 'pattern',
    priority: 4,
    actionable: 'Map your peak flow conditions (time of day, environment, task type). Systematically replicate them.',
    icon: '🌊',
  },
  {
    id: 'p32',
    conditions: [
      { domain: 'functionalImpairment', operator: '>=', value: 72 },
      { domain: 'attentionControl', operator: '<', value: 55 },
    ],
    title: 'High-Compensation Coping',
    insight:
      'Despite real attention challenges, you are maintaining strong functional outcomes — likely through significant compensatory effort, strong systems, or support structures. This resilience is admirable but potentially exhausting.',
    category: 'pattern',
    priority: 3,
    actionable: 'Audit your compensatory strategies. Which ones can be made automatic to reduce their cognitive cost?',
    icon: '⚖️',
  },
  {
    id: 'p33',
    conditions: [
      { domain: 'sleepRecovery', operator: '<', value: 45 },
    ],
    title: 'Critical Recovery Deficit',
    insight:
      'Your sleep and recovery scores are in a critical range. At this level, cognitive performance is measurably impaired across memory, decision-making, emotional control, and focus — regardless of your intrinsic capabilities.',
    category: 'pattern',
    priority: 1,
    actionable: 'Address sleep immediately. Consult a doctor if needed. Every other improvement depends on this foundation.',
    icon: '🔴',
  },
  {
    id: 'p34',
    conditions: [
      { domain: 'impulsivity', operator: '>=', value: 72 },
      { domain: 'attentionControl', operator: '>=', value: 65 },
    ],
    title: 'Deliberate Responsiveness',
    insight:
      'You combine good impulse control with strong attention — allowing you to respond quickly but thoughtfully. This is a rare professional advantage, especially in leadership roles where reactive decisions are costly.',
    category: 'pattern',
    priority: 4,
    actionable: 'Leverage this in negotiations, crisis management, and high-pressure situations where others become reactive.',
    icon: '🏹',
  },
  {
    id: 'p35',
    conditions: [
      { domain: 'burnoutLoad', operator: '<=', value: 35 },
      { domain: 'sleepRecovery', operator: '>=', value: 72 },
      { domain: 'emotionalRegulation', operator: '>=', value: 68 },
    ],
    title: 'Cognitive Resilience Triad',
    insight:
      'You have built the three pillars of cognitive resilience: low burnout, strong recovery, and emotional stability. This foundation means you can sustain high performance over long periods without the crashes that afflict peers operating without this support structure.',
    category: 'pattern',
    priority: 4,
    actionable: 'These three pillars need protection during high-demand seasons. Build explicit protocols to maintain them.',
    icon: '🏰',
  },
  {
    id: 'p36',
    conditions: [
      { domain: 'timeBlindness', operator: '>=', value: 70 },
      { domain: 'executiveFunction', operator: '>=', value: 65 },
    ],
    title: 'Time-Executive Synergy',
    insight:
      'Strong time awareness combined with good executive function creates a powerful planning and execution combination. You are likely seen as reliable and organized by others — and this reputation compounds over time into greater trust and opportunity.',
    category: 'pattern',
    priority: 4,
    actionable: 'Use this strength to help structure projects and timelines for teams who struggle with this combination.',
    icon: '⏰',
  },
  {
    id: 'p37',
    conditions: [
      { domain: 'workingMemory', operator: '<', value: 45 },
    ],
    title: 'Significant Memory Impact',
    insight:
      'Working memory challenges at this level create a meaningful cognitive tax. You are likely using substantial mental energy to compensate — re-reading, over-note-taking, or asking for repetition — energy that could be directed at higher-value thinking.',
    category: 'pattern',
    priority: 2,
    actionable: 'Build a "second brain" system (Notion, Obsidian) to externalize memory. Dramatically reduces cognitive load.',
    icon: '🗂️',
  },
  {
    id: 'p38',
    conditions: [
      { domain: 'emotionalRegulation', operator: '>=', value: 72 },
      { domain: 'impulsivity', operator: '>=', value: 70 },
    ],
    title: 'Emotional Intelligence Advantage',
    insight:
      'Your emotional regulation and impulse control work in concert to give you genuine emotional intelligence in action — not just as a concept, but as a moment-to-moment capability that shapes your decisions and relationships.',
    category: 'pattern',
    priority: 4,
    actionable: 'Model this for others. Your composure under pressure is a leadership signal worth making visible.',
    icon: '🌟',
  },
  {
    id: 'p39',
    conditions: [
      { domain: 'attentionHealthScore', operator: '>=', value: 75 },
      { domain: 'burnoutLoad', operator: '>', value: 60 },
    ],
    title: 'Performance Under Pressure',
    insight:
      'You maintain strong overall performance despite elevated burnout load — a sign of either exceptional systems, high resilience, or both. The risk is that this pattern is unsustainable, and a burnout crash will be disproportionately severe.',
    category: 'pattern',
    priority: 3,
    actionable: 'Proactively schedule a 3-day recovery retreat before burnout forces a longer one.',
    icon: '⚠️',
  },
  {
    id: 'p40',
    conditions: [
      { domain: 'childhoodIndicators', operator: '<=', value: 35 },
      { domain: 'attentionHealthScore', operator: '<', value: 55 },
    ],
    title: 'Acquired Attention Challenges',
    insight:
      'Your childhood indicators suggest attention was not always a challenge, which means your current difficulties may be largely situational — driven by environment, stress, overload, or lifestyle factors. This is highly responsive to targeted intervention.',
    category: 'pattern',
    priority: 3,
    actionable: 'Identify what changed in the last 2-3 years. Address the source rather than just the symptoms.',
    icon: '🔑',
  },

  // ─── STRENGTHS (25 rules) ─────────────────────────────────────────────────
  {
    id: 's01',
    conditions: [{ domain: 'hyperfocus', operator: '>=', value: 75 }],
    title: 'Exceptional Flow Capacity',
    insight:
      'Your ability to enter deep, sustained focus states is a genuine cognitive strength. When you are engaged, you produce output that most people can\'t match. This is a neurological advantage — protect and leverage it deliberately.',
    category: 'strength',
    priority: 1,
    icon: '⚡',
  },
  {
    id: 's02',
    conditions: [{ domain: 'executiveFunction', operator: '>=', value: 72 }],
    title: 'Strong Executive Architecture',
    insight:
      'Your executive function is a significant strength. Planning, organizing, and executing complex work comes naturally to you. This is the cognitive foundation that separates high performers from the rest.',
    category: 'strength',
    priority: 1,
    icon: '⚙️',
  },
  {
    id: 's03',
    conditions: [{ domain: 'emotionalRegulation', operator: '>=', value: 72 }],
    title: 'Emotional Stability Under Pressure',
    insight:
      'Your ability to regulate emotions and maintain composure is a leadership differentiator. When others become reactive, you stay grounded — and that consistency creates trust and psychological safety for those around you.',
    category: 'strength',
    priority: 1,
    icon: '❤️',
  },
  {
    id: 's04',
    conditions: [{ domain: 'sleepRecovery', operator: '>=', value: 72 }],
    title: 'Exceptional Recovery Discipline',
    insight:
      'Your sleep and recovery habits are a cognitive performance asset. You are giving your brain what it needs to consolidate memory, regulate emotion, and show up at full capacity — a practice many high performers neglect.',
    category: 'strength',
    priority: 1,
    icon: '🌙',
  },
  {
    id: 's05',
    conditions: [{ domain: 'attentionControl', operator: '>=', value: 72 }],
    title: 'Directed Attention Mastery',
    insight:
      'Your ability to direct and sustain attention on chosen tasks is well above average. This is the foundational skill that makes all other cognitive work more efficient — and you have it in abundance.',
    category: 'strength',
    priority: 1,
    icon: '🎯',
  },
  {
    id: 's06',
    conditions: [{ domain: 'workingMemory', operator: '>=', value: 72 }],
    title: 'Powerful Working Memory',
    insight:
      'Your working memory allows you to hold multiple threads simultaneously while working on complex problems. This is a key differentiator in strategic thinking, negotiations, and complex project management.',
    category: 'strength',
    priority: 1,
    icon: '🧠',
  },
  {
    id: 's07',
    conditions: [{ domain: 'impulsivity', operator: '>=', value: 72 }],
    title: 'Strong Impulse Regulation',
    insight:
      'Your impulse control allows you to pause before reacting, think before speaking, and choose your responses deliberately. This is a rare professional skill that compounds in value over time.',
    category: 'strength',
    priority: 1,
    icon: '🛑',
  },
  {
    id: 's08',
    conditions: [{ domain: 'timeBlindness', operator: '>=', value: 72 }],
    title: 'Accurate Time Perception',
    insight:
      'Your sense of time is well-calibrated — you estimate durations accurately, arrive prepared, and manage your schedule effectively. This reliability is a competitive advantage and builds trust with colleagues and clients.',
    category: 'strength',
    priority: 1,
    icon: '⏱️',
  },
  {
    id: 's09',
    conditions: [{ domain: 'digitalEnvironment', operator: '>=', value: 72 }],
    title: 'Digital Discipline',
    insight:
      'You have established strong boundaries with technology and digital distractions. In an age of constant connectivity, this self-regulation is rare and powerful — it protects your deep work capacity.',
    category: 'strength',
    priority: 1,
    icon: '📱',
  },
  {
    id: 's10',
    conditions: [{ domain: 'functionalImpairment', operator: '>=', value: 75 }],
    title: 'Strong Daily Functioning',
    insight:
      'Your attention patterns are having minimal negative impact on your daily functioning. You are meeting commitments, maintaining relationships, and performing at a high level — the ultimate measure of effective attention health.',
    category: 'strength',
    priority: 1,
    icon: '📊',
  },
  {
    id: 's11',
    conditions: [
      { domain: 'attentionControl', operator: '>=', value: 68 },
      { domain: 'executiveFunction', operator: '>=', value: 68 },
    ],
    title: 'Focus-Execution Combination',
    insight:
      'The combination of strong attention control and executive function is rare. You can both sustain focus on demanding work AND organize and execute complex projects. This dual capacity is the foundation of elite performance.',
    category: 'strength',
    priority: 1,
    icon: '💪',
  },
  {
    id: 's12',
    conditions: [
      { domain: 'sleepRecovery', operator: '>=', value: 68 },
      { domain: 'burnoutLoad', operator: '<=', value: 45 },
    ],
    title: 'Sustainable High Performance',
    insight:
      'Your recovery strength combined with low burnout indicators suggests you have found a sustainable performance rhythm. This is rare and valuable — most high performers either crash or plateau. You are positioned to compound.',
    category: 'strength',
    priority: 1,
    icon: '♻️',
  },
  {
    id: 's13',
    conditions: [
      { domain: 'emotionalRegulation', operator: '>=', value: 68 },
      { domain: 'impulsivity', operator: '>=', value: 65 },
    ],
    title: 'Self-Regulation Mastery',
    insight:
      'Your emotional and behavioral self-regulation form a powerful combination. In leadership and high-pressure situations, this translates directly to better decisions, stronger relationships, and sustained performance.',
    category: 'strength',
    priority: 2,
    icon: '🧘',
  },
  {
    id: 's14',
    conditions: [
      { domain: 'workingMemory', operator: '>=', value: 68 },
      { domain: 'executiveFunction', operator: '>=', value: 65 },
    ],
    title: 'Strategic Cognitive Capacity',
    insight:
      'The combination of strong working memory and executive function gives you genuine strategic thinking capacity. You can hold the big picture while managing details — the cognitive profile of effective leaders and complex problem-solvers.',
    category: 'strength',
    priority: 2,
    icon: '♟️',
  },
  {
    id: 's15',
    conditions: [{ domain: 'attentionHealthScore', operator: '>=', value: 78 }],
    title: 'Overall Cognitive Excellence',
    insight:
      'Your overall attention health score places you in the top tier. Across the domains we measured, you demonstrate consistently strong cognitive functioning. This is a significant competitive advantage in knowledge work.',
    category: 'strength',
    priority: 1,
    icon: '🏆',
  },
  {
    id: 's16',
    conditions: [
      { domain: 'hyperfocus', operator: '>=', value: 65 },
      { domain: 'emotionalRegulation', operator: '>=', value: 65 },
    ],
    title: 'Passionate Stability',
    insight:
      'You can go deep without going sideways. Your ability to enter flow states while maintaining emotional regulation means your intense focus rarely leads to frustration, burnout, or interpersonal friction.',
    category: 'strength',
    priority: 2,
    icon: '🌊',
  },
  {
    id: 's17',
    conditions: [
      { domain: 'timeBlindness', operator: '>=', value: 65 },
      { domain: 'executiveFunction', operator: '>=', value: 65 },
    ],
    title: 'Time-Strategic Execution',
    insight:
      'Your time accuracy and execution skills create a rare combination: you not only plan well, you know how long things will actually take. This makes your commitments credible and your delivery reliable.',
    category: 'strength',
    priority: 2,
    icon: '✅',
  },
  {
    id: 's18',
    conditions: [{ domain: 'childhoodIndicators', operator: '<=', value: 38 }],
    title: 'Clean Attention Foundation',
    insight:
      'Your childhood indicators suggest attention was not a significant challenge in your developmental years. This baseline foundation provides neurological groundwork that supports your current cognitive performance.',
    category: 'strength',
    priority: 3,
    icon: '🌱',
  },
  {
    id: 's19',
    conditions: [
      { domain: 'attentionControl', operator: '>=', value: 65 },
      { domain: 'digitalEnvironment', operator: '>=', value: 65 },
    ],
    title: 'Protected Focus Environment',
    insight:
      'You have aligned your natural attention capability with a supportive digital environment. The result is a protected focus space that maximizes your cognitive output — a rarity in today\'s always-on culture.',
    category: 'strength',
    priority: 2,
    icon: '🏯',
  },
  {
    id: 's20',
    conditions: [
      { domain: 'burnoutLoad', operator: '<=', value: 40 },
      { domain: 'emotionalRegulation', operator: '>=', value: 68 },
    ],
    title: 'Emotional Durability',
    insight:
      'Low burnout and strong emotional regulation create genuine emotional durability. You can sustain high engagement over time without the emotional depletion that derails many high performers.',
    category: 'strength',
    priority: 2,
    icon: '💎',
  },
  {
    id: 's21',
    conditions: [
      { domain: 'workingMemory', operator: '>=', value: 72 },
      { domain: 'attentionControl', operator: '>=', value: 68 },
    ],
    title: 'Cognitive Precision',
    insight:
      'The combination of excellent working memory and strong attention control creates cognitive precision — the ability to focus tightly on the right details while holding the broader context. A rare edge in complex knowledge work.',
    category: 'strength',
    priority: 2,
    icon: '🔬',
  },
  {
    id: 's22',
    conditions: [{ domain: 'impulsivity', operator: '>=', value: 75 }],
    title: 'Exceptional Impulse Mastery',
    insight:
      'Your impulse control is in the top tier. This is the bedrock of behavioral reliability — others know what to expect from you, which builds trust exponentially over time.',
    category: 'strength',
    priority: 1,
    icon: '🏆',
  },
  {
    id: 's23',
    conditions: [
      { domain: 'hyperfocus', operator: '>=', value: 70 },
      { domain: 'executiveFunction', operator: '>=', value: 68 },
    ],
    title: 'Depth Plus Breadth',
    insight:
      'You can go extremely deep on important problems AND execute systematically across multiple initiatives. This combination is exceptionally rare and positions you for outsized impact in complex, multi-dimensional challenges.',
    category: 'strength',
    priority: 1,
    icon: '🌐',
  },
  {
    id: 's24',
    conditions: [{ domain: 'sleepRecovery', operator: '>=', value: 78 }],
    title: 'Elite Recovery Mastery',
    insight:
      'Your sleep and recovery practices are genuinely elite. You are giving your brain optimal conditions for performance, memory consolidation, and emotional resilience — a practice that compounds over years into lasting cognitive advantage.',
    category: 'strength',
    priority: 1,
    icon: '🌟',
  },
  {
    id: 's25',
    conditions: [{ domain: 'emotionalRegulation', operator: '>=', value: 78 }],
    title: 'Exceptional Emotional Mastery',
    insight:
      'Your emotional regulation is outstanding. You can experience strong emotions without being controlled by them — a distinction that separates exceptional leaders and performers from the merely competent.',
    category: 'strength',
    priority: 1,
    icon: '🌿',
  },

  // ─── RISKS (25 rules) ─────────────────────────────────────────────────────
  {
    id: 'r01',
    conditions: [{ domain: 'burnoutLoad', operator: '>=', value: 75 }],
    title: 'Critical Burnout Warning',
    insight:
      'Your burnout score is in a critical range. At this level, cognitive performance degrades across every domain — attention, memory, decision quality, and emotional regulation all suffer. This is not a phase to push through; it requires intervention.',
    category: 'risk',
    priority: 1,
    actionable: 'Take immediate action: identify your top 3 energy drains and eliminate or delegate at least one this week.',
    icon: '🚨',
  },
  {
    id: 'r02',
    conditions: [{ domain: 'sleepRecovery', operator: '<', value: 45 }],
    title: 'Severe Sleep Deficit',
    insight:
      'Your sleep and recovery practices are at a critical low. Research is unambiguous: below 7 hours of quality sleep, IQ effectively drops, emotional reactivity increases, and error rates climb. You are operating impaired.',
    category: 'risk',
    priority: 1,
    actionable: 'Treat sleep as a medical necessity. Consult your doctor if you cannot achieve 7+ hours consistently.',
    icon: '🚨',
  },
  {
    id: 'r03',
    conditions: [{ domain: 'adhdRiskIndicator', operator: '>=', value: 72 }],
    title: 'High ADHD Risk Indicator',
    insight:
      'Your score pattern indicates a high likelihood of unaddressed attention-deficit patterns. This is not a diagnosis — only a professional can provide that — but the pattern warrants a formal evaluation. Untreated ADHD has significant career and wellbeing costs.',
    category: 'risk',
    priority: 1,
    actionable: 'Schedule an assessment with a psychiatrist or neuropsychologist specializing in adult ADHD. This could be life-changing.',
    icon: '🔴',
  },
  {
    id: 'r04',
    conditions: [{ domain: 'functionalImpairment', operator: '<', value: 42 }],
    title: 'High Daily Life Impairment',
    insight:
      'Your attention challenges are creating significant daily life and career impairment. At this level, the cost — in missed opportunities, strained relationships, and underperformance — compounds over time into major life consequences.',
    category: 'risk',
    priority: 1,
    actionable: 'Seek professional support this month. The ROI of addressing this now vs. in 5 years is enormous.',
    icon: '🚩',
  },
  {
    id: 'r05',
    conditions: [
      { domain: 'burnoutLoad', operator: '>=', value: 65 },
      { domain: 'sleepRecovery', operator: '<', value: 50 },
    ],
    title: 'Burnout-Sleep Danger Zone',
    insight:
      'The combination of high burnout and poor sleep creates a dangerous compounding effect. Each makes the other worse: burnout disrupts sleep, and poor sleep accelerates burnout. Without intervention, this spiral deepens.',
    category: 'risk',
    priority: 1,
    actionable: 'Address sleep first — it has the highest leverage. One week of improved sleep will measurably reduce burnout.',
    icon: '⚠️',
  },
  {
    id: 'r06',
    conditions: [
      { domain: 'impulsivity', operator: '<', value: 45 },
      { domain: 'emotionalRegulation', operator: '<', value: 48 },
    ],
    title: 'Relationship Risk Pattern',
    insight:
      'Your combined impulse control and emotional regulation challenges create a pattern that can damage professional relationships. Reactive responses, interruptions, and emotional volatility erode trust over time — often without the person realizing the impact.',
    category: 'risk',
    priority: 1,
    actionable: 'Request feedback from a trusted colleague about how you come across under pressure. Act on what you hear.',
    icon: '💔',
  },
  {
    id: 'r07',
    conditions: [
      { domain: 'attentionControl', operator: '<', value: 45 },
      { domain: 'executiveFunction', operator: '<', value: 48 },
    ],
    title: 'Core Cognitive Risk',
    insight:
      'Both your attention control and executive function are in risk territory. These two domains form the engine of cognitive performance. At these levels, your ability to do your best work is significantly compromised.',
    category: 'risk',
    priority: 1,
    actionable: 'Prioritize a comprehensive evaluation and cognitive coaching engagement. These are addressable challenges.',
    icon: '🔴',
  },
  {
    id: 'r08',
    conditions: [
      { domain: 'timeBlindness', operator: '<', value: 42 },
      { domain: 'functionalImpairment', operator: '<', value: 55 },
    ],
    title: 'Time-Impairment Compounding',
    insight:
      'Severe time blindness combined with daily impairment creates a compounding career risk. Missed deadlines, late deliveries, and time estimation failures accumulate into a reputation that is difficult to reverse.',
    category: 'risk',
    priority: 2,
    actionable: 'Implement an external time scaffolding system immediately: calendar blocks, alarms, and double-time estimates.',
    icon: '⏰',
  },
  {
    id: 'r09',
    conditions: [
      { domain: 'workingMemory', operator: '<', value: 42 },
      { domain: 'attentionControl', operator: '<', value: 52 },
    ],
    title: 'Memory-Attention Double Impact',
    insight:
      'The combination of working memory challenges and attention control issues creates a double-hit on cognitive performance. Information doesn\'t stay retained, and maintaining focus on what matters is a constant struggle.',
    category: 'risk',
    priority: 2,
    actionable: 'Build a comprehensive external memory system. Record everything important immediately — treat your memory as unreliable.',
    icon: '🧩',
  },
  {
    id: 'r10',
    conditions: [{ domain: 'emotionalRegulation', operator: '<', value: 42 }],
    title: 'Emotional Regulation Crisis',
    insight:
      'Your emotional regulation score is in a concerning range. At this level, emotional reactions are likely derailing focus, damaging relationships, and creating a volatile environment for you and those around you.',
    category: 'risk',
    priority: 1,
    actionable: 'Consider therapy or executive coaching focused specifically on emotional regulation skills.',
    icon: '🚨',
  },
  {
    id: 'r11',
    conditions: [
      { domain: 'childhoodIndicators', operator: '>=', value: 70 },
      { domain: 'functionalImpairment', operator: '<', value: 52 },
    ],
    title: 'Long-Term Pattern Impact',
    insight:
      'A strong childhood indicator pattern combined with current functional impairment suggests an enduring attention challenge that has accumulated costs over many years. Professional assessment could unlock targeted strategies with significant impact.',
    category: 'risk',
    priority: 2,
    actionable: 'A formal evaluation is strongly recommended. The years of compensatory effort have a real cost worth addressing.',
    icon: '🔍',
  },
  {
    id: 'r12',
    conditions: [{ domain: 'digitalEnvironment', operator: '<', value: 38 }],
    title: 'Digital Environment Crisis',
    insight:
      'Your digital environment is actively undermining your cognitive performance. Constant notification interruptions, social media consumption, and digital fragmentation are depleting the focus reserves you need for meaningful work.',
    category: 'risk',
    priority: 2,
    actionable: 'Conduct a 7-day digital detox: delete social apps, turn off all notifications, observe the difference.',
    icon: '📵',
  },
  {
    id: 'r13',
    conditions: [
      { domain: 'hyperfocus', operator: '>=', value: 70 },
      { domain: 'sleepRecovery', operator: '<', value: 48 },
    ],
    title: 'Hyperfocus-Burnout Collision',
    insight:
      'Your hyperfocus capability is working against your recovery. Intense focus episodes extend into night hours, disrupting sleep, which then impairs your ability to enter quality focus the next day. You are burning the candle from both ends.',
    category: 'risk',
    priority: 2,
    actionable: 'Set a hard "hyperfocus cutoff" at least 2 hours before your target bedtime. Use an alarm, not willpower.',
    icon: '🕰️',
  },
  {
    id: 'r14',
    conditions: [{ domain: 'attentionHealthScore', operator: '<', value: 42 }],
    title: 'Comprehensive Attention Health Crisis',
    insight:
      'Your overall attention health score indicates broad-based challenges that are significantly impacting your quality of life and professional performance. This level of challenge requires professional support, not self-help alone.',
    category: 'risk',
    priority: 1,
    actionable: 'Seek a comprehensive evaluation from a qualified professional. Effective help exists — you don\'t have to manage this alone.',
    icon: '🆘',
  },
  {
    id: 'r15',
    conditions: [
      { domain: 'impulsivity', operator: '<', value: 42 },
    ],
    title: 'Severe Impulse Control Challenge',
    insight:
      'Your impulse control score indicates a significant challenge. Impulsive decisions, reactive communication, and difficulty resisting distractions are likely creating real professional and personal consequences.',
    category: 'risk',
    priority: 1,
    actionable: 'Work with a behavioral coach or therapist who uses evidence-based impulse control techniques (DBT, CBT).',
    icon: '🌪️',
  },
  {
    id: 'r16',
    conditions: [
      { domain: 'burnoutLoad', operator: '>=', value: 78 },
    ],
    title: 'Burnout Crisis — Immediate Action Required',
    insight:
      'Your burnout score is at a critical threshold. At this level, you are likely experiencing significant cognitive impairment that mirrors clinical depression in its neurological impact. This is a medical-level situation.',
    category: 'risk',
    priority: 1,
    actionable: 'Take at least 3 consecutive days completely off work immediately. Then book a medical appointment.',
    icon: '🆘',
  },
  {
    id: 'r17',
    conditions: [
      { domain: 'functionalImpairment', operator: '<', value: 48 },
      { domain: 'burnoutLoad', operator: '>=', value: 62 },
    ],
    title: 'Functioning Under Burnout',
    insight:
      'The combination of elevated burnout and daily functional impairment is creating a dangerous performance pattern. You are likely appearing functional to others while experiencing significant internal strain.',
    category: 'risk',
    priority: 1,
    actionable: 'Have an honest conversation with your manager or doctor about your current capacity. Getting support is professional.',
    icon: '🎭',
  },
  {
    id: 'r18',
    conditions: [
      { domain: 'sleepRecovery', operator: '<', value: 52 },
      { domain: 'emotionalRegulation', operator: '<', value: 55 },
    ],
    title: 'Sleep-Emotional Cascade',
    insight:
      'Poor sleep directly impairs emotional regulation — this is neurological fact. Your score pattern suggests this cascade is active: sleep deprivation is amplifying emotional reactivity and making self-regulation significantly harder.',
    category: 'risk',
    priority: 2,
    actionable: 'A single week of improved sleep will measurably improve emotional regulation. Start tonight.',
    icon: '⚡',
  },
  {
    id: 'r19',
    conditions: [
      { domain: 'timeBlindness', operator: '<', value: 48 },
      { domain: 'impulsivity', operator: '<', value: 52 },
    ],
    title: 'Time-Impulse Compounding',
    insight:
      'Impulsivity and time blindness working together create a particularly disruptive pattern: you are both poor at estimating time and prone to making reactive decisions without planning ahead — a combination that leads to chronic underdelivery.',
    category: 'risk',
    priority: 2,
    actionable: 'Use the "10-10-10" rule for decisions: how will I feel about this in 10 minutes, 10 hours, 10 weeks?',
    icon: '⏳',
  },
  {
    id: 'r20',
    conditions: [
      { domain: 'workingMemory', operator: '<', value: 48 },
      { domain: 'functionalImpairment', operator: '<', value: 55 },
    ],
    title: 'Memory-Functioning Risk',
    insight:
      'Working memory challenges at this level create daily functional consequences that accumulate into career and relationship costs. Missed commitments, forgotten details, and the social friction of forgetfulness compound over time.',
    category: 'risk',
    priority: 2,
    actionable: 'Implement zero-friction capture systems everywhere. Phone in pocket with quick capture. No exceptions.',
    icon: '📉',
  },
  {
    id: 'r21',
    conditions: [
      { domain: 'adhdRiskIndicator', operator: '>=', value: 60 },
      { domain: 'childhoodIndicators', operator: '>=', value: 55 },
    ],
    title: 'ADHD Risk — Evaluation Recommended',
    insight:
      'Your combined ADHD risk indicator and childhood pattern scores suggest a meaningful probability of an undiagnosed attention-related condition. While not definitive, the pattern is consistent enough that professional evaluation would be valuable.',
    category: 'risk',
    priority: 2,
    actionable: 'Complete the Vanderbilt or Adult ADHD Self-Report Scale (ASRS) as a starting point, then consult a professional.',
    icon: '🔍',
  },
  {
    id: 'r22',
    conditions: [
      { domain: 'executiveFunction', operator: '<', value: 48 },
    ],
    title: 'Executive Function Risk',
    insight:
      'Significant executive function challenges affect your ability to plan, organize, initiate, and complete complex work. Without targeted intervention, these challenges tend to become more limiting as career complexity increases.',
    category: 'risk',
    priority: 2,
    actionable: 'Consider cognitive behavioral therapy or executive function coaching — both have strong evidence bases for this challenge.',
    icon: '⚠️',
  },
  {
    id: 'r23',
    conditions: [
      { domain: 'hyperfocus', operator: '>=', value: 68 },
      { domain: 'burnoutLoad', operator: '>=', value: 68 },
    ],
    title: 'Intensity-Exhaustion Cycle',
    insight:
      'You are in an intensity-exhaustion cycle: hyperfocus episodes produce exceptional output, followed by significant crashes. Without intervention, the down cycles get longer and the up cycles less reliable.',
    category: 'risk',
    priority: 2,
    actionable: 'Create mandatory "cool-down" periods after intense focus sprints. Treat recovery as part of the work.',
    icon: '🔄',
  },
  {
    id: 'r24',
    conditions: [
      { domain: 'attentionControl', operator: '<', value: 48 },
      { domain: 'burnoutLoad', operator: '>=', value: 65 },
    ],
    title: 'Attention-Burnout Compound Risk',
    insight:
      'When attention control challenges compound with high burnout, the combined effect on performance and wellbeing is severe. Both issues demand cognitive resources to manage — and they are both depleting the same limited reserves.',
    category: 'risk',
    priority: 1,
    actionable: 'Address both with a two-track approach: structural focus support + immediate burnout reduction.',
    icon: '🔴',
  },
  {
    id: 'r25',
    conditions: [
      { domain: 'digitalEnvironment', operator: '<', value: 45 },
      { domain: 'workingMemory', operator: '<', value: 55 },
    ],
    title: 'Digital-Memory Erosion',
    insight:
      'Digital fragmentation actively impairs working memory. Constant task-switching, notification interruptions, and multi-app usage prevent the focus consolidation that memory encoding requires. Your digital habits may be making your memory worse over time.',
    category: 'risk',
    priority: 2,
    actionable: 'Single-task for one full day and observe the difference in memory and recall quality by the end.',
    icon: '📵',
  },

  // ─── RECOMMENDATIONS (15 rules) ───────────────────────────────────────────
  {
    id: 'rec01',
    conditions: [
      { domain: 'sleepRecovery', operator: '<', value: 60 },
    ],
    title: 'Sleep Optimization Protocol',
    insight:
      'Your highest-ROI cognitive investment right now is sleep. Implement a consistent sleep schedule, reduce screens 90 minutes before bed, and target 7.5+ hours nightly. Track for 21 days — the improvement in every other metric will surprise you.',
    category: 'recommendation',
    priority: 1,
    actionable: 'Set a non-negotiable "last screen" alarm for 9:30pm starting tonight.',
    icon: '🌙',
  },
  {
    id: 'rec02',
    conditions: [
      { domain: 'executiveFunction', operator: '<', value: 62 },
    ],
    title: 'External Scaffolding System',
    insight:
      'Build external systems to compensate for executive function gaps. A trusted task capture tool, weekly review practice, and daily 3-item priority list will dramatically reduce the cognitive overhead of managing your work.',
    category: 'recommendation',
    priority: 1,
    actionable: 'Choose one tool (Notion, Obsidian, physical notebook) and commit to using it exclusively for 30 days.',
    icon: '🏗️',
  },
  {
    id: 'rec03',
    conditions: [
      { domain: 'burnoutLoad', operator: '>=', value: 62 },
    ],
    title: 'Burnout Recovery Protocol',
    insight:
      'Take a structured approach to burnout recovery: identify your top 3 energy drains, protect cognitive recovery time daily, and schedule at least one complete recovery day per week with zero work-related inputs.',
    category: 'recommendation',
    priority: 1,
    actionable: 'Block every Sunday afternoon as protected recovery time for the next 8 weeks.',
    icon: '🔋',
  },
  {
    id: 'rec04',
    conditions: [
      { domain: 'digitalEnvironment', operator: '<', value: 60 },
    ],
    title: 'Digital Environment Redesign',
    insight:
      'Redesign your digital environment to support deep focus: turn off all non-critical notifications, install a website blocker for focus periods, charge your phone outside the bedroom, and create phone-free focus blocks daily.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Install Freedom or Cold Turkey app today. Block your top 5 distraction sites from 9am–12pm daily.',
    icon: '🔇',
  },
  {
    id: 'rec05',
    conditions: [
      { domain: 'attentionControl', operator: '<', value: 58 },
    ],
    title: 'Attention Training Practice',
    insight:
      'Build an intentional attention training practice: start with 15-minute deep work blocks and extend by 5 minutes weekly. Meditation (even 10 minutes daily) has strong evidence for improving sustained attention over 8 weeks.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Download a meditation app (Headspace, Waking Up, or Insight Timer) and commit to 10 minutes daily for 30 days.',
    icon: '🧘',
  },
  {
    id: 'rec06',
    conditions: [
      { domain: 'timeBlindness', operator: '<', value: 58 },
    ],
    title: 'Time Architecture System',
    insight:
      'Build time architecture into your environment: use a visible analog clock, implement time-blocking in your calendar, set alarms for all transitions, and practice doubling your time estimates before committing to deadlines.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Set 4 daily alarms: 9am (start work), 12pm (lunch/break), 3pm (afternoon focus), 6pm (shutdown ritual).',
    icon: '⏰',
  },
  {
    id: 'rec07',
    conditions: [
      { domain: 'impulsivity', operator: '<', value: 58 },
    ],
    title: 'Impulse Management Protocol',
    insight:
      'Implement deliberate pauses before acting: the 5-second rule (count to 5 before responding to any trigger), 24-hour decision delay for anything non-urgent, and a personal "response policy" for email and messages.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Implement the "24-hour email rule": draft responses immediately, send after 24 hours for any emotionally charged message.',
    icon: '⏸️',
  },
  {
    id: 'rec08',
    conditions: [
      { domain: 'emotionalRegulation', operator: '<', value: 60 },
    ],
    title: 'Emotional Regulation Toolkit',
    insight:
      'Build a personalized emotional regulation toolkit: identify your top triggers, develop specific response protocols for each, practice box breathing for acute stress, and consider therapy or coaching to strengthen this critical skill.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Practice box breathing (4-4-4-4 count) twice daily for 21 days. It directly trains the vagal response.',
    icon: '🌬️',
  },
  {
    id: 'rec09',
    conditions: [
      { domain: 'workingMemory', operator: '<', value: 60 },
    ],
    title: 'Memory Externalization System',
    insight:
      'Build a comprehensive external memory system: capture everything immediately (voice memos, quick notes), use a trusted reference system, and develop a daily review practice. Stop trying to remember — start building reliable retrieval systems.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Set up a single "capture inbox" (physical or digital). Route all thoughts, tasks, and ideas there immediately.',
    icon: '📥',
  },
  {
    id: 'rec10',
    conditions: [
      { domain: 'hyperfocus', operator: '>=', value: 68 },
      { domain: 'executiveFunction', operator: '<', value: 60 },
    ],
    title: 'Hyperfocus Channeling Strategy',
    insight:
      'Learn to channel your hyperfocus capability strategically. Identify your 3 highest-leverage projects and deliberately trigger focus sessions on them. Use interest-bridging to connect routine tasks to meaningful outcomes.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Create a "focus menu" — a list of 3-5 high-interest AND high-importance projects ready to start immediately.',
    icon: '⚡',
  },
  {
    id: 'rec11',
    conditions: [
      { domain: 'adhdRiskIndicator', operator: '>=', value: 65 },
    ],
    title: 'Professional Evaluation',
    insight:
      'Given your score pattern, a professional evaluation for attention-related challenges would be highly valuable. A qualified assessment can provide clarity, open access to targeted support, and significantly reduce the compensatory effort you currently expend.',
    category: 'recommendation',
    priority: 1,
    actionable: 'Search for "adult ADHD evaluation [your city]" and book an appointment this week. Knowledge is power.',
    icon: '🏥',
  },
  {
    id: 'rec12',
    conditions: [
      { domain: 'attentionHealthScore', operator: '>=', value: 70 },
    ],
    title: 'Performance Optimization Strategy',
    insight:
      'From your strong foundation, focus on performance optimization rather than remediation: identify your peak cognitive hours and protect them for deep work, eliminate the 20% of activities consuming the most cognitive resources for the least return.',
    category: 'recommendation',
    priority: 3,
    actionable: 'Track your hourly energy and focus for one week. Find your peak 2-hour window and protect it for your most important work.',
    icon: '📈',
  },
  {
    id: 'rec13',
    conditions: [
      { domain: 'functionalImpairment', operator: '<', value: 55 },
    ],
    title: 'Structural Life Redesign',
    insight:
      'Your functional impairment score suggests it is time for a structural redesign — not surface-level tactics but a fundamental rethinking of how your work and life are organized to work with your attention profile rather than against it.',
    category: 'recommendation',
    priority: 1,
    actionable: 'Work with an ADHD coach or occupational therapist to redesign your work structure over 3 months.',
    icon: '🏗️',
  },
  {
    id: 'rec14',
    conditions: [
      { domain: 'burnoutLoad', operator: '>=', value: 70 },
      { domain: 'sleepRecovery', operator: '<', value: 55 },
    ],
    title: 'Urgent Recovery Intervention',
    insight:
      'The combination of high burnout and poor sleep requires urgent attention. Continuing at this pace will accelerate cognitive decline and increase the risk of a complete burnout event that could take months to recover from.',
    category: 'recommendation',
    priority: 1,
    actionable: 'Take the next 5 days to implement strict sleep hygiene and eliminate your highest-drain commitments.',
    icon: '🚑',
  },
  {
    id: 'rec15',
    conditions: [
      { domain: 'childhoodIndicators', operator: '>=', value: 65 },
    ],
    title: 'ADHD-Informed Strategies',
    insight:
      'Your profile suggests ADHD-informed strategies will be more effective than generic productivity advice. Strategies designed for neurotypical brains often don\'t work for your profile. Seek resources specifically designed for ADHD adults.',
    category: 'recommendation',
    priority: 2,
    actionable: 'Read "Driven to Distraction" by Hallowell & Ratey or "How to ADHD" resources designed for high-achieving adults.',
    icon: '📚',
  },
]

export function evaluateInsights(scores: ScoreResult): EvaluatedInsight[] {
  const matched: EvaluatedInsight[] = []

  for (const rule of INSIGHT_RULES) {
    const allConditionsMet = rule.conditions.every((condition) => {
      const score = scores[condition.domain] as number
      if (score === undefined) return false

      switch (condition.operator) {
        case '>': return score > condition.value
        case '<': return score < condition.value
        case '>=': return score >= condition.value
        case '<=': return score <= condition.value
        default: return false
      }
    })

    if (allConditionsMet) {
      matched.push({
        id: rule.id,
        title: rule.title,
        insight: rule.insight,
        category: rule.category,
        priority: rule.priority,
        actionable: rule.actionable,
        icon: rule.icon,
      })
    }
  }

  return matched.sort((a, b) => a.priority - b.priority)
}

export function getInsightsByCategory(
  scores: ScoreResult,
  category: InsightCategory,
  limit?: number
): EvaluatedInsight[] {
  const all = evaluateInsights(scores)
  const filtered = all.filter((i) => i.category === category)
  return limit ? filtered.slice(0, limit) : filtered
}

export function getTopInsights(scores: ScoreResult, limit = 6): EvaluatedInsight[] {
  return evaluateInsights(scores).slice(0, limit)
}
