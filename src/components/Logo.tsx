'use client'

export default function Logo({ size = 40, showName = true, nameSize = 20, nameColor = '#1E3A5F' }: {
  size?: number
  showName?: boolean
  nameSize?: number
  nameColor?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#logoGrad)" />
        <text x="20" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Georgia, serif">SAT</text>
        <text x="20" y="27" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="Georgia, serif">ACT</text>
        <text x="20" y="36" textAnchor="middle" fill="#93C5FD" fontSize="7" fontWeight="700" fontFamily="Arial">AI</text>
      </svg>
      {showName && (
        <span style={{ fontSize: nameSize, fontWeight: 800, color: nameColor, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
          SAT ACT Math<span style={{ color: '#2563EB' }}>AI</span>
        </span>
      )}
    </div>
  )
}
