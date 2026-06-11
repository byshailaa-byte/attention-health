'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAssessmentStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Lock, Brain, ArrowRight } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  age: z.number().min(18).max(80),
  gender: z.string().min(1, 'Required'),
  occupation: z.string().min(2, 'Required'),
  industry: z.string().min(1, 'Required'),
  founderType: z.string().min(1, 'Required'),
  yearsExp: z.number().min(0).max(50),
  companySize: z.string().min(1, 'Required'),
  workMode: z.string().min(1, 'Required'),
})

type FormData = z.infer<typeof schema>

const INDUSTRIES = [
  'Technology / SaaS', 'E-Commerce / D2C', 'FinTech', 'HealthTech', 'EdTech',
  'Media & Content', 'Consulting / Professional Services', 'Manufacturing',
  'Real Estate', 'Retail', 'Food & Beverage', 'Healthcare',
  'Finance & Banking', 'Marketing & Advertising', 'Other',
]

export default function UnlockPage() {
  const router = useRouter()
  const { assessmentId, sessionId, scores, setLead, setReportData } = useAssessmentStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { founderType: 'Employee', age: 28, yearsExp: 5 },
  })

  const founderType = watch('founderType')

  const onSubmit = async (data: FormData) => {
    if (!scores) {
      setError('Assessment not found. Please retake the assessment.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId, sessionId, scores, leadData: data }),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error ?? 'Something went wrong. Please try again.')
        return
      }

      setLead(data)
      setReportData(result.fullReportData)
      router.push('/report/summary')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] transition-colors bg-white'
  const selectClass = `${inputClass} appearance-none`
  const labelClass = 'block text-xs font-semibold text-gray-700 mb-1.5'

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F0E8' }}>
      {/* Left — blurred report preview */}
      <div
        className="hidden lg:flex flex-col justify-center items-center flex-1 p-12 relative overflow-hidden"
        style={{ backgroundColor: '#1B4332' }}
      >
        {/* Blurred mock report */}
        <div className="absolute inset-0 opacity-20" style={{ filter: 'blur(2px)' }}>
          <div className="p-8 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-white/40 rounded" style={{ width: `${60 + i * 5}%` }} />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center text-white max-w-sm">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-white/10">
            <Brain size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Your Report is Ready</h2>
          <p className="text-green-200/80 text-sm leading-relaxed mb-8">
            Complete your profile to unlock your personalized Attention Health Report — a comprehensive analysis of your cognitive performance.
          </p>
          <div className="space-y-3 text-left">
            {[
              '12 domain scores with detailed insights',
              'Your attention archetype revealed',
              '100+ personalized insights',
              '30-day action plan',
              'ADHD risk indicator',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-green-100">
                <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-[520px] flex-shrink-0 overflow-y-auto bg-white">
        <div className="p-8 max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#1B4332' }}>
              <Brain size={16} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Attention Health™</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Reveal Your Report</h1>
          <p className="text-sm text-gray-500 mb-6">
            Complete your profile to unlock your personalized Attention Health Report.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Full Name</label>
                <input {...register('name')} placeholder="Rahul Sharma" className={inputClass} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input {...register('email')} type="email" placeholder="you@example.com" className={inputClass} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Age</label>
                <select {...register('age', { valueAsNumber: true })} className={selectClass}>
                  {[18, 25, 35, 45, 55].map((a, i) => (
                    <option key={a} value={a}>{i === 0 ? '18–24' : i === 1 ? '25–34' : i === 2 ? '35–44' : i === 3 ? '45–54' : '55+'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select {...register('gender')} className={selectClass}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className={labelClass}>Occupation / Role</label>
              <input {...register('occupation')} placeholder="e.g. Founder, VP Product, Marketing Lead" className={inputClass} />
              {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation.message}</p>}
            </div>

            {/* Industry */}
            <div>
              <label className={labelClass}>Industry</label>
              <select {...register('industry')} className={selectClass}>
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => <option key={ind}>{ind}</option>)}
              </select>
              {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message}</p>}
            </div>

            {/* Founder toggle */}
            <div>
              <label className={labelClass}>Are you a Founder or Employee?</label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                {['Founder', 'Employee'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue('founderType', type)}
                    className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                      founderType === type ? 'text-white' : 'text-gray-500 bg-white hover:bg-gray-50'
                    }`}
                    style={founderType === type ? { backgroundColor: '#1B4332' } : undefined}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Years exp + Company size */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Years of Experience</label>
                <select {...register('yearsExp', { valueAsNumber: true })} className={selectClass}>
                  <option value={1}>0–2 years</option>
                  <option value={3}>3–5 years</option>
                  <option value={7}>6–10 years</option>
                  <option value={12}>11–15 years</option>
                  <option value={20}>15+ years</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Company Size</label>
                <select {...register('companySize')} className={selectClass}>
                  <option value="">Select</option>
                  <option>Solo / Freelancer</option>
                  <option>2–10 people</option>
                  <option>11–50 people</option>
                  <option>51–200 people</option>
                  <option>201–1000 people</option>
                  <option>1000+ people</option>
                </select>
                {errors.companySize && <p className="text-xs text-red-500 mt-1">{errors.companySize.message}</p>}
              </div>
            </div>

            {/* Work mode */}
            <div>
              <label className={labelClass}>Work Mode</label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                {['Remote', 'Hybrid', 'In-Office'].map((mode) => {
                  const current = watch('workMode')
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setValue('workMode', mode)}
                      className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
                        current === mode ? 'text-white' : 'text-gray-500 bg-white hover:bg-gray-50'
                      }`}
                      style={current === mode ? { backgroundColor: '#1B4332' } : undefined}
                    >
                      {mode}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: '#1B4332' }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Your Report...
                </>
              ) : (
                <>
                  Reveal My Attention Report
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <Lock size={10} />
              Your data is private and never shared with third parties.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
