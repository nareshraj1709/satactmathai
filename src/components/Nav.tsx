'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from './Logo'

export default function Nav() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [satOpen, setSatOpen] = useState(false)
  const [actOpen, setActOpen] = useState(false)
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = () => { setSatOpen(false); setActOpen(false) }
    if (satOpen || actOpen) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [satOpen, actOpen])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const isSatActive = pathname.startsWith('/sat')
  const isActActive = pathname.startsWith('/act')

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const initials = user?.email ? user.email[0].toUpperCase() : ''

  const satLinks = [
    { href: '/sat/study', label: 'Study Notes', icon: '📖' },
    { href: '/sat/practice', label: 'Quick Practice', icon: '⚡' },
    { href: '/sat/sections', label: 'Topic Tests', icon: '📝' },
    { href: '/sat/papers', label: 'Practice Papers', icon: '📋' },
  ]

  const actLinks = [
    { href: '/act/study', label: 'Study Notes', icon: '📖' },
    { href: '/act/practice', label: 'Quick Practice', icon: '⚡' },
    { href: '/act/sections', label: 'Topic Tests', icon: '📝' },
    { href: '/act/papers', label: 'Practice Papers', icon: '📋' },
  ]

  const dropdownStyle = {
    position: 'absolute' as const, top: '100%', left: 0, marginTop: 4,
    background: '#fff', borderRadius: 12, padding: 8,
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid #E2E8F0',
    minWidth: 200, zIndex: 200,
  }

  const dropdownItemStyle = (active: boolean) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600 as const,
    color: active ? '#2563EB' : '#374151',
    background: active ? '#EFF6FF' : 'transparent',
    textDecoration: 'none', transition: 'all 0.15s',
  })

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
          {user && (
            <a href="/dashboard" style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              color: isActive('/dashboard') ? '#2563EB' : '#374151',
              background: isActive('/dashboard') ? '#EFF6FF' : 'transparent',
              textDecoration: 'none',
            }}>Dashboard</a>
          )}

          {/* SAT Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={e => { e.stopPropagation(); setSatOpen(!satOpen); setActOpen(false) }}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                color: isSatActive ? '#fff' : '#2563EB',
                background: isSatActive ? '#2563EB' : 'transparent',
                border: isSatActive ? 'none' : '1.5px solid #2563EB',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              SAT <span style={{ fontSize: 10 }}>{satOpen ? '▲' : '▼'}</span>
            </button>
            {satOpen && (
              <div style={dropdownStyle} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 }}>SAT Math</div>
                {satLinks.map(l => (
                  <a key={l.href} href={l.href} style={dropdownItemStyle(isActive(l.href))} onClick={() => setSatOpen(false)}>
                    <span>{l.icon}</span> {l.label}
                  </a>
                ))}
                <div style={{ borderTop: '1px solid #E2E8F0', margin: '6px 0' }} />
                <a href="/formula-sheet" style={dropdownItemStyle(isActive('/formula-sheet'))} onClick={() => setSatOpen(false)}>
                  <span>📐</span> Formula Sheet
                </a>
              </div>
            )}
          </div>

          {/* ACT Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={e => { e.stopPropagation(); setActOpen(!actOpen); setSatOpen(false) }}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                color: isActActive ? '#fff' : '#D97706',
                background: isActActive ? '#D97706' : 'transparent',
                border: isActActive ? 'none' : '1.5px solid #D97706',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              ACT <span style={{ fontSize: 10 }}>{actOpen ? '▲' : '▼'}</span>
            </button>
            {actOpen && (
              <div style={dropdownStyle} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 }}>ACT Math</div>
                {actLinks.map(l => (
                  <a key={l.href} href={l.href} style={dropdownItemStyle(isActive(l.href))} onClick={() => setActOpen(false)}>
                    <span>{l.icon}</span> {l.label}
                  </a>
                ))}
                <div style={{ borderTop: '1px solid #E2E8F0', margin: '6px 0' }} />
                <a href="/formula-sheet" style={dropdownItemStyle(isActive('/formula-sheet'))} onClick={() => setActOpen(false)}>
                  <span>📐</span> Formula Sheet
                </a>
              </div>
            )}
          </div>

          {!user && (
            <>
              <a href="/blog" style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                color: isActive('/blog') ? '#2563EB' : '#374151',
                background: isActive('/blog') ? '#EFF6FF' : 'transparent',
                textDecoration: 'none',
              }}>Blog</a>
            </>
          )}

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
            maxHeight: 'calc(100vh - 64px)', overflowY: 'auto',
          }} onClick={e => e.stopPropagation()}>
            {user && (
              <a href="/dashboard" style={{
                padding: '12px 16px', borderRadius: 8, fontSize: 16, fontWeight: 600,
                color: isActive('/dashboard') ? '#2563EB' : '#374151',
                background: isActive('/dashboard') ? '#EFF6FF' : 'transparent',
                textDecoration: 'none',
              }}>Dashboard</a>
            )}

            {/* SAT Section */}
            <div style={{ padding: '12px 16px 4px', fontSize: 12, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>SAT Math</div>
            {satLinks.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: '10px 16px 10px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600,
                color: isActive(l.href) ? '#2563EB' : '#374151',
                background: isActive(l.href) ? '#EFF6FF' : 'transparent',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10,
              }}><span>{l.icon}</span> {l.label}</a>
            ))}

            {/* ACT Section */}
            <div style={{ padding: '12px 16px 4px', fontSize: 12, fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>ACT Math</div>
            {actLinks.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: '10px 16px 10px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600,
                color: isActive(l.href) ? '#D97706' : '#374151',
                background: isActive(l.href) ? '#FFFBEB' : 'transparent',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10,
              }}><span>{l.icon}</span> {l.label}</a>
            ))}

            <div style={{ borderTop: '1px solid #E2E8F0', margin: '8px 0' }} />
            <a href="/formula-sheet" style={{ padding: '12px 16px', borderRadius: 8, fontSize: 15, fontWeight: 600, color: '#374151', textDecoration: 'none' }}>📐 Formula Sheet</a>
            <a href="/blog" style={{ padding: '12px 16px', borderRadius: 8, fontSize: 15, fontWeight: 600, color: '#374151', textDecoration: 'none' }}>📰 Blog</a>

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
