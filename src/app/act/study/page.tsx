'use client'

import { useState } from 'react'
import { SAT_CONTENT, ACT_ADDITIONAL_CONTENT } from '@/lib/study-content'

// ACT covers all SAT content PLUS additional ACT-specific topics
// Reorganized into official ACT categories
const ACT_CATEGORIES = [
  {
    name: 'Pre-Algebra',
    color: '#D97706', bg: '#FFFBEB', border: '#FDE68A',
    description: '20-25% of ACT Math · 12-15 questions',
    slugs: ['number-properties-operations', 'fractions-decimals-scientific-notation', 'ratios-rates-proportions', 'percentages-percent-change'],
  },
  {
    name: 'Elementary Algebra',
    color: '#DC2626', bg: '#FEF2F2', border: '#FECACA',
    description: '15-20% of ACT Math · 9-12 questions',
    slugs: ['linear-equations-one-variable', 'linear-inequalities', 'absolute-value-equations'],
  },
  {
    name: 'Intermediate Algebra',
    color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
    description: '15-20% of ACT Math · 9-12 questions',
    slugs: ['linear-equations-two-variables', 'systems-linear-equations', 'quadratic-equations', 'polynomials', 'exponential-functions', 'radical-rational-equations', 'functions-notation', 'matrices-act'],
  },
  {
    name: 'Coordinate Geometry',
    color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE',
    description: '15-20% of ACT Math · 9-12 questions',
    slugs: ['coordinate-geometry', 'conic-sections-parabolas'],
  },
  {
    name: 'Plane Geometry',
    color: '#059669', bg: '#ECFDF5', border: '#A7F3D0',
    description: '20-25% of ACT Math · 12-15 questions',
    slugs: ['geometry-lines-angles-triangles', 'circles', 'area-volume-3d-shapes'],
  },
  {
    name: 'Trigonometry',
    color: '#EC4899', bg: '#FDF2F8', border: '#FBCFE8',
    description: '5-10% of ACT Math · 3-6 questions',
    slugs: ['trigonometry', 'complex-numbers', 'graphs-trig-functions', 'law-sines-cosines'],
  },
]

export default function ACTStudyPage() {
  const [search, setSearch] = useState('')

  // Build a map of all subtopics by slug
  const allSubtopics = [...SAT_CONTENT, ...ACT_ADDITIONAL_CONTENT].flatMap(s => s.subtopics)
  const subtopicMap = new Map(allSubtopics.map(s => [s.slug, s]))

  const filtered = ACT_CATEGORIES.map(cat => ({
    ...cat,
    subtopics: cat.slugs
      .map(slug => subtopicMap.get(slug))
      .filter((s): s is NonNullable<typeof s> => !!s)
      .filter(s => s.name.toLowerCase().includes(search.toLowerCase())),
  })).filter(c => c.subtopics.length > 0)

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800,
            background: '#D97706', color: '#fff',
          }}>ACT</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>
            ACT Math Study Notes
          </h1>
        </div>
        <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 24px' }}>
          Official ACT Math content areas · 60 questions in 60 minutes
        </p>

        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search topics..."
          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '2px solid #E5E7EB', fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 32 }}
        />

        {/* ACT overview */}
        <div style={{
          background: '#FFFBEB', borderRadius: 14, padding: 20, border: '1px solid #FDE68A', marginBottom: 32,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#D97706', margin: '0 0 12px' }}>ACT Math Section Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {ACT_CATEGORIES.map(c => (
              <div key={c.name} style={{ fontSize: 13, color: '#1E293B' }}>
                <div style={{ fontWeight: 700, color: c.color }}>{c.name}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>{c.description}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '8px 12px', background: '#FEF3C7', borderRadius: 8, fontSize: 13, color: '#92400E', fontWeight: 600 }}>
            ⚠️ Unlike the SAT, the ACT does NOT provide any formulas. You must memorize them all!
          </div>
        </div>

        {filtered.map(cat => (
          <div key={cat.name} style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, background: cat.color }} />
              <h2 style={{ fontSize: 22, fontWeight: 700, color: cat.color, margin: 0 }}>{cat.name}</h2>
              <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>{cat.description}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {cat.subtopics.map(sub => (
                <a key={sub.slug} href={`/study/${sub.slug}`} style={{
                  background: '#fff', borderRadius: 12, padding: 20,
                  border: `1.5px solid ${cat.border}`, textDecoration: 'none',
                  borderLeft: `4px solid ${cat.color}`,
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
