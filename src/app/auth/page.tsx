'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Logo from '@/components/Logo'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmSent, setConfirmSent] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({ email, password })
        if (err) throw err
        setConfirmSent(true)
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
        const onboarded = localStorage.getItem('satact_onboarded')
        router.push(onboarded ? '/dashboard' : '/onboarding')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
    setLoading(false)
  }

  if (confirmSent) {
    return (
      <Container className="py-20 max-w-[480px]">
        <div className="card p-10 text-center">
          <Eyebrow className="mb-4">Confirmation sent</Eyebrow>
          <h2 className="headline text-[28px] mb-3">Check your email</h2>
          <p className="text-[15px] text-[color:var(--color-ink-2)] leading-[1.6]">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-20 max-w-[480px]">
      <div className="text-center mb-10">
        <div className="inline-block mb-6"><Logo size={18} /></div>
        <Eyebrow className="mb-4">EST. 2024 · USA · MMXXVI</Eyebrow>
        <h1 className="headline text-[36px] mb-2">
          {mode === 'login' ? <>Welcome <em>back</em>.</> : <>Begin your <em>first topic</em>.</>}
        </h1>
        <p className="text-[15px] text-[color:var(--color-muted)]">
          {mode === 'login' ? 'Sign in to continue.' : 'Create an account — no credit card required.'}
        </p>
      </div>

      <div className="card p-8">
        {error && (
          <div className="mb-5 p-3 border border-[color:var(--color-ink)] text-[14px] text-[color:var(--color-ink)]">{error}</div>
        )}
        <div className="space-y-5">
          <div>
            <label className="eyebrow block mb-2">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] outline-none focus:border-[color:var(--color-ink)]"
            />
          </div>
          <div>
            <label className="eyebrow block mb-2">Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] outline-none focus:border-[color:var(--color-ink)]"
            />
          </div>
          <button
            onClick={handleSubmit} disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'} <span aria-hidden>→</span>
          </button>
        </div>

        <p className="text-center mt-8 text-[14px] text-[color:var(--color-muted)]">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            className="text-[color:var(--color-ink)] font-semibold underline underline-offset-2"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <p className="text-center mt-6 text-[13px] text-[color:var(--color-muted)]">
        ← <Link href="/" className="hover:text-[color:var(--color-ink)]">Back to home</Link>
      </p>
    </Container>
  )
}
