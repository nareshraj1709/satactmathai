'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { SAT_CONTENT, ACT_ADDITIONAL_CONTENT } from '@/lib/study-content'
import AuthGuard from '@/components/AuthGuard'

interface Question { question: string; answer: string; explanation: string }

const ACT_TOPIC_GROUPS = [
  { group: 'Pre-Algebra', subtopics: ['Number Properties & Operations', 'Fractions, Decimals & Scientific Notation', 'Ratios, Rates & Proportions', 'Percentages & Percent Change'] },
  { group: 'Elementary Algebra', subtopics: ['Linear Equations in One Variable', 'Linear Inequalities', 'Absolute Value Equations & Inequalities'] },
  { group: 'Intermediate Algebra', subtopics: ['Systems of Linear Equations', 'Quadratic Equations', 'Polynomials', 'Exponential Functions & Growth/Decay', 'Functions & Function Notation', 'Matrices (ACT)'] },
  { group: 'Coordinate Geometry', subtopics: ['Coordinate Geometry', 'Conic Sections & Parabolas'] },
  { group: 'Plane Geometry', subtopics: ['Geometry: Lines, Angles & Triangles', 'Circles', 'Area & Volume of 3D Shapes'] },
  { group: 'Trigonometry', subtopics: ['Trigonometry', 'Complex Numbers', 'Graphs of Trig Functions', 'Law of Sines & Cosines'] },
]

export default function ACTPracticePage() {
  const [topic, setTopic] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [results, setResults] = useState<{ correct: boolean; explanation: string }[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  async function generateQuestions() {
    setGenerating(true); setResults(null); setAnswers([])
    try {
      const res = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic || 'mixed ACT math', count: 5, type: 'practice', exam: 'ACT' }),
      })
      const data = await res.json()
      setQuestions(data.questions || [])
      setAnswers(new Array(data.questions?.length || 5).fill(''))
    } catch { setQuestions([]) }
    setGenerating(false)
  }

  async function submitAnswers() {
    setLoading(true)
    try {
      const res = await fetch('/api/mark', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions, answers, exam: 'ACT' }),
      })
      const data = await res.json()
      setResults(data.results || [])
      const session = (await supabase.auth.getSession()).data.session
      if (session) {
        for (let i = 0; i < questions.length; i++) {
          await supabase.from('attempts').insert({
            user_id: session.user.id, topic: topic || 'Mixed', subtopic: topic || 'ACT Mixed Practice',
            exam_board: 'ACT', question: questions[i].question, student_answer: answers[i],
            score: data.results?.[i]?.correct ? 1 : 0, out_of: 1, feedback: data.results?.[i]?.explanation || '',
          })
        }
      }
    } catch {}
    setLoading(false)
  }

  const score = results ? results.filter(r => r.correct).length : 0

  return (
    <AuthGuard>
      <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800, background: '#D97706', color: '#fff' }}>ACT</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>Quick Practice</h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 24px' }}>5 ACT-style questions with instant AI feedback</p>

          {questions.length === 0 && (
            <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B', margin: '0 0 16px' }}>Choose an ACT topic</h3>
              <select value={topic} onChange={e => setTopic(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 15, marginBottom: 16, outline: 'none' }}>
                <option value="">Mixed (all ACT topics)</option>
                {ACT_TOPIC_GROUPS.map(g => (
                  <optgroup key={g.group} label={g.group}>
                    {g.subtopics.map(s => <option key={s} value={s}>{s}</option>)}
                  </optgroup>
                ))}
              </select>
              <button onClick={generateQuestions} disabled={generating} style={{
                width: '100%', padding: '14px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700,
                color: '#fff', background: '#D97706', cursor: generating ? 'wait' : 'pointer', opacity: generating ? 0.7 : 1,
              }}>{generating ? 'Generating...' : 'Generate 5 Questions'}</button>
            </div>
          )}

          {questions.length > 0 && !results && (
            <div>
              {questions.map((q, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0', marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#D97706', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 15, color: '#1E293B', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{q.question}</p>
                  </div>
                  <input value={answers[i] || ''} onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a) }}
                    placeholder="Type your answer..." style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <button onClick={submitAnswers} disabled={loading} style={{
                width: '100%', padding: '14px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700,
                color: '#fff', background: '#D97706', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
              }}>{loading ? 'Marking...' : 'Submit Answers'}</button>
            </div>
          )}

          {results && (
            <div>
              <div style={{ background: score >= 4 ? '#ECFDF5' : score >= 2 ? '#FFFBEB' : '#FEF2F2', borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 24, border: `1px solid ${score >= 4 ? '#A7F3D0' : score >= 2 ? '#FDE68A' : '#FECACA'}` }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: '#1E293B' }}>{score}/{questions.length}</div>
                <p style={{ color: '#64748B', margin: '8px 0 0' }}>{score === questions.length ? 'Perfect!' : score >= 3 ? 'Great job!' : 'Keep practicing!'}</p>
              </div>
              {questions.map((q, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: `1px solid ${results[i]?.correct ? '#A7F3D0' : '#FECACA'}`, marginBottom: 12 }}>
                  <span style={{ fontSize: 18 }}>{results[i]?.correct ? '✅' : '❌'}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginLeft: 8 }}>Q{i + 1}: {q.question}</span>
                  <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0' }}>Your answer: <strong>{answers[i] || '(blank)'}</strong></p>
                  <p style={{ fontSize: 13, color: '#059669', margin: '4px 0' }}>Correct: <strong>{q.answer}</strong></p>
                  {results[i]?.explanation && <p style={{ fontSize: 13, color: '#64748B', margin: '8px 0 0', lineHeight: 1.6 }}>{results[i].explanation}</p>}
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button onClick={() => { setQuestions([]); setResults(null); setAnswers([]) }} style={{ flex: 1, padding: '14px', borderRadius: 10, border: '2px solid #D97706', background: '#fff', color: '#D97706', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Try Again</button>
                <a href="/dashboard" style={{ flex: 1, padding: '14px', borderRadius: 10, background: '#D97706', color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>Dashboard</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
