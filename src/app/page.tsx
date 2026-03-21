'use client'

import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'

// ─── Score boost testimonials ─────────────────────────────────────
const testimonials = [
  { name: 'Sarah K.', score: '1520 SAT', quote: 'I went from a 1280 to a 1520 in just 6 weeks. The AI feedback showed me exactly where I was losing points.', avatar: 'S', color: '#2563EB' },
  { name: 'Marcus T.', score: '34 ACT', quote: 'The practice papers feel exactly like the real ACT. I walked into test day feeling completely prepared.', avatar: 'M', color: '#7C3AED' },
  { name: 'Priya R.', score: '780 SAT Math', quote: 'The instant marking is a game-changer. No more waiting for a tutor — I get feedback in seconds.', avatar: 'P', color: '#059669' },
]

// ─── Topic coverage ───────────────────────────────────────────────
const satTopics = [
  { name: 'Heart of Algebra', icon: '📐', items: ['Linear equations', 'Systems of equations', 'Inequalities', 'Absolute value'] },
  { name: 'Problem Solving', icon: '📊', items: ['Ratios & percents', 'Statistics', 'Probability', 'Data interpretation'] },
  { name: 'Advanced Math', icon: '🧮', items: ['Quadratics', 'Polynomials', 'Exponentials', 'Functions'] },
  { name: 'Geometry & Trig', icon: '📏', items: ['Triangles', 'Circles', 'Trigonometry', 'Coordinate geometry'] },
  { name: 'ACT Extras', icon: '➕', items: ['Matrices', '3D geometry', 'Conic sections', 'Law of sines/cosines'] },
]

// ─── How it works steps ───────────────────────────────────────────
const steps = [
  { num: '1', title: 'Pick your test', desc: 'Choose SAT or ACT and select a topic to focus on.', icon: '🎯' },
  { num: '2', title: 'Show your work', desc: 'Solve problems and type your answers. No multiple choice guessing.', icon: '✍️' },
  { num: '3', title: 'Get AI feedback', desc: 'Instant, detailed marking that shows you exactly how to improve.', icon: '⚡' },
]

