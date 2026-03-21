'use client'

import { use } from 'react'
import { ALL_CONTENT } from '@/lib/study-content'

function renderNotes(notes: string) {
  return notes.split('\n').map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return <br key={i} />

    // Formula blocks
    const formulaMatch = trimmed.match(/^\[FORMULA: (.+)\]$/)
    if (formulaMatch) {
      return <div key={i} className="formula-block">{formulaMatch[1]}</div>
    }

    // Answer blocks
    const answerMatch = trimmed.match(/^\[ANSWER: (.+)\]$/)
    if (answerMatch) {
      return <div key={i} className="answer-block">{answerMatch[1]}</div>
    }

    // Headings
    if (trimmed.startsWith('# ')) return <h1 key={i} style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', margin: '24px 0 12px', fontFamily: 'Georgia, serif' }}>{trimmed.slice(2)}</h1>
    if (trimmed.startsWith('## ')) return <h2 key={i} style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', margin: '20px 0 10px' }}>{trimmed.slice(3)}</h2>
    if (trimmed.startsWith('### ')) return <h3 key={i} style={{ fontSize: 18, fontWeight: 600, color: '#374151', margin: '16px 0 8px' }}>{trimmed.slice(4)}</h3>

    // Bold text
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/)
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>
      }
      return part
    })

    // List items
    if (trimmed.startsWith('- ')) return <li key={i} style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginLeft: 20 }}>{rendered.slice(0).map((r, ri) => typeof r === 'string' ? r.replace(/^- /, '') : r)}</li>
    if (/^\d+\. /.test(trimmed)) return <li key={i} style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginLeft: 20, listStyleType: 'decimal' }}>{rendered}</li>

    return <p key={i} style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: '8px 0' }}>{rendered}</p>
  })
}

export default function StudyTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  let subtopic = null
  let parentTopic = ''
  for (const section of ALL_CONTENT) {
    const found = section.subtopics.find(s => s.slug === slug)
    if (found) {
      subtopic = found
      parentTopic = section.topic
      break
    }
  }

  if (!subtopic) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1E293B' }}>Topic not found</h1>
          <a href="/study" style={{ color: '#2563EB', fontWeight: 600 }}>← Back to topics</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <a href="/study" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>← Back to topics</a>
        <div style={{ color: '#64748B', fontSize: 13, marginTop: 8, marginBottom: 4 }}>{parentTopic}</div>

        <div style={{ display: 'flex', gap: 32 }}>
          {/* Main content */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #E2E8F0', marginTop: 16 }}>
            {renderNotes(subtopic.notes)}
          </div>

          {/* Video sidebar */}
          {subtopic.videoSearchTerms.length > 0 && (
            <div style={{ width: 280, flexShrink: 0, marginTop: 16 }}>
              <div style={{ position: 'sticky', top: 80 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', margin: '0 0 12px' }}>Video Resources</h3>
                {subtopic.videoSearchTerms.map((term, i) => (
                  <a
                    key={i}
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(term)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block', padding: '12px 16px', borderRadius: 10,
                      background: '#fff', border: '1px solid #E2E8F0',
                      textDecoration: 'none', marginBottom: 8,
                      fontSize: 13, fontWeight: 600, color: '#DC2626',
                    }}
                  >
                    ▶ {term}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
