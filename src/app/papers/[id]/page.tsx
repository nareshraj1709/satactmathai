'use client'

import { use, useState, useEffect, useRef } from 'react'
import { HISTORICAL_SAT, HISTORICAL_ACT, AI_SAT_PAPERS, AI_ACT_PAPERS, estimateSATScore, estimateACTScore } from '@/lib/papers-data'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'

interface Question {
  question: string
  answer: string
  explanation: string
  marks?: number
}

export default function PaperPage({ params }: { params: Promise<{ id: string }> }) {
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
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!paper) return
    setTimeLeft(paper.timeMinutes * 60)

    fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: paper.topics.join(', '),
        count: Math.min(paper.questionCount, 20), // Cap at 20 for API limits
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

  // Timer
  useEffect(() => {
    if (loading || results) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
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

      // Save attempts
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
    } catch {
      // Handle error
    }
    setMarking(false)
  }

  if (!paper) {
    return <div style={{ padding: 48, textAlign: 'center' }}><h2>Paper not found</h2><a href="/papers">← Back</a></div>
  }

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const score = results ? results.filter(r => r.correct).length : 0
  const estimatedScore = results
    ? (paper.exam === 'SAT' ? estimateSATScore(score, questions.length) : estimateACTScore(score, questions.length))
    : null

  return (
    <AuthGuard>
      <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        {/* Sticky header with timer */}
        <div style={{
          position: 'sticky', top: 64, zIndex: 50, background: '#fff',
          borderBottom: '1px solid #E2E8F0', padding: '12px 24px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1E293B' }}>{paper.style}</div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{paper.exam} · {questions.length} questions</div>
            </div>
            {!results && (
              <div style={{
                padding: '8px 16px', borderRadius: 10,
                background: timeLeft < 300 ? '#FEF2F2' : '#F8FAFC',
                color: timeLeft < 300 ? '#DC2626' : '#1E293B',
                fontWeight: 800, fontSize: 18, fontFamily: 'monospace',
              }}>
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </div>
            )}
            {!results && !loading && (
              <button onClick={submitAll} disabled={marking} style={{
                padding: '8px 20px', borderRadius: 8, border: 'none',
                background: '#DC2626', color: '#fff', fontWeight: 700, fontSize: 13,
                cursor: marking ? 'wait' : 'pointer',
              }}>{marking ? 'Marking...' : 'Finish & Mark'}</button>
            )}
          </div>
        </div>

        <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 24px' }}>
          {/* Question nav dots */}
          {!loading && (
            <div style={{ display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap' }}>
              {questions.map((_, i) => (
                <button key={i} onClick={() => setCurrentQ(i)} style={{
                  width: 28, height: 28, borderRadius: '50%', border: 'none',
                  background: results
                    ? (results[i]?.correct ? '#059669' : '#DC2626')
                    : i === currentQ ? '#2563EB' : answers[i] ? '#93C5FD' : '#E2E8F0',
                  color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                }}>{i + 1}</button>
              ))}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: 64, color: '#64748B' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
              <p style={{ fontSize: 16 }}>Generating your paper...</p>
            </div>
          ) : results ? (
            <div>
              {/* Score summary */}
              <div style={{
                background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                borderRadius: 16, padding: 32, color: '#fff', textAlign: 'center', marginBottom: 24,
              }}>
                <div style={{ fontSize: 48, fontWeight: 900 }}>{score}/{questions.length}</div>
                <div style={{ fontSize: 20, color: '#94A3B8', marginTop: 4 }}>
                  Estimated {paper.exam} Score: <strong style={{ color: '#60A5FA' }}>{estimatedScore}</strong>
                </div>
              </div>

              {/* Results */}
              {questions.map((q, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 12, padding: 20,
                  border: `1px solid ${results[i]?.correct ? '#A7F3D0' : '#FECACA'}`,
                  marginBottom: 12,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                    {results[i]?.correct ? '✅' : '❌'} Q{i + 1}: {q.question}
                  </div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>Your answer: <strong>{answers[i] || '(blank)'}</strong></div>
                  <div style={{ fontSize: 13, color: '#059669' }}>Correct: <strong>{q.answer}</strong></div>
                  {results[i]?.explanation && (
                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 8, lineHeight: 1.6 }}>{results[i].explanation}</div>
                  )}
                </div>
              ))}

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <a href="/papers" style={{
                  flex: 1, padding: '14px', borderRadius: 10, border: '2px solid #2563EB',
                  color: '#2563EB', textDecoration: 'none', fontWeight: 700, textAlign: 'center',
                }}>More Papers</a>
                <a href="/dashboard" style={{
                  flex: 1, padding: '14px', borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  color: '#fff', textDecoration: 'none', fontWeight: 700, textAlign: 'center',
                }}>Dashboard</a>
              </div>
            </div>
          ) : questions[currentQ] && (
            <div style={{
              background: '#fff', borderRadius: 16, padding: 28,
              border: '1px solid #E2E8F0',
            }}>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 8 }}>Question {currentQ + 1} of {questions.length}</div>
              <p style={{ fontSize: 17, fontWeight: 600, color: '#1E293B', lineHeight: 1.6, margin: '0 0 16px' }}>
                {questions[currentQ].question}
              </p>
              <textarea
                value={answers[currentQ] || ''}
                onChange={e => {
                  const a = [...answers]
                  a[currentQ] = e.target.value
                  setAnswers(a)
                }}
                placeholder="Show your working and type your answer..."
                rows={4}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 10,
                  border: '1.5px solid #E5E7EB', fontSize: 15, outline: 'none',
                  boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button
                  onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                  disabled={currentQ === 0}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #E5E7EB',
                    background: '#fff', color: '#374151', fontWeight: 700, cursor: 'pointer',
                    opacity: currentQ === 0 ? 0.4 : 1,
                  }}
                >← Previous</button>
                <button
                  onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}
                  disabled={currentQ >= questions.length - 1}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 10, border: 'none',
                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                    color: '#fff', fontWeight: 700, cursor: 'pointer',
                    opacity: currentQ >= questions.length - 1 ? 0.4 : 1,
                  }}
                >Next →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
