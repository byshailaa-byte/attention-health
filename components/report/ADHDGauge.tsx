'use client'

import { getADHDRiskLevel } from '@/lib/scoring-engine'

interface ADHDGaugeProps {
  score: number
}

export function ADHDGauge({ score }: ADHDGaugeProps) {
  const riskLevel = getADHDRiskLevel(score)

  const getColor = (level: string) => {
    switch (level) {
      case 'High': return '#EF4444'
      case 'Moderate': return '#F97316'
      case 'Low-Moderate': return '#F59E0B'
      default: return '#22C55E'
    }
  }

  const color = getColor(riskLevel)

  // SVG arc gauge
  const radius = 60
  const cx = 90
  const cy = 90
  const strokeWidth = 14
  const circumference = Math.PI * radius
  const dashOffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="180" height="100" viewBox="0 0 180 100">
        {/* Background arc */}
        <path
          d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        {/* Score text */}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="28" fontWeight="900" fill={color}>
          {score}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11" fill="#9CA3AF">
          / 100
        </text>
        {/* Labels */}
        <text x={cx - radius - 4} y={cy + 18} textAnchor="middle" fontSize="10" fill="#9CA3AF">Low</text>
        <text x={cx + radius + 4} y={cy + 18} textAnchor="middle" fontSize="10" fill="#9CA3AF">High</text>
      </svg>

      <span
        className="px-4 py-1.5 rounded-full text-sm font-bold"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {riskLevel} Risk
      </span>
    </div>
  )
}
