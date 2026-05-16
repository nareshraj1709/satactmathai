'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import FilterTabs from '@/components/ui/FilterTabs'
import { SECTIONS } from '@/lib/sections-data'

type Filter = 'Both' | 'SAT' | 'ACT'

export default function PracticeIndexPage() {
  const [filter, setFilter] = useState<Filter>('Both')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return SECTIONS.filter(s => {
      const matchesExam = filter === 'Both' || s.tier === filter || s.tier === 'Both'
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.topic.toLowerCase().includes(q)
      return matchesExam && matchesQuery
    })
  }, [filter, query])

  // Group by topic
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const s of filtered) {
      if (!map.has(s.topic)) map.set(s.topic, [])
      map.get(s.topic)!.push(s)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div>
      <section className="pt-20 pb-12 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-6">EST. 2024 · USA · MMXXVI</Eyebrow>
          <h1 className="headline text-[42px] sm:text-[56px] max-w-[820px]">
            Practice. <em>Marked the way it counts.</em>
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--color-ink-2)] max-w-[640px] leading-[1.6]">
            Pick a topic. Get ten AI-generated questions calibrated to the SAT or ACT rubric. Your working is marked line by line.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <FilterTabs
              value={filter}
              onChange={v => setFilter(v as Filter)}
              options={[
                { label: 'Both', value: 'Both' },
                { label: 'SAT', value: 'SAT' },
                { label: 'ACT', value: 'ACT' },
              ]}
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search topics…"
              className="px-4 py-2 border border-[color:var(--color-rule)] rounded-full bg-[color:var(--color-surface)] text-[14px] outline-none focus:border-[color:var(--color-ink)] min-w-[220px]"
            />
            <span className="eyebrow">{filtered.length} topics</span>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="space-y-16">
            {grouped.map(([topic, sections]) => (
              <div key={topic}>
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="headline text-[26px]">{topic}</h2>
                  <span className="eyebrow">{sections.length} topics</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {sections.map(sec => (
                    <Link
                      key={sec.id}
                      href={`/practice/${sec.slug}`}
                      className="card p-5 flex flex-col gap-3 hover:bg-[color:var(--color-bg-alt)] transition-colors min-h-[140px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="marker not-italic font-serif text-[13px]">№ {String(sec.number).padStart(2, '0')}</span>
                        <span className="eyebrow text-[10px]">{sec.tier === 'Both' ? 'SAT + ACT' : sec.tier}</span>
                      </div>
                      <div className="font-serif text-[18px] leading-tight mt-1">{sec.name}</div>
                      <div className="text-[13px] text-[color:var(--color-muted)] leading-[1.5] mt-auto">{sec.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
