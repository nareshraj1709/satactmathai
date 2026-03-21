'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from './Logo'

export default function Nav() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const loggedInLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/study', label: 'Study' },
    { href: '/practice', label: 'Practice' },
    { href: '/sections', label: 'Topic Tests' },
    { href: '/papers', label: 'Papers' },
  ]

  const loggedOutLinks = [
    { href: '/study', label: 'Topics' },
    { href: '/formula-sheet', label: 'Formulas' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ]

  const links = user ? loggedInLinks : loggedOutLinks

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const initials = user?.email ? user.email[0].toUpperCase() : ''

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: '1px solid #E5E7EB',
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.2s',
      }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo size={36} nameSize={18} /></a>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              color: isActive(l.href) ? '#2563EB' : '#374151',
              background: isActive(l.href) ? '#EFF6FF' : 'transparent',
              textDecoration: 'none', transition: 'all 0.15s',
            }}>{l.label}</a>
          ))}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
              }}>{initials}</div>
              <button onClick={handleSignOut} style={{
                padding: '8px 16px', borderRadius: 8, border: '1px solid #E5E7EB',
                background: '#fff', color: '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>Sign Out</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
              <a href="/auth" style={{
                padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                color: '#fff', background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                textDecoration: 'none',
              }}>Sign In</a>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="show-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', padding: 8,
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: 'rgba(0,0,0,0.3)',
        }} onClick={() => setMenuOpen(false)}>
          <div style={{
            background: '#fff', padding: 20, display: 'flex', flexDirection: 'column', gap: 4,
          }} onClick={e => e.stopPropagation()}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: '12px 16px', borderRadius: 8, fontSize: 16, fontWeight: 600,
                color: isActive(l.href) ? '#2563EB' : '#374151',
                background: isActive(l.href) ? '#EFF6FF' : 'transparent',
                textDecoration: 'none',
              }}>{l.label}</a>
            ))}
            {user ? (
              <button onClick={handleSignOut} style={{
                padding: '12px 16px', borderRadius: 8, border: '1px solid #E5E7EB',
                background: '#fff', color: '#374151', fontSize: 16, fontWeight: 600, cursor: 'pointer',
                marginTop: 8,
              }}>Sign Out</button>
            ) : (
              <a href="/auth" style={{
                padding: '12px 16px', borderRadius: 8, fontSize: 16, fontWeight: 700,
                color: '#fff', background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                textDecoration: 'none', textAlign: 'center', marginTop: 8,
              }}>Sign In</a>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
