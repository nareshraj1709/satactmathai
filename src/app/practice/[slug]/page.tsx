import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { toRoman } from '@/components/ui/RomanNumeral'
import { resolveSectionSlug, SECTIONS } from '@/lib/sections-data'
import { getExamsForSection, ExamDifficulty } from '@/lib/exams-loader'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Pre-render every canonical section slug AND every known subtopic slug
  // (so direct links from /syllabus/[slug] never 404).
  const slugs = new Set<string>(SECTIONS.map(s => s.slug))
  // Subtopic slugs from SUBTOPIC_TO_SECTION mapping
  const { SUBTOPIC_TO_SECTION } = await import('@/lib/sections-data')
  for (const k of Object.keys(SUBTOPIC_TO_SECTION)) slugs.add(k)
  return Array.from(slugs).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const section = resolveSectionSlug(slug)
  if (!section) return { title: 'Practice — SATACTMathAI' }
  return {
    title: `${section.name} · Practice — SATACTMathAI`,
    description: section.description,
    alternates: { canonical: `https://www.satactmathai.com/practice/${section.slug}` },
  }
}

const DIFFICULTIES: ExamDifficulty[] = ['Easy', 'Medium', 'Hard']

export default async function PracticeSectionPage({ params }: Props) {
  const { slug } = await params
  const section = resolveSectionSlug(slug)
  if (!section) notFound()

  const examsByDifficulty: Record<ExamDifficulty, ReturnType<typeof getExamsForSection>> = {
    Easy: getExamsForSection(section.slug, 'Easy'),
    Medium: getExamsForSection(section.slug, 'Medium'),
    Hard: getExamsForSection(section.slug, 'Hard'),
  }

  const totalExams = examsByDifficulty.Easy.length + examsByDifficulty.Medium.length + examsByDifficulty.Hard.length

  return (
    <div>
      <section className="pt-12 pb-8 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-5">
            <Link href="/practice" className="hover:text-[color:var(--color-ink)]">Practice</Link>
            <span className="mx-2">/</span>
            <span>{section.topic}</span>
          </Eyebrow>
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <div className="max-w-[640px]">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="marker not-italic font-serif text-[15px]">№ {String(section.number).padStart(2, '0')}</span>
                <span className="eyebrow">{section.tier === 'Both' ? 'SAT + ACT' : section.tier}</span>
              </div>
              <h1 className="headline text-[36px] sm:text-[42px]">{section.name}</h1>
              <p className="mt-3 text-[15px] text-[color:var(--color-muted)]">{section.description}</p>
            </div>
            <div className="text-right">
              <div className="font-serif text-[44px] leading-none">{totalExams}</div>
              <div className="eyebrow mt-2">exams available</div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        {totalExams === 0 ? (
          <div className="card p-12 text-center">
            <Eyebrow className="mb-3">Generating</Eyebrow>
            <p className="font-serif text-[22px] mb-3">Exams for this topic are still being prepared.</p>
            <p className="text-[14px] text-[color:var(--color-muted)] mb-6">Run <code className="font-mono">npm run generate:exams</code> to populate the bank.</p>
            <Link href="/practice" className="btn-ghost">← Back to topics</Link>
          </div>
        ) : (
          <div className="space-y-16">
            {DIFFICULTIES.map(diff => {
              const exams = examsByDifficulty[diff]
              const label = diff === 'Easy' ? 'Warm-up' : diff === 'Medium' ? 'Mid-difficulty' : 'Top band'
              return (
                <div key={diff} id={`diff-${diff.toLowerCase()}`}>
                  <div className="flex items-baseline justify-between mb-6">
                    <div>
                      <Eyebrow className="mb-2">{label}</Eyebrow>
                      <h2 className="headline text-[28px]">{diff}</h2>
                    </div>
                    <span className="eyebrow">{exams.length}/10 exams</span>
                  </div>
                  {exams.length === 0 ? (
                    <div className="card p-8 text-center text-[14px] text-[color:var(--color-muted)]">
                      No {diff.toLowerCase()} exams generated yet for this topic.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {exams.map(e => (
                        <Link
                          key={e.id}
                          href={`/practice/${section.slug}/${e.difficulty.toLowerCase()}-${e.examNumber}`}
                          className="card p-5 hover:bg-[color:var(--color-bg-alt)] transition-colors flex flex-col gap-3 min-h-[140px]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="marker not-italic font-serif text-[13px]">№ {String(e.examNumber).padStart(2, '0')}</span>
                            <span className="eyebrow text-[10px]">{diff}</span>
                          </div>
                          <div className="font-serif text-[18px] leading-tight">Exam {e.examNumber}</div>
                          <div className="eyebrow text-[10px] mt-auto">{e.questions.length} questions</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}
