import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHeading from '@/components/ui/SectionHeading'
import StatPill from '@/components/ui/StatPill'
import FeatureCard from '@/components/ui/FeatureCard'
import SheetTile from '@/components/ui/SheetTile'
import Quote from '@/components/ui/Quote'
import RuleDivider from '@/components/ui/RuleDivider'
import { SAT_CONTENT, ACT_ADDITIONAL_CONTENT } from '@/lib/study-content'
import { HISTORICAL_SAT, HISTORICAL_ACT } from '@/lib/papers-data'
import { toRoman } from '@/components/ui/RomanNumeral'

const FEATURES = [
  { title: 'AI Examiner', emphasis: 'marks your working', body: 'Show your steps. Our model grades line by line against the official SAT and ACT rubrics — not just final answers.', tag: 'All tiers' },
  { title: 'Weak-Spot', emphasis: 'Radar', body: 'After every session, see the three topics quietly costing you the most points. Drill them before they cost you on test day.', tag: 'All tiers' },
  { title: 'Exam', emphasis: 'Simulator', body: 'Every released SAT and ACT math paper from 2016 to 2025, plus AI-generated papers, marked like the real thing.', tag: 'All boards' },
  { title: 'Ask', emphasis: 'the Margin', body: 'Highlight any phrase mid-question. Get a tutor-style explanation in seconds — no leaving the page, no losing focus.', tag: 'Signature' },
  { title: 'Score', emphasis: 'Tracker', body: 'XP, streaks, and a running predicted SAT/ACT score. Watch the number move with every question you answer.', tag: 'All tiers' },
  { title: 'Formula', emphasis: 'Sheet', body: 'The complete reference — algebra, geometry, trig, statistics, plus ACT-only law of sines, conics, and 3D geometry.', tag: 'Free PDF' },
  { title: 'Test-Day', emphasis: 'Planner', body: 'A 15-minute daily revision plan calibrated to your test date and weak spots. No guessing, no spreadsheets.', tag: 'Signature' },
  { title: 'Working', emphasis: 'Pad', body: 'Type or sketch your working. The AI reads it, marks it, and shows you what the examiner would actually do with it.', tag: 'Signature' },
]

const PRINCIPLES = [
  { i: 1, title: 'Marked working', body: 'Final answers are not the lesson. Every step in your method earns its own mark, and you see why.' },
  { i: 2, title: 'Predicted score', body: 'A running 400–1600 SAT and 1–36 ACT estimate based on every question you have ever answered here.' },
  { i: 3, title: 'Spaced topics', body: 'The planner returns you to weak spots at the right interval, not just whenever you remember to revisit them.' },
]

const TESTIMONIALS = [
  { quote: 'I went from a 1280 to a 1520 in just 6 weeks. The AI feedback showed me exactly where I was losing points.', name: 'Sarah K.', detail: 'Lincoln HS · +240 SAT' },
  { quote: 'The practice papers feel exactly like the real ACT. I walked into test day feeling completely prepared.', name: 'Marcus T.', detail: 'Class of 2026 · 34 ACT' },
  { quote: 'The instant marking is a game-changer. No more waiting for a tutor — I get feedback in seconds.', name: 'Priya R.', detail: 'SAT Math · 780' },
]

