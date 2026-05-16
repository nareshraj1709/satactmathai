'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { toRoman } from '@/components/ui/RomanNumeral'

interface Attempt {
  topic: string
  subtopic: string
  question: string
  score: number
  out_of: number
  created_at: string
}

interface Profile {
  name: string
  exam: string
  grade: string
}

function getStreak(attempts: Attempt[]) {
  const days = new Set(attempts.map(a => a.created_at.slice(0, 10)))
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    if (days.has(key)) streak++
    else if (i > 0) break
  }
  return streak
}

function getRank(xp: number) {
  if (xp >= 3000) return 'Diamond'
  if (xp >= 1500) return 'Platinum'
  if (xp >= 500) return 'Gold'
  return 'Silver'
}

function daysUntil(date: Date) {
  return Math.ceil((date.getTime() - Date.now()) / 86400000)
}

function nextTestDate(): { exam: string; date: Date; days: number } {
  const now = new Date()
  const sat = [new Date('2026-05-02'), new Date('2026-06-06'), new Date('2026-08-22'), new Date('2026-10-03'), new Date('2026-11-07'), new Date('2026-12-05')].find(d => d > now) ?? new Date('2026-12-05')
  const act = [new Date('2026-04-04'), new Date('2026-06-13'), new Date('2026-07-18'), new Date('2026-09-12'), new Date('2026-10-24'), new Date('2026-12-12')].find(d => d > now) ?? new Date('2026-12-12')
  if (sat < act) return { exam: 'SAT', date: sat, days: daysUntil(sat) }
  return { exam: 'ACT', date: act, days: daysUntil(act) }
}

