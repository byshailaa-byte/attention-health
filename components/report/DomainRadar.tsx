'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface RadarDataPoint {
  domain: string
  score: number
  average: number
}

interface DomainRadarProps {
  data: RadarDataPoint[]
  size?: number
}

const POPULATION_AVERAGES: Record<string, number> = {
  'Attention Control': 58,
  'Executive Function': 62,
  'Working Memory': 60,
  'Time Awareness': 55,
  'Hyperfocus': 52,
  'Impulse Control': 61,
  'Emotional Regulation': 59,
  'Sleep & Recovery': 56,
}

export function DomainRadar({ data, size = 380 }: DomainRadarProps) {
  const chartData = data.map((d) => ({
    domain: d.domain,
    'Your Score': d.score,
    'Population Average': d.average ?? POPULATION_AVERAGES[d.domain] ?? 58,
  }))

  return (
    <ResponsiveContainer width="100%" height={size}>
      <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis
          dataKey="domain"
          tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }}
        />
        <Radar
          name="Your Score"
          dataKey="Your Score"
          stroke="#1B4332"
          fill="#1B4332"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Radar
          name="Population Average"
          dataKey="Population Average"
          stroke="#9CA3AF"
          fill="none"
          strokeWidth={1.5}
          strokeDasharray="5 3"
        />
        <Legend
          formatter={(value) => (
            <span style={{ fontSize: 12, color: value === 'Your Score' ? '#1B4332' : '#9CA3AF' }}>
              {value}
            </span>
          )}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
