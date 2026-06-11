'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ScoreResult } from './scoring-engine'

export interface LeadData {
  name: string
  email: string
  age: number
  gender: string
  occupation: string
  industry: string
  founderType: string
  yearsExp: number
  companySize: string
  workMode: string
}

export interface ReportData {
  reportId: string
  insights: unknown[]
  recommendations: unknown[]
  nextSteps: unknown[]
  aiNarrative: string
  createdAt: string
}

interface AssessmentStore {
  // Session
  sessionId: string | null
  assessmentId: string | null
  startedAt: number | null

  // Responses
  responses: Record<string, number>
  currentQuestionIndex: number

  // Results
  scores: ScoreResult | null
  lead: LeadData | null
  reportData: ReportData | null

  // Actions
  initSession: () => void
  setResponse: (questionId: string, value: number) => void
  setCurrentQuestion: (index: number) => void
  setAssessmentId: (id: string) => void
  setScores: (scores: ScoreResult) => void
  setLead: (lead: LeadData) => void
  setReportData: (data: ReportData) => void
  reset: () => void
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      sessionId: null,
      assessmentId: null,
      startedAt: null,
      responses: {},
      currentQuestionIndex: 0,
      scores: null,
      lead: null,
      reportData: null,

      initSession: () => {
        if (!get().sessionId) {
          set({
            sessionId: generateSessionId(),
            startedAt: Date.now(),
          })
        }
      },

      setResponse: (questionId, value) =>
        set((state) => ({
          responses: { ...state.responses, [questionId]: value },
        })),

      setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),

      setAssessmentId: (id) => set({ assessmentId: id }),

      setScores: (scores) => set({ scores }),

      setLead: (lead) => set({ lead }),

      setReportData: (data) => set({ reportData: data }),

      reset: () =>
        set({
          sessionId: null,
          assessmentId: null,
          startedAt: null,
          responses: {},
          currentQuestionIndex: 0,
          scores: null,
          lead: null,
          reportData: null,
        }),
    }),
    {
      name: 'attention-health-assessment',
      partialize: (state) => ({
        sessionId: state.sessionId,
        assessmentId: state.assessmentId,
        startedAt: state.startedAt,
        responses: state.responses,
        currentQuestionIndex: state.currentQuestionIndex,
        scores: state.scores,
        lead: state.lead,
        reportData: state.reportData,
      }),
    }
  )
)
