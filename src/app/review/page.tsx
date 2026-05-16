'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import FilterTabs from '@/components/ui/FilterTabs'

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
        .from('attempts').select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
      setAttempts(data || [])
    })
  }, [])

  const filtered = filter === 'incorrect' ? attempts.filter(a => a.score < a.out_of) : attempts

  return (
    <AuthGuard>
      <div>
        <section className="pt-16 pb-8 border-b border-[color:var(--color-rule)]">
          <Container>
            <Eyebrow className="mb-5">EST. 2024 · USA · MMXXVI</Eyebrow>
            <h1 className="headline text-[40px]">Your <em>working</em>, marked.</h1>
            <p className="mt-4 text-[15px] text-[color:var(--color-muted)] max-w-[640px]">Every question you have answered. Every comment the examiner left.</p>
            <div className="mt-8">
              <FilterTabs
                value={filter}
                onChange={v => setFilter(v as 'all' | 'incorrect')}
                options={[
                  { label: `All (${attempts.length})`, value: 'all' },
                  { label: `Incorrect only (${attempts.filter(a => a.score < a.out_of).length})`, value: 'incorrect' },
                ]}
              />
            </div>
          </Container>
        </section>

        <Container className="py-12">
          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-[15px] text-[color:var(--color-muted)] mb-5">Nothing to review yet.</p>
              <Link href="/practice" className="btn-primary">Start a session <span aria-hidden>→</span></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(a => (
                <div key={a.id} className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`marker not-italic font-serif text-[15px] ${a.score >= a.out_of ? '' : 'text-[color:var(--color-ink)]'}`}>
                      {a.score >= a.out_of ? '✓' : '✗'}
                    </span>
                    <Eyebrow>{a.subtopic || a.topic} · {new Date(a.created_at).toLocaleDateString()}</Eyebrow>
                  </div>
                  <p className="font-serif text-[16px] leading-[1.6] mb-3">{a.question}</p>
                  <div className="text-[13px] text-[color:var(--color-muted)]">Your answer: <strong className="text-[color:var(--color-ink)]">{a.student_answer || '(blank)'}</strong></div>
                  {a.feedback && (
                    <p className="mt-3 text-[13px] leading-[1.7] text-[color:var(--color-ink-2)] border-t border-[color:var(--color-rule)] pt-3">{a.feedback}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </AuthGuard>
  )
}
