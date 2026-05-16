import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { toRoman } from '@/components/ui/RomanNumeral'

const blogPosts = [
  { slug: 'how-to-get-800-sat-math', title: 'How to Get an 800 on SAT Math', excerpt: 'A step-by-step strategy guide from students who scored perfect.', date: '2026-03-15', readTime: '8 min', category: 'SAT Strategy' },
  { slug: 'sat-vs-act-math-differences', title: 'SAT vs ACT Math: The Key Differences', excerpt: 'How the two tests differ — and how to pick the one that suits you.', date: '2026-03-10', readTime: '6 min', category: 'Test Comparison' },
  { slug: 'act-math-formula-sheet', title: 'The Complete ACT Math Formula Sheet', excerpt: 'Every formula you need to memorise for the ACT, by topic.', date: '2026-03-05', readTime: '5 min', category: 'ACT Prep' },
  { slug: 'sat-math-time-management', title: 'SAT Math Time Management', excerpt: 'Proven strategies to finish every question without rushing.', date: '2026-02-28', readTime: '7 min', category: 'SAT Strategy' },
  { slug: 'common-sat-math-mistakes', title: 'Ten Common SAT Math Mistakes', excerpt: 'The most frequent errors students make — and simple fixes.', date: '2026-02-20', readTime: '6 min', category: 'SAT Tips' },
  { slug: 'quadratic-equations-sat-act', title: 'Mastering Quadratics on the SAT &amp; ACT', excerpt: 'Every question type, with worked examples.', date: '2026-02-15', readTime: '9 min', category: 'Math Topics' },
]

export const metadata = {
  title: 'Blog — SATACTMathAI',
  description: 'Tips, strategies, and guides for SAT and ACT math.',
}

export default function BlogPage() {
  return (
    <div>
      <section className="pt-20 pb-10 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-5">EST. 2024 · USA · MMXXVI</Eyebrow>
          <h1 className="headline text-[42px] sm:text-[52px]">The <em>blog</em>.</h1>
          <p className="mt-4 text-[15px] text-[color:var(--color-muted)] max-w-[560px]">Tactics, strategies, and worked examples. New posts most weeks.</p>
        </Container>
      </section>

      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogPosts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card p-7 hover:bg-[color:var(--color-bg-alt)] transition-colors flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="marker not-italic font-serif text-[13px]">№ {toRoman(i + 1)}</span>
                <span className="eyebrow text-[10px]">{p.category} · {p.readTime}</span>
              </div>
              <h2 className="font-serif text-[24px] leading-tight" dangerouslySetInnerHTML={{ __html: p.title }} />
              <p className="text-[14px] text-[color:var(--color-muted)] leading-[1.6]" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
              <div className="eyebrow text-[10px] mt-auto">{new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
