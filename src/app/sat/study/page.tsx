'use client'

import { useState } from 'react'
import { SAT_CONTENT } from '@/lib/study-content'

const topicColors: Record<string, { color: string; bg: string; border: string }> = {
  'Heart of Algebra': { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  'Problem Solving & Data Analysis': { color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  'Passport to Advanced Math': { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  'Additional Topics in Math': { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
}

export default function SATStudyPage() {
  const [search, setSearch] = useState('')

  const filtered = SAT_CONTENT.map(section => ({
    ...section,
    subtopics: section.subtopics.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.subtopics.length > 0)

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800,
            background: '#2563EB', color: '#fff',
          }}>SAT</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>
            SAT Math Study Notes
          </h1>
        </div>
        <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 24px' }}>
          Official SAT Math domains as defined by the College Board
        </p>

        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search topics..."
          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '2px solid #E5E7EB', fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 32 }}
        />

        {/* Official SAT Domain breakdown */}
        <div style={{
          background: '#EFF6FF', borderRadius: 14, padding: 20, border: '1px solid #BFDBFE', marginBottom: 32,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#2563EB', margin: '0 0 12px' }}>SAT Math Section Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { name: 'Heart of Algebra', pct: '33%', qs: '~19 questions' },
              { name: 'Problem Solving & Data Analysis', pct: '29%', qs: '~17 questions' },
              { name: 'Passport to Advanced Math', pct: '28%', qs: '~16 questions' },
              { name: 'Additional Topics', pct: '10%', qs: '~6 questions' },
            ].map(d => (
              <div key={d.name} style={{ fontSize: 13, color: '#1E293B' }}>
                <div style={{ fontWeight: 700 }}>{d.name}</div>
                <div style={{ color: '#64748B' }}>{d.pct} of test · {d.qs}</div>
              </div>
            ))}
          </div>
        </div>

        {filtered.map(section => {
          const colors = topicColors[section.topic] || { color: '#1E293B', bg: '#F8FAFC', border: '#E2E8F0' }
          return (
            <div key={section.topic} style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: colors.color }} />
                <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.color, margin: 0 }}>{section.topic}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                {section.subtopics.map(sub => (
                  <a key={sub.slug} href={`/study/${sub.slug}`} style={{
                    background: '#fff', borderRadius: 12, padding: 20,
                    border: `1.5px solid ${colors.border}`, textDecoration: 'none',
                    borderLeft: `4px solid ${colors.color}`,
                  }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>{sub.name}</h3>
                    <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
                      {sub.notes.split('\n').find(l => l.startsWith('##'))?.replace('## ', '') || 'Study notes & practice'}
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
