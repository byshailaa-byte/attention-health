import { NextResponse } from 'next/server'
import React from 'react'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer'

export const runtime = 'nodejs'

// ─── Palette ──────────────────────────────────────────────────────────────────
const G  = '#1B4332'
const D  = '#1a1a1a'
const GR = '#666666'
const AL = '#f9f9f9'
const CB = '#f5f5f5'

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page:    { fontFamily: 'Helvetica', fontSize: 10, color: D, paddingTop: 56, paddingBottom: 56, paddingHorizontal: 40 },
  cover:   { fontFamily: 'Helvetica', fontSize: 10, color: D, padding: 40 },
  hdr:     { position: 'absolute', top: 20, left: 40, right: 40 },
  hdrTxt:  { fontSize: 8, color: GR, textAlign: 'right' },
  ftr:     { position: 'absolute', bottom: 20, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between' },
  ftrTxt:  { fontSize: 8, color: GR },
  h1:      { fontSize: 14, fontFamily: 'Helvetica-Bold', color: G, marginBottom: 10 },
  h2:      { fontSize: 11, fontFamily: 'Helvetica-Bold', color: D, marginBottom: 5, marginTop: 10 },
  body:    { fontSize: 10, lineHeight: 1.6, marginBottom: 7 },
  div:     { borderBottomWidth: 1, borderBottomColor: G, borderBottomStyle: 'solid', marginBottom: 10 },
  callout: { backgroundColor: CB, borderLeftWidth: 3, borderLeftColor: G, borderLeftStyle: 'solid', padding: 12, marginVertical: 8 },
  ctTxt:   { fontSize: 10, lineHeight: 1.6, color: D },
  bul:     { flexDirection: 'row', marginBottom: 4 },
  bDot:    { width: 14, fontSize: 10 },
  bTxt:    { flex: 1, fontSize: 10, lineHeight: 1.5 },
  tHdr:    { flexDirection: 'row', backgroundColor: G },
  tRow:    { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', borderBottomStyle: 'solid' },
  tAlt:    { flexDirection: 'row', backgroundColor: AL, borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', borderBottomStyle: 'solid' },
  tHC:     { fontSize: 8, fontFamily: 'Helvetica-Bold', color: 'white', padding: 5, flex: 1 },
  tC:      { fontSize: 8.5, color: D, padding: 5, flex: 1, lineHeight: 1.4 },
  tbl:     { marginVertical: 8 },
  note:    { fontSize: 8.5, fontFamily: 'Helvetica-Oblique', color: GR, marginTop: 6 },
})

// ─── Reusable Components ──────────────────────────────────────────────────────

const H = () => (
  <View style={S.hdr} fixed>
    <Text style={S.hdrTxt}>Attention Health Assessment™ — Scientific Framework</Text>
  </View>
)

const F = () => (
  <View style={S.ftr} fixed>
    <Text style={S.ftrTxt}>Confidential | For Expert Review | The Human Decision | 2025</Text>
    <Text
      style={S.ftrTxt}
      render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
        `Page ${pageNumber} of ${totalPages}`
      }
    />
  </View>
)

const Dv = () => <View style={S.div} />

const Bul = ({ t }: { t: string }) => (
  <View style={S.bul}>
    <Text style={S.bDot}>•</Text>
    <Text style={S.bTxt}>{t}</Text>
  </View>
)

const TH = ({ cols, flex }: { cols: string[]; flex?: number[] }) => (
  <View style={S.tHdr}>
    {cols.map((c, i) => (
      <Text key={i} style={flex ? [S.tHC, { flex: flex[i] }] : S.tHC}>{c}</Text>
    ))}
  </View>
)

const TR = ({ cols, alt, flex }: { cols: string[]; alt?: boolean; flex?: number[] }) => (
  <View style={alt ? S.tAlt : S.tRow}>
    {cols.map((c, i) => (
      <Text key={i} style={flex ? [S.tC, { flex: flex[i] }] : S.tC}>{c}</Text>
    ))}
  </View>
)

