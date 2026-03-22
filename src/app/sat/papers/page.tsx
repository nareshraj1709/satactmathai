'use client'

import { useState } from 'react'
import { HISTORICAL_SAT, AI_SAT_PAPERS } from '@/lib/papers-data'

export default function SATPapersPage() {
  const [tab, setTab] = useState<'previous' | 'ai'>('previous')
  const [yearFilter, setYearFilter] = useState<number | null>(null)

  const papers = tab === 'previous' ? HISTORICAL_SAT : AI_SAT_PAPERS
  const years = [...new Set(HISTORICAL_SAT.map(p => p.year!))].sort((a, b) => b - a)
  const filtered = yearFilter ? papers.filter(p => p.year === yearFilter) : papers

  const diffColors: Record<string, { bg: string; color: string }> = {
    Easy: { bg: '#ECFDF5', color: '#059669' },
    Medium: { bg: '#FFFBEB', color: '#D97706' },
    Hard: { bg: '#FEF2F2', color: '#DC2626' },
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800, background: '#2563EB', color: '#fff' }}>SAT</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: 0, fontFamily: 'Georgia, serif' }}>SAT Practice Papers</h1>
        </div>
        <p style={{ color: '#64748B', fontSize: 15, margin: '8px 0 24px' }}>Full-length SAT Math papers · 44 questions · 70 minutes</p>

        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '2px solid #E2E8F0' }}>
          {[{ key: 'previous', label: `Past Papers (${HISTORICAL_SAT.length})` }, { key: 'ai', label: `AI Papers (${AI_SAT_PAPERS.length})` }].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key as 'previous' | 'ai'); setYearFilter(null) }} style={{
              padding: '12px 24px', fontSize: 14, fontWeight: 700, border: 'none',
              borderBottom: tab === t.key ? '2px solid #2563EB' : '2px solid transparent',
              background: 'none', color: tab === t.key ? '#2563EB' : '#64748B', cursor: 'pointer', marginBottom: -2,
            }}>{t.label}</button>
          ))}
        </div>

        {tab === 'previous' && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            <button onClick={() => setYearFilter(null)} style={{ padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: !yearFilter ? '1.5px solid #2563EB' : '1.5px solid #E5E7EB', background: !yearFilter ? '#EFF6FF' : '#fff', color: !yearFilter ? '#2563EB' : '#64748B', cursor: 'pointer' }}>All</button>
            {years.map(y => (
              <button key={y} onClick={() => setYearFilter(y)} style={{ padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: yearFilter === y ? '1.5px solid #2563EB' : '1.5px solid #E5E7EB', background: yearFilter === y ? '#EFF6FF' : '#fff', color: yearFilter === y ? '#2563EB' : '#64748B', cursor: 'pointer' }}>{y}</button>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {filtered.map(p => (
            <a key={p.id} href={`/papers/${p.id}`} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #E2E8F0', textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#2563EB' }}>SAT</span>
                {p.difficulty && <span style={{ padding: '2px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: diffColors[p.difficulty]?.bg, color: diffColors[p.difficulty]?.color }}>{p.difficulty}</span>}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: '0 0 8px' }}>{p.year ? `${p.year} Test ${p.paperNumber}` : p.style}</h3>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748B' }}>
                <span>{p.questionCount} Qs</span><span>{p.timeMinutes} min</span><span>{p.type === 'ai' ? 'AI Generated' : 'Past Paper'}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