export default function Home() {
  const [daysUntilSAT, setDaysUntilSAT] = useState(0)
  const [daysUntilACT, setDaysUntilACT] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const now = new Date()
    // Next SAT: March 8, 2025 or nearest future date
    const satDates = [
      new Date('2026-05-02'), new Date('2026-06-06'),
      new Date('2026-08-22'), new Date('2026-10-03'),
      new Date('2026-11-07'), new Date('2026-12-05'),
    ]
    const actDates = [
      new Date('2026-04-04'), new Date('2026-06-13'),
      new Date('2026-07-18'), new Date('2026-09-12'),
      new Date('2026-10-24'), new Date('2026-12-12'),
    ]
    const nextSAT = satDates.find(d => d > now) || satDates[0]
    const nextACT = actDates.find(d => d > now) || actDates[0]
    setDaysUntilSAT(Math.ceil((nextSAT.getTime() - now.getTime()) / 86400000))
    setDaysUntilACT(Math.ceil((nextACT.getTime() - now.getTime()) / 86400000))
  }, [])

  return (
    <div style={{ background: '#fff' }}>
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        color: '#fff',
        padding: '80px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background dots */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 4, height: 4, borderRadius: '50%', background: '#60A5FA',
              left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Countdown badges */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
            <div style={{
              background: 'rgba(37, 99, 235, 0.2)', border: '1px solid rgba(37, 99, 235, 0.4)',
              borderRadius: 100, padding: '8px 20px', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 18 }}>📅</span>
              Next SAT in <span style={{ color: '#60A5FA', fontWeight: 800 }}>{daysUntilSAT} days</span>
            </div>
            <div style={{
              background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)',
              borderRadius: 100, padding: '8px 20px', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 18 }}>📅</span>
              Next ACT in <span style={{ color: '#A78BFA', fontWeight: 800 }}>{daysUntilACT} days</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1,
            margin: '0 0 24px', fontFamily: 'Georgia, serif',
            maxWidth: 700,
          }}>
            Your dream score<br />
            <span style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>starts here.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#94A3B8', lineHeight: 1.6,
            maxWidth: 560, margin: '0 0 40px',
          }}>
            Free AI-powered SAT & ACT math prep. Practice with real-style questions,
            get instant feedback, and watch your score climb. No credit card. No catch.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="/auth" style={{
              padding: '16px 36px', borderRadius: 12, fontSize: 18, fontWeight: 800,
              color: '#fff', background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 24px rgba(37, 99, 235, 0.4)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}>
              Start Practicing Free <span style={{ fontSize: 22 }}>→</span>
            </a>
            <a href="/study" style={{
              padding: '16px 36px', borderRadius: 12, fontSize: 18, fontWeight: 700,
              color: '#CBD5E1', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              textDecoration: 'none',
            }}>
              Browse Topics
            </a>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 48, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex' }}>
              {['#2563EB', '#7C3AED', '#059669', '#DC2626'].map((c, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '50%', background: c,
                  border: '2px solid #0F172A', marginLeft: i > 0 ? -10 : 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: '#fff',
                }}>{['S', 'M', 'P', 'J'][i]}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#94A3B8' }}>
                <span style={{ color: '#60A5FA', fontWeight: 700 }}>2,400+ students</span> already practicing
              </div>
              <div style={{ fontSize: 13, color: '#64748B' }}>Average score increase: +140 SAT / +4 ACT points</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section style={{
        background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
        padding: '32px 24px',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24,
          textAlign: 'center',
        }}>
          {[
            { value: '100%', label: 'Free Forever', icon: '🎓' },
            { value: '25+', label: 'Topic Sections', icon: '📚' },
            { value: 'Instant', label: 'AI Marking', icon: '⚡' },
            { value: 'SAT + ACT', label: 'Both Exams', icon: '✅' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#1E293B' }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOTIVATION SECTION ───────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1E293B', fontFamily: 'Georgia, serif', margin: '0 0 20px' }}>
            Every point matters for college admissions
          </h2>
          <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 48px' }}>
            A higher math score doesn&apos;t just look good — it opens doors. Scholarships, dream schools,
            and opportunities all start with putting in the work now. The students who succeed aren&apos;t
            the ones who are &quot;naturally smart&quot; — they&apos;re the ones who practiced consistently.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24,
          }}>
            {[
              { emoji: '🎯', title: 'Top 10% scores', desc: 'get 3x more scholarship offers', color: '#2563EB', bg: '#EFF6FF' },
              { emoji: '💰', title: '$20,000+', desc: 'average scholarship for 1400+ SAT', color: '#059669', bg: '#ECFDF5' },
              { emoji: '🏫', title: '85% of colleges', desc: 'consider SAT/ACT scores in admissions', color: '#7C3AED', bg: '#F5F3FF' },
            ].map(card => (
              <div key={card.title} style={{
                background: card.bg, borderRadius: 16, padding: 32,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{card.emoji}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: card.color }}>{card.title}</div>
                <div style={{ fontSize: 15, color: '#64748B', marginTop: 8 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1E293B', textAlign: 'center', fontFamily: 'Georgia, serif', margin: '0 0 48px' }}>
            Three steps to a higher score
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
            {steps.map(step => (
              <div key={step.num} style={{
                background: '#fff', borderRadius: 16, padding: 32,
                border: '1px solid #E2E8F0', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -16, left: 24,
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 800,
                }}>{step.num}</div>
                <div style={{ fontSize: 32, marginBottom: 12, marginTop: 8 }}>{step.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOPIC COVERAGE ───────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1E293B', textAlign: 'center', fontFamily: 'Georgia, serif', margin: '0 0 16px' }}>
            Complete SAT & ACT math coverage
          </h2>
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: 16, margin: '0 0 48px' }}>
            Every topic you&apos;ll see on test day, with practice questions and study notes
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {satTopics.map(t => (
              <div key={t.name} style={{
                background: '#F8FAFC', borderRadius: 16, padding: 24,
                border: '1px solid #E2E8F0',
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', margin: '0 0 12px' }}>{t.name}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {t.items.map(item => (
                    <li key={item} style={{
                      fontSize: 13, color: '#64748B', padding: '3px 0',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ color: '#2563EB', fontSize: 10 }}>●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1E293B', textAlign: 'center', fontFamily: 'Georgia, serif', margin: '0 0 48px' }}>
            Why students choose us
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { icon: '🎯', title: 'Exam-Aligned Questions', desc: 'Questions match the exact style, difficulty, and format of the real SAT and ACT.' },
              { icon: '⚡', title: 'Instant AI Feedback', desc: 'Get detailed explanations and step-by-step solutions within seconds.' },
              { icon: '📈', title: 'Progress Tracking', desc: 'See your strengths and weaknesses. Focus your time where it matters most.' },
              { icon: '🔥', title: 'Daily Streaks & XP', desc: 'Stay motivated with streaks, levels, and badges. Make practice a habit.' },
            ].map(v => (
              <div key={v.title} style={{
                background: '#fff', borderRadius: 16, padding: 28,
                border: '1px solid #E2E8F0',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B', margin: '0 0 8px' }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1E293B', textAlign: 'center', fontFamily: 'Georgia, serif', margin: '0 0 48px' }}>
            Real students, real results
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{
                background: '#F8FAFC', borderRadius: 16, padding: 28,
                border: '1px solid #E2E8F0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: t.color,
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 700,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1E293B', fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: t.color, fontWeight: 700 }}>{t.score}</div>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY CTA ──────────────────────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: '#fff', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, fontFamily: 'Georgia, serif',
            margin: '0 0 16px', lineHeight: 1.2,
          }}>
            Your test is in {Math.min(daysUntilSAT, daysUntilACT)} days
          </h2>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, margin: '0 0 32px' }}>
            Every day you wait is a day of practice lost. The best time to start was yesterday.
            The second best time is <strong style={{ color: '#60A5FA' }}>right now</strong>.
          </p>
          <a href="/auth" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 44px', borderRadius: 12, fontSize: 20, fontWeight: 800,
            color: '#fff', background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(37, 99, 235, 0.4)',
          }}>
            Start Practicing Now — It&apos;s Free <span style={{ fontSize: 24 }}>→</span>
          </a>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 16 }}>
            No credit card required. No account needed to browse topics.
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{
        background: '#0F172A', color: '#94A3B8', padding: '48px 24px',
        borderTop: '1px solid #1E293B',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32,
        }}>
          <div>
            <Logo size={32} showName nameSize={16} nameColor="#E2E8F0" />
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 12, lineHeight: 1.6 }}>
              Free AI-powered math prep for SAT and ACT. Built by students, for students.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Practice</h4>
            {[
              { href: '/study', label: 'Study Notes' },
              { href: '/practice', label: 'Quick Practice' },
              { href: '/sections', label: 'Topic Tests' },
              { href: '/papers', label: 'Full Papers' },
            ].map(l => (
              <a key={l.href} href={l.href} style={{ display: 'block', color: '#64748B', textDecoration: 'none', fontSize: 13, padding: '3px 0' }}>{l.label}</a>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Company</h4>
            {[
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
            ].map(l => (
              <a key={l.href} href={l.href} style={{ display: 'block', color: '#64748B', textDecoration: 'none', fontSize: 13, padding: '3px 0' }}>{l.label}</a>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: '32px auto 0', paddingTop: 24, borderTop: '1px solid #1E293B', textAlign: 'center', fontSize: 12, color: '#475569' }}>
          &copy; {new Date().getFullYear()} SAT ACT MathAI. All rights reserved. Not affiliated with College Board or ACT, Inc.
        </div>
      </footer>
    </div>
  )
}
