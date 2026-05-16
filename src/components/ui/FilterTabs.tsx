'use client'

import { ReactNode } from 'react'

export type FilterValue = 'Both' | 'SAT' | 'ACT'

export default function FilterTabs({
  value,
  onChange,
  options,
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  options: Array<{ label: ReactNode; value: string }>
  className?: string
}) {
  return (
    <div className={`inline-flex items-center gap-1 p-1 border border-[color:var(--color-rule)] rounded-full bg-[color:var(--color-surface)] ${className}`}>
      {options.map(opt => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              active
                ? 'bg-[color:var(--color-accent)] text-white'
                : 'text-[color:var(--color-ink-2)] hover:bg-[color:var(--color-bg-alt)]'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
