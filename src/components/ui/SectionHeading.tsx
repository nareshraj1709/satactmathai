import { ReactNode } from 'react'
import { toRoman } from './RomanNumeral'

export default function SectionHeading({
  roman,
  kicker,
  title,
  align = 'left',
  className = '',
}: {
  roman?: number
  kicker?: string
  title: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`${alignCls} max-w-[820px] ${className}`}>
      {(roman || kicker) && (
        <div className={`eyebrow mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          {roman != null && <span className="marker text-base not-italic" style={{ letterSpacing: 0 }}>№ {toRoman(roman)}</span>}
          {kicker && <span>{kicker}</span>}
        </div>
      )}
      <h2 className="headline text-[34px] sm:text-[40px] lg:text-[48px]">{title}</h2>
    </div>
  )
}
