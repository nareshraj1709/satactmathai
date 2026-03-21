'use client'

import { use, useState, useEffect } from 'react'
import { SECTIONS } from '@/lib/sections-data'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'

interface Question {
  question: string
  answer: string
  explanation: string
}

export default function SectionPracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const section = SECTIONS.find(s => s.id === Number(id))
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [marked, setMarked] = useState<boolean[]>([])
  const [explanations, setExplanations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQ, setCurrentQ] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!section) return
    fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: `${section.topic} - ${section.name}`, count: 10, type: 'section' }),
    })
      .then(r => r.json())
      .then(data => {
        setQuestions(data.questions || [])
        setAnswers(new Array(data.questions?.length || 10).fill(''))
        setMarked(new Array(data.questions?.length || 10).fill(false))
        setExplanations(new Array(data.questions?.length || 10).fill(''))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [section])

  async function markCurrent() {
    const res = await fetch('/api/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questions: [questions[currentQ]],
        answers: [answers[currentQ]],
        exam: section?.tier === 'ACT' ? 'ACT' : 'SAT',
      }),
    })
    const data = await res.json()
    const result = data.results?.[0]

    const newMarked = [...marked]
    newMarked[currentQ] = result?.correct ?? false
    setMarked(newMarked)

    const newExp = [...explanations]
    newExp[currentQ] = result?.explanation || ''
    setExplanations(newExp)

    // Save attempt
    const session = (await supabase.auth.getSession()).data.session
    if (session && section) {
      await supabase.from('attempts').insert({
        user_id: session.user.id,
        topic: section.topic,
        subtopic: section.name,
        question: questions[currentQ].question,
        student_answer: answers[currentQ],
        score: result?.correct ? 1 : 0,
        out_of: 1,
        feedback: result?.explanation || '',
      })
    }

    if (currentQ >= questions.length - 1) {
      setDone(true)
    } else {
      setTimeout(() => setCurrentQ(currentQ + 1), 1500)
    }
  }

  if (!section) {
    return <div style={{ padding: 48, textAlign: 'center' }}><h2>Section not found</h2><a href="/sections">← Back</a></div>
  }

  const score = marked.filter(Boolean).length
  const answered = explanations.filter(e => e).length

  return (
    <AuthGuard>
      <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
          <a href="/sections" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>← Back to sections</a>

          <div style={{
            background: section.bgColor, borderRadius: 16, padding: 24,
            border: `1.5px solid ${section.borderColor}`, margin: '16px 0 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: section.color, margin: '0 0 4px' }}>
                {section.icon} {section.name}
              </h1>
              <p style={{ color: '#64748B', margin: 0, fontSize: 14 }}>{section.description}</p>
            </div>
            {answered > 0 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: section.color }}>{score}/{answered}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>Correct</div>
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: explanations[i] ? (marked[i] ? '#059669' : '#DC2626') : i === currentQ ? '#2563EB' : '#E2E8F0',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }} onClick={() => !done && setCurrentQ(i)}>
                {i + 1}
              </div>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 48, color: '#64748B' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              Generating questions...
            </div>
          ) : done ? (
            <div style={{
              background: '#fff', borderRadius: 16, padding: 32,
              border: '1px solid #E2E8F0', textAlign: 'center',
            }}>
              <div style={{ fontSize: 48 }}>{score >= 8 ? '🎉' : score >= 5 ? '👍' : '💪'}</div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', margin: '12px 0' }}>
                {score}/{questions.length}
              </h2>
              <p style={{ color: '#64748B', marginBottom: 24 }}>
                {score >= 8 ? 'Excellent! You\'ve mastered this topic!' : score >= 5 ? 'Good work! Keep practicing!' : 'Don\'t give up! Review the notes and try again.'}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <a href="/sections" style={{
                  padding: '12px 24px', borderRadius: 10, border: '2px solid #2563EB',
                  color: '#2563EB', textDecoration: 'none', fontWeight: 700,
                }}>More Sections</a>
                <a href="/dashboard" style={{
                  padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  color: '#fff', textDecoration: 'none', fontWeight: 700,
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
              <input
                value={answers[currentQ] || ''}
                onChange={e => {
                  const a = [...answers]
                  a[currentQ] = e.target.value
                  setAnswers(a)
                }}
                onKeyDown={e => e.key === 'Enter' && markCurrent()}
                placeholder="Type your answer..."
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 10,
                  border: '1.5px solid #E5E7EB', fontSize: 16, outline: 'none', boxSizing: 'border-box',
                  marginBottom: 12,
                }}
              />
              <button onClick={markCurrent} style={{
                width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                fontSize: 16, fontWeight: 700, color: '#fff',
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                cursor: 'pointer',
              }}>Submit Answer</button>

              {explanations[currentQ] && (
                <div style={{
                  marginTop: 16, padding: 16, borderRadius: 10,
                  background: marked[currentQ] ? '#ECFDF5' : '#FEF2F2',
                  border: `1px solid ${marked[currentQ] ? '#A7F3D0' : '#FECACA'}`,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    {marked[currentQ] ? '✅ Correct!' : '❌ Not quite'}
                  </div>
                  <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{explanations[currentQ]}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
