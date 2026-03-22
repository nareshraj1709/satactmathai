'use client'

import { SECTIONS } from '@/lib/sections-data'

export default function SATSectionsPage() {
  const filtered = SECTIONS.filter(s => s.tier === 'Both' || s.tier === 'SAT')
  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.topic]) acc[s.topic] = []
    acc[s.topic].push(s)
    return acc
  }, {} as Record<string, typeof SECTIONS>)

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800, background: '#2563EB', color: '#fff' }}>SAT</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>SAT Topic Tests</h1>
        </div>
        <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 32px' }}>10 AI-generated SAT-style questions per topic</p>

        {Object.entries(grouped).map(([topic, sections]) => (
          <div key={topic} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: sections[0].color, margin: '0 0 16px' }}>{topic}</h2>
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
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
