'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Brain } from 'lucide-react'

const STEPS = [
  { label: 'Analyzing your attention patterns...', duration: 2500 },
  { label: 'Calculating domain scores...', duration: 3000 },
  { label: 'Identifying your attention archetype...', duration: 2000 },
  { label: 'Generating personalized insights...', duration: 3500 },
  { label: 'Building your report...', duration: 2500 },
  { label: 'Finalizing recommendations...', duration: 2000 },
]

const TOTAL_DURATION = STEPS.reduce((sum, s) => sum + s.duration, 0)

export default function ProcessingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let elapsed = 0
    const timers: NodeJS.Timeout[] = []

    STEPS.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index)
        setCompletedSteps((prev) => [...prev, index - 1].filter((i) => i >= 0))
        setProgress(Math.round(((elapsed + step.duration) / TOTAL_DURATION) * 100))
      }, elapsed)
      timers.push(timer)
      elapsed += step.duration
    })

    const finalTimer = setTimeout(() => {
      setCompletedSteps(STEPS.map((_, i) => i))
      setProgress(100)
      setTimeout(() => router.push('/unlock'), 800)
    }, elapsed)
    timers.push(finalTimer)

    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const target = Math.round((elapsed / TOTAL_DURATION) * 100)
        return prev < 99 ? Math.min(prev + 1, 99) : prev
      })
    }, TOTAL_DURATION / 100)

    return () => {
      timers.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [router])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#0A2618' }}
    >
      {/* Brain icon */}
      <div className="mb-12 relative">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center animate-brain-pulse"
          style={{ backgroundColor: 'rgba(27, 67, 50, 0.8)', border: '2px solid rgba(74, 222, 128, 0.3)' }}>
          <Brain size={44} className="text-green-400" />
        </div>
        {/* Pulsing rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-3xl border border-green-500/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1 + i * 0.25, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
          />
        ))}
      </div>

      <h1 className="text-2xl font-bold text-white mb-2 text-center">
        Analyzing Your Attention Profile
      </h1>
      <p className="text-green-300/60 text-sm mb-10 text-center">
        This takes just a moment...
      </p>

      {/* Steps */}
      <div className="w-full max-w-md space-y-3 mb-10">
        {STEPS.map((step, i) => {
          const isCompleted = completedSteps.includes(i)
          const isActive = currentStep === i && !isCompleted
          const isPending = i > currentStep

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 size={20} className="text-green-400" />
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  isCompleted
                    ? 'text-green-400'
                    : isActive
                    ? 'text-white'
                    : 'text-white/30'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-xs text-white/40 mb-2">
          <span>Processing</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#4ADE80' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <p className="mt-8 text-xs text-white/30 text-center max-w-sm">
        We analyze 84 data points across 13 cognitive domains to create your personalized attention profile.
      </p>
    </div>
  )
}
