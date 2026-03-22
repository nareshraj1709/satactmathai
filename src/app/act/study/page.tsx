import { Metadata } from 'next'
import { getAllContentPages } from '@/lib/content-loader'

export const metadata: Metadata = {
  title: 'ACT Math Study Notes — All Topics | satactmathai.com',
  description: 'Free ACT Math study notes covering all 6 official ACT categories: Pre-Algebra, Elementary Algebra, Intermediate Algebra, Coordinate Geometry, Plane Geometry, Trigonometry.',
  keywords: ['ACT math study notes', 'ACT math topics', 'ACT math prep', 'ACT test', 'ACT math practice'],
  alternates: { canonical: 'https://www.satactmathai.com/act/study' },
  openGraph: {
    title: 'ACT Math Study Notes — All Topics',
    description: 'Free ACT Math study notes covering all 6 official ACT Math categories.',
    url: 'https://www.satactmathai.com/act/study',
    siteName: 'SAT ACT MathAI',
    type: 'website',
  },
}

const DOMAIN_META: Record<string, { label: string; color: string; bg: string; border: string; pct: string }> = {
  'pre-algebra': { label: 'Pre-Algebra', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', pct: '20-25% · 12-15 Qs' },
  'elementary-algebra': { label: 'Elementary Algebra', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', pct: '15-20% · 9-12 Qs' },
  'intermediate-algebra': { label: 'Intermediate Algebra', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', pct: '15-20% · 9-12 Qs' },
  'coordinate-geometry': { label: 'Coordinate Geometry', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', pct: '15-20% · 9-12 Qs' },
  'plane-geometry': { label: 'Plane Geometry', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', pct: '20-25% · 12-15 Qs' },
  'trigonometry': { label: 'Trigonometry', color: '#EC4899', bg: '#FDF2F8', border: '#FBCFE8', pct: '5-10% · 3-6 Qs' },
}

export default function ACTStudyPage() {
  const pages = getAllContentPages('act')

  const grouped: Record<string, typeof pages> = {}
  for (const p of pages) {
    if (!grouped[p.domainSlug]) grouped[p.domainSlug] = []
    grouped[p.domainSlug].push(p)
  }

  const domainOrder = ['pre-algebra', 'elementary-algebra', 'intermediate-algebra', 'coordinate-geometry', 'plane-geometry', 'trigonometry']

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800, background: '#D97706', color: '#fff' }}>ACT</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>ACT Math Study Notes</h1>
        </div>
        <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 24px' }}>
          Complete study guides for all 6 official ACT Math categories — {pages.length} topics · 60 questions in 60 minutes
        </p>

        {/* Warning about no formulas */}
        <div style={{ background: '#FEF3C7', borderRadius: 14, padding: 16, border: '1px solid #FDE68A', marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <span style={{ fontSize: 14, color: '#92400E', fontWeight: 600 }}>Unlike the SAT, the ACT does NOT provide any formulas. You must memorize them all!</span>
        </div>

        {/* Overview card */}
        <div style={{ background: '#FFFBEB', borderRadius: 14, padding: 20, border: '1px solid #FDE68A', marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#D97706', margin: '0 0 12px' }}>ACT Math Section Overview — 60 Questions, 60 Minutes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {domainOrder.map(d => {
              const meta = DOMAIN_META[d]
              return (
                <div key={d} style={{ fontSize: 13 }}>
                  <div style={{ fontWeight: 700, color: meta.color }}>{meta.label}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>{meta.pct}</div>
                </div>
              )
            })}
          </div>
        </div>

        {domainOrder.map(domain => {
          const meta = DOMAIN_META[domain]
          const domainPages = grouped[domain] || []
          return (
            <div key={domain} style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: meta.color }} />
                <h2 style={{ fontSize: 22, fontWeight: 700, color: meta.color, margin: 0 }}>{meta.label}</h2>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{meta.pct} · {domainPages.length} topics</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                {domainPages.map(p => (
                  <a key={p.slug} href={p.fullSlug} style={{
                    background: '#fff', borderRadius: 12, padding: 20,
                    border: `1.5px solid ${meta.border}`, textDecoration: 'none',
                    borderLeft: `4px solid ${meta.color}`,
                  }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>
                      {p.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </h3>
                    <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      {p.metaDescription.slice(0, 100)}{p.metaDescription.length > 100 ? '...' : ''}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
