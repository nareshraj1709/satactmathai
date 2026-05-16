'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHeading from '@/components/ui/SectionHeading'
import FilterTabs from '@/components/ui/FilterTabs'
import { toRoman } from '@/components/ui/RomanNumeral'
import { SAT_CONTENT, ACT_ADDITIONAL_CONTENT } from '@/lib/study-content'

type Filter = 'Both' | 'SAT' | 'ACT'

const SAT_DOMAIN_MAP: Record<string, string> = {
  'Heart of Algebra': 'algebra',
  'Problem Solving & Data Analysis': 'problem-solving-data-analysis',
  'Passport to Advanced Math': 'advanced-math',
  'Additional Topics in Math': 'geometry-trigonometry',
}
const ACT_DOMAIN_MAP: Record<string, string> = {
  'Pre-Algebra (ACT)': 'pre-algebra',
  'Elementary Algebra (ACT)': 'elementary-algebra',
  'Plane & Coordinate Geometry (ACT)': 'plane-geometry',
  'Trigonometry (ACT)': 'trigonometry',
}

const STRANDS = [
  ...SAT_CONTENT.map((s, i) => ({ number: i + 1, name: s.topic, exam: 'SAT' as const, domainSlug: SAT_DOMAIN_MAP[s.topic] || '', subtopics: s.subtopics })),
  ...ACT_ADDITIONAL_CONTENT.map((s, i) => ({ number: SAT_CONTENT.length + i + 1, name: s.topic, exam: 'ACT' as const, domainSlug: ACT_DOMAIN_MAP[s.topic] || '', subtopics: s.subtopics })),
]

export default function SyllabusPage() {
  const [filter, setFilter] = useState<Filter>('Both')

  const filtered = useMemo(() => {
    if (filter === 'Both') return STRANDS
    return STRANDS.filter(s => s.exam === filter)
  }, [filter])

  const totalSheets = filtered.reduce((sum, s) => sum + s.subtopics.length, 0)

  return (
    <div>
      <section className="pt-20 pb-12 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-6">EST. 2024 · USA · MMXXVI</Eyebrow>
          <h1 className="headline text-[42px] sm:text-[56px] max-w-[820px]">
            The syllabus. <em>Every topic, every strand.</em>
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--color-ink-2)] max-w-[640px] leading-[1.6]">
            Eight strands, {STRANDS.reduce((a, s) => a + s.subtopics.length, 0)} sheets. Study notes, worked examples, AI-marked practice — every page, mapped to the official rubric.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <FilterTabs
              value={filter}
              onChange={v => setFilter(v as Filter)}
              options={[
                { label: 'Both', value: 'Both' },
                { label: 'SAT', value: 'SAT' },
                { label: 'ACT', value: 'ACT' },
              ]}
            />
            <span className="eyebrow">{filtered.length} strands · {totalSheets} sheets</span>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="space-y-20">
            {filtered.map(strand => (
              <article key={`${strand.exam}-${strand.name}`} id={strand.domainSlug}>
                <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <div className="eyebrow mb-3 flex items-center gap-3">
                      <span className="marker not-italic font-serif text-[14px]">№ {toRoman(strand.number)}</span>
                      <span>{strand.exam === 'SAT' ? 'SAT Math' : 'ACT Math'}</span>
                    </div>
                    <h2 className="headline text-[30px] sm:text-[36px]">{strand.name}</h2>
                  </div>
                  <div className="eyebrow">{strand.subtopics.length} sheets</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {strand.subtopics.map((sub, i) => (
                    <Link
                      key={sub.slug}
                      href={`/syllabus/${sub.slug}?exam=${strand.exam.toLowerCase()}`}
                      className="card p-5 hover:bg-[color:var(--color-bg-alt)] transition-colors flex flex-col gap-3 min-h-[120px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="marker not-italic font-serif text-[13px]">№ {String(i + 1).padStart(2, '0')}</span>
                        <span className="eyebrow text-[10px]">{strand.exam}</span>
                      </div>
                      <div className="font-serif text-[17px] leading-tight mt-auto">{sub.name}</div>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
