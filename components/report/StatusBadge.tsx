interface StatusBadgeProps {
  score: number
  override?: string
}

export function StatusBadge({ score, override }: StatusBadgeProps) {
  const getStatus = (s: number) => {
    if (s >= 80) return { label: 'Strength', bg: '#D1FAE5', text: '#065F46' }
    if (s >= 65) return { label: 'Good', bg: '#DCFCE7', text: '#166534' }
    if (s >= 50) return { label: 'Fair', bg: '#FEF9C3', text: '#713F12' }
    if (s >= 35) return { label: 'Needs Attention', bg: '#FFF7ED', text: '#9A3412' }
    return { label: 'High Risk', bg: '#FEE2E2', text: '#991B1B' }
  }

  const status = override
    ? (() => {
        switch (override) {
          case 'Good': return { label: 'Good', bg: '#DCFCE7', text: '#166534' }
          case 'Fair': return { label: 'Fair', bg: '#FEF9C3', text: '#713F12' }
          case 'Needs Attention': return { label: 'Needs Attention', bg: '#FFF7ED', text: '#9A3412' }
          case 'Strength': return { label: 'Strength', bg: '#D1FAE5', text: '#065F46' }
          case 'High': return { label: 'High', bg: '#FEE2E2', text: '#991B1B' }
          default: return getStatus(score)
        }
      })()
    : getStatus(score)

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: status.bg, color: status.text }}
    >
      {status.label}
    </span>
  )
}
