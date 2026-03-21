'use client'

import { useState } from 'react'
import { SECTIONS } from '@/lib/sections-data'

export default function SectionsPage() {
  const [filter, setFilter] = useState<'All' | 'SAT' | 'ACT'>('All')

  const filtered = SECTIONS.filter(s => {
    if (filter === 'All') return true
    if (filter === 'SAT') return s.tier === 'Both' || s.tier === 'SAT'
    return true // ACT includes everything
  })

  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.topic]) acc[s.topic] = []
    acc[s.topic].push(s)
    return acc
  }, {} as Record<string, typeof SECTIONS>)

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
          Topic Tests
        </h1>
        <p style={{ color: '#64748B', fontSize: 16, margin: '0 0 24px' }}>
          10 AI-generated questions per topic with instant marking
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          {(['All', 'SAT', 'ACT'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700,
              border: filter === f ? '2px solid #2563EB' : '2px solid #E5E7EB',
              background: filter === f ? '#EFF6FF' : '#fff',
              color: filter === f ? '#2563EB' : '#374151',
              cursor: 'pointer',
            }}>{f}</button>
          ))}
        </div>

        {Object.entries(grouped).map(([topic, sections]) => (
          <div key={topic} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: sections[0].color, margin: '0 0 16px' }}>
              {topic}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {sections.map(s => (
                <a key={s.id} href={`/sections/${s.id}`} style={{
                  background: s.bgColor, borderRadius: 14, padding: 20,
                  border: `1.5px solid ${s.borderColor}`,
                  textDecoration: 'none', transition: 'transform 0.15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.name}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.5 }}>{s.description}</p>
                  {s.tier !== 'Both' && (
                    <span style={{
                      display: 'inline-block', marginTop: 8, padding: '2px 8px',
                      borderRadius: 6, fontSize: 11, fontWeight: 700,
                      background: s.tier === 'ACT' ? '#FDE68A' : '#BFDBFE',
                      color: s.tier === 'ACT' ? '#92400E' : '#1E40AF',
                    }}>{s.tier} only</span>
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
