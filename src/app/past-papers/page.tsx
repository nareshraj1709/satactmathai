'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import FilterTabs from '@/components/ui/FilterTabs'
import { HISTORICAL_SAT, HISTORICAL_ACT, AI_SAT_PAPERS, AI_ACT_PAPERS } from '@/lib/papers-data'

type Tab = 'historical' | 'ai'
type Exam = 'Both' | 'SAT' | 'ACT'

export default function PastPapersPage() {
  const [tab, setTab] = useState<Tab>('historical')
  const [exam, setExam] = useState<Exam>('Both')

  const papers = useMemo(() => {
    if (tab === 'historical') {
      const all = [...HISTORICAL_SAT, ...HISTORICAL_ACT]
      return exam === 'Both' ? all : all.filter(p => p.exam === exam)
    } else {
      const all = [...AI_SAT_PAPERS, ...AI_ACT_PAPERS]
      return exam === 'Both' ? all : all.filter(p => p.exam === exam)
    }
  }, [tab, exam])

  // Group historical by year
  const groupedByYear = useMemo(() => {
    if (tab !== 'historical') return null
    const map = new Map<number, typeof papers>()
    for (const p of papers) {
      const y = p.year ?? 0
      if (!map.has(y)) map.set(y, [])
      map.get(y)!.push(p)
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0])
  }, [tab, papers])

  return (
    <div>
      <section className="pt-20 pb-12 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-6">EST. 2024 · USA · MMXXVI</Eyebrow>
          <h1 className="headline text-[42px] sm:text-[56px] max-w-[820px]">
            Past papers. <em>Every release, marked like the real thing.</em>
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--color-ink-2)] max-w-[640px] leading-[1.6]">
            Every SAT and ACT math paper from 2016 to 2025, plus AI-generated papers calibrated to the same rubric. Timer, navigation, and line-by-line marking included.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <FilterTabs
              value={tab}
              onChange={v => setTab(v as Tab)}
              options={[
                { label: 'Historical', value: 'historical' },
                { label: 'AI papers', value: 'ai' },
              ]}
            />
            <FilterTabs
              value={exam}
              onChange={v => setExam(v as Exam)}
              options={[
                { label: 'Both', value: 'Both' },
                { label: 'SAT', value: 'SAT' },
                { label: 'ACT', value: 'ACT' },
              ]}
            />
            <span className="eyebrow">{papers.length} papers</span>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          {tab === 'historical' && groupedByYear && (
            <div className="space-y-14">
              {groupedByYear.map(([year, list]) => (
                <div key={year}>
                  <div className="flex items-baseline justify-between mb-6">
                    <h2 className="headline text-[28px]">{year}</h2>
                    <span className="eyebrow">{list.length} papers</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {list.map((p, i) => (
                      <Link
                        key={p.id}
                        href={`/past-papers/${p.id}`}
                        className="card p-5 hover:bg-[color:var(--color-bg-alt)] transition-colors flex flex-col gap-3 min-h-[140px]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="marker not-italic font-serif text-[13px]">№ {String(i + 1).padStart(2, '0')}</span>
                          <span className="eyebrow text-[10px]">{p.exam}</span>
                        </div>
                        <div className="font-serif text-[18px] leading-tight">{p.exam} {p.year} · Test {p.paperNumber}</div>
                        <div className="eyebrow text-[10px] mt-auto">{p.timeMinutes} min · {p.questionCount} questions</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'ai' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {papers.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/past-papers/${p.id}`}
                  className="card p-5 hover:bg-[color:var(--color-bg-alt)] transition-colors flex flex-col gap-3 min-h-[140px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="marker not-italic font-serif text-[13px]">№ {String(i + 1).padStart(2, '0')}</span>
                    <span className="eyebrow text-[10px]">{p.exam} · {p.difficulty || 'Mixed'}</span>
                  </div>
                  <div className="font-serif text-[18px] leading-tight">{p.style}</div>
                  <div className="eyebrow text-[10px] mt-auto">{p.timeMinutes} min · {p.questionCount} questions</div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}
