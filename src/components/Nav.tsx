'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from './Logo'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/syllabus', label: 'Syllabus' },
  { href: '/practice', label: 'Practice' },
  { href: '/past-papers', label: 'Past Papers' },
  { href: '/formulas', label: 'Formulas' },
  { href: '/pricing', label: 'Pricing' },
]

export default function Nav() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.push('/')
  }

  const initials = user?.email ? user.email[0].toUpperCase() : ''

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-bg)]/95 backdrop-blur border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10 h-[68px] flex items-center justify-between">
        <Link href="/" className="shrink-0"><Logo size={16} /></Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 text-[14px] rounded-[6px] transition-colors ${
                isActive(l.href)
                  ? 'text-[color:var(--color-ink)] font-semibold'
                  : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className={`text-[14px] ${isActive('/dashboard') ? 'font-semibold text-[color:var(--color-ink)]' : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]'}`}>
                Dashboard
              </Link>
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[color:var(--color-ink)] text-white text-[13px] font-semibold">
                {initials}
              </div>
              <button onClick={handleSignOut} className="btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-[14px] text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]">Log in</Link>
              <Link href="/auth" className="btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
                Start for free <span aria-hidden>→</span>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden h-10 w-10 flex items-center justify-center text-[22px]"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[color:var(--color-rule)] bg-[color:var(--color-bg)]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-3 rounded-[6px] text-[15px] ${
                  isActive(l.href) ? 'bg-[color:var(--color-bg-alt)] font-semibold' : 'text-[color:var(--color-ink-2)]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="rule my-3" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-[15px]">Dashboard</Link>
                <button onClick={handleSignOut} className="btn-ghost mt-2 justify-center">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-[15px]">Log in</Link>
                <Link href="/auth" onClick={() => setMenuOpen(false)} className="btn-primary mt-2 justify-center">Start for free <span aria-hidden>→</span></Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