export default function DashboardPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [profile, setProfile] = useState<Profile>({ name: '', exam: '', grade: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const p = localStorage.getItem('satact_profile')
    if (p) setProfile(JSON.parse(p))
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return setLoading(false)
      const { data } = await supabase
        .from('attempts').select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
      setAttempts(data || [])
      setLoading(false)
    })
  }, [])

  const xp = attempts.reduce((sum, a) => sum + a.score * 10, 0)
  const rank = getRank(xp)
  const streak = getStreak(attempts)
  const avgScore = attempts.length ? Math.round(attempts.reduce((s, a) => s + (a.score / Math.max(a.out_of, 1)) * 100, 0) / attempts.length) : 0
  const predictedSAT = Math.round(400 + (avgScore / 100) * 400)
  const predictedACT = Math.max(1, Math.round(1 + (avgScore / 100) * 35))

  const topicMap = new Map<string, { total: number; score: number; count: number }>()
  attempts.forEach(a => {
    const key = a.subtopic || a.topic || 'General'
    const cur = topicMap.get(key) || { total: 0, score: 0, count: 0 }
    cur.total += a.out_of; cur.score += a.score; cur.count++
    topicMap.set(key, cur)
  })
  const weakSpots = Array.from(topicMap.entries())
    .map(([name, d]) => ({ name, percent: Math.round((d.score / Math.max(d.total, 1)) * 100), count: d.count }))
    .filter(t => t.count >= 2)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 3)

  const next = nextTestDate()

  return (
    <AuthGuard>
      <div>
        <section className="pt-14 pb-8 border-b border-[color:var(--color-rule)]">
          <Container>
            <Eyebrow className="mb-5">EST. 2024 · USA · MMXXVI</Eyebrow>
            <div className="flex items-baseline justify-between flex-wrap gap-4">
              <h1 className="headline text-[40px] sm:text-[52px]">
                {profile.name ? <>Hello, <em>{profile.name}</em>.</> : <>Your <em>study</em>.</>}
              </h1>
              <div className="eyebrow">
                {profile.exam ? `Preparing for ${profile.exam}` : 'SAT & ACT'}{profile.grade ? ` · ${profile.grade} grade` : ''}
              </div>
            </div>
          </Container>
        </section>

        <Container className="py-12">
          {/* Predicted score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            <div className="card p-7 lg:col-span-2">
              <Eyebrow className="mb-5">№ {toRoman(1)} · Predicted score</Eyebrow>
              <div className="flex items-end gap-10 flex-wrap">
                <div>
                  <div className="eyebrow mb-2">SAT Math</div>
                  <div className="font-serif text-[64px] leading-none">{predictedSAT}</div>
                </div>
                <div className="rule self-stretch hidden sm:block" style={{ borderLeft: '1px solid var(--color-rule)', borderTop: 0, width: 1 }} />
                <div>
                  <div className="eyebrow mb-2">ACT Math</div>
                  <div className="font-serif text-[64px] leading-none">{predictedACT}</div>
                </div>
              </div>
              <p className="text-[13px] text-[color:var(--color-muted)] mt-6">
                Based on {attempts.length} answered question{attempts.length === 1 ? '' : 's'}. The interval shrinks as you answer more.
              </p>
            </div>
            <div className="card p-7">
              <Eyebrow className="mb-5">№ {toRoman(2)} · Next test</Eyebrow>
              <div className="font-serif text-[28px]">{next.exam}</div>
              <div className="font-serif text-[44px] leading-none mt-2">{next.days}<span className="text-[color:var(--color-muted)] text-[18px]"> days</span></div>
              <p className="text-[13px] text-[color:var(--color-muted)] mt-4">
                {next.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Streak', value: streak, unit: 'days' },
              { label: 'XP', value: xp, unit: 'lifetime' },
              { label: 'Rank', value: rank, unit: 'Silver → Diamond' },
              { label: 'Avg accuracy', value: `${avgScore}%`, unit: `${attempts.length} questions` },
            ].map(s => (
              <div key={s.label} className="card p-5">
                <Eyebrow className="mb-2">{s.label}</Eyebrow>
                <div className="font-serif text-[36px] leading-none">{s.value}</div>
                <div className="eyebrow text-[10px] mt-3">{s.unit}</div>
              </div>
            ))}
          </div>

          {/* Weak spots + actions */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
            <div className="card p-7">
              <Eyebrow className="mb-5">№ {toRoman(3)} · Three topics holding your score back</Eyebrow>
              {loading ? (
                <p className="text-[14px] text-[color:var(--color-muted)]">Loading…</p>
              ) : weakSpots.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-[14px] text-[color:var(--color-muted)] mb-4">Practice at least two questions in a topic for it to appear on your radar.</p>
                  <Link href="/practice" className="btn-primary">Start a session <span aria-hidden>→</span></Link>
                </div>
              ) : (
                <ol className="space-y-4">
                  {weakSpots.map((t, i) => (
                    <li key={t.name} className="flex items-baseline gap-4 py-3 border-b border-[color:var(--color-rule)] last:border-0">
                      <span className="marker not-italic font-serif text-[18px]">№ {toRoman(i + 1)}</span>
                      <div className="flex-1">
                        <div className="font-serif text-[18px]">{t.name}</div>
                        <div className="eyebrow mt-1">{t.percent}% · {t.count} attempts</div>
                      </div>
                      <Link href="/practice" className="btn-link text-[13px]">Drill →</Link>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <aside className="flex flex-col gap-3">
              <div className="card p-5">
                <Eyebrow className="mb-4">Quick actions</Eyebrow>
                <div className="flex flex-col gap-2">
                  <Link href="/practice" className="btn-ghost justify-between text-left">Quick practice <span>→</span></Link>
                  <Link href="/past-papers" className="btn-ghost justify-between text-left">Open a paper <span>→</span></Link>
                  <Link href="/syllabus" className="btn-ghost justify-between text-left">Study notes <span>→</span></Link>
                  <Link href="/formulas" className="btn-ghost justify-between text-left">Formula sheet <span>→</span></Link>
                </div>
              </div>

              <div className="card p-5">
                <Eyebrow className="mb-4">Recent sessions</Eyebrow>
                {attempts.slice(0, 4).map((a, i) => (
                  <div key={i} className="py-2 border-b border-[color:var(--color-rule)] last:border-0">
                    <div className="font-serif text-[14px] truncate">{a.subtopic || a.topic}</div>
                    <div className="eyebrow text-[10px] mt-1">{a.score}/{a.out_of} · {new Date(a.created_at).toLocaleDateString()}</div>
                  </div>
                ))}
                {attempts.length === 0 && <p className="text-[13px] text-[color:var(--color-muted)]">No sessions yet.</p>}
                {attempts.length > 0 && (
                  <Link href="/review" className="btn-link mt-4 text-[13px]">Review all →</Link>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </AuthGuard>
  )
}
