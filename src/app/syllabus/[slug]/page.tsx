import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { toRoman } from '@/components/ui/RomanNumeral'
import { getAllSyllabusEntries, getSyllabusEntry } from '@/lib/syllabus-resolver'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ exam?: string }>
}

export async function generateStaticParams() {
  // Unique slugs across SAT + ACT (SAT preferred on collision)
  const all = getAllSyllabusEntries()
  const seen = new Set<string>()
  const params: Array<{ slug: string }> = []
  for (const e of all) {
    if (seen.has(e.slug)) continue
    seen.add(e.slug)
    params.push({ slug: e.slug })
  }
  return params
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params
  const { exam } = await searchParams
  const entry = getSyllabusEntry(slug, exam?.toUpperCase() === 'ACT' ? 'ACT' : exam?.toUpperCase() === 'SAT' ? 'SAT' : undefined)
  if (!entry) return { title: 'Not Found' }

  const title = entry.markdown?.metaTitle || `${entry.name} | ${entry.exam} Math Prep`
  const description = entry.markdown?.metaDescription
    || `Master ${entry.name} for the ${entry.exam} math section. Free notes, worked examples, AI-marked practice.`

  return {
    title,
    description,
    keywords: [entry.markdown?.focusKeyword, entry.markdown?.secondaryKeyword, `${entry.exam} math`, `${entry.exam} prep`].filter(Boolean) as string[],
    alternates: { canonical: `https://www.satactmathai.com/syllabus/${entry.slug}` },
    openGraph: {
      title, description,
      url: `https://www.satactmathai.com/syllabus/${entry.slug}`,
      siteName: 'SATACTMathAI', type: 'article', locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  }
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\[FORMULA:\s*([^\]]+)\]/g, '<div class="formula-block">$1</div>')
    .replace(/\[ANSWER:\s*([^\]]+)\]/g, '<div class="answer-block">Answer: $1</div>')
    .replace(/\[INTERNAL LINK:\s*([^\]]+)\]/g, (_, p) => {
      const path = String(p).trim()
      const last = path.split('/').pop()?.replace(/-/g, ' ') || 'Related topic'
      return `<a href="${path}" class="syllabus-link">${last.charAt(0).toUpperCase() + last.slice(1)} →</a>`
    })
    .replace(/^✅\s*(.+)$/gm, '<div class="tick">$1</div>')
    .replace(/^❌\s*(.+)$/gm, '<div class="cross">$1</div>')
    .replace(/^[•\-]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^([A-E])\)\s+(.+)$/gm, '<div class="opt"><strong>$1)</strong> $2</div>')
    .replace(/^(?!<[a-z]|$)(.+)$/gm, (m) => {
      if (m.startsWith('<') || m.startsWith('Step ') || m.startsWith('Answer:')) return m
      return `<p>${m}</p>`
    })
}

