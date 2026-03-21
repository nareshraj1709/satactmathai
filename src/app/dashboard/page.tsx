'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'

interface Attempt {
  topic: string
  subtopic: string
  score: number
  out_of: number
  created_at: string
}

interface Profile {
  name: string
  exam: string
  grade: string
}

function getLevel(xp: number) {
  if (xp >= 3000) return { name: 'Diamond', color: '#60A5FA', next: Infinity }
  if (xp >= 1500) return { name: 'Platinum', color: '#A78BFA', next: 3000 }
  if (xp >= 500) return { name: 'Gold', color: '#F59E0B', next: 1500 }
  return { name: 'Silver', color: '#94A3B8', next: 500 }
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

function getBadges(attempts: Attempt[], streak: number) {
  const badges: { icon: string; name: string; earned: boolean }[] = [
    { icon: '🚀', name: 'First Steps', earned: attempts.length >= 1 },
    { icon: '🔥', name: 'On a Roll', earned: streak >= 3 },
    { icon: '⚔️', name: 'Week Warrior', earned: streak >= 7 },
    { icon: '💯', name: 'Perfect Score', earned: attempts.some(a => a.score === a.out_of && a.out_of > 0) },
    { icon: '🏆', name: 'Topic Master', earned: false },
    { icon: '💪', name: 'Century Club', earned: attempts.length >= 100 },
  ]
  return badges
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
        .from('attempts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
      setAttempts(data || [])
      setLoading(false)
    })
  }, [])

  const xp = attempts.reduce((sum, a) => sum + a.score * 10, 0)
  const level = getLevel(xp)
  const streak = getStreak(attempts)
  const badges = getBadges(attempts, streak)
  const avgScore = attempts.length ? Math.round(attempts.reduce((s, a) => s + (a.score / a.out_of) * 100, 0) / attempts.length) : 0

  // Topic progress
  const topicMap = new Map<string, { total: number; score: number; count: number }>()
  attempts.forEach(a => {
    const key = a.topic || 'General'
    const cur = topicMap.get(key) || { total: 0, score: 0, count: 0 }
    cur.total += a.out_of
    cur.score += a.score
    cur.count++
    topicMap.set(key, cur)
  })
  const topicProgress = Array.from(topicMap.entries()).map(([name, d]) => ({
    name,
    percent: Math.round((d.score / d.total) * 100),
    count: d.count,
  })).sort((a, b) => a.percent - b.percent)

  const weakest = topicProgress[0]

  return (
    <AuthGuard>
      <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A, #1E293B)', color: '#fff',
          padding: '32px 24px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 4px' }}>
                  {profile.name ? `Hey ${profile.name}!` : 'Welcome back!'} 👋
                </h1>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>
                  {profile.exam ? `Preparing for ${profile.exam}` : 'SAT & ACT Math Prep'}{profile.grade ? ` · ${profile.grade} Grade` : ''}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{xp}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>XP</div>
                </div>
                <div style={{
                  background: `rgba(255,255,255,0.1)`, borderRadius: 12, padding: '12px 20px',
                  textAlign: 'center', border: `1px solid ${level.color}40`,
                }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: level.color }}>{level.name}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Questions Done', value: attempts.length, icon: '📝' },
              { label: 'Avg Score', value: `${avgScore}%`, icon: '📊' },
              { label: 'Day Streak', value: `${streak} 🔥`, icon: '📅' },
              { label: 'Topics Practiced', value: topicMap.size, icon: '📚' },
            ].map(s => (
              <div key={s.label} style={{
                background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 24 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#1E293B' }}>{s.value}</div>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0', marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B', margin: '0 0 16px' }}>Badges</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {badges.map(b => (
                <div key={b.name} style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: b.earned ? '#EFF6FF' : '#F1F5F9',
                  border: b.earned ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                  opacity: b.earned ? 1 : 0.5,
                  fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ fontSize: 18 }}>{b.icon}</span> {b.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
            {/* Topic Progress */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B', margin: '0 0 16px' }}>Topic Progress</h3>
              {loading ? (
                <p style={{ color: '#94A3B8' }}>Loading...</p>
              ) : topicProgress.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 32, color: '#94A3B8' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                  <p>No attempts yet. Start practicing to see your progress!</p>
                  <a href="/practice" style={{
                    display: 'inline-block', marginTop: 12, padding: '10px 24px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: '#fff',
                    textDecoration: 'none', fontWeight: 700, fontSize: 14,
                  }}>Start Practice</a>
                </div>
              ) : (
                topicProgress.map(t => (
                  <div key={t.name} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{t.name}</span>
                      <span style={{ fontSize: 13, color: '#64748B' }}>{t.percent}% ({t.count} Qs)</span>
                    </div>
                    <div style={{ height: 8, background: '#E2E8F0', borderRadius: 4 }}>
                      <div style={{
                        height: '100%', borderRadius: 4,
                        width: `${t.percent}%`,
                        background: t.percent >= 80 ? '#059669' : t.percent >= 50 ? '#F59E0B' : '#DC2626',
                      }} />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Focus Today */}
              {weakest && (
                <div style={{
                  background: '#FEF2F2', borderRadius: 16, padding: 24, border: '1px solid #FECACA',
                }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#DC2626', margin: '0 0 8px' }}>Focus Today</h4>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: '0 0 4px' }}>{weakest.name}</p>
                  <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 12px' }}>Your weakest area at {weakest.percent}%</p>
                  <a href="/practice" style={{
                    display: 'inline-block', padding: '8px 16px', borderRadius: 8,
                    background: '#DC2626', color: '#fff', textDecoration: 'none',
                    fontWeight: 700, fontSize: 13,
                  }}>Practice Now</a>
                </div>
              )}

              {/* Quick actions */}
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', margin: '0 0 12px' }}>Quick Actions</h4>
                {[
                  { href: '/practice', label: 'Quick 5-min Practice', icon: '⚡' },
                  { href: '/study', label: 'Study Notes', icon: '📖' },
                  { href: '/papers', label: 'Full Practice Paper', icon: '📋' },
                ].map(a => (
                  <a key={a.href} href={a.href} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 10, marginBottom: 6,
                    background: '#F8FAFC', textDecoration: 'none', color: '#374151',
                    fontWeight: 600, fontSize: 14, border: '1px solid #E2E8F0',
                  }}>
                    <span style={{ fontSize: 18 }}>{a.icon}</span> {a.label}
                  </a>
                ))}
              </div>

              {/* Recent activity */}
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', margin: '0 0 12px' }}>Recent Activity</h4>
                {attempts.slice(0, 3).map((a, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{a.subtopic || a.topic}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>
                      {a.score}/{a.out_of} · {new Date(a.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {attempts.length === 0 && <p style={{ fontSize: 13, color: '#94A3B8' }}>No activity yet</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
