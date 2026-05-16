'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

export default function OnboardingPage() {
  const [name, setName] = useState('')
  const [exam, setExam] = useState<'SAT' | 'ACT' | 'Both' | ''>('')
  const [grade, setGrade] = useState('')
  const router = useRouter()

  function handleContinue() {
    localStorage.setItem('satact_onboarded', 'true')
    localStorage.setItem('satact_profile', JSON.stringify({ name, exam, grade }))
    router.push('/dashboard')
  }

  const choiceCls = (active: boolean) =>
    `px-4 py-3 text-[15px] rounded-[4px] border transition-colors text-center font-medium ${
      active ? 'border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-white' : 'border-[color:var(--color-rule)] hover:bg-[color:var(--color-bg-alt)]'
    }`

  return (
    <Container className="py-20 max-w-[560px]">
      <Eyebrow className="mb-4">№ I · Personalisation</Eyebrow>
      <h1 className="headline text-[36px] mb-3">
        Let&rsquo;s shape your <em>preparation</em>.
      </h1>
      <p className="text-[15px] text-[color:var(--color-muted)] mb-10">Three quick answers. We use them to calibrate your weak-spot radar and your test-day planner.</p>

      <div className="card p-8 space-y-7">
        <div>
          <label className="eyebrow block mb-3">Your first name</label>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Alex"
            className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] outline-none focus:border-[color:var(--color-ink)]"
          />
        </div>
        <div>
          <label className="eyebrow block mb-3">Which test are you preparing for?</label>
          <div className="grid grid-cols-3 gap-2">
            {(['SAT', 'ACT', 'Both'] as const).map(e => (
              <button key={e} onClick={() => setExam(e)} className={choiceCls(exam === e)}>{e}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="eyebrow block mb-3">Your grade level</label>
          <div className="grid grid-cols-4 gap-2">
            {['9th', '10th', '11th', '12th'].map(g => (
              <button key={g} onClick={() => setGrade(g)} className={choiceCls(grade === g)}>{g}</button>
            ))}
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!exam}
          className="btn-primary w-full justify-center disabled:opacity-50 mt-2"
        >
          Begin your first topic <span aria-hidden>→</span>
        </button>
      </div>
    </Container>
  )
}
