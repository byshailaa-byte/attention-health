import Link from 'next/link'
import { Brain, ArrowRight, Star, BarChart2, TrendingUp, Zap, Users, Lock } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#1B4332' }}>
            <Brain size={16} />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">Attention Health™</div>
            <div className="text-[10px] text-gray-400 hidden sm:block">Measure. Understand. Improve.</div>
          </div>
        </div>
        <Link
          href="/assessment"
          className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl"
          style={{ backgroundColor: '#1B4332' }}
        >
          Start Free →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: '#F5F0E8', color: '#1B4332' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              India&apos;s Most Advanced Attention Health Assessment
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
              Understand Your Attention.<br />
              <span style={{ color: '#1B4332' }}>Unlock Your Potential.</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The Attention Health Assessment™ gives you deep insights into your focus,
              executive function, and mental energy — and shows you exactly how to improve.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {['🔬 Scientifically designed', '📊 Evidence informed', '🔒 100% Private & Confidential'].map((item) => (
                <span key={item} className="text-sm text-gray-600">{item}</span>
              ))}
            </div>

            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl text-base"
              style={{ backgroundColor: '#1B4332' }}
            >
              Take the Assessment Now <ArrowRight size={18} />
            </Link>
            <p className="text-xs text-gray-400 mt-3">Takes 12–15 minutes · Instant personalized report</p>
          </div>

          {/* Preview card */}
          <div className="hidden md:block relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-0.5">Attention Health Score</div>
                  <div className="text-5xl font-black" style={{ color: '#1B4332' }}>72</div>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-1">Good</div>
                  <div className="text-xs text-gray-400">Top 38%</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Executive Function', score: 74 },
                  { label: 'Attention Control', score: 68 },
                  { label: 'Working Memory', score: 81 },
                  { label: 'Burnout Load', score: 55, warn: true },
                ].map(({ label, score, warn }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-bold" style={{ color: warn ? '#F59E0B' : '#1B4332' }}>{score}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${score}%`, backgroundColor: warn ? '#F59E0B' : '#1B4332' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl" style={{ backgroundColor: '#F5F0E8' }}>
                <div className="text-xs font-bold" style={{ color: '#1B4332' }}>⚡ Hyperfocus Potential — Strength</div>
                <div className="text-xs text-gray-500 mt-0.5">Strong flow state capability detected across patterns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: '#1B4332' }} className="py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '2,000+', label: 'Assessments Completed' },
            { value: '4.8/5', label: 'Average User Rating' },
            { value: '150+', label: 'Startups & Companies' },
            { value: '100%', label: 'Private & Confidential' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center text-white">
              <div className="text-3xl font-black mb-1">{value}</div>
              <div className="text-xs text-green-200">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-3">Deep Insights. Real Impact.</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Built for ambitious professionals. Designed to be uncomfortably accurate.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: <BarChart2 size={22} />, title: 'Comprehensive Assessment', desc: '84 validated questions across 12 cognitive domains. Not a quick quiz — a serious diagnostic.' },
            { icon: <Brain size={22} />, title: 'Personalized Insights', desc: '100+ insights combined with AI analysis to give you context that feels eerily accurate.' },
            { icon: <TrendingUp size={22} />, title: 'Actionable Recommendations', desc: 'Every recommendation is specific to your profile. No generic productivity advice.' },
            { icon: <Zap size={22} />, title: 'Track Your Progress', desc: 'Retake to measure growth and see exactly how your attention evolves over time.' },
            { icon: <Users size={22} />, title: 'Benchmark Yourself', desc: 'See where you stand vs. 2,000+ professionals and founders across India.' },
            { icon: <Lock size={22} />, title: 'Private & Secure', desc: 'Your data is never sold or shared. Complete control over your cognitive data.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[#1B4332]" style={{ backgroundColor: '#F5F0E8' }}>
                {icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-5xl mx-auto bg-gray-50 rounded-3xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', icon: '📝', title: 'Take Assessment', desc: '84 questions across 12 domains. Takes 12–15 minutes.' },
            { step: '02', icon: '📊', title: 'Get Your Report', desc: 'Instant personalized analysis across all cognitive domains.' },
            { step: '03', icon: '🔍', title: 'Understand & Act', desc: 'Deep dive into patterns, archetype, and recommendations.' },
            { step: '04', icon: '🚀', title: 'Improve & Thrive', desc: 'Follow your 30-day plan and watch your attention transform.' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="text-center">
              <div className="text-3xl mb-3">{icon}</div>
              <div className="text-xs font-bold text-gray-300 mb-1">{step}</div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
        </div>
        <blockquote className="text-xl font-medium text-gray-800 leading-relaxed mb-6">
          &ldquo;I&apos;ve tried every productivity system out there. Nothing gave me the clarity this assessment did.
          It described my exact patterns — patterns I&apos;d struggled with for years but couldn&apos;t articulate.&rdquo;
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#1B4332' }}>KD</div>
          <div className="text-left">
            <div className="font-bold text-gray-900">Karan D.</div>
            <div className="text-sm text-gray-500">Founder & CEO, Series A startup</div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-40">
            {['Zopper', 'Chargebee', 'Clensta', 'Lybrate', 'Dukaan', 'Razorpay'].map((c) => (
              <span key={c} className="text-xl font-black text-gray-700">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#1B4332' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-black mb-3">Your attention is your most valuable asset.</h2>
          <p className="text-green-200 mb-8">Don&apos;t let invisible patterns limit your potential. 12 minutes to real clarity.</p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold rounded-2xl text-base"
            style={{ color: '#1B4332' }}
          >
            Take the Assessment Now <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-green-300/60 mt-4">Free · 12–15 minutes · Instant report</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Brain size={14} style={{ color: '#1B4332' }} />
            <span>© 2025 Attention Health™ · All rights reserved</span>
          </div>
          <span>100% Private & Confidential</span>
        </div>
      </footer>
    </div>
  )
}
