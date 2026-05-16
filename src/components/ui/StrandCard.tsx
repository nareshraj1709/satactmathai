import Link from 'next/link'
import { toRoman } from './RomanNumeral'

export default function StrandCard({
  number,
  name,
  sheetCount,
  tier,
  href,
}: {
  number: number
  name: string
  sheetCount: number
  tier: 'SAT' | 'ACT' | 'Both'
  href: string
}) {
  return (
    <Link href={href} className="card p-7 flex flex-col gap-5 hover:bg-[color:var(--color-bg-alt)] transition-colors">
      <div className="flex items-center justify-between">
        <span className="marker text-[15px] not-italic font-serif">№ {String(number).padStart(2, '0')}</span>
        <span className="eyebrow">{tier === 'Both' ? 'SAT + ACT' : `${tier} Math`}</span>
      </div>
      <h3 className="headline text-[26px]">{name}</h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[14px] text-[color:var(--color-muted)]">{sheetCount} sheets</span>
        <span className="eyebrow">Chapter {toRoman(number)} →</span>
      </div>
    </Link>
  )
}