// ─── Page 1: Cover ────────────────────────────────────────────────────────────
const CoverPage = () => (
  <Page size="A4" style={S.cover}>
    <View style={{ borderTopWidth: 3, borderTopColor: G, borderTopStyle: 'solid', marginBottom: 44 }} />
    <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: GR, letterSpacing: 2, marginBottom: 44 }}>
      THE HUMAN DECISION
    </Text>
    <Text style={{ fontSize: 28, fontFamily: 'Helvetica-Bold', color: D, lineHeight: 1.2, marginBottom: 10 }}>
      Attention Health{'\n'}Assessment™
    </Text>
    <Text style={{ fontSize: 13, color: GR, marginBottom: 26 }}>
      Scientific Framework &amp; Measurement Model
    </Text>
    <View style={{ borderBottomWidth: 2, borderBottomColor: G, borderBottomStyle: 'solid', marginBottom: 26 }} />
    <Text style={{ fontSize: 12, color: D, lineHeight: 1.7, marginBottom: 30 }}>
      A framework for measuring the quality, stability, and effectiveness of human attention in modern environments.
    </Text>
    <View style={{ backgroundColor: CB, borderLeftWidth: 3, borderLeftColor: G, borderLeftStyle: 'solid', padding: 12, alignSelf: 'flex-start', marginBottom: 30 }}>
      <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: D }}>
        Early-Stage Framework | For Expert Review
      </Text>
    </View>
    <Text style={{ fontSize: 10, color: GR, marginBottom: 200 }}>June 2025</Text>
    <View style={{ borderBottomWidth: 1, borderBottomColor: G, borderBottomStyle: 'solid' }} />
  </Page>
)

// ─── Page 2: Executive Summary ────────────────────────────────────────────────
const ExecSummaryPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Executive Summary</Text>
    <Dv />
    <Text style={S.body}>
      Attention has emerged as a critical human performance constraint. In an era defined by information abundance,
      digital connectivity, and accelerating cognitive demands, the capacity to direct, sustain, and regulate attention
      has become foundational to individual and organizational effectiveness.
    </Text>
    <Text style={S.body}>
      Current solutions — productivity frameworks, wellness apps, stress management programs — address symptoms without
      measuring the underlying attentional architecture. There is no widely adopted, scientifically validated instrument
      for assessing the quality and stability of attention as a distinct construct in non-clinical adult populations.
    </Text>
    <Text style={S.body}>
      The Attention Health Assessment™ proposes a multidimensional, self-report measurement framework designed to assess
      attention functioning across domains including executive control, working memory, impulse regulation, time
      perception, emotional regulation, recovery, and hyperfocus patterns.
    </Text>
    <Text style={S.body}>
      This document presents the conceptual foundation, dimensional model, assessment architecture, and validation
      roadmap, and invites critical expert review before broader deployment.
    </Text>
  </Page>
)

