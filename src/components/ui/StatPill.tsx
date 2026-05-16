import { ReactNode } from 'react'

export default function StatPill({ label, value, className = '' }: { label: ReactNode; value?: ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-baseline gap-2 px-4 py-2 rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] ${className}`}>
      {value != null && <span className="font-serif text-[18px] font-semibold">{value}</span>}
      <span className="text-[13px] text-[color:var(--color-muted)]">{label}</span>
    </div>
  )
}
