'use client'

import { useState } from 'react'
import { HISTORICAL_SAT, HISTORICAL_ACT, AI_SAT_PAPERS, AI_ACT_PAPERS } from '@/lib/papers-data'

export default function PapersPage() {
  const [tab, setTab] = useState<'previous' | 'ai'>('previous')
  const [exam, setExam] = useState<'SAT' | 'ACT'>('SAT')
  const [yearFilter, setYearFilter] = useState<number | null>(null)

  const historical = exam === 'SAT' ? HISTORICAL_SAT : HISTORICAL_ACT
  const aiPapers = exam === 'SAT' ? AI_SAT_PAPERS : AI_ACT_PAPERS

  const papers = tab === 'previous' ? historical : aiPapers
  const years = [...new Set(historical.map(p => p.year!))].sort((a, b) => b - a)
  const filtered = yearFilter ? papers.filter(p => p.year === yearFilter) : papers

  const diffColors: Record<string, { bg: string; color: string }> = {
    Easy: { bg: '#ECFDF5', color: '#059669' },
    Medium: { bg: '#FFFBEB', color: '#D97706' },
    Hard: { bg: '#FEF2F2', color: '#DC2626' },
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>Practice Papers</h1>
        <p style={{ color: '#64748B', fontSize: 16, margin: '0 0 24px' }}>Full-length timed papers with AI marking</p>

        {/* Exam toggle */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {(['SAT', 'ACT'] as const).map(e => (
            <button key={e} onClick={() => { setExam(e); setYearFilter(null) }} style={{
              padding: '8px 24px', borderRadius: 8, fontSize: 15, fontWeight: 700,
              border: exam === e ? '2px solid #2563EB' : '2px solid #E5E7EB',
              background: exam === e ? '#EFF6FF' : '#fff',
              color: exam === e ? '#2563EB' : '#374151',
              cursor: 'pointer',
            }}>{e}</button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '2px solid #E2E8F0' }}>
          {[
            { key: 'previous', label: `Previous Papers (${historical.length})` },
            { key: 'ai', label: `AI Practice Papers (${aiPapers.length})` },
          ].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key as 'previous' | 'ai'); setYearFilter(null) }} style={{
              padding: '12px 24px', fontSize: 14, fontWeight: 700,
              border: 'none', borderBottom: tab === t.key ? '2px solid #2563EB' : '2px solid transparent',
              background: 'none', color: tab === t.key ? '#2563EB' : '#64748B',
              cursor: 'pointer', marginBottom: -2,
            }}>{t.label}</button>
          ))}
        </div>

        {/* Year filter for historical */}
        {tab === 'previous' && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            <button onClick={() => setYearFilter(null)} style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              border: !yearFilter ? '1.5px solid #2563EB' : '1.5px solid #E5E7EB',
              background: !yearFilter ? '#EFF6FF' : '#fff',
              color: !yearFilter ? '#2563EB' : '#64748B',
              cursor: 'pointer',
            }}>All Years</button>
            {years.map(y => (
              <button key={y} onClick={() => setYearFilter(y)} style={{
                padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                border: yearFilter === y ? '1.5px solid #2563EB' : '1.5px solid #E5E7EB',
                background: yearFilter === y ? '#EFF6FF' : '#fff',
                color: yearFilter === y ? '#2563EB' : '#64748B',
                cursor: 'pointer',
              }}>{y}</button>
            ))}
          </div>
        )}

        {/* Papers grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {filtered.map(p => (
            <a key={p.id} href={`/papers/${p.id}`} style={{
              background: '#fff', borderRadius: 14, padding: 20,
              border: '1px solid #E2E8F0', textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#2563EB' }}>{p.exam}</span>
                {p.difficulty && (
                  <span style={{
                    padding: '2px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                    background: diffColors[p.difficulty]?.bg, color: diffColors[p.difficulty]?.color,
                  }}>{p.difficulty}</span>
                )}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: '0 0 8px' }}>
                {p.year ? `${p.year} Test ${p.paperNumber}` : p.style}
              </h3>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748B' }}>
                <span>{p.questionCount} Qs</span>
                <span>{p.timeMinutes} min</span>
                <span>{p.type === 'ai' ? 'AI Generated' : 'Past Paper'}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