// ─── Page 3: Section 1 — Background ──────────────────────────────────────────
const BackgroundPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Section 1 — Background &amp; Problem Statement</Text>
    <Dv />
    <Text style={S.h2}>1.1  Attention as a Finite Cognitive Resource</Text>
    <Text style={S.body}>
      Attention is not unlimited. Kahneman's (1973) capacity model and subsequent resource depletion models
      (Baumeister et al., 1998) establish that cognitive resources are depletable under sustained demand. In
      occupational contexts, sustained attentional effort without adequate recovery is associated with performance
      degradation, increased error rates, and reduced executive functioning.
    </Text>
    <Text style={S.h2}>1.2  Digital Environments and Attentional Fragmentation</Text>
    <Text style={S.body}>
      Research by Gloria Mark and colleagues (2008) demonstrated that knowledge workers switch tasks approximately
      every three minutes and require an average of 23 minutes to fully recover attentional focus following an
      interruption. The proliferation of digital communication channels and notification architectures has
      significantly amplified attentional fragmentation in modern occupational settings.
    </Text>
    <Text style={S.h2}>1.3  Attention Residue</Text>
    <Text style={S.body}>
      Leroy's (2009) concept of attention residue describes the cognitive carry-over from incomplete tasks that
      continues to occupy working memory and reduces performance on subsequent tasks. This is particularly relevant
      in high-context-switch environments common to startup and knowledge work settings.
    </Text>
    <Text style={S.h2}>1.4  Context Switching and Cognitive Overhead</Text>
    <Text style={S.body}>
      Rubinstein, Meyer &amp; Evans (2001) demonstrated that mental task-switching imposes significant cognitive overhead.
      Each transition requires reorientation of attentional resources and suppression of previously active cognitive
      sets. Cumulative context switching reduces deep work capacity and increases mental fatigue.
    </Text>
    <Text style={S.h2}>1.5  Decision Fatigue</Text>
    <Text style={S.body}>
      Baumeister's ego depletion model and Danziger et al.'s (2011) judicial decision research illustrate how
      sustained decision-making progressively depletes attentional and self-regulatory resources, resulting in
      poorer choices and increased impulsivity over time.
    </Text>
    <Text style={S.h2}>1.6  The Measurement Gap</Text>
    <Text style={S.body}>
      Despite growing awareness of attention-related challenges, no widely validated non-clinical instrument exists
      for assessing attentional functioning in working adults. Burnout assessments capture emotional exhaustion but
      not attentional quality. Personality instruments describe stable traits, not dynamic attentional states.
      Clinical ADHD screeners are diagnostic tools inappropriate for general occupational use.
    </Text>
  </Page>
)

// ─── Page 4: Section 2 — Defining Attention Health ───────────────────────────
const DefinitionPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Section 2 — Defining Attention Health</Text>
    <Dv />
    <View style={S.callout}>
      <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: D, marginBottom: 5 }}>Formal Definition</Text>
      <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Oblique', lineHeight: 1.7, color: D }}>
        "Attention Health is defined as the capacity of an individual to effectively direct, sustain, shift, and
        regulate attentional resources across varied cognitive demands, while maintaining adequate recovery, emotional
        regulation, and metacognitive awareness of attentional functioning."
      </Text>
    </View>
    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
      <View style={{ flex: 1, backgroundColor: '#f0fdf4', borderTopWidth: 2, borderTopColor: G, borderTopStyle: 'solid', padding: 10, marginRight: 6 }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: G, marginBottom: 5 }}>What Attention Health IS:</Text>
        <Bul t="A dynamic, state-influenced functional capacity" />
        <Bul t="Measurable through self-report behavioral indicators" />
        <Bul t="Influenced by sleep, stress, cognitive load, and environment" />
        <Bul t="Amenable to targeted intervention and skill development" />
        <Bul t="Distinct from stable personality traits and neurological diagnoses" />
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff7f7', borderTopWidth: 2, borderTopColor: '#EF4444', borderTopStyle: 'solid', padding: 10, marginLeft: 6 }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#991B1B', marginBottom: 5 }}>What Attention Health is NOT:</Text>
        <Bul t="A clinical diagnostic or screening instrument" />
        <Bul t="A measure of general intelligence" />
        <Bul t="A burnout or stress inventory" />
        <Bul t="A personality assessment" />
        <Bul t="A substitute for neuropsychological evaluation" />
      </View>
    </View>
    <Text style={[S.h2, { marginTop: 10 }]}>Distinctions from Related Constructs</Text>
    <View style={S.tbl}>
      <TH cols={['Construct', 'Definition', 'Distinction from Attention Health']} flex={[1, 2, 3]} />
      <TR cols={['Productivity', 'Output relative to input', 'Outcome measure; AH measures underlying capacity']} flex={[1, 2, 3]} />
      <TR alt cols={['Burnout', 'Emotional and physical exhaustion', 'State of depletion; AH captures functional quality']} flex={[1, 2, 3]} />
      <TR cols={['Stress', 'Perceived demand-resource imbalance', 'Antecedent of AH; not synonymous']} flex={[1, 2, 3]} />
      <TR alt cols={['Mental Health', 'Broad psychological functioning', 'Clinical construct; AH is non-clinical']} flex={[1, 2, 3]} />
      <TR cols={['Personality', 'Stable dispositional traits', 'Traits are stable; AH is dynamic and trainable']} flex={[1, 2, 3]} />
      <TR alt cols={['ADHD', 'Neurodevelopmental disorder', 'Clinical diagnosis; AH measures general population patterns']} flex={[1, 2, 3]} />
    </View>
  </Page>
)

