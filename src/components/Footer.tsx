import Link from 'next/link'
import Logo from './Logo'

const COLS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Syllabus',
    links: [
      { label: 'All topics', href: '/syllabus' },
      { label: 'SAT Math', href: '/syllabus?exam=SAT' },
      { label: 'ACT Math', href: '/syllabus?exam=ACT' },
      { label: 'Past papers', href: '/past-papers' },
      { label: 'Formula sheet', href: '/formulas' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Practice', href: '/practice' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Exams',
    links: [
      { label: 'SAT Math', href: '/syllabus?exam=SAT' },
      { label: 'ACT Math', href: '/syllabus?exam=ACT' },
      { label: 'PSAT', href: '/syllabus?exam=SAT' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-rule)] mt-24">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo size={16} />
            <p className="mt-4 text-[13px] text-[color:var(--color-muted)] max-w-[220px] leading-relaxed">
              AI-marked SAT &amp; ACT math preparation. One destination — nothing left to find elsewhere.
            </p>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <div className="eyebrow mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-[color:var(--color-ink-2)] hover:text-[color:var(--color-marker)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule mt-14 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="eyebrow">EST. 2024 · USA · MMXXVI · SATACTMATH_AI_</div>
          <div className="eyebrow">© {new Date().getFullYear()} — Built for the test you actually take.</div>
        </div>
      </div>
    </footer>
  )
}
