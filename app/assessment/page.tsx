'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAssessmentStore } from '@/lib/store'
import { QUESTIONS, SECTIONS, LIKERT5_LABELS, FREQUENCY_LABELS } from '@/lib/questions'
import { calculateScores } from '@/lib/scoring-engine'
import { determineArchetype } from '@/lib/archetype-engine'
import { ChevronLeft, Clock, Brain } from 'lucide-react'

const QUESTIONS_PER_SECTION = SECTIONS.map((section) =>
  QUESTIONS.filter((q) => q.section === section).length
)

function getAnswerLabels(type: string) {
  if (type === 'frequency') return FREQUENCY_LABELS
  if (type === 'yes_no') return ['No', 'Yes']
  return LIKERT5_LABELS
}

export default function AssessmentPage() {
  const router = useRouter()
  const {
    responses,
    currentQuestionIndex,
    sessionId,
    initSession,
    setResponse,
    setCurrentQuestion,
    setAssessmentId,
    setScores,
  } = useAssessmentStore()

  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSectionDivider, setShowSectionDivider] = useState(false)
  const [pendingSectionIndex, setPendingSectionIndex] = useState(0)

  useEffect(() => {
    initSession()
  }, [initSession])

  const totalQuestions = QUESTIONS.length
  const mainQuestions = QUESTIONS.filter((q) => !q.consistencyPairId || q.section === 'Consistency Checks')
  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const progress = Math.round((currentQuestionIndex / totalQuestions) * 100)
  const estimatedMinLeft = Math.max(1, Math.round(((totalQuestions - currentQuestionIndex) * 10) / 60))

  const submitAssessment = useCallback(async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    // Compute scores client-side immediately — no DB required
    const scoreResult = calculateScores(responses)
    const archetype = determineArchetype(scoreResult)
    const fullScores = { ...scoreResult, archetype: archetype.id }
    setScores(fullScores)

    // Navigate immediately — don't block on DB
    router.push('/processing')

    // Fire-and-forget DB save in background
    fetch('/api/assessment/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, responses }),
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json()
        if (data.assessmentId) setAssessmentId(data.assessmentId)
      }
    }).catch(() => {
      // DB unavailable — scores already computed and stored in Zustand
    })
  }, [isSubmitting, sessionId, responses, setAssessmentId, setScores, router])

  const handleAnswer = useCallback(
    async (value: number) => {
      if (!currentQuestion) return
      setResponse(currentQuestion.id, value)

      await new Promise((r) => setTimeout(r, 300))

      const nextIndex = currentQuestionIndex + 1

      if (nextIndex >= totalQuestions) {
        await submitAssessment()
        return
      }

      const current = QUESTIONS[currentQuestionIndex]
      const next = QUESTIONS[nextIndex]

      if (current.section !== next.section) {
        setPendingSectionIndex(nextIndex)
        setShowSectionDivider(true)
        return
      }

      setDirection('forward')
      setCurrentQuestion(nextIndex)
    },
    [currentQuestion, currentQuestionIndex, totalQuestions, submitAssessment, setResponse, setCurrentQuestion]
  )

  const handleBack = () => {
    if (currentQuestionIndex === 0) return
    setDirection('back')
    setCurrentQuestion(currentQuestionIndex - 1)
  }

  const handleSectionContinue = () => {
    setShowSectionDivider(false)
    setDirection('forward')
    setCurrentQuestion(pendingSectionIndex)
  }

  if (!currentQuestion || isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-[#1B4332] rounded-full" />
          <p className="text-gray-500">{isSubmitting ? 'Submitting your responses...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  if (showSectionDivider) {
    const nextSection = QUESTIONS[pendingSectionIndex]?.section ?? ''
    const sectionNum = SECTIONS.indexOf(nextSection) + 1

    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-2xl"
            style={{ backgroundColor: '#1B4332' }}
          >
            {sectionNum}
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Section {sectionNum} of {SECTIONS.length - 1}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{nextSection}</h2>
          <p className="text-gray-500 mb-8 text-sm">
            {QUESTIONS_PER_SECTION[SECTIONS.indexOf(nextSection)]} questions in this section
          </p>
          <button
            onClick={handleSectionContinue}
            className="px-8 py-4 text-white font-semibold rounded-2xl text-lg transition-colors"
            style={{ backgroundColor: '#1B4332' }}
          >
            Continue →
          </button>
        </motion.div>
      </div>
    )
  }

  const labels = getAnswerLabels(currentQuestion.type)
  const sectionIndex = SECTIONS.indexOf(currentQuestion.section)
  const questionInSection = QUESTIONS.filter(q => q.section === currentQuestion.section)
    .findIndex(q => q.id === currentQuestion.id) + 1

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 fixed top-0 left-0 right-0 z-10">
        <motion.div
          className="h-full"
          style={{ backgroundColor: '#1B4332' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100 mt-1.5">
        <div className="flex items-center gap-2">
          <Brain size={20} style={{ color: '#1B4332' }} />
          <span className="text-sm font-bold" style={{ color: '#1B4332' }}>Attention Health™</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={12} />
            ~{estimatedMinLeft} min left
          </div>
          <div className="text-xs font-medium text-gray-500">
            {currentQuestionIndex + 1} / {totalQuestions}
          </div>
          <div
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: '#F5F0E8', color: '#1B4332' }}
          >
            {progress}%
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto w-full">
        <div className="w-full mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#F5F0E8', color: '#1B4332' }}
            >
              {currentQuestion.section}
            </span>
            <span className="text-xs text-gray-400">
              {questionInSection} of {QUESTIONS_PER_SECTION[sectionIndex]}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: direction === 'forward' ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'forward' ? -40 : 40 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-10">
                {currentQuestion.text}
              </h1>

              {/* Answer options */}
              <div className="space-y-3">
                {labels.map((label, i) => {
                  const value = i + 1
                  const isSelected = responses[currentQuestion.id] === value
                  return (
                    <motion.button
                      key={label}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(value)}
                      className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all text-sm font-medium ${
                        isSelected
                          ? 'text-white border-transparent'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                      style={isSelected ? { backgroundColor: '#1B4332', borderColor: '#1B4332' } : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isSelected ? 'border-white bg-white text-[#1B4332]' : 'border-gray-300 text-gray-400'
                          }`}
                        >
                          {value}
                        </span>
                        {label}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back button */}
        {currentQuestionIndex > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mt-2"
          >
            <ChevronLeft size={16} />
            Previous question
          </button>
        )}
      </main>
    </div>
  )
}