// ─── Pages 5–6: Section 3 — Conceptual Model ─────────────────────────────────
const CM_COLS = ['Dimension', 'Definition', 'Theoretical Basis', 'Behavioural Indicators', 'Workplace Manifestations', 'Risk if Low']
const CM_FLEX = [1.1, 1.3, 1.3, 1.4, 1.4, 1.4]

const ConceptualPt1Page = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Section 3 — Conceptual Model</Text>
    <Dv />
    <Text style={[S.body, { marginBottom: 8 }]}>
      The proposed model posits that Attention Health is a multidimensional construct comprising eight theoretically
      distinct but interrelated dimensions, selected from established cognitive neuroscience, occupational psychology,
      and clinical attention research.
    </Text>
    <View style={S.tbl}>
      <TH cols={CM_COLS} flex={CM_FLEX} />
      <TR flex={CM_FLEX} cols={[
        'Attentional Control',
        'Capacity to direct and sustain focus while suppressing distractors',
        'Posner & Petersen (1990)',
        'Sustained task engagement; distraction resistance',
        'Deep analytical work completion',
        'Task abandonment; low deep work capacity',
      ]} />
      <TR alt flex={CM_FLEX} cols={[
        'Executive Function',
        'Planning, prioritization, initiation, and monitoring',
        'Miyake et al. (2000)',
        'Goal-directed planning; consistent follow-through',
        'Complex project delivery',
        'Difficulty initiating; planning-execution gap',
      ]} />
      <TR flex={CM_FLEX} cols={[
        'Working Memory',
        'Temporarily hold and manipulate task-relevant information',
        'Baddeley & Hitch (1974)',
        'Retention of multi-step instructions; recall accuracy',
        'Meeting effectiveness; learning retention',
        'Repeated reminders needed; information loss during interruptions',
      ]} />
      <TR alt flex={CM_FLEX} cols={[
        'Time Perception',
        'Accuracy of time estimation and allocation',
        'Barkley (2015) time blindness construct',
        'Accurate duration estimates; on-time delivery',
        'Deadline adherence; scheduling',
        'Chronic lateness; deadline-driven crisis mode',
      ]} />
    </View>
    <Text style={S.note}>Dimensions 5–8 continued on next page</Text>
  </Page>
)

const ConceptualPt2Page = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={[S.h1, { fontSize: 12 }]}>Section 3 — Conceptual Model (continued)</Text>
    <Dv />
    <View style={S.tbl}>
      <TH cols={CM_COLS} flex={CM_FLEX} />
      <TR flex={CM_FLEX} cols={[
        'Hyperfocus',
        'Interest-contingent deep engagement patterns',
        "Csikszentmihalyi (1990) flow theory",
        'Sustained engagement on interest tasks; neglect of low-interest tasks',
        'High output on engaging work',
        'Uneven performance; avoidance of routine tasks',
      ]} />
      <TR alt flex={CM_FLEX} cols={[
        'Impulse Regulation',
        'Inhibit premature or reactive responses',
        'Barkley inhibitory model; Nigg (2000)',
        'Pause-before-respond; deliberate decision-making',
        'Communication management; deliberate leadership',
        'Impulsive communication; reactive decisions',
      ]} />
      <TR flex={CM_FLEX} cols={[
        'Emotional Regulation',
        'Manage emotional arousal interfering with attention',
        'Gross (1998) process model',
        'Stress without cognitive hijacking; re-engagement after frustration',
        'Leadership under pressure; high-stakes performance',
        'Emotional flooding; attentional collapse under stress',
      ]} />
      <TR alt flex={CM_FLEX} cols={[
        'Recovery & Restoration',
        'Recovery behaviors restoring attentional capacity',
        'Kaplan (1989) Attention Restoration Theory',
        'Consistent sleep; genuine recovery; reduced rumination',
        'Sustained performance; burnout prevention',
        'Cognitive debt; burnout vulnerability',
      ]} />
    </View>
  </Page>
)

