import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { toRoman } from '@/components/ui/RomanNumeral'

const TIERS = [
  {
    name: 'Scholar',
    price: '$0',
    cadence: 'free, forever',
    blurb: 'Everything you need to get started. No credit card required.',
    cta: 'Get started free',
    primary: false,
    features: [
      'Full syllabus access (8 strands, 22 topics)',
      '20 AI-marked practice questions per day',
      'Study notes for every topic',
      'Free formula sheet (PDF)',
      'Progress tracking',
    ],
  },
  {
    name: 'Student Unlimited',
    price: '$9',
    cadence: 'per month',
    blurb: 'Everything in Scholar, with no limits and the full past-paper archive.',
    cta: 'Start 7-day free trial',
    primary: true,
    badge: 'Most popular',
    features: [
      'Unlimited AI-marked questions',
      'Every SAT &amp; ACT past paper (2016 – 2025)',
      'AI-generated practice papers',
      'Timed exam mode',
      'Predicted score tracker',
      'Weak-spot radar &amp; daily planner',
      'Ask the Margin (highlighter tutor)',
    ],
  },
  {
    name: 'School Licence',
    price: '$4',
    cadence: 'per student / month',
    blurb: 'For tutors and schools running structured programmes.',
    cta: 'Contact sales',
    primary: false,
    features: [
      'Everything in Student Unlimited',
      'Teacher dashboard &amp; class reports',
      'Homework assignments &amp; due dates',
      'CSV export for grades',
      'Dedicated support',
    ],
  },
]

export const metadata = {
  title: 'Pricing — SATACTMathAI',
  description: 'Scholar (free), Student Unlimited ($9/mo), and School Licence ($4/student/mo).',
}

export default function PricingPage() {
  return (
    <div>
      <section className="pt-20 pb-12 border-b border-[color:var(--color-rule)]">
        <Container>
          <Eyebrow className="mb-6">EST. 2024 · USA · MMXXVI</Eyebrow>
          <h1 className="headline text-[42px] sm:text-[56px] max-w-[820px]">
            Pricing worthy of <em>the score you want.</em>
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--color-ink-2)] max-w-[640px] leading-[1.6]">
            Start free. Upgrade when you&rsquo;re ready for the full past-paper archive and the planner. Cancel any time.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((t, i) => (
              <article
                key={t.name}
                className={`card p-7 flex flex-col ${t.primary ? 'border-[color:var(--color-ink)] border-2' : ''}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="marker not-italic font-serif text-[15px]">№ {toRoman(i + 1)}</span>
                  {t.badge && <span className="eyebrow text-[color:var(--color-marker)]">{t.badge}</span>}
                </div>
                <h3 className="headline text-[28px]">{t.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-[52px] leading-none">{t.price}</span>
                  <span className="text-[13px] text-[color:var(--color-muted)]">{t.cadence}</span>
                </div>
                <p className="mt-4 text-[14px] text-[color:var(--color-muted)] leading-[1.6]">{t.blurb}</p>
                <ul className="mt-6 space-y-3">
                  {t.features.map(f => (
                    <li key={f} className="flex items-baseline gap-3 text-[14px] text-[color:var(--color-ink-2)] leading-[1.5]" dangerouslySetInnerHTML={{ __html: `<span class="marker not-italic font-serif">✓</span><span>${f}</span>` }} />
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Link href="/auth" className={t.primary ? 'btn-primary w-full justify-center' : 'btn-ghost w-full justify-center'}>
                    {t.cta} <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <div className="eyebrow mb-4">№ {toRoman(4)} · Frequently asked</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                ['Is there a free tier?', 'Yes. Scholar is free, forever. Twenty AI-marked questions a day, the full syllabus, and the free formula sheet.'],
                ['Can I cancel any time?', 'Yes. Cancel in one click from your dashboard. We don\u2019t charge for the cancellation month.'],
                ['Do you offer student discounts?', 'Student Unlimited is already priced at student rates. School Licence is even lower per seat.'],
                ['Are the AI papers as good as the real ones?', 'They\u2019re calibrated against released papers from 2016 to 2025 and graded on the same rubric. Use them as your second pass — release papers first.'],
              ].map(([q, a]) => (
                <div key={q}>
                  <h4 className="font-serif text-[20px] mb-2">{q}</h4>
                  <p className="text-[14px] text-[color:var(--color-muted)] leading-[1.7]">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
