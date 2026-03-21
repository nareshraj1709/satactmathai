'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'

interface Attempt {
  id: string
  topic: string
  subtopic: string
  question: string
  student_answer: string
  score: number
  out_of: number
  feedback: string
  created_at: string
}

export default function ReviewPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [filter, setFilter] = useState<'all' | 'incorrect'>('all')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return
      const { data } = await supabase
        .from('attempts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(50)
      setAttempts(data || [])
    })
  }, [])

  const filtered = filter === 'incorrect' ? attempts.filter(a => a.score === 0) : attempts

  return (
    <AuthGuard>
      <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>Review</h1>
          <p style={{ color: '#64748B', fontSize: 15, margin: '0 0 24px' }}>Review your recent answers and learn from mistakes</p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {[
              { key: 'all', label: 'All Attempts' },
              { key: 'incorrect', label: 'Incorrect Only' },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key as 'all' | 'incorrect')} style={{
                padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                border: filter === f.key ? '2px solid #2563EB' : '2px solid #E5E7EB',
                background: filter === f.key ? '#EFF6FF' : '#fff',
                color: filter === f.key ? '#2563EB' : '#374151',
                cursor: 'pointer',
              }}>{f.label}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48, color: '#94A3B8' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
              <p>No attempts to review yet. Start practicing!</p>
            </div>
          ) : (
            filtered.map((a, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 12, padding: 20, marginBottom: 12,
                border: `1px solid ${a.score > 0 ? '#A7F3D0' : '#FECACA'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{a.topic} · {a.subtopic}</span>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{new Date(a.created_at).toLocaleDateString()}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: '0 0 8px' }}>{a.question}</p>
                <p style={{ fontSize: 13, color: a.score > 0 ? '#059669' : '#DC2626', margin: '0 0 4px' }}>
                  {a.score > 0 ? '✅' : '❌'} Your answer: <strong>{a.student_answer || '(blank)'}</strong>
                </p>
                {a.feedback && <p style={{ fontSize: 13, color: '#64748B', margin: '8px 0 0', lineHeight: 1.6 }}>{a.feedback}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