// ─── Page 7: Section 4 — Assessment Architecture ─────────────────────────────
const AssessmentPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Section 4 — Assessment Architecture</Text>
    <Dv />
    <Text style={S.h2}>Instrument Overview</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
      {[
        ['Total Items', '84'],
        ['Format', 'Self-report, 5-point Likert scales'],
        ['Completion Time', '12–15 minutes'],
        ['Target Population', 'Working adults 18+, knowledge workers, founders, professionals'],
      ].map(([label, value], i) => (
        <View key={i} style={{ width: '50%', marginBottom: 6, paddingRight: 8 }}>
          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: GR }}>{label.toUpperCase()}</Text>
          <Text style={{ fontSize: 9.5, color: D }}>{value}</Text>
        </View>
      ))}
    </View>
    <Text style={S.h2}>Item Distribution by Dimension</Text>
    <View style={S.tbl}>
      <TH cols={['Dimension', 'Item Count']} flex={[4, 1]} />
      {([
        ['Attentional Control', '8'],
        ['Executive Function', '10'],
        ['Working Memory', '7'],
        ['Time Perception & Management', '7'],
        ['Hyperfocus & Interest-Driven Attention', '6'],
        ['Impulse & Response Regulation', '7'],
        ['Emotional Regulation & Cognitive Load', '8'],
        ['Recovery & Attentional Restoration', '7'],
        ['Consistency Checks', '5'],
        ['Supplementary Items', '19'],
        ['Total', '84'],
      ] as [string, string][]).map(([d, c], i) => (
        <TR key={i} cols={[d, c]} alt={i % 2 !== 0} flex={[4, 1]} />
      ))}
    </View>
    <Text style={S.h2}>Required Psychometric Analyses (not yet conducted)</Text>
    {[
      'Item Analysis — inter-item correlations, item-total correlations',
      "Internal Consistency — Cronbach's α and McDonald's ω (target α > .70)",
      'Exploratory Factor Analysis — empirical dimensional structure',
      'Confirmatory Factor Analysis — test of 8-factor model fit',
      'Construct Validity — convergent and discriminant validity',
      'Test-Retest Reliability — score stability over 2–4 weeks',
      'Norm Development — stratified occupational and demographic norms',
      'Differential Item Functioning — item bias across subgroups',
    ].map((item, i) => (
      <View key={i} style={S.bul}>
        <Text style={{ ...S.bDot, fontFamily: 'Helvetica-Bold', color: G }}>{i + 1}.</Text>
        <Text style={S.bTxt}>{item}</Text>
      </View>
    ))}
  </Page>
)

// ─── Page 8: Section 5 — Scoring Framework ───────────────────────────────────
const ScoringPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Section 5 — Scoring Framework</Text>
    <Dv />
    <Text style={S.h2}>Dimension-Level Scoring</Text>
    <Text style={S.body}>
      Items scored 1–5. Reverse-scored items recoded prior to analysis. Raw scores normalized to 0–100 via
      min-max normalization. Higher scores indicate stronger functioning, except Impulsivity and Burnout Load
      (inverted so that higher = more resilient).
    </Text>
    <Text style={S.h2}>Composite Score</Text>
    <Text style={S.body}>
      A weighted composite Attention Health Score (0–100) is derived from dimension scores using theoretically
      motivated weights. Intended as high-level orientation only; interpret alongside the full dimension profile.
    </Text>
    <Text style={S.h2}>Hypothetical Interpretation Bands</Text>
    <View style={S.callout}>
      <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#92400E', marginBottom: 4 }}>
        Important Note
      </Text>
      <Text style={{ fontSize: 9, lineHeight: 1.6, color: D }}>
        The following bands are illustrative and hypothetical. Empirical norm development is required before
        clinical or occupational deployment.
      </Text>
    </View>
    <View style={S.tbl}>
      <TH cols={['Score Range', 'Classification', 'Indicative Meaning']} flex={[1, 1.5, 3]} />
      <TR cols={['85–100', 'Excellent', 'High attentional functioning across most domains']} flex={[1, 1.5, 3]} />
      <TR alt cols={['70–84', 'Good', 'Generally effective with identifiable development areas']} flex={[1, 1.5, 3]} />
      <TR cols={['55–69', 'Fair', 'Moderate challenges impacting performance']} flex={[1, 1.5, 3]} />
      <TR alt cols={['40–54', 'Needs Attention', 'Significant challenges affecting daily functioning']} flex={[1, 1.5, 3]} />
      <TR cols={['Below 40', 'At Risk', 'Substantial dysfunction; professional support may be warranted']} flex={[1, 1.5, 3]} />
    </View>
  </Page>
)

