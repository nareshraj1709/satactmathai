'use client'

import { useState } from 'react'
import { ALL_CONTENT, toSlug } from '@/lib/study-content'

export default function StudyPage() {
  const [examFilter, setExamFilter] = useState<'All' | 'SAT' | 'ACT'>('All')
  const [search, setSearch] = useState('')

  const satTopics = ['Heart of Algebra', 'Problem Solving & Data Analysis', 'Passport to Advanced Math', 'Additional Topics in Math']
  const actTopics = ['Pre-Algebra (ACT)', 'Elementary Algebra (ACT)', 'Plane & Coordinate Geometry (ACT)', 'Trigonometry (ACT)']

  const filteredContent = ALL_CONTENT.filter(section => {
    if (examFilter === 'SAT') return satTopics.includes(section.topic)
    if (examFilter === 'ACT') return true // ACT covers everything
    return true
  }).map(section => ({
    ...section,
    subtopics: section.subtopics.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.subtopics.length > 0)

  const topicColors: Record<string, string> = {
    'Heart of Algebra': '#2563EB',
    'Problem Solving & Data Analysis': '#059669',
    'Passport to Advanced Math': '#7C3AED',
    'Additional Topics in Math': '#DC2626',
    'Pre-Algebra (ACT)': '#D97706',
    'Elementary Algebra (ACT)': '#D97706',
    'Plane & Coordinate Geometry (ACT)': '#D97706',
    'Trigonometry (ACT)': '#D97706',
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
          Study Notes
        </h1>
        <p style={{ color: '#64748B', fontSize: 16, margin: '0 0 24px' }}>
          Master every topic with detailed notes and video resources
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {(['All', 'SAT', 'ACT'] as const).map(f => (
            <button key={f} onClick={() => setExamFilter(f)} style={{
              padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700,
              border: examFilter === f ? '2px solid #2563EB' : '2px solid #E5E7EB',
              background: examFilter === f ? '#EFF6FF' : '#fff',
              color: examFilter === f ? '#2563EB' : '#374151',
              cursor: 'pointer',
            }}>{f}</button>
          ))}
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search topics..."
            style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid #E5E7EB', fontSize: 14, flex: 1, minWidth: 200, outline: 'none' }}
          />
        </div>

        {/* Topics */}
        {filteredContent.map(section => (
          <div key={section.topic} style={{ marginBottom: 32 }}>
            <h2 style={{
              fontSize: 20, fontWeight: 700, margin: '0 0 16px',
              color: topicColors[section.topic] || '#1E293B',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 12, height: 12, borderRadius: 3,
                background: topicColors[section.topic] || '#64748B',
              }} />
              {section.topic}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {section.subtopics.map(sub => (
                <a key={sub.slug} href={`/study/${sub.slug}`} style={{
                  background: '#fff', borderRadius: 12, padding: 20,
                  border: '1px solid #E2E8F0', textDecoration: 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>{sub.name}</h3>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
                    {sub.notes.split('\n').find(l => l.startsWith('##'))?.replace('## ', '') || 'Study notes & practice'}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
