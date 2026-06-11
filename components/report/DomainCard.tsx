import { StatusBadge } from './StatusBadge'
import { getScoreColor } from '@/lib/scoring-engine'

interface DomainCardProps {
  icon: string
  label: string
  score: number
  description?: string
  compact?: boolean
}

export function DomainCard({ icon, label, score, description, compact }: DomainCardProps) {
  const color = getScoreColor(score)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="text-sm font-semibold text-gray-800">{label}</span>
        </div>
        <StatusBadge score={score} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl font-black" style={{ color }}>
          {score}
        </span>
        <span className="text-sm text-gray-400 font-medium">/ 100</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>

      {!compact && description && (
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
