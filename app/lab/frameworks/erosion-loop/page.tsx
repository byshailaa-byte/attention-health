'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/marketing/Navigation'
import Footer from '@/components/marketing/Footer'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const pillStyle: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#4F8EF7',
  background: 'rgba(79,142,247,0.08)',
  border: '1px solid rgba(79,142,247,0.22)',
  borderRadius: '100px',
  padding: '5px 14px',
  marginBottom: '28px',
}

const researchBox: React.CSSProperties = {
  background: 'rgba(239,68,68,0.06)',
  borderLeft: '3px solid rgba(239,68,68,0.4)',
  borderRadius: '0 8px 8px 0',
  padding: '20px 24px',
  margin: '28px 0',
}

const researchLabel: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(239,68,68,0.7)',
  marginBottom: '10px',
}

const STAGE_COLORS: Record<string, string> = {
  '01': '#EF4444',
  '02': '#F97316',
  '03': '#EAB308',
  '04': '#84CC16',
  '05': '#EF4444',
  '06': '#DC2626',
}

export default function ErosionLoopPage() {
  return (
    <div style={{ backgroundColor: '#0A0F1E', minHeight: '100vh', color: 'white' }}>
      <Navigation />

      {/* ── SECTION 1: PAGE HEADER ── */}
      <section style={{ padding: '120px 24px 80px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Breadcrumb */}
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '32px', letterSpacing: '0.02em' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>The Human Decision</Link>
            <span style={{ margin: '0 8px' }}>→</span>
            <Link href="/lab/frameworks" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Framework Library</Link>
            <span style={{ margin: '0 8px' }}>→</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>The Erosion Loop™</span>
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <span style={pillStyle}>Framework · Attention Science</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '24px' }}>
            The Erosion Loop™
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 28px', fontWeight: 400 }}>
            How modern digital environments systematically degrade attentional capacity, decision quality, and performance — and why it feels like a personal failure when it isn&apos;t.
          </p>

          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)', marginBottom: '40px' }}>
            Published 2025 · The Human Decision Research Series · ~15 min read
          </p>

          {/* Citation box */}
          <div style={{ maxWidth: '680px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px 24px', textAlign: 'left' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>
              To cite this framework: The Human Decision (2025). The Erosion Loop™: A Framework for Understanding Attentional Degradation in Modern Knowledge Work. The Human Decision Research Series. thehumandecision.in/lab/frameworks/erosion-loop
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2: DIAGRAM ── */}
      <section style={{ backgroundColor: '#0F1629', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={pillStyle}>The Erosion Loop™</span>
          <p style={{ fontSize: '24px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em', marginTop: '8px' }}>
            A self-reinforcing cycle of attentional degradation
          </p>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <svg
            viewBox="0 0 700 700"
            width="100%"
            height="auto"
            style={{ display: 'block', overflow: 'visible' }}
            aria-label="The Erosion Loop — six stages: Distraction, Fragmented Attention, Poor Decisions, Reduced Performance, Stress, Lower Recovery"
          >
            <defs>
              <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="rgba(239,68,68,0.55)" />
              </marker>
              <style>{`
                @keyframes rotate-slow { to { transform: rotate(360deg); } }
                .loop-ring {
                  transform-origin: 350px 350px;
                  animation: rotate-slow 30s linear infinite;
                }
              `}</style>
            </defs>

            {/* Rotating dashed ring */}
            <circle className="loop-ring" cx="350" cy="350" r="270" fill="none" stroke="rgba(239,68,68,0.22)" strokeWidth="1.5" strokeDasharray="8 6" />

            {/* Static faint outer ring */}
            <circle cx="350" cy="350" r="270" fill="none" stroke="rgba(239,68,68,0.07)" strokeWidth="8" />

            {/* Curved arrows between nodes (clockwise arc paths) */}
            {/* 1→2: top-center to top-right */}
            <path d="M 398,112 Q 500,140 548,214" fill="none" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
            {/* 2→3: top-right to bottom-right */}
            <path d="M 580,278 Q 596,370 572,462" fill="none" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
            {/* 3→4: bottom-right to bottom-center */}
            <path d="M 544,520 Q 476,595 406,618" fill="none" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
            {/* 4→5: bottom-center to bottom-left */}
            <path d="M 296,618 Q 224,598 156,522" fill="none" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
            {/* 5→6: bottom-left to top-left */}
            <path d="M 120,462 Q 104,370 120,278" fill="none" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
            {/* 6→1: top-left to top-center */}
            <path d="M 152,214 Q 200,138 302,112" fill="none" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" markerEnd="url(#arrow-red)" />

            {/* Center text */}
            <text x="350" y="334" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" letterSpacing="0.15em" fontWeight={600}>THE</text>
            <text x="350" y="352" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" letterSpacing="0.15em" fontWeight={600}>PERFORMANCE</text>
            <text x="350" y="370" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" letterSpacing="0.15em" fontWeight={600}>DRAIN</text>

            {/* NODE 1: DISTRACTION — top (350, 80) */}
            <circle cx="350" cy="80" r="52" fill="#1a0a0a" stroke="#EF4444" strokeWidth="1.5" opacity="0.9" />
            <circle cx="350" cy="80" r="38" fill="rgba(239,68,68,0.15)" />
            <text x="350" y="88" textAnchor="middle" fontSize="22" dominantBaseline="middle">⚡</text>
            <text x="350" y="142" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>DISTRACTION</text>

            {/* NODE 2: FRAGMENTED ATTENTION — top right (590, 220) */}
            <circle cx="590" cy="220" r="52" fill="#1a0a0a" stroke="#EF4444" strokeWidth="1.5" opacity="0.9" />
            <circle cx="590" cy="220" r="38" fill="rgba(239,68,68,0.15)" />
            <text x="590" y="228" textAnchor="middle" fontSize="22" dominantBaseline="middle">🔀</text>
            <text x="590" y="281" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>FRAGMENTED</text>
            <text x="590" y="296" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>ATTENTION</text>

            {/* NODE 3: POOR DECISIONS — bottom right (590, 480) */}
            <circle cx="590" cy="480" r="52" fill="#1a0a0a" stroke="#EF4444" strokeWidth="1.5" opacity="0.9" />
            <circle cx="590" cy="480" r="38" fill="rgba(239,68,68,0.15)" />
            <text x="590" y="488" textAnchor="middle" fontSize="22" dominantBaseline="middle">⚠️</text>
            <text x="590" y="541" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>POOR</text>
            <text x="590" y="556" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>DECISIONS</text>

            {/* NODE 4: REDUCED PERFORMANCE — bottom center (350, 620) */}
            <circle cx="350" cy="620" r="52" fill="#1a0a0a" stroke="#EF4444" strokeWidth="1.5" opacity="0.9" />
            <circle cx="350" cy="620" r="38" fill="rgba(239,68,68,0.15)" />
            <text x="350" y="628" textAnchor="middle" fontSize="22" dominantBaseline="middle">📉</text>
            <text x="350" y="681" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>REDUCED</text>
            <text x="350" y="696" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>PERFORMANCE</text>

            {/* NODE 5: STRESS — bottom left (110, 480) */}
            <circle cx="110" cy="480" r="52" fill="#1a0a0a" stroke="#EF4444" strokeWidth="1.5" opacity="0.9" />
            <circle cx="110" cy="480" r="38" fill="rgba(239,68,68,0.15)" />
            <text x="110" y="488" textAnchor="middle" fontSize="22" dominantBaseline="middle">💢</text>
            <text x="110" y="541" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>STRESS</text>

            {/* NODE 6: LOWER RECOVERY — top left (110, 220) */}
            <circle cx="110" cy="220" r="52" fill="#1a0a0a" stroke="#EF4444" strokeWidth="1.5" opacity="0.9" />
            <circle cx="110" cy="220" r="38" fill="rgba(239,68,68,0.15)" />
            <text x="110" y="228" textAnchor="middle" fontSize="22" dominantBaseline="middle">🌙</text>
            <text x="110" y="281" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>LOWER</text>
            <text x="110" y="296" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight={600}>RECOVERY</text>
          </svg>
        </div>

        {/* Stage pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '40px', maxWidth: '700px', margin: '40px auto 0' }}>
          {['01 · DISTRACTION', '02 · FRAGMENTED ATTENTION', '03 · POOR DECISIONS', '04 · REDUCED PERFORMANCE', '05 · STRESS', '06 · LOWER RECOVERY'].map((label) => (
            <span key={label} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(239,68,68,0.8)', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '5px 12px' }}>
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: OPENING ARGUMENT ── */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px' }}>
        <FadeUp>
          {/* Pull quote */}
          <div style={{ borderLeft: '3px solid #EF4444', paddingLeft: '24px', marginBottom: '48px' }}>
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              &ldquo;You did not choose to be distracted. The environment chose for you. The Erosion Loop is not a personal failure — it is a rational response to an architecturally irrational environment.&rdquo;
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '24px' }}>
            There is a particular kind of exhaustion that professionals describe differently from ordinary tiredness. It is the feeling of having worked all day and produced nothing that matters. Of having been busy — genuinely, verifiably busy — while simultaneously failing to advance on anything significant. Of lying awake at night reviewing a day that seemed full but produced nothing you could point to with satisfaction. This is not laziness. It is not poor time management. It is not a character defect. It is the predictable output of a specific cognitive mechanism: the Erosion Loop.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '24px' }}>
            The Erosion Loop is a self-reinforcing degradation cycle that describes how modern digital environments systematically reduce attentional capacity over time. It has six stages, each of which makes the next more likely. Once entered, the loop generates its own momentum — not because of weakness in the individual, but because of the structural design of the environments in which modern knowledge work occurs. Understanding the mechanism is the prerequisite for interrupting it.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '0' }}>
            This framework matters not as an explanation of productivity failure, but as a structural diagnosis of cognitive environment design. The question it poses is not &ldquo;why can&apos;t you focus?&rdquo; but &ldquo;what is it about this environment that makes focus structurally difficult?&rdquo; The answer implicates the design of digital communication platforms, organizational meeting culture, notification architecture, and the fundamental economics of the attention economy — none of which are within the individual&apos;s unilateral control.
          </p>
        </FadeUp>
      </section>

      {/* ── SECTION 4: STAGE 1 — DISTRACTION ── */}
      <section id="stage-1" style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px 72px' }}>
        <FadeUp>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(239,68,68,0.07)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', position: 'absolute', top: '-16px', left: '-8px' }}>01</div>
            <div style={{ position: 'relative', paddingTop: '12px' }}>
              <div style={{ color: STAGE_COLORS['01'], fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>Distraction</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>The engineered entry point</div>
            </div>
          </div>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            Every loop has an entry point. For the Erosion Loop, it is distraction — but not the distraction of an undisciplined mind wandering. The distraction that initiates the Erosion Loop is engineered. It is the product of deliberate design decisions made by engineers and product managers at technology companies whose business model depends on the interruption of human attention.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            The notification is not a neutral communication tool. It is an interruption device designed to generate behavioral response at a moment not chosen by the recipient. Every notification — whether a Slack message, an email subject line, a WhatsApp ping, or a social media alert — creates what researchers call an attentional capture event: an involuntary reorientation of cognitive resources toward the interrupting stimulus. The interruption does not require engagement to cause damage. The mere awareness that a notification exists is sufficient to initiate the cognitive cascade.
          </p>

          <div style={researchBox}>
            <div style={researchLabel}>Research Finding</div>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              Gloria Mark and colleagues at the University of California, Irvine conducted field observations of knowledge workers and found that workers switched tasks on average every 3 minutes and 5 seconds — not because they chose to, but because of environmental interruption pressure. The study also found that only 44% of interrupted work was resumed on the same day. <em style={{ color: 'rgba(255,255,255,0.4)' }}>Source: Mark, G., Gudith, D., &amp; Klocke, U. (2008). The cost of interrupted work: More speed and stress. Proceedings of CHI 2008.</em>
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            The organizational dimension of distraction is underappreciated. In most knowledge work environments, availability is a performance signal. Responding quickly to messages is interpreted as engagement, commitment, and capability. This creates a social pressure to maintain ambient awareness of all communication channels simultaneously — transforming what should be a tool into a surveillance mechanism that monitors attentional allocation.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)' }}>
            The result is a cognitive environment in which deep, sustained attentional focus is not merely difficult — it is organizationally discouraged. The Erosion Loop begins not with a failure of individual discipline, but with an organizational culture that rewards availability over depth. The individual is not the weak link. The architecture is.
          </p>
        </FadeUp>
      </section>

      {/* ── SECTION 5: STAGE 2 — FRAGMENTED ATTENTION ── */}
      <section id="stage-2" style={{ backgroundColor: '#0C1120', padding: '72px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(249,115,22,0.07)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', position: 'absolute', top: '-16px', left: '-8px' }}>02</div>
              <div style={{ position: 'relative', paddingTop: '12px' }}>
                <div style={{ color: STAGE_COLORS['02'], fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>Fragmented Attention</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>When interruption becomes internal</div>
              </div>
            </div>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              Sustained exposure to interruption-rich environments produces a specific cognitive adaptation: the brain learns to anticipate interruption. In environments where external disruption is constant and unpredictable, the attentional system begins to self-interrupt — scanning for potential disruptions before they arrive, monitoring multiple information streams simultaneously, and maintaining persistent background awareness of channels that might require immediate response.
            </p>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              This is attention fragmentation: the inability to maintain sustained attentional focus even in the absence of external disruption. A worker who has spent months in a high-interruption environment will find, on being given an uninterrupted hour of quiet time, that they cannot sustain focus for more than a few minutes before self-interrupting. The environment has been internalized. The distraction has become structural.
            </p>

            <div style={researchBox}>
              <div style={researchLabel}>Research Finding</div>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                Sophie Leroy&apos;s (2009) concept of <em>attention residue</em> describes the cognitive carry-over from previous tasks that continues to occupy working memory while ostensibly working on subsequent tasks. Leroy found that switching tasks before completing the first task created persistent cognitive interference that reduced performance on the new task by measurable margins — even when workers reported feeling focused. <em style={{ color: 'rgba(255,255,255,0.4)' }}>Source: Leroy, S. (2009). Why is it so hard to do my work? Organizational Behavior and Human Decision Processes, 109(2), 168–181.</em>
              </p>
            </div>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              The neurological mechanism of attention fragmentation involves the prefrontal cortex — specifically, the dorsolateral prefrontal cortex that governs executive attention control. Sustained fragmentation reduces the efficiency of the top-down attentional control network, increasing susceptibility to bottom-up attentional capture (the tendency to be involuntarily drawn to salient stimuli) and reducing the capacity for voluntary attentional direction.
            </p>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              Attention fragmentation is also contagious at the organizational level. A single highly-connected colleague — one who expects immediate responses, schedules meetings without notice, or creates ambient urgency — can fragment the attentional environment of an entire team. The fragmentation does not require direct interaction to propagate; the mere awareness that urgent demands may arrive at any moment is sufficient to prevent deep attentional focus.
            </p>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)' }}>
              The critical threshold: attention fragmentation becomes self-sustaining when the experience of deep focus becomes unfamiliar. Workers who have not experienced sustained, uninterrupted concentration for weeks or months lose confidence in their capacity for it. The loop accelerates because the solution — sustained focus — has become subjectively inaccessible.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 6: STAGE 3 — POOR DECISIONS ── */}
      <section id="stage-3" style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px' }}>
        <FadeUp>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(234,179,8,0.07)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', position: 'absolute', top: '-16px', left: '-8px' }}>03</div>
            <div style={{ position: 'relative', paddingTop: '12px' }}>
              <div style={{ color: STAGE_COLORS['03'], fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>Poor Decisions</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>The downstream cost of cognitive depletion</div>
            </div>
          </div>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            The relationship between attentional quality and decision quality is not metaphorical. It is mechanistic. Deliberate, high-quality decision-making — what Daniel Kahneman termed System 2 thinking — requires sustained attentional resources. When those resources are depleted by fragmentation, decisions do not simply become slower or less confident. They shift processing systems: from deliberate analysis to fast heuristic response. From System 2 to System 1. From considered judgment to reactive pattern-matching.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            This shift is not consciously chosen. The individual does not decide to stop deliberating carefully and start reacting. The cognitive system makes that transition automatically, as an energy-conservation response to depleted attentional resources. The subjective experience is not &ldquo;I am making a poor decision&rdquo; but rather &ldquo;I have thought about this enough.&rdquo; The feeling of sufficient deliberation is itself a product of cognitive depletion — not an accurate assessment of analytical quality.
          </p>

          <div style={researchBox}>
            <div style={researchLabel}>Research Finding</div>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              Roy Baumeister and colleagues introduced the concept of ego depletion to describe the reduction in self-regulatory capacity following sustained cognitive effort. Their research demonstrated that acts of self-regulation — including sustained attentional focus — draw from a limited cognitive resource that depletes with use. As this resource depletes, the quality of subsequent self-regulatory acts, including deliberate decision-making, declines measurably. <em style={{ color: 'rgba(255,255,255,0.4)' }}>Source: Baumeister, R. F., Bratslavsky, E., Muraven, M., &amp; Tice, D. M. (1998). Ego depletion: Is the active self a limited resource? Journal of Personality and Social Psychology, 74(5), 1252–1265.</em>
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            The organizational consequences of attention-depleted decision-making are significant and largely unmeasured. Organizations track decision outcomes but rarely track the attentional conditions under which decisions were made. A strategic decision made in a morning planning session — following a night of good sleep and before the day&apos;s interruption cascade — is a different cognitive act than a nominally identical decision made in a late-afternoon meeting following six hours of fragmented attention. The same decision framework, applied in different attentional conditions, produces different outputs.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)' }}>
            The decisions most vulnerable to attentional depletion are not the decisions that feel most significant. The large, formal decisions — the ones accompanied by slide decks and stakeholder meetings — benefit from structural scaffolding that compensates for individual cognitive limitations. The decisions that suffer most are the accumulation of small judgments made continuously throughout the day: what to prioritize, what to respond to, what to delegate, what to ignore. These decisions, made hundreds of times daily in depleted attentional states, constitute the majority of organizational performance.
          </p>
        </FadeUp>
      </section>

      {/* ── SECTION 7: STAGE 4 — REDUCED PERFORMANCE ── */}
      <section id="stage-4" style={{ backgroundColor: '#0C1120', padding: '72px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(132,204,22,0.05)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', position: 'absolute', top: '-16px', left: '-8px' }}>04</div>
              <div style={{ position: 'relative', paddingTop: '12px' }}>
                <div style={{ color: STAGE_COLORS['04'], fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>Reduced Performance</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Where the loop becomes visible</div>
              </div>
            </div>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              Performance reduction is where the Erosion Loop becomes externally visible. The prior three stages — distraction, fragmented attention, poor decisions — are largely internal and invisible to observers. Performance reduction is the first stage that produces measurable outputs: missed deadlines, inconsistent execution, work that requires rework, ideas that do not materialize, projects that stall. It is at this stage that the individual begins to experience the loop as a personal failure.
            </p>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              This misattribution is one of the most damaging aspects of the Erosion Loop. Performance reduction is a structural output of the preceding stages, which are themselves structural outputs of an attention-hostile environment. But the individual experiences it as capability — as evidence that they are not smart enough, disciplined enough, or talented enough to perform at the level they expect of themselves. This misattribution triggers the next stage of the loop.
            </p>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              The productivity paradox of attention-depleted performance is particularly insidious: workers experiencing attentional degradation often report feeling very busy while producing very little. This is the signature experience of the Erosion Loop — busyness without progress, effort without output, days that feel full but leave nothing to show. The busyness is real. The attentional resources required to convert that busyness into meaningful output are not available.
            </p>

            <div style={researchBox}>
              <div style={researchLabel}>Research Context</div>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                McKinsey research on knowledge worker productivity estimated that high-skill knowledge workers spend only 39% of their time on primary job responsibilities — the activities they were hired to do and that generate the most organizational value. The remainder is consumed by coordination overhead: email, meetings, information retrieval, and administrative tasks. Attentional depletion amplifies this problem by reducing the quality of the 39% that remains. <em style={{ color: 'rgba(255,255,255,0.4)' }}>Source: Chui, M. et al. (2012). The social economy: Unlocking value and productivity through social technologies. McKinsey Global Institute.</em>
              </p>
            </div>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)' }}>
              The cruelest irony of reduced performance in the Erosion Loop is that it is often met with increased effort. The individual, recognizing that output is lower than expected, responds by working longer hours, taking on more commitments, and compressing recovery time. Each of these responses directly worsens the attentional conditions that caused the performance reduction in the first place. More effort, in an attention-depleted state, produces more busyness and less output. The loop tightens.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 8: STAGE 5 — STRESS ── */}
      <section id="stage-5" style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px' }}>
        <FadeUp>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(239,68,68,0.07)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', position: 'absolute', top: '-16px', left: '-8px' }}>05</div>
            <div style={{ position: 'relative', paddingTop: '12px' }}>
              <div style={{ color: STAGE_COLORS['05'], fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>Stress</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>The cognitive tax on the cognitive system</div>
            </div>
          </div>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            Performance reduction under conditions of high effort generates a specific and well-documented psychological response: stress. But the stress generated by the Erosion Loop is not ordinary stress — it is stress with a particular cognitive signature. It is the stress of an individual who believes they should be performing better, who is working as hard as they know how to work, and who cannot understand why the results are not commensurate with the effort.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            This is the most psychologically damaging configuration of stress: high effort, low control, unclear causation. The individual cannot identify the environmental cause of their performance reduction because the mechanism is invisible. They cannot reduce their effort because the demands are genuine. They cannot improve their results through willpower because the constraint is cognitive, not motivational. The result is sustained psychological stress that now becomes an active participant in the degradation cycle.
          </p>

          <div style={researchBox}>
            <div style={researchLabel}>Research Finding</div>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              Amy Arnsten&apos;s research on stress and prefrontal function demonstrated that even mild, uncontrollable stress — the kind generated by chronic uncertainty and performance pressure — impairs the functioning of the prefrontal cortex. The prefrontal cortex is the primary substrate of the executive attention network: the system responsible for voluntary attentional direction, task prioritization, and impulse inhibition. Stress does not merely feel bad; it structurally degrades the cognitive system most responsible for attentional quality. <em style={{ color: 'rgba(255,255,255,0.4)' }}>Source: Arnsten, A. F. T. (1998). The biology of being frazzled. Science, 280(5370), 1711–1712.</em>
            </p>
          </div>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)' }}>
            The organizational context of this stress is rarely acknowledged. Organizations create the attentional conditions that generate performance reduction, then respond to performance reduction with performance management processes that generate additional stress, further degrading the attentional substrate that produced the performance reduction in the first place. The intervention addresses the output while intensifying the cause. The loop closes a little tighter with each management cycle.
          </p>
        </FadeUp>
      </section>

      {/* ── SECTION 9: STAGE 6 — LOWER RECOVERY ── */}
      <section id="stage-6" style={{ backgroundColor: '#0C1120', padding: '72px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(220,38,38,0.07)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', position: 'absolute', top: '-16px', left: '-8px' }}>06</div>
              <div style={{ position: 'relative', paddingTop: '12px' }}>
                <div style={{ color: STAGE_COLORS['06'], fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>Lower Recovery</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Where the loop closes</div>
              </div>
            </div>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              Recovery is the mechanism through which the attentional system restores capacity between cognitive cycles. The primary recovery mechanism is sleep — specifically, slow-wave sleep and REM sleep, which serve distinct restoration functions for prefrontal cognitive capacity. Secondary recovery mechanisms include genuine rest (as distinct from passive consumption of digital media), restorative activities, and periods of low-demand cognitive engagement.
            </p>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              Stress impairs all of these recovery mechanisms. Elevated cortisol — the primary stress hormone — disrupts sleep architecture, reducing the proportion of slow-wave sleep and fragmenting the sleep cycle. The practical result: a stressed knowledge worker who sleeps for eight hours may receive substantially less restorative benefit than a non-stressed worker who sleeps for six. The quantity of sleep is not the variable. The quality is. And stress systematically degrades sleep quality.
            </p>

            <div style={researchBox}>
              <div style={researchLabel}>Research Finding</div>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                Matthew Walker&apos;s research on sleep and cognitive performance established that chronic partial sleep deprivation — sleeping six hours instead of eight, sustained over two weeks — produced cognitive deficits equivalent to full sleep deprivation, without the subjective awareness of impairment. Participants felt fine. Their performance data told a different story. This means the Erosion Loop can run silently for months before its severity becomes subjectively apparent. <em style={{ color: 'rgba(255,255,255,0.4)' }}>Source: Walker, M. (2017). Why We Sleep: Unlocking the Power of Sleep and Dreams. Scribner.</em>
              </p>
            </div>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
              The loop closes here. Degraded recovery produces degraded inputs for the next day&apos;s attentional cycle. The prefrontal cortex begins the next morning with reduced capacity. Reduced capacity means greater vulnerability to distraction. Greater vulnerability to distraction means faster fragmentation. And the cycle repeats — not at baseline, but at a lower starting point than the previous cycle.
            </p>

            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)' }}>
              This is why the Erosion Loop is progressive. Each iteration begins at a lower attentional baseline than the last. The degradation is not dramatic or immediately visible — it is gradual, cumulative, and self-concealing. The individual adapts to each new lower baseline, recalibrating their sense of normal downward with each cycle. By the time the degradation is severe enough to be recognized — by the individual or their organization — the cycle has often been running for months or years.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 10: THE ORGANIZATIONAL DIMENSION ── */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px' }}>
        <FadeUp>
          <span style={pillStyle}>The Collective Loop</span>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '32px', marginTop: '4px' }}>
            When the Erosion Loop scales to teams
          </h2>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            Everything described above operates at the individual level. But the Erosion Loop has an organizational dimension that is less well understood and, if anything, more consequential.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            Attention fragmentation is socially contagious. A team culture that rewards rapid response, tolerates meeting overload, and signals that immediate availability is a performance expectation creates attentional conditions that impose the Erosion Loop on every member of the team — regardless of their individual practices, disciplines, or intentions. A single senior leader who sends emails at 11pm does not merely work late themselves; they impose an ambient expectation of availability on everyone who reports to them, fragmenting the attentional environment of the entire organizational layer below.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            The organizational Erosion Loop also has a decision-quality dimension that operates at scale. An organization whose senior leadership team is operating in attention-depleted states is making its most consequential decisions — strategic allocation, people, products, positioning — with degraded cognitive substrates. The financial cost of senior leadership attention depletion is almost certainly the most significant unmeasured variable in organizational performance. It never appears on the P&amp;L. Its effects are visible everywhere.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)' }}>
            This is the rationale for organizational-level attention measurement. Individual assessment identifies personal attentional patterns. Team assessment identifies the collective attentional environment and its structural drivers. The question is not only &ldquo;how is each person&apos;s attention?&rdquo; but &ldquo;what is the attentional architecture of this organization, and how is it affecting the quality of the decisions it makes?&rdquo;
          </p>
        </FadeUp>
      </section>

      {/* ── SECTION 11: BREAKING THE LOOP ── */}
      <section style={{ backgroundColor: '#0F1629', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={pillStyle}>Intervention</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginTop: '8px', marginBottom: '16px' }}>
                Three leverage points
              </h2>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.55)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                The Erosion Loop cannot be broken by willpower. It requires structural intervention at the environmental level.
              </p>
            </div>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {[
              {
                num: '01',
                title: 'Notification Architecture',
                body: 'The highest-leverage single intervention. Eliminating ambient notifications — not reducing them, eliminating them during focused work periods — removes the primary environmental driver of attentional capture. The research on notification impact suggests that even awareness of pending notifications is sufficient to create attentional residue. Full elimination, not management, is the effective intervention.',
                tag: 'ENVIRONMENT',
              },
              {
                num: '02',
                title: 'Recovery Investment',
                body: 'Sleep quality — not quantity — is the primary restorative mechanism for prefrontal attentional capacity. Interventions that reduce pre-sleep cortisol (eliminating screens 60 minutes before sleep, reducing evening cognitive demand, establishing consistent sleep timing) produce measurable next-day cognitive improvements. Recovery is not a lifestyle choice. It is a performance variable.',
                tag: 'PHYSIOLOGY',
              },
              {
                num: '03',
                title: 'Attentional Training',
                body: 'The capacity to return to focus after interruption — attentional recovery — is trainable. Deliberate practice of sustained focus (time-blocked deep work periods, progressive extension of focus duration, explicit transition protocols between tasks) builds the neural substrate for attentional control. The loop cannot be broken once through willpower; it can be broken progressively through structured practice.',
                tag: 'CAPACITY',
              },
            ].map((card, i) => (
              <FadeUp key={card.num} delay={i * 0.1}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(239,68,68,0.6)', letterSpacing: '0.1em', marginBottom: '16px' }}>{card.num}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px', color: 'white' }}>{card.title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', margin: 0, flex: 1 }}>{card.body}</p>
                  <div style={{ marginTop: '24px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'inline-block' }}>{card.tag}</div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              The intervention sequence matters. Environment interventions produce the fastest results because they remove the primary driver of distraction without requiring cognitive resources to sustain. Recovery interventions restore the substrate that makes all other interventions more effective. Capacity training builds the long-term resilience that makes the system robust to future attentional hostility. Begin with environment. Restore recovery. Build capacity.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 12: MEASUREMENT ── */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px' }}>
        <FadeUp>
          <span style={pillStyle}>Measurement</span>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginTop: '8px', marginBottom: '28px' }}>
            Where are you in the loop?
          </h2>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            Understanding the Erosion Loop as a framework is not the same as knowing where you are in it. The loop presents differently depending on which stage is most active and which attentional dimensions are most depleted.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
            A person in Stage 2 (Fragmented Attention) may have intact Executive Function but severely depleted Attentional Control and Recovery Capacity. A person in Stage 5 (Stress) may have high Impulse Regulation scores but collapsed Emotional Regulation and Working Memory. A person who has been in the loop for years may show depletion across all eight dimensions with a characteristic pattern that differs from someone who entered the loop six months ago.
          </p>

          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '48px' }}>
            The Attention Health Assessment™ was designed to map individual attentional profiles against the eight dimensions most implicated in the Erosion Loop dynamic. The assessment does not diagnose where you are in the loop — that would require longitudinal data. But it identifies which attentional dimensions are most depleted, which are relatively intact, and which patterns are most consistent with which stages of the loop. Combined with self-reflection on the qualitative markers described in this framework, the assessment provides the starting point for a targeted intervention strategy.
          </p>

          {/* CTA box */}
          <div style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.08) 0%, rgba(79,142,247,0.04) 100%)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px', color: 'white' }}>
              Identify where you are in the Erosion Loop
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', marginBottom: '28px', lineHeight: 1.6 }}>
              The Attention Health Assessment™ maps your attentional profile across eight dimensions. 88 questions. 12–15 minutes. Instant report.
            </p>
            <Link
              href="/assessment"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)', color: 'white', textDecoration: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, boxShadow: '0 4px 20px rgba(79,142,247,0.3)' }}
            >
              Take the Assessment <ArrowRight size={15} />
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)', marginTop: '16px', marginBottom: 0 }}>
              Free · Private · Instant report
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── SECTION 13: RELATED FRAMEWORKS ── */}
      <section style={{ backgroundColor: '#0C1120', padding: '72px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeUp>
            <span style={pillStyle}>Related Frameworks</span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '8px', marginBottom: '40px' }}>
              The broader context
            </h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { title: 'The Attention Flywheel™', desc: 'The structural inverse of the Erosion Loop. What becomes possible when attentional capacity is systematically restored and improved.', href: '/lab/frameworks/attention-flywheel' },
              { title: 'Attention Lifecycle Framework™', desc: 'The cyclical process through which attentional resources are generated, deployed, consumed, and restored. The structural context for the Erosion Loop.', href: '/lab/frameworks/attention-lifecycle' },
              { title: 'Attention Health Framework™', desc: 'The eight-dimension model for measuring attentional functioning. The measurement architecture that maps the Erosion Loop\'s impact.', href: '/lab/frameworks/attention-health' },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.08}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '12px', color: 'white' }}>{card.title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', margin: '0 0 20px', flex: 1 }}>{card.desc}</p>
                  <Link href={card.href} style={{ fontSize: '13px', fontWeight: 600, color: '#4F8EF7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    Read framework <ArrowRight size={12} />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 14: BIBLIOGRAPHY ── */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px' }}>
        <FadeUp>
          <span style={pillStyle}>References</span>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '8px', marginBottom: '36px' }}>
            Research foundations
          </h2>
          <ol style={{ listStyle: 'decimal', paddingLeft: '20px', margin: 0 }}>
            {[
              'Arnsten, A. F. T. (1998). The biology of being frazzled. Science, 280(5370), 1711–1712.',
              'Baddeley, A. D., & Hitch, G. (1974). Working memory. Psychology of Learning and Motivation, 8, 47–89.',
              'Baumeister, R. F., Bratslavsky, E., Muraven, M., & Tice, D. M. (1998). Ego depletion: Is the active self a limited resource? Journal of Personality and Social Psychology, 74(5), 1252–1265.',
              'Chui, M. et al. (2012). The social economy: Unlocking value and productivity through social technologies. McKinsey Global Institute.',
              'Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.',
              'Kaplan, S. (1989). The restorative environment: Nature and human experience. In I. Altman & E. H. Zube (Eds.), Public Places and Spaces. Plenum Press.',
              'Leroy, S. (2009). Why is it so hard to do my work? The challenge of attention residue when switching between work tasks. Organizational Behavior and Human Decision Processes, 109(2), 168–181.',
              'Mark, G., Gudith, D., & Klocke, U. (2008). The cost of interrupted work: More speed and stress. Proceedings of the SIGCHI Conference on Human Factors in Computing Systems, 107–110.',
              'Mark, G., Iqbal, S., Czerwinski, M., & Johns, P. (2014). Bored Mondays and Focused Afternoons: The rhythm of attention and online activity in the workplace. Proceedings of CHI 2014.',
              'Miyake, A., Friedman, N. P., Emerson, M. J., Witzki, A. H., Howerter, A., & Wager, T. D. (2000). The unity and diversity of executive functions and their contributions to complex frontal lobe tasks. Cognitive Psychology, 41(1), 49–100.',
              'Posner, M. I., & Petersen, S. E. (1990). The attention system of the human brain. Annual Review of Neuroscience, 13, 25–42.',
              'Rubinstein, J. S., Meyer, D. E., & Evans, J. E. (2001). Executive control of cognitive processes in task switching. Journal of Experimental Psychology: Human Perception and Performance, 27(4), 763–797.',
              'Walker, M. (2017). Why We Sleep: Unlocking the Power of Sleep and Dreams. Scribner.',
            ].map((ref, i) => (
              <li key={i} style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: '12px', paddingLeft: '4px' }}>
                {ref}
              </li>
            ))}
          </ol>
        </FadeUp>
      </section>

      {/* ── SECTION 15: FOOTER CTA ── */}
      <section style={{ backgroundColor: '#0C1120', padding: '80px 24px', textAlign: 'center' }}>
        <FadeUp>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}>
            The Erosion Loop is measurable.
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto 36px', lineHeight: 1.65 }}>
            The Attention Health Assessment™ identifies which attentional dimensions are most depleted in your specific case — and what that means for your performance and recovery.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '48px' }}>
            <Link
              href="/assessment"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #4F8EF7 0%, #3B7DE8 100%)', color: 'white', textDecoration: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, boxShadow: '0 4px 20px rgba(79,142,247,0.3)' }}
            >
              Take the Assessment <ArrowRight size={15} />
            </Link>
            <Link
              href="/api/whitepaper/pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 600 }}
            >
              Download Scientific Framework
            </Link>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
            © 2025 The Human Decision. The Erosion Loop™ is a framework developed by The Human Decision Research Series.
          </p>
        </FadeUp>
      </section>

      <Footer />
    </div>
  )
}
