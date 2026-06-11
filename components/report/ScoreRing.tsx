'use client'

import { PieChart, Pie, Cell } from 'recharts'

interface ScoreRingProps {
  score: number
  size?: number
  label?: string
  strokeWidth?: number
}

export function ScoreRing({ score, size = 160, label, strokeWidth = 12 }: ScoreRingProps) {
  const clampedScore = Math.max(0, Math.min(100, score))

  const getColor = (s: number) => {
    if (s >= 80) return '#1B4332'
    if (s >= 65) return '#22C55E'
    if (s >= 50) return '#F59E0B'
    if (s >= 35) return '#F97316'
    return '#EF4444'
  }

  const getLabel = (s: number) => {
    if (s >= 80) return 'Excellent'
    if (s >= 65) return 'Good'
    if (s >= 50) return 'Fair'
    if (s >= 35) return 'Needs Attention'
    return 'Critical'
  }

  const color = getColor(clampedScore)
  const data = [
    { value: clampedScore },
    { value: 100 - clampedScore },
  ]

  return (
    <div className="relative flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <PieChart width={size} height={size}>
          <Pie
            data={data}
            cx={size / 2 - 4}
            cy={size / 2 - 4}
            innerRadius={size / 2 - strokeWidth - 8}
            outerRadius={size / 2 - 8}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={color} />
            <Cell fill="#F3F4F6" />
          </Pie>
        </PieChart>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ paddingBottom: 8 }}
        >
          <span className="font-black leading-none" style={{ fontSize: size * 0.28, color }}>
            {clampedScore}
          </span>
          <span className="text-xs font-semibold text-gray-400 mt-0.5">/ 100</span>
        </div>
      </div>
      {label !== undefined ? (
        <span className="text-sm font-semibold" style={{ color }}>
          {label}
        </span>
      ) : (
        <span className="text-sm font-semibold" style={{ color }}>
          {getLabel(clampedScore)}
        </span>
      )}
    </div>
  )
}
