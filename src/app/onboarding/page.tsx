'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 40, maxWidth: 480, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>Let&apos;s personalize your prep</h1>
        <p style={{ color: '#64748B', fontSize: 15, margin: '0 0 32px' }}>This helps us tailor your practice experience.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Your first name</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Which test are you preparing for?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['SAT', 'ACT', 'Both'] as const).map(e => (
                <button key={e} onClick={() => setExam(e)} style={{
                  flex: 1, padding: '12px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                  border: exam === e ? '2px solid #2563EB' : '2px solid #E5E7EB',
                  background: exam === e ? '#EFF6FF' : '#fff',
                  color: exam === e ? '#2563EB' : '#374151',
                  cursor: 'pointer',
                }}>{e}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Your grade level</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['9th', '10th', '11th', '12th'].map(g => (
                <button key={g} onClick={() => setGrade(g)} style={{
                  flex: 1, padding: '12px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                  border: grade === g ? '2px solid #2563EB' : '2px solid #E5E7EB',
                  background: grade === g ? '#EFF6FF' : '#fff',
                  color: grade === g ? '#2563EB' : '#374151',
                  cursor: 'pointer', minWidth: 70,
                }}>{g}</button>
              ))}
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!exam}
            style={{
              padding: '14px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700,
              color: '#fff', background: exam ? 'linear-gradient(135deg, #2563EB, #7C3AED)' : '#CBD5E1',
              cursor: exam ? 'pointer' : 'not-allowed', marginTop: 8,
            }}
          >
            Start Practicing →
          </button>
        </div>
      </div>
    </div>
  )
}