// ─── Page 9: Sections 6, 7 & 8 ───────────────────────────────────────────────
const ApplicationsPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Sections 6, 7 &amp; 8 — Interpretation, Applications &amp; Responsible Use</Text>
    <Dv />
    <Text style={S.h2}>Section 6 — Interpretive Report Structure</Text>
    {[
      'Executive Summary — 3–4 sentence narrative of key findings',
      'Attention Health Score — composite score with band classification',
      'Dimension Profile — radar visualization vs. population average',
      'Strength Dimensions — top 2–3 with behavioral interpretation',
      'Vulnerability Dimensions — lowest-scoring with impact analysis',
      'Pattern Insights — cross-dimensional pattern recognition',
      'Attention Archetype — profile from score combinations (8 archetypes)',
      'Personalized Recommendations — dimension-specific actions',
      'Responsible Use Disclaimer — embedded in all reports',
    ].map((item, i) => (
      <View key={i} style={S.bul}>
        <Text style={{ ...S.bDot, fontFamily: 'Helvetica-Bold', color: G }}>{i + 1}.</Text>
        <Text style={S.bTxt}>{item}</Text>
      </View>
    ))}
    <View style={S.callout}>
      <Text style={{ fontSize: 9, lineHeight: 1.6, color: D }}>
        Reports are generated algorithmically using rule-based insight logic and GPT-4o narrative generation.
        Outputs are informational only and have not been validated against clinical or occupational performance criteria.
      </Text>
    </View>
    <Text style={S.h2}>Section 7 — Intended Applications &amp; Limitations</Text>
    <View style={{ flexDirection: 'row', marginVertical: 6 }}>
      <View style={{ flex: 1, marginRight: 8 }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: G, marginBottom: 4 }}>INTENDED FOR</Text>
        <Bul t="Individual self-awareness and personal development" />
        <Bul t="Executive and leadership coaching" />
        <Bul t="Organizational wellbeing programs" />
        <Bul t="Academic research on occupational attention" />
        <Bul t="Longitudinal individual tracking" />
      </View>
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#991B1B', marginBottom: 4 }}>LIMITATIONS</Text>
        <Bul t="Subject to social desirability bias and self-insight limitations" />
        <Bul t="Not yet formally validated psychometrically" />
        <Bul t="Normative data does not currently exist" />
        <Bul t="Inappropriate for clinical or diagnostic use" />
        <Bul t="Cross-cultural validity not established" />
      </View>
    </View>
    <Text style={S.h2}>Section 8 — Responsible Use</Text>
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      <View style={{ flex: 1, backgroundColor: '#fff7f7', padding: 8, marginRight: 8 }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#991B1B', marginBottom: 4 }}>NOT INTENDED FOR</Text>
        <Bul t="Diagnosing ADHD or any neurological/psychiatric condition" />
        <Bul t="Replacing clinical neuropsychological evaluation" />
        <Bul t="Employment screening or clinical triage" />
        <Bul t="Providing medically actionable information" />
      </View>
      <View style={{ flex: 1, backgroundColor: '#f0fdf4', padding: 8, marginLeft: 8 }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: G, marginBottom: 4 }}>IS INTENDED FOR</Text>
        <Bul t="Individual self-awareness" />
        <Bul t="Coaching and development conversations" />
        <Bul t="Organizational wellbeing initiatives" />
        <Bul t="Generating hypotheses for professional exploration" />
      </View>
    </View>
  </Page>
)

