'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <Container className="py-20 max-w-[640px]">
      <Eyebrow className="mb-5">EST. 2024 · USA · MMXXVI</Eyebrow>
      <h1 className="headline text-[40px] mb-4">
        Get in <em>touch</em>.
      </h1>
      <p className="text-[15px] text-[color:var(--color-muted)] mb-10 max-w-[480px]">A question, a bug, an idea — we read everything that comes through.</p>

      {sent ? (
        <div className="card p-10 text-center">
          <div className="marker font-serif text-[28px] not-italic mb-3">✓</div>
          <h2 className="headline text-[24px] mb-3">Message sent</h2>
          <p className="text-[14px] text-[color:var(--color-muted)]">We&rsquo;ll get back to you as soon as we can.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="eyebrow block mb-2">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required
              className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] outline-none focus:border-[color:var(--color-ink)]" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] outline-none focus:border-[color:var(--color-ink)]" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={6}
              className="w-full px-4 py-3 border border-[color:var(--color-rule)] rounded-[4px] text-[15px] font-serif outline-none focus:border-[color:var(--color-ink)] resize-none" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? 'Sending…' : 'Send message'} <span aria-hidden>→</span>
          </button>
        </form>
      )}
    </Container>
  )
}
