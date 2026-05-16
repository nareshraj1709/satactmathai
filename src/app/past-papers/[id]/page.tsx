'use client'

import { use, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import AuthGuard from '@/components/AuthGuard'
import { HISTORICAL_SAT, HISTORICAL_ACT, AI_SAT_PAPERS, AI_ACT_PAPERS, estimateSATScore, estimateACTScore } from '@/lib/papers-data'
import { supabase } from '@/lib/supabase'

interface Question { question: string; answer: string; explanation: string }

export default function PaperRunner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const allPapers = [...HISTORICAL_SAT, ...HISTORICAL_ACT, ...AI_SAT_PAPERS, ...AI_ACT_PAPERS]
  const paper = allPapers.find(p => p.id === id)

  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)
  const [results, setResults] = useState<{ correct: boolean; explanation: string }[] | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!paper) { setLoading(false); return }
    setTimeLeft(paper.timeMinutes * 60)
    fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: paper.topics.join(', '),
        count: Math.min(paper.questionCount, 20),
        type: 'paper',
        exam: paper.exam,
        difficulty: paper.difficulty || 'Medium',
      }),
    })
      .then(r => r.json())
      .then(data => {
        const qs = data.questions || []
        setQuestions(qs)
        setAnswers(new Array(qs.length).fill(''))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [paper])

  useEffect(() => {
    if (loading || results) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { if (timerRef.current) clearInterval(timerRef.current); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [loading, results])

  async function submitAll() {
    if (timerRef.current) clearInterval(timerRef.current)
    setMarking(true)
    try {
      const res = await fetch('/api/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions, answers, exam: paper?.exam || 'SAT' }),
      })
      const data = await res.json()
      setResults(data.results || [])
      const session = (await supabase.auth.getSession()).data.session
      if (session) {
        for (let i = 0; i < questions.length; i++) {
          await supabase.from('attempts').insert({
            user_id: session.user.id,
            topic: paper?.exam || 'SAT',
            subtopic: `Paper: ${paper?.style || id}`,
            question: questions[i].question,
            student_answer: answers[i],
            score: data.results?.[i]?.correct ? 1 : 0,
            out_of: 1,
            feedback: data.results?.[i]?.explanation || '',
          })
        }
      }
    } finally {
      setMarking(false)
    }
  }

  if (!paper) {
    return (
      <Container className="py-24 text-center">
        <h2 className="headline text-[28px] mb-4">Paper not found</h2>
        <Link href="/past-papers" className="btn-link">← Back to past papers</Link>
      </Container>
    )
  }

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const score = results ? results.filter(r => r.correct).length : 0
  const estimatedScore = results
    ? (paper.exam === 'SAT' ? estimateSATScore(score, questions.length) : estimateACTScore(score, questions.length))
    : null

  return (
    <AuthGuard>
      <div>
        {/* Sticky exam bar */}
        <div className="sticky top-[68px] z-40 bg-[color:var(--color-bg)] border-b border-[color:var(--color-rule)]">
          <Container className="h-[60px] flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Eyebrow>{paper.exam} · Paper · {paper.year ?? 'AI'}</Eyebrow>
              <div className="font-serif text-[15px] truncate">{paper.style}</div>
            </div>
            {!results && (
              <div className={`font-mono text-[20px] font-semibold px-3 py-1 rounded-[4px] ${timeLeft < 300 ? 'bg-[color:var(--color-ink)] text-white' : ''}`}>
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </div>
            )}
            {!results && !loading && (
              <button onClick={submitAll} disabled={marking} className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
                {marking ? 'Marking…' : 'Finish & mark'} <span aria-hidden>→</span>
              </button>
            )}
          </Container>
        </div>

        <Container className="py-10">
          {/* Question dots */}
          {!loading && questions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {questions.map((_, i) => {
                const state = results ? (results[i]?.correct ? 'correct' : 'wrong') : i === currentQ ? 'current' : answers[i] ? 'answered' : 'pending'
                const cls = state === 'correct' ? 'bg-[color:var(--color-marker)] text-[color:var(--color-ink)]'
                  : state === 'wrong' ? 'bg-[color:var(--color-ink)] text-white'
                  : state === 'current' ? 'border-[color:var(--color-ink)] border-2 bg-white'
                  : state === 'answered' ? 'bg-[color:var(--color-bg-alt)]'
                  : 'bg-[color:var(--color-surface)] border border-[color:var(--color-rule)]'
                return (
                  <button key={i} onClick={() => setCurrentQ(i)} className={`w-8 h-8 rounded-full text-[12px] font-semibold ${cls}`}>
                    {i + 1}
                  </button>
                )
              })}
            </div>
          )}

          {loading && (
            <div className="card p-12 text-center">
              <Eyebrow className="mb-3">Generating</Eyebrow>
              <div className="font-serif text-[22px]">{paper.style}…</div>
            </div>
          )}

          {results && (
            <div>
              <div className="card p-10 text-center">
                <Eyebrow className="mb-4">Paper complete</Eyebrow>
                <div className="font-serif text-[64px] leading-none">{score}<span className="text-[color:var(--color-muted)] text-[28px]">/{questions.length}</span></div>
                <div className="mt-5 text-[16px] text-[color:var(--color-ink-2)]">
                  Estimated {paper.exam} score: <span className="font-serif text-[22px] text-[color:var(--color-ink)]">{estimatedScore}</span>
                </div>
              </div>

              <div className="mt-10 space-y-3">
                {questions.map((q, i) => (
                  <div key={i} className="card p-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className={`marker not-italic font-serif text-[15px] ${results[i]?.correct ? '' : 'text-[color:var(--color-ink)]'}`}>
                        {results[i]?.correct ? '✓' : '✗'}
                      </span>
                      <Eyebrow>Q{i + 1}</Eyebrow>
                    </div>
                    <p className="font-serif text-[16px] leading-[1.6]">{q.question}</p>
                    <div className="mt-3 text-[13px] text-[color:var(--color-muted)]">Your answer: <strong className="text-[color:var(--color-ink)]">{answers[i] || '(blank)'}</strong></div>
                    <div className="text-[13px] text-[color:var(--color-muted)]">Correct: <strong className="text-[color:var(--color-ink)]">{q.answer}</strong></div>
                    {results[i]?.explanation && (
                      <p className="mt-3 text-[13px] leading-[1.7] text-[color:var(--color-ink-2)] border-t border-[color:var(--color-rule)] pt-3">{results[i].explanation}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                <Link href="/past-papers" className="btn-ghost">More papers</Link>
                <Link href="/dashboard" className="btn-primary">View dashboard <span aria-hidden>→</span></Link>
              </div>
            </div>
          )}

          {!loading && !results && questions[currentQ] && (
            <div className="card p-8">
              <Eyebrow className="mb-3">Question {currentQ + 1} of {questions.length}</Eyebrow>
              <p className="font-serif text-[19px] leading-[1.55] mb-6">{questions[currentQ].question}</p>
              <textarea
                value={answers[currentQ] || ''}
                onChange={e => { const a = [...answers]; a[currentQ] = e.target.value; setAnswers(a) }}
                placeholder="Type your working and final answer…"
                rows={5}
                className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] font-serif outline-none focus:border-[color:var(--color-ink)] resize-none"
              />
              <div className="flex items-center justify-between mt-5">
                <button onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)} disabled={currentQ === 0} className="btn-ghost disabled:opacity-40">← Previous</button>
                <button onClick={() => setCurrentQ(Math.min(currentQ + 1, questions.length - 1))} disabled={currentQ >= questions.length - 1} className="btn-primary disabled:opacity-40">Next <span aria-hidden>→</span></button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </AuthGuard>
  )
}
