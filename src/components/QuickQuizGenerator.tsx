'use client'

import { useState } from 'react'

interface Question {
  question: string
  answer: string
  explanation: string
}

export default function QuickQuizGenerator({ topic, topicLabel }: { topic: string; topicLabel: string }) {
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Exam-Level'>('Medium')
  const [count, setCount] = useState(5)
  const [phase, setPhase] = useState<'idle' | 'config' | 'loading' | 'quiz' | 'complete'>('idle')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [results, setResults] = useState<{ correct: boolean; explanation: string }[]>([])
  const [currentQ, setCurrentQ] = useState(0)

  async function startQuiz() {
    setPhase('loading')
    const res = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, difficulty, count }),
    })
    const data = await res.json()
    setQuestions(data.questions || [])
    setAnswers(new Array(data.questions?.length || count).fill(''))
    setCurrentQ(0)
    setPhase('quiz')
  }

  async function checkAnswer() {
    const res = await fetch('/api/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questions: [questions[currentQ]],
        answers: [answers[currentQ]],
        exam: 'SAT',
      }),
    })
    const data = await res.json()
    const result = data.results?.[0] || { correct: false, explanation: '' }
    setResults([...results, result])

    if (currentQ >= questions.length - 1) {
      setPhase('complete')
    } else {
      setTimeout(() => setCurrentQ(currentQ + 1), 1200)
    }
  }

  if (phase === 'idle') {
    return (
      <button onClick={() => setPhase('config')} style={{
        padding: '10px 20px', borderRadius: 10, border: '2px solid #2563EB',
        background: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: 14, cursor: 'pointer',
      }}>Quick Quiz: {topicLabel}</button>
    )
  }

  if (phase === 'config') {
    return (
      <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: '0 0 12px' }}>Quick Quiz: {topicLabel}</h4>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {(['Easy', 'Medium', 'Exam-Level'] as const).map(d => (
            <button key={d} onClick={() => setDifficulty(d)} style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              border: difficulty === d ? '1.5px solid #2563EB' : '1.5px solid #E5E7EB',
              background: difficulty === d ? '#EFF6FF' : '#fff',
              color: difficulty === d ? '#2563EB' : '#64748B', cursor: 'pointer',
            }}>{d}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[5, 10, 20].map(n => (
            <button key={n} onClick={() => setCount(n)} style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              border: count === n ? '1.5px solid #2563EB' : '1.5px solid #E5E7EB',
              background: count === n ? '#EFF6FF' : '#fff',
              color: count === n ? '#2563EB' : '#64748B', cursor: 'pointer',
            }}>{n} Qs</button>
          ))}
        </div>
        <button onClick={startQuiz} style={{
          padding: '10px 20px', borderRadius: 8, border: 'none',
          background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
          color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}>Start Quiz</button>
      </div>
    )
  }

  if (phase === 'loading') {
    return <div style={{ padding: 24, textAlign: 'center', color: '#64748B' }}>Generating questions...</div>
  }

  if (phase === 'complete') {
    const score = results.filter(r => r.correct).length
    return (
      <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0', textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#1E293B' }}>{score}/{questions.length}</div>
        <p style={{ color: '#64748B', margin: '8px 0 16px' }}>
          {score === questions.length ? 'Perfect!' : score >= questions.length * 0.7 ? 'Great job!' : 'Keep practicing!'}
        </p>
        <button onClick={() => { setPhase('idle'); setResults([]); setQuestions([]) }} style={{
          padding: '8px 20px', borderRadius: 8, border: '1.5px solid #2563EB',
          background: '#fff', color: '#2563EB', fontWeight: 700, cursor: 'pointer',
        }}>Try Again</button>
      </div>
    )
  }

  // Quiz phase
  return (
    <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
      <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>Q{currentQ + 1}/{questions.length}</div>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: '0 0 12px' }}>{questions[currentQ]?.question}</p>
      <input
        value={answers[currentQ] || ''}
        onChange={e => { const a = [...answers]; a[currentQ] = e.target.value; setAnswers(a) }}
        onKeyDown={e => e.key === 'Enter' && checkAnswer()}
        placeholder="Your answer..."
        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 8 }}
      />
      <button onClick={checkAnswer} style={{
        padding: '8px 16px', borderRadius: 8, border: 'none',
        background: '#2563EB', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
      }}>Check</button>
      {results[currentQ] && (
        <div style={{ marginTop: 8, fontSize: 13, color: results[currentQ].correct ? '#059669' : '#DC2626' }}>
          {results[currentQ].correct ? '✅ Correct!' : `❌ Answer: ${questions[currentQ].answer}`}
        </div>
      )}
    </div>
  )
}
