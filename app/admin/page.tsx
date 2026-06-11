'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { Brain, Download, Users, TrendingUp, Award, BarChart2 } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  occupation: string
  industry: string
  score: number | null
  archetype: string | null
  createdAt: string
}

interface Stats {
  totalAssessments: number
  leadsCollected: number
  avgScore: number
  mostCommonArchetype: string
  archetypeDistribution: Record<string, number>
}

const ARCHETYPE_COLORS = ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2', '#B7E4C7', '#D8F3DC']

export default function AdminPage() {
  const [data, setData] = useState<{ stats: Stats; leads: Lead[] } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleExport = () => {
    window.open('/api/admin/leads?format=csv', '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#1B4332] rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading admin data...</p>
        </div>
      </div>
    )
  }

  const stats = data?.stats
  const leads = data?.leads ?? []

  const archetypeChartData = Object.entries(stats?.archetypeDistribution ?? {}).map(([name, count]) => ({
    name: name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    value: count,
  }))

  const scoreDistribution = [
    { range: '0–20', count: leads.filter(l => l.score !== null && l.score < 20).length },
    { range: '20–40', count: leads.filter(l => l.score !== null && l.score >= 20 && l.score < 40).length },
    { range: '40–60', count: leads.filter(l => l.score !== null && l.score >= 40 && l.score < 60).length },
    { range: '60–80', count: leads.filter(l => l.score !== null && l.score >= 60 && l.score < 80).length },
    { range: '80–100', count: leads.filter(l => l.score !== null && l.score >= 80).length },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain size={20} style={{ color: '#1B4332' }} />
          <span className="font-bold text-gray-900">Attention Health™ Admin</span>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl"
          style={{ backgroundColor: '#1B4332' }}
        >
          <Download size={14} />
          Export CSV
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: <BarChart2 size={20} />, label: 'Total Assessments', value: stats?.totalAssessments ?? 0, color: '#1B4332' },
            { icon: <Users size={20} />, label: 'Leads Collected', value: stats?.leadsCollected ?? 0, color: '#6C63FF' },
            { icon: <TrendingUp size={20} />, label: 'Average Score', value: `${stats?.avgScore ?? 0}/100`, color: '#D97706' },
            { icon: <Award size={20} />, label: 'Top Archetype', value: (stats?.mostCommonArchetype ?? 'N/A').replace(/-/g, ' '), color: '#DC2626' },
          ].map(({ icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3" style={{ color }}>
                {icon}
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
              </div>
              <div className="text-2xl font-black text-gray-900 capitalize">{String(value)}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Score Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={scoreDistribution}>
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#1B4332" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Archetype Distribution</h2>
            {archetypeChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={archetypeChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                    {archetypeChartData.map((_, i) => (
                      <Cell key={i} fill={ARCHETYPE_COLORS[i % ARCHETYPE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend formatter={(v) => <span style={{ fontSize: 10 }}>{v}</span>} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
            )}
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Leads ({leads.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Email', 'Role', 'Industry', 'Score', 'Archetype', 'Date'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.slice(0, 50).map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{lead.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.occupation}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.industry}</td>
                    <td className="px-4 py-3">
                      {lead.score !== null ? (
                        <span className="text-sm font-bold" style={{ color: lead.score >= 70 ? '#1B4332' : lead.score >= 50 ? '#F59E0B' : '#EF4444' }}>
                          {lead.score}/100
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 capitalize">
                      {lead.archetype?.replace(/-/g, ' ') ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                      No leads yet. Complete some assessments to see data here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
