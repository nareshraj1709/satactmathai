'use client'

import { SECTIONS } from '@/lib/sections-data'

// Regroup sections into official ACT categories
const ACT_CATEGORY_MAP: Record<string, string> = {
  'Heart of Algebra': 'Elementary & Intermediate Algebra',
  'Problem Solving & Data Analysis': 'Pre-Algebra',
  'Passport to Advanced Math': 'Intermediate Algebra',
  'Additional Topics': 'Plane Geometry & Trigonometry',
  'Pre-Algebra (ACT)': 'Pre-Algebra',
  'Elementary Algebra (ACT)': 'Elementary Algebra',
  'Geometry (ACT)': 'Coordinate & Plane Geometry',
  'Trigonometry (ACT)': 'Trigonometry',
}

const CATEGORY_COLORS: Record<string, string> = {
  'Pre-Algebra': '#D97706',
  'Elementary Algebra': '#DC2626',
  'Elementary & Intermediate Algebra': '#7C3AED',
  'Intermediate Algebra': '#7C3AED',
  'Coordinate & Plane Geometry': '#059669',
  'Plane Geometry & Trigonometry': '#2563EB',
  'Trigonometry': '#EC4899',
}

export default function ACTSectionsPage() {
  // Include all sections for ACT (ACT covers everything)
  const grouped = SECTIONS.reduce((acc, s) => {
    const cat = ACT_CATEGORY_MAP[s.topic] || s.topic
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {} as Record<string, typeof SECTIONS>)

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800, background: '#D97706', color: '#fff' }}>ACT</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>ACT Topic Tests</h1>
        </div>
        <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 32px' }}>10 AI-generated ACT-style questions per topic</p>

        {Object.entries(grouped).map(([cat, sections]) => (
          <div key={cat} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: CATEGORY_COLORS[cat] || '#1E293B', margin: '0 0 16px' }}>{cat}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {sections.map(s => (
                <a key={s.id} href={`/sections/${s.id}`} style={{
                  background: s.bgColor, borderRadius: 14, padding: 20,
                  border: `1.5px solid ${s.borderColor}`, textDecoration: 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.name}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.5 }}>{s.description}</p>
                  {s.tier === 'ACT' && (
                    <span style={{ display: 'inline-block', marginTop: 8, padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: '#FDE68A', color: '#92400E' }}>ACT only</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
