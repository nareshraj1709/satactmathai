import { ReactNode } from 'react'
import { toRoman } from './RomanNumeral'

export default function FeatureCard({
  number,
  title,
  emphasis,
  body,
  tag,
}: {
  number: number
  title: string
  emphasis?: string
  body: string
  tag?: string
}) {
  return (
    <article className="card p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span className="marker text-[15px] not-italic font-serif">№ {String(number).padStart(2, '0')}</span>
        {tag && <span className="eyebrow">{tag}</span>}
      </div>
      <h3 className="headline text-[22px] sm:text-[24px] mb-3">
        {title}{emphasis && <> <em>{emphasis}</em></>}
      </h3>
      <p className="text-[15px] text-[color:var(--color-ink-2)] leading-[1.6]">{body}</p>
      <div className="eyebrow mt-auto pt-5 flex items-center justify-between">
        <span>Chapter {toRoman(number)}</span>
        <span>→</span>
      </div>
    </article>
  )
}
