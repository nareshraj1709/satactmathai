'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import AuthGuard from '@/components/AuthGuard'
import { supabase } from '@/lib/supabase'
import { toRoman } from '@/components/ui/RomanNumeral'
import type { Exam } from '@/lib/exams-loader'

interface Section {
  slug: string
  number: number
  name: string
  topic: string
  tier: 'SAT' | 'ACT' | 'Both'
  description: string
}

export default function PracticeExamRunner({ section, exam }: { section: Section; exam: Exam }) {
  const questions = exam.questions
  const [answers, setAnswers] = useState<string[]>(() => new Array(questions.length).fill(''))
  const [marked, setMarked] = useState<boolean[]>(() => new Array(questions.length).fill(false))
  const [explanations, setExplanations] = useState<string[]>(() => new Array(questions.length).fill(''))
  const [currentQ, setCurrentQ] = useState(0)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function markCurrent() {
    setSubmitting(true)
    try {
      const res = await fetch('/api/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: [questions[currentQ]],
          answers: [answers[currentQ]],
          exam: section.tier === 'ACT' ? 'ACT' : 'SAT',
        }),
      })
      const data = await res.json()
      const result = data.results?.[0]
      const newMarked = [...marked]; newMarked[currentQ] = result?.correct ?? false; setMarked(newMarked)
      const newExp = [...explanations]; newExp[currentQ] = result?.explanation || questions[currentQ].explanation || ''; setExplanations(newExp)

      const session = (await supabase.auth.getSession()).data.session
      if (session) {
        await supabase.from('attempts').insert({
          user_id: session.user.id,
          topic: section.topic,
          subtopic: `${section.name} · ${exam.difficulty} Exam ${exam.examNumber}`,
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
        setTimeout(() => setCurrentQ(currentQ + 1), 1200)
      }
    } finally {
      setSubmitting(false)
    }
  }

  function resetExam() {
    setAnswers(new Array(questions.length).fill(''))
    setMarked(new Array(questions.length).fill(false))
    setExplanations(new Array(questions.length).fill(''))
    setCurrentQ(0)
    setDone(false)
  }

  const answered = explanations.filter(Boolean).length
  const score = marked.filter(Boolean).length

  return (
    <AuthGuard>
      <div>
        <section className="pt-12 pb-8 border-b border-[color:var(--color-rule)]">
          <Container>
            <Eyebrow className="mb-5">
              <Link href="/practice" className="hover:text-[color:var(--color-ink)]">Practice</Link>
              <span className="mx-2">/</span>
              <Link href={`/practice/${section.slug}`} className="hover:text-[color:var(--color-ink)]">{section.name}</Link>
              <span className="mx-2">/</span>
              <span>{exam.difficulty} Exam {exam.examNumber}</span>
            </Eyebrow>
            <div className="flex items-baseline justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="marker not-italic font-serif text-[15px]">№ {String(exam.examNumber).padStart(2, '0')}</span>
                  <span className="eyebrow">{exam.difficulty} · {section.tier === 'Both' ? 'SAT + ACT' : section.tier}</span>
                </div>
                <h1 className="headline text-[34px]">{section.name}</h1>
                <p className="mt-3 text-[14px] text-[color:var(--color-muted)]">{questions.length} pre-loaded questions, marked by AI on submit.</p>
              </div>
              {answered > 0 && (
                <div className="text-right">
                  <div className="font-serif text-[40px] leading-none">{score}<span className="text-[color:var(--color-muted)] text-[20px]">/{answered}</span></div>
                  <div className="eyebrow mt-2">correct</div>
                </div>
              )}
            </div>
          </Container>
        </section>

        <Container className="py-12">
          {/* Question nav dots */}
          <div className="flex flex-wrap gap-2 mb-8">
            {questions.map((_, i) => {
              const state = explanations[i] ? (marked[i] ? 'correct' : 'wrong') : i === currentQ ? 'current' : answers[i] ? 'answered' : 'pending'
              const cls = state === 'correct' ? 'bg-[color:var(--color-marker)] text-[color:var(--color-ink)]'
                : state === 'wrong' ? 'bg-[color:var(--color-ink)] text-white'
                : state === 'current' ? 'border-[color:var(--color-ink)] border-2 bg-white'
                : state === 'answered' ? 'bg-[color:var(--color-bg-alt)]'
                : 'bg-[color:var(--color-surface)] border border-[color:var(--color-rule)]'
              return (
                <button key={i} onClick={() => !done && setCurrentQ(i)} disabled={done} className={`w-8 h-8 rounded-full text-[12px] font-semibold ${cls}`}>
                  {i + 1}
                </button>
              )
            })}
          </div>

          {!done && questions[currentQ] && (
            <div className="card p-8">
              <Eyebrow className="mb-4">Question {currentQ + 1} of {questions.length}</Eyebrow>
              <p className="font-serif text-[19px] leading-[1.55] mb-6">{questions[currentQ].question}</p>

              {explanations[currentQ] ? (
                <div className="mt-2 border-t border-[color:var(--color-rule)] pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="marker not-italic font-serif text-[18px]">{marked[currentQ] ? '✓' : '✗'}</span>
                    <span className="eyebrow">{marked[currentQ] ? 'Method mark earned' : 'Method mark missed'}</span>
                  </div>
                  <p className="text-[14px] leading-[1.7] text-[color:var(--color-ink-2)]">{explanations[currentQ]}</p>
                  <p className="text-[14px] mt-3"><span className="text-[color:var(--color-muted)]">Correct answer:</span> <strong>{questions[currentQ].answer}</strong></p>
                </div>
              ) : (
                <>
                  <textarea
                    value={answers[currentQ] || ''}
                    onChange={e => { const a = [...answers]; a[currentQ] = e.target.value; setAnswers(a) }}
                    placeholder="Type your working and final answer…"
                    rows={4}
                    className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] font-serif outline-none focus:border-[color:var(--color-ink)] resize-none"
                  />
                  <div className="flex items-center justify-between mt-5">
                    <button onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)} disabled={currentQ === 0} className="btn-ghost disabled:opacity-40">← Previous</button>
                    <button onClick={markCurrent} disabled={submitting || !answers[currentQ]} className="btn-primary disabled:opacity-50">
                      {submitting ? 'Marking…' : 'Mark answer'} <span aria-hidden>→</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {done && (
            <div className="card p-10 text-center">
              <Eyebrow className="mb-4">№ {toRoman(exam.examNumber)} · {exam.difficulty} complete</Eyebrow>
              <div className="font-serif text-[72px] leading-none">{score}<span className="text-[color:var(--color-muted)] text-[36px]">/{questions.length}</span></div>
              <p className="mt-5 text-[15px] text-[color:var(--color-muted)] max-w-[480px] mx-auto">
                {score === questions.length ? 'A clean sweep.' : score >= Math.ceil(questions.length * 0.7) ? 'Strong session. The weak spots are getting smaller.' : 'Worth revisiting the notes. The radar has marked this.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button onClick={resetExam} className="btn-ghost">Retry this exam</button>
                <Link href={`/practice/${section.slug}`} className="btn-ghost">Pick another exam</Link>
                <Link href={`/syllabus/${section.slug}`} className="btn-primary">Review notes <span aria-hidden>→</span></Link>
              </div>
            </div>
          )}
        </Container>
      </div>
    </AuthGuard>
  )
}
