'use client'

import { useMemo, useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import FilterTabs from '@/components/ui/FilterTabs'
import { toRoman } from '@/components/ui/RomanNumeral'
import { FORMULAS } from '@/lib/formulas-data'

type Filter = 'Both' | 'SAT' | 'ACT'

export default function FormulasPage() {
  const [filter, setFilter] = useState<Filter>('Both')

  const filtered = useMemo(() => {
    if (filter === 'Both') return FORMULAS
    return FORMULAS.filter(s => s.tier === filter || s.tier === 'Both')
  }, [filter])

  return (
    <div>
      <section className="pt-20 pb-12 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-6">EST. 2024 · USA · MMXXVI</Eyebrow>
          <h1 className="headline text-[42px] sm:text-[56px] max-w-[820px]">
            The formula sheet. <em>Free, printable, exam-ready.</em>
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--color-ink-2)] max-w-[640px] leading-[1.6]">
            The SAT prints a handful of these on the test. The ACT prints none. Memorize them all — and keep the sheet near your scratch paper.
          </p>
          <div className="mt-10">
            <FilterTabs
              value={filter}
              onChange={v => setFilter(v as Filter)}
              options={[
                { label: 'Both', value: 'Both' },
                { label: 'SAT', value: 'SAT' },
                { label: 'ACT', value: 'ACT' },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(strand => (
              <article key={strand.id} className="card p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="marker not-italic font-serif text-[15px]">№ {String(strand.number).padStart(2, '0')}</span>
                  <span className="eyebrow">{strand.tier === 'Both' ? 'SAT + ACT' : `${strand.tier} only`}</span>
                </div>
                <h2 className="headline text-[24px] mb-3">{strand.name}</h2>
                <p className="text-[14px] text-[color:var(--color-muted)] leading-[1.6] mb-5">{strand.blurb}</p>
                <dl className="space-y-3">
                  {strand.formulas.map(f => (
                    <div key={f.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-t border-[color:var(--color-rule)] first:border-t-0">
                      <dt className="text-[13px] text-[color:var(--color-muted)] sm:w-[170px] shrink-0">{f.name}{f.when && <span className="ml-1 marker not-italic">·</span>}{f.when && <span className="text-[11px] text-[color:var(--color-marker)] ml-1">{f.when}</span>}</dt>
                      <dd className="font-serif text-[17px] text-[color:var(--color-ink)]">{f.formula}</dd>
                    </div>
                  ))}
                </dl>
                <div className="eyebrow mt-6 pt-5 border-t border-[color:var(--color-rule)]">Chapter {toRoman(strand.number)}</div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
