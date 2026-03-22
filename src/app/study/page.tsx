'use client'

export default function StudyPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1E293B', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
          Choose Your Test
        </h1>
        <p style={{ color: '#64748B', fontSize: 16, margin: '0 0 48px' }}>
          Study notes organized by official test topics
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 500, margin: '0 auto' }}>
          <a href="/sat/study" style={{
            background: '#EFF6FF', borderRadius: 20, padding: 40,
            border: '2px solid #BFDBFE', textDecoration: 'none',
            transition: 'transform 0.15s, border-color 0.15s',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📘</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#2563EB', margin: '0 0 8px' }}>SAT</h2>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              4 official domains<br />58 questions · 70 min
            </p>
            <div style={{ marginTop: 16, fontSize: 13, color: '#2563EB', fontWeight: 700 }}>
              Study SAT Math →
            </div>
          </a>

          <a href="/act/study" style={{
            background: '#FFFBEB', borderRadius: 20, padding: 40,
            border: '2px solid #FDE68A', textDecoration: 'none',
            transition: 'transform 0.15s, border-color 0.15s',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📙</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#D97706', margin: '0 0 8px' }}>ACT</h2>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              6 official categories<br />60 questions · 60 min
            </p>
            <div style={{ marginTop: 16, fontSize: 13, color: '#D97706', fontWeight: 700 }}>
              Study ACT Math →
            </div>
          </a>
        </div>

        <div style={{ marginTop: 48, padding: 24, background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', margin: '0 0 8px' }}>Not sure which test to take?</h3>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0, lineHeight: 1.6 }}>
            The <strong style={{ color: '#2563EB' }}>SAT</strong> focuses more on algebra and data analysis with fewer questions and more time per question.
            The <strong style={{ color: '#D97706' }}>ACT</strong> covers broader math topics including trigonometry and matrices, but moves faster with 60 questions in 60 minutes.
          </p>
        </div>
      </div>
    </div>
  )
}
