import { Metadata } from 'next'
import { getAllContentPages } from '@/lib/content-loader'

export const metadata: Metadata = {
  title: 'SAT Math Study Notes — All Topics | satactmathai.com',
  description: 'Free SAT Math study notes covering all 4 official College Board domains: Algebra, Advanced Math, Problem Solving & Data Analysis, Geometry & Trigonometry.',
  keywords: ['SAT math study notes', 'SAT math topics', 'SAT math prep', 'Digital SAT', 'College Board', 'SAT algebra', 'SAT geometry'],
  alternates: { canonical: 'https://www.satactmathai.com/sat/study' },
  openGraph: {
    title: 'SAT Math Study Notes — All Topics',
    description: 'Free SAT Math study notes covering all 4 official College Board domains.',
    url: 'https://www.satactmathai.com/sat/study',
    siteName: 'SAT ACT MathAI',
    type: 'website',
  },
}

const DOMAIN_META: Record<string, { label: string; color: string; bg: string; border: string; pct: string; qs: string }> = {
  'algebra': { label: 'Algebra', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', pct: '~35%', qs: '~13-15 questions' },
  'advanced-math': { label: 'Advanced Math', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', pct: '~35%', qs: '~13-15 questions' },
  'problem-solving-data-analysis': { label: 'Problem Solving & Data Analysis', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', pct: '~15%', qs: '~5-7 questions' },
  'geometry-trigonometry': { label: 'Geometry & Trigonometry', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', pct: '~15%', qs: '~5-7 questions' },
}

export default function SATStudyPage() {
  const pages = getAllContentPages('sat')

  // Group by domain
  const grouped: Record<string, typeof pages> = {}
  for (const p of pages) {
    if (!grouped[p.domainSlug]) grouped[p.domainSlug] = []
    grouped[p.domainSlug].push(p)
  }

  const domainOrder = ['algebra', 'advanced-math', 'problem-solving-data-analysis', 'geometry-trigonometry']

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800, background: '#2563EB', color: '#fff' }}>SAT</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>SAT Math Study Notes</h1>
        </div>
        <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 24px' }}>
          Complete study guides for all 4 official Digital SAT Math domains — {pages.length} topics
        </p>

        {/* Overview card */}
        <div style={{ background: '#EFF6FF', borderRadius: 14, padding: 20, border: '1px solid #BFDBFE', marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#2563EB', margin: '0 0 12px' }}>Digital SAT Math Section Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {domainOrder.map(d => {
              const meta = DOMAIN_META[d]
              return (
                <div key={d} style={{ fontSize: 13 }}>
                  <div style={{ fontWeight: 700, color: meta.color }}>{meta.label}</div>
                  <div style={{ color: '#64748B' }}>{meta.pct} · {meta.qs}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Topic lists by domain */}
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