// ─── Page 10: Section 9 — Expert Review ──────────────────────────────────────
const ExpertReviewPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Section 9 — Areas Requiring Expert Review</Text>
    <Dv />
    <View style={S.callout}>
      <Text style={{ fontSize: 10, color: D, lineHeight: 1.7, marginBottom: 10 }}>Dear Dr. Datta,</Text>
      <Text style={{ fontSize: 10, color: D, lineHeight: 1.7, marginBottom: 12 }}>
        The following represent the specific domains where your expertise would be most valuable in strengthening
        this framework:
      </Text>
      {[
        ['1.  Construct Definition', 'Is Attention Health sufficiently distinct from executive function, self-regulation, and burnout to warrant independent construct status?'],
        ['2.  Dimensional Structure', 'Does the 8-dimension model reflect theoretically coherent and empirically separable constructs? Which dimensions risk overlap?'],
        ['3.  Item Quality', 'What item development principles should govern behaviorally anchored Likert items for this domain?'],
        ['4.  Scoring Logic', 'Is the weighted composite defensible prior to factor analysis? What alternatives should be considered?'],
        ['5.  Validation Roadmap', 'What sequence of studies constitutes the minimum viable validation pathway for responsible deployment?'],
        ['6.  Benchmarking Strategy', 'What normative sampling strategy would you recommend for occupational norms?'],
        ['7.  Ethical Safeguards', 'Are there additional responsible use provisions required before broader deployment?'],
      ].map(([label, text], i) => (
        <View key={i} style={{ marginBottom: 9 }}>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: D }}>{label}</Text>
          <Text style={{ fontSize: 10, color: D, lineHeight: 1.6 }}>{text}</Text>
        </View>
      ))}
      <Text style={{ fontSize: 10, color: D, lineHeight: 1.7, marginTop: 6 }}>
        We are seeking rigorous critique rather than validation. Your candid assessment of both strengths and
        fundamental concerns would be invaluable.
      </Text>
    </View>
  </Page>
)

// ─── Page 11: Section 10 — Validation Roadmap ────────────────────────────────
const ValidationPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Section 10 — Validation Roadmap</Text>
    <Dv />
    <View style={S.tbl}>
      <TH cols={['Phase', 'Timeline', 'Activities', 'Success Criteria']} flex={[1.5, 1, 2.2, 2]} />
      {([
        ['1: Expert Review',           'Months 1–2',   'Expert review; construct refinement; item revision',         'Approved dimensional model and item pool'],
        ['2: Cognitive Interviewing',  'Months 2–3',   'Think-aloud review n=10–15; clarity testing',                'Items revised for face validity'],
        ['3: Pilot Study',             'Months 3–5',   'Pilot n=150–200; preliminary item analysis',                 'Item statistics within parameters'],
        ['4: Reliability & Factor Analysis', 'Months 5–8', 'Internal consistency; EFA; item refinement',            'α > .70; factor structure aligns with model'],
        ['5: Construct Validity',      'Months 8–14',  'Convergent/discriminant validity studies',                   'Meaningful correlations with related measures'],
        ['6: Norm Development',        'Months 12–20', 'Stratified normative sampling',                              'Representative occupational norms'],
        ['7: Ongoing Refinement',      'Months 18–24+','Annual review; research integration',                        'Continuous improvement cycle'],
      ] as [string, string, string, string][]).map((cols, i) => (
        <TR key={i} cols={cols} alt={i % 2 !== 0} flex={[1.5, 1, 2.2, 2]} />
      ))}
    </View>
  </Page>
)

