import Link from 'next/link'

export default function SheetTile({
  number,
  title,
  meta,
  href,
  tier,
}: {
  number?: number | string
  title: string
  meta?: string
  href: string
  tier?: 'SAT' | 'ACT' | 'Both'
}) {
  return (
    <Link href={href} className="card p-5 flex flex-col gap-3 hover:bg-[color:var(--color-bg-alt)] transition-colors min-h-[120px]">
      <div className="flex items-center justify-between">
        <span className="marker text-[13px] not-italic font-serif">№ {typeof number === 'number' ? String(number).padStart(2, '0') : (number ?? '—')}</span>
        {tier && <span className="eyebrow text-[10px]">{tier === 'Both' ? 'SAT + ACT' : tier}</span>}
      </div>
      <h4 className="font-serif text-[17px] leading-tight mt-auto">{title}</h4>
      {meta && <div className="eyebrow text-[10px]">{meta}</div>}
    </Link>
  )
}