export default function Home() {
  const strandCount = SAT_CONTENT.length + ACT_ADDITIONAL_CONTENT.length
  const subtopicCount = SAT_CONTENT.reduce((a, s) => a + s.subtopics.length, 0)
    + ACT_ADDITIONAL_CONTENT.reduce((a, s) => a + s.subtopics.length, 0)
  const weakSpots = [
    ...SAT_CONTENT[2]?.subtopics.slice(0, 1).map(s => s.name) ?? [],
    ...SAT_CONTENT[1]?.subtopics.slice(0, 1).map(s => s.name) ?? [],
    ...SAT_CONTENT[3]?.subtopics.slice(0, 1).map(s => s.name) ?? [],
  ]
  const paperWall = [...HISTORICAL_SAT.slice(0, 6), ...HISTORICAL_ACT.slice(0, 6)]

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-28 lg:pt-32 lg:pb-36 border-b border-[color:var(--color-rule)]">
        <Container>
          <div className="max-w-[820px] mx-auto text-center">
            <Eyebrow className="mb-8">EST. 2024 · USA · MMXXVI</Eyebrow>
            <h1 className="headline text-[44px] sm:text-[60px] lg:text-[76px]">
              Preparation <em>worthy</em> of the<br />score you want.
            </h1>
            <p className="mt-7 text-[17px] sm:text-[19px] text-[color:var(--color-ink-2)] leading-[1.55] max-w-[640px] mx-auto">
              The SAT and ACT math prep that actually marks your working — every step, every question, every paper since 2016. Built for the test you actually take.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <StatPill value={`${subtopicCount}`} label="topics" />
              <StatPill value="+150 / +4" label="SAT / ACT average lift" />
              <StatPill value="4.9★" label="from 812 students" />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/syllabus" className="btn-primary">Begin your first topic <span aria-hidden>→</span></Link>
              <Link href="/syllabus" className="btn-ghost">View the syllabus</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── № I — Everything for your SAT/ACT ──────────────────────── */}
      <section className="py-24">
        <Container>
          <SectionHeading
            roman={1}
            kicker="Everything for your SAT &amp; ACT"
            title={<>The platform that <em>replaces</em> the eight tabs you usually have open.</>}
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} number={i + 1} title={f.title} emphasis={f.emphasis} body={f.body} tag={f.tag} />
            ))}
          </div>
        </Container>
      </section>

      <RuleDivider />

      {/* ─── № II — One destination ─────────────────────────────────── */}
      <section className="py-24 bg-[color:var(--color-bg-alt)]">
        <Container>
          <SectionHeading
            roman={2}
            kicker="The full stack"
            title={<>One destination. <em>Nothing left to find elsewhere.</em></>}
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Khan Academy', body: 'Free videos and a handful of practice questions. No marked working, no past paper archive, no predicted score.' },
              { title: 'Princeton / Kaplan', body: 'Big books and pre-recorded courses. The questions are good. The feedback loop is days, not seconds.' },
              { title: 'Private tutoring', body: 'Excellent — at $80 to $200 an hour. We give you the same line-by-line marking for the price of a textbook.' },
            ].map((c, i) => (
              <article key={c.title} className="card p-7">
                <div className="marker text-[14px] not-italic font-serif mb-4">№ {String(i + 1).padStart(2, '0')}</div>
                <h3 className="headline text-[22px] mb-3">{c.title}</h3>
                <p className="text-[15px] text-[color:var(--color-ink-2)] leading-[1.6]">{c.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-[14px] text-[color:var(--color-muted)] max-w-[640px] mx-auto">
            One subscription. The notes, the practice, the past papers, the marking, the planner, the formula sheet. Done.
          </p>
        </Container>
      </section>

      {/* ─── № III — Predicted score ────────────────────────────────── */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                roman={3}
                kicker="The number that moves"
                title={<>Your predicted score, <em>recalculated every single question.</em></>}
              />
              <p className="mt-6 text-[16px] text-[color:var(--color-ink-2)] leading-[1.7]">
                Every answer feeds a Bayesian estimate of your test-day score. You will see a 400 to 1600 for SAT and a 1 to 36 for ACT, with the confidence interval shrinking as you practice. The number moves. So do you.
              </p>
              <div className="mt-8"><Link href="/dashboard" className="btn-link">See your live score →</Link></div>
            </div>
            <div className="card p-8">
              <Eyebrow className="mb-5">Predicted score · today</Eyebrow>
              <div className="flex items-end gap-8">
                <div>
                  <div className="eyebrow mb-2">SAT Math</div>
                  <div className="font-serif text-[64px] leading-none">780</div>
                  <div className="eyebrow mt-2 text-[color:var(--color-marker)]">+40 this week</div>
                </div>
                <div className="rule h-20" style={{ borderLeft: '1px solid var(--color-rule)', borderTop: 0, width: 1 }} />
                <div>
                  <div className="eyebrow mb-2">ACT Math</div>
                  <div className="font-serif text-[64px] leading-none">33</div>
                  <div className="eyebrow mt-2 text-[color:var(--color-marker)]">+2 this week</div>
                </div>
              </div>
              <div className="rule mt-8 pt-5">
                <div className="eyebrow mb-2">Confidence interval</div>
                <div className="h-1.5 bg-[color:var(--color-bg-alt)] rounded-full relative">
                  <div className="absolute inset-y-0 left-[45%] right-[15%] bg-[color:var(--color-ink)] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <RuleDivider />

      {/* ─── № IV — Marks your working ──────────────────────────────── */}
      <section className="py-24 bg-[color:var(--color-bg-alt)]">
        <Container>
          <SectionHeading
            roman={4}
            kicker="Method marks"
            title={<>The only AI that <em>marks your working</em>, not just your answer.</>}
          />
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card p-7">
              <Eyebrow className="mb-4">Your working</Eyebrow>
              <pre className="font-serif text-[16px] leading-[1.9] whitespace-pre-wrap m-0">{`3(2x − 4) + 5 = 2x + 9
6x − 12 + 5 = 2x + 9
6x − 7 = 2x + 9
4x = 16
x = 4`}</pre>
            </div>
            <div className="card p-7">
              <Eyebrow className="mb-4">The AI examiner</Eyebrow>
              <ul className="space-y-3 text-[15px] leading-[1.6]">
                <li className="flex gap-3"><span className="marker not-italic">✓</span><span><strong>Distribution</strong> correct — you expanded 3(2x − 4) cleanly.</span></li>
                <li className="flex gap-3"><span className="marker not-italic">✓</span><span><strong>Like terms</strong> combined on the left.</span></li>
                <li className="flex gap-3"><span className="marker not-italic">✓</span><span><strong>Isolation</strong> of x on one side. Method mark earned.</span></li>
                <li className="flex gap-3"><span className="marker not-italic">✓</span><span><strong>Answer</strong> matches the official rubric: x = 4.</span></li>
                <li className="flex gap-3"><span className="text-[color:var(--color-muted)]">↳</span><span className="text-[color:var(--color-muted)]">Time: 38s. Average for this question: 52s.</span></li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── № V — Weak-Spot Radar ──────────────────────────────────── */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="card p-8">
              <Eyebrow className="mb-5">Weak spots · this week</Eyebrow>
              <ol className="space-y-5">
                {weakSpots.map((t, i) => (
                  <li key={t} className="flex items-baseline gap-4">
                    <span className="marker not-italic font-serif text-[20px]">№ {toRoman(i + 1)}</span>
                    <div className="flex-1">
                      <div className="font-serif text-[18px]">{t}</div>
                      <div className="eyebrow mt-1">{18 - i * 4} marks lost · {6 - i} questions</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <SectionHeading
                roman={5}
                kicker="The Radar"
                title={<>Find the <em>three topics</em> holding your score back.</>}
              />
              <p className="mt-6 text-[16px] text-[color:var(--color-ink-2)] leading-[1.7]">
                After every session, three topics — never more — get flagged. They are the ones costing you the most marks, weighted by frequency on real papers. The planner schedules them. You revise. You stop losing points.
              </p>
              <div className="mt-8"><Link href="/practice" className="btn-link">Start a diagnostic →</Link></div>
            </div>
          </div>
        </Container>
      </section>

      <RuleDivider />

      {/* ─── № VI — Every past paper ────────────────────────────────── */}
      <section className="py-24 bg-[color:var(--color-bg-alt)]">
        <Container>
          <SectionHeading
            roman={6}
            kicker="The archive"
            title={<>Every past paper, marked <em>like the real thing.</em></>}
          />
          <p className="mt-6 text-[15px] text-[color:var(--color-muted)] max-w-[640px]">
            2016 through 2025, SAT and ACT, every released math section. Plus AI-generated papers calibrated to the same rubric.
          </p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {paperWall.map((p, i) => (
              <SheetTile
                key={p.id}
                number={i + 1}
                title={`${p.exam} ${p.year} · Test ${p.paperNumber}`}
                meta={`${p.timeMinutes} min · ${p.questionCount} Q`}
                href={`/past-papers/${p.id}`}
                tier={p.exam}
              />
            ))}
          </div>
          <div className="mt-10"><Link href="/past-papers" className="btn-link">Open the archive →</Link></div>
        </Container>
      </section>

      {/* ─── № VII — Ask the Margin ─────────────────────────────────── */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                roman={7}
                kicker="The margin"
                title={<>Highlight anything. <em>Get a tutor&rsquo;s explanation.</em></>}
              />
              <p className="mt-6 text-[16px] text-[color:var(--color-ink-2)] leading-[1.7]">
                Stuck on the word &ldquo;discriminant&rdquo;? Don&rsquo;t know what an asymptote does in this problem? Highlight it. A clear, exam-shaped explanation appears in the margin — without you ever leaving the question.
              </p>
            </div>
            <div className="card p-7 relative">
              <p className="font-serif text-[17px] leading-[1.7]">
                The quadratic 2x² − 5x − 3 = 0 has a <span style={{ background: 'var(--color-marker)', color: 'var(--color-ink)', padding: '0 4px' }}>discriminant</span> of 49. How many real roots does the equation have?
              </p>
              <div className="mt-6 border-l-2 border-[color:var(--color-marker)] pl-4">
                <Eyebrow className="mb-2">Margin · discriminant</Eyebrow>
                <p className="text-[14px] leading-[1.6] text-[color:var(--color-ink-2)]">
                  The discriminant is b² − 4ac. If it&rsquo;s positive, two real roots. Zero, one repeated root. Negative, no real roots. Here it&rsquo;s 49 — positive — so two real roots.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <RuleDivider />

      {/* ─── № VIII — Score Tracker (Study Hall replacement) ────────── */}
      <section className="py-24 bg-[color:var(--color-bg-alt)]">
        <Container>
          <SectionHeading
            roman={8}
            kicker="The tracker"
            title={<>Your score, <em>tracked every session.</em></>}
            align="center"
          />
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1000px] mx-auto">
            {[
              { label: 'Current streak', value: '12', unit: 'days' },
              { label: 'XP earned', value: '4,820', unit: 'this month' },
              { label: 'Rank', value: 'Gold', unit: 'Silver → Gold → Platinum' },
              { label: 'Questions answered', value: '847', unit: 'last 30 days' },
            ].map(s => (
              <div key={s.label} className="card p-6 text-center">
                <Eyebrow className="mb-3">{s.label}</Eyebrow>
                <div className="font-serif text-[42px] leading-none">{s.value}</div>
                <div className="eyebrow mt-3">{s.unit}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── № IX — The Method ──────────────────────────────────────── */}
      <section className="py-24">
        <Container>
          <SectionHeading
            roman={9}
            kicker="The Method"
            title={<>Three principles that <em>actually move scores.</em></>}
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1000px] mx-auto">
            {PRINCIPLES.map(p => (
              <div key={p.i} className="text-center">
                <div className="marker font-serif text-[28px] italic mb-4">{toRoman(p.i).toLowerCase()}</div>
                <h3 className="headline text-[22px] mb-3">{p.title}</h3>
                <p className="text-[15px] text-[color:var(--color-ink-2)] leading-[1.7]">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <RuleDivider />

      {/* ─── № X — Student Journeys ─────────────────────────────────── */}
      <section className="py-24 bg-[color:var(--color-bg-alt)]">
        <Container>
          <SectionHeading
            roman={10}
            kicker="Student Journeys"
            title={<>The scores speak <em>for themselves.</em></>}
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map(t => (
              <Quote key={t.name} quote={t.quote} name={t.name} detail={t.detail} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── № XI — Urgency CTA ─────────────────────────────────────── */}
      <section className="bg-[color:var(--color-ink)] text-white py-28">
        <Container>
          <div className="max-w-[820px] mx-auto text-center">
            <div className="eyebrow mb-6" style={{ color: 'var(--color-marker)' }}>№ {toRoman(11)} · The invitation</div>
            <h2 className="headline text-[40px] sm:text-[56px] lg:text-[64px]" style={{ color: 'white' }}>
              Start tonight.<br /><em>Thank yourself on test day.</em>
            </h2>
            <p className="mt-7 text-[17px] leading-[1.6]" style={{ color: '#D6D3CB' }}>
              {strandCount} strands. {subtopicCount} topics. Every paper since 2016. One subscription. No credit card for the free tier.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/auth" className="btn-primary" style={{ background: 'white', color: 'var(--color-ink)', borderColor: 'white' }}>
                Start for free <span aria-hidden>→</span>
              </Link>
              <Link href="/pricing" className="btn-ghost" style={{ borderColor: '#3A3A3A', color: 'white' }}>
                See pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