// ─── Page 12: Closing Note + References ──────────────────────────────────────
const ClosingPage = () => (
  <Page size="A4" style={S.page}>
    <H /><F />
    <Text style={S.h1}>Closing Note &amp; References</Text>
    <Dv />
    <View style={S.callout}>
      <Text style={{ fontSize: 10, color: D, lineHeight: 1.7, marginBottom: 8 }}>Dear Dr. Datta,</Text>
      <Text style={{ fontSize: 10, color: D, lineHeight: 1.7, marginBottom: 8 }}>
        We are grateful for your willingness to review this framework. The Attention Health Assessment™ represents
        an early-stage but seriously considered effort to address a meaningful gap in attentional measurement in
        non-clinical adult populations.
      </Text>
      <Text style={{ fontSize: 10, color: D, lineHeight: 1.7, marginBottom: 8 }}>
        The Human Decision team is committed to building an instrument that is scientifically grounded, responsibly
        deployed, and practically useful. We recognise that credibility rests ultimately on psychometric rigour —
        and that requires expert scrutiny at every stage.
      </Text>
      <Text style={{ fontSize: 10, color: D, lineHeight: 1.7, marginBottom: 12 }}>
        We are not seeking endorsement. We are seeking honest critique to identify conceptual gaps, methodological
        weaknesses, and validation priorities before broader deployment.
      </Text>
      <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: D, lineHeight: 1.7 }}>
        With respect and appreciation,{'\n'}The Human Decision Team
      </Text>
    </View>
    <Text style={[S.h2, { marginTop: 14 }]}>References</Text>
    {[
      'Baddeley, A. D., & Hitch, G. (1974). Working memory. Psychology of Learning and Motivation, 8, 47–89.',
      'Baumeister, R. F., et al. (1998). Ego depletion. Journal of Personality and Social Psychology, 74(5), 1252–1265.',
      'Barkley, R. A. (2015). Attention-Deficit Hyperactivity Disorder (4th ed.). Guilford Press.',
      'Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience. Harper & Row.',
      'Danziger, S., et al. (2011). Extraneous factors in judicial decisions. PNAS, 108(17), 6889–6892.',
      'Gross, J. J. (1998). Emotion regulation: An integrative review. Review of General Psychology, 2(3), 271–299.',
      'Kahneman, D. (1973). Attention and Effort. Prentice-Hall.',
      'Kaplan, S. (1989). The restorative environment. In Public Places and Spaces. Plenum Press.',
      'Leroy, S. (2009). Attention residue when switching tasks. Organizational Behavior and Human Decision Processes, 109(2), 168–181.',
      'Mark, G., et al. (2008). The cost of interrupted work. CHI 2008 Proceedings.',
      'Miyake, A., et al. (2000). Unity and diversity of executive functions. Cognitive Psychology, 41(1), 49–100.',
      'Nigg, J. T. (2000). On inhibition/disinhibition in developmental psychopathology. Psychological Bulletin, 126(2), 220–246.',
      'Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. Annual Review of Neuroscience, 13, 25–42.',
      'Rubinstein, J. S., et al. (2001). Executive control in task switching. Journal of Experimental Psychology, 27(4), 763–797.',
    ].map((ref, i) => (
      <View key={i} style={{ flexDirection: 'row', marginBottom: 5 }}>
        <Text style={{ fontSize: 9, color: GR, width: 18 }}>{i + 1}.</Text>
        <Text style={{ fontSize: 9, color: D, flex: 1, lineHeight: 1.5 }}>{ref}</Text>
      </View>
    ))}
  </Page>
)

// ─── Document ─────────────────────────────────────────────────────────────────
const WhitepaperDoc = () => (
  <Document
    title="Attention Health Assessment™ — Scientific Framework & Measurement Model"
    author="The Human Decision"
    subject="Attention Health Assessment Scientific Framework"
    creator="Attention Health™"
  >
    <CoverPage />
    <ExecSummaryPage />
    <BackgroundPage />
    <DefinitionPage />
    <ConceptualPt1Page />
    <ConceptualPt2Page />
    <AssessmentPage />
    <ScoringPage />
    <ApplicationsPage />
    <ExpertReviewPage />
    <ValidationPage />
    <ClosingPage />
  </Document>
)

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const buffer = await renderToBuffer(<WhitepaperDoc />)
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="attention-health-scientific-framework.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('Whitepaper PDF generation error:', err)
    return new NextResponse('PDF generation failed', { status: 500 })
  }
}