export default async function SyllabusEntryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { exam } = await searchParams
  const examHint = exam?.toUpperCase() === 'ACT' ? 'ACT' : exam?.toUpperCase() === 'SAT' ? 'SAT' : undefined
  const entry = getSyllabusEntry(slug, examHint)
  if (!entry) notFound()

  const all = getAllSyllabusEntries()
  const siblings = all.filter(e => e.exam === entry.exam && e.strandSlug === entry.strandSlug)
  const currentIdx = siblings.findIndex(e => e.slug === entry.slug)
  const nextSibling = siblings[currentIdx + 1] ?? siblings[0]
  const prevSibling = siblings[currentIdx - 1] ?? siblings[siblings.length - 1]

  const body = entry.markdown?.content || entry.notes || ''
  const html = renderMarkdown(body)

  return (
    <div>
      <section className="pt-16 pb-8 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-5">
            <Link href="/syllabus" className="hover:text-[color:var(--color-ink)]">Syllabus</Link>
            <span className="mx-2">/</span>
            <span>{entry.strand}</span>
          </Eyebrow>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="marker not-italic font-serif text-[15px]">№ {String(currentIdx + 1).padStart(2, '0')}</span>
            <span className="eyebrow">{entry.exam === 'SAT' ? 'SAT Math' : 'ACT Math'}</span>
          </div>
          <h1 className="headline text-[40px] sm:text-[52px] max-w-[820px]">{entry.name}</h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <article className="prose-syllabus" dangerouslySetInnerHTML={{ __html: html }} />
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="card p-5">
                <Eyebrow className="mb-4">In this strand</Eyebrow>
                <ol className="space-y-2">
                  {siblings.map((s, i) => (
                    <li key={s.slug}>
                      <Link
                        href={`/syllabus/${s.slug}?exam=${entry.exam.toLowerCase()}`}
                        className={`flex items-baseline gap-3 py-1.5 text-[14px] ${s.slug === entry.slug ? 'font-semibold text-[color:var(--color-ink)]' : 'text-[color:var(--color-ink-2)] hover:text-[color:var(--color-marker)]'}`}
                      >
                        <span className="marker not-italic font-serif text-[12px] shrink-0">№ {String(i + 1).padStart(2, '0')}</span>
                        <span>{s.name}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
              <Link href={`/practice/${entry.slug}?exam=${entry.exam.toLowerCase()}`} className="btn-primary mt-5 w-full justify-center">
                Practice this topic <span aria-hidden>→</span>
              </Link>
            </aside>
          </div>

          <div className="rule mt-16 pt-10 flex flex-col sm:flex-row gap-4 justify-between items-stretch">
            <Link href={`/syllabus/${prevSibling.slug}?exam=${entry.exam.toLowerCase()}`} className="card p-5 flex-1 hover:bg-[color:var(--color-bg-alt)]">
              <Eyebrow className="mb-2">← Previous</Eyebrow>
              <div className="font-serif text-[18px]">{prevSibling.name}</div>
            </Link>
            <Link href={`/syllabus/${nextSibling.slug}?exam=${entry.exam.toLowerCase()}`} className="card p-5 flex-1 hover:bg-[color:var(--color-bg-alt)] text-right">
              <Eyebrow className="mb-2">Next →</Eyebrow>
              <div className="font-serif text-[18px]">{nextSibling.name}</div>
            </Link>
          </div>
        </Container>
      </section>

      <style>{`
        .prose-syllabus h1 { font-family: var(--font-serif); font-size: 32px; font-weight: 600; line-height: 1.15; margin: 0 0 16px; color: var(--color-ink); }
        .prose-syllabus h2 { font-family: var(--font-serif); font-size: 26px; font-weight: 600; margin: 36px 0 12px; color: var(--color-ink); border-top: 1px solid var(--color-rule); padding-top: 24px; }
        .prose-syllabus h3 { font-family: var(--font-serif); font-size: 20px; font-weight: 600; margin: 24px 0 10px; color: var(--color-ink); }
        .prose-syllabus h2:first-of-type, .prose-syllabus h1:first-of-type { border-top: 0; padding-top: 0; }
        .prose-syllabus p { font-size: 16px; line-height: 1.75; color: var(--color-ink-2); margin: 12px 0; }
        .prose-syllabus strong { color: var(--color-ink); font-weight: 600; }
        .prose-syllabus li { font-size: 16px; line-height: 1.75; color: var(--color-ink-2); margin: 4px 0 4px 20px; list-style: disc; }
        .prose-syllabus blockquote { border-left: 3px solid var(--color-marker); background: var(--color-bg-alt); padding: 12px 18px; margin: 16px 0; color: var(--color-ink-2); font-style: italic; }
        .prose-syllabus a.syllabus-link { color: var(--color-marker); font-weight: 600; border-bottom: 1px solid var(--color-marker); }
        .prose-syllabus .tick, .prose-syllabus .cross { padding: 6px 0; font-size: 15px; color: var(--color-ink-2); }
        .prose-syllabus .opt { padding: 6px 0 6px 12px; font-size: 15px; color: var(--color-ink-2); }
        .prose-syllabus .formula-block { background: var(--color-bg-alt); border: 1px solid var(--color-rule); border-left: 3px solid var(--color-marker); padding: 14px 18px; font-family: var(--font-serif); font-size: 17px; text-align: center; margin: 18px 0; border-radius: 4px; }
        .prose-syllabus .answer-block { background: var(--color-surface); border: 1px solid var(--color-rule); border-left: 3px solid var(--color-ink); padding: 12px 16px; margin: 8px 0; border-radius: 4px; }
      `}</style>
    </div>
  )
}
