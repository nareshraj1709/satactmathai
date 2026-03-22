import { ContentPage } from '@/lib/content-loader'

function renderMarkdown(md: string, examColor: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;color:#1E293B;margin:20px 0 10px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:24px;font-weight:800;color:#1E293B;margin:32px 0 14px;font-family:Georgia,serif">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:32px;font-weight:900;color:#1E293B;margin:0 0 20px;font-family:Georgia,serif;line-height:1.2">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Blockquotes (formulas/tips)
    .replace(/^>\s*(.+)$/gm, (_, text) => {
      if (text.includes('KEY FORMULA') || text.includes('📐')) {
        return `<div style="background:#EFF6FF;border:1.5px solid #BFDBFE;border-radius:10px;padding:14px 18px;margin:16px 0;font-family:Georgia,serif;font-size:16px;font-weight:600;color:#1E40AF">${text}</div>`
      }
      if (text.includes('PRO TIP') || text.includes('💡') || text.includes('TIME TIP') || text.includes('⏱️')) {
        return `<div style="background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:10px;padding:14px 18px;margin:16px 0;font-size:15px;color:#92400E">${text}</div>`
      }
      return `<blockquote style="border-left:4px solid ${examColor};padding:8px 16px;margin:16px 0;color:#475569;background:#F8FAFC;border-radius:0 8px 8px 0">${text}</blockquote>`
    })
    // Checkmarks and X marks
    .replace(/^✅\s*(.+)$/gm, '<div style="display:flex;gap:8px;align-items:flex-start;margin:6px 0;color:#059669;font-size:15px"><span>✅</span><span>$1</span></div>')
    .replace(/^❌\s*(.+)$/gm, '<div style="display:flex;gap:8px;align-items:flex-start;margin:6px 0;color:#DC2626;font-size:15px"><span>❌</span><span>$1</span></div>')
    // Bullet points
    .replace(/^[•\-]\s+(.+)$/gm, '<li style="font-size:15px;color:#374151;line-height:1.7;margin:4px 0;margin-left:20px">$1</li>')
    // Details/summary (practice answers)
    .replace(/<details>/g, '<details style="margin:16px 0;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:16px">')
    .replace(/<summary>(.+?)<\/summary>/g, '<summary style="cursor:pointer;font-weight:700;color:' + examColor + '">$1</summary>')
    // Internal links
    .replace(/\[INTERNAL LINK: ([^\]]+)\]/g, (_, path) => {
      const name = path.split('/').pop()?.replace(/-/g, ' ') || 'Related Topic'
      return `<a href="${path}" style="color:${examColor};font-weight:600;text-decoration:none">${name.charAt(0).toUpperCase() + name.slice(1)} →</a>`
    })
    // Options (A) B) etc for multiple choice
    .replace(/^([A-E])\)\s+(.+)$/gm, '<div style="padding:6px 0 6px 16px;font-size:15px;color:#374151"><strong>$1)</strong> $2</div>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[a-z]|$)(.+)$/gm, (match) => {
      if (match.startsWith('<') || match.startsWith('Step ') || match.startsWith('Answer:')) return match
      return `<p style="font-size:15px;color:#374151;line-height:1.7;margin:8px 0">${match}</p>`
    })
    // Step lines
    .replace(/^(Step \d+:.+)$/gm, '<div style="padding:4px 0 4px 16px;font-size:14px;color:#475569;border-left:3px solid #E2E8F0;margin:4px 0">$1</div>')

  return html
}

export default function ContentRenderer({ page, exam, color }: { page: ContentPage; exam: string; color: string }) {
  const examBg = exam === 'SAT' ? '#EFF6FF' : '#FFFBEB'
  const examBorder = exam === 'SAT' ? '#BFDBFE' : '#FDE68A'
  const domainLabel = page.domainSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const html = renderMarkdown(page.content, color)

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</a>
          <span>›</span>
          <a href={`/${page.exam}/study`} style={{ color: '#94A3B8', textDecoration: 'none' }}>{exam} Math</a>
          <span>›</span>
          <span style={{ color: color, fontWeight: 600 }}>{domainLabel}</span>
        </nav>

        {/* Exam badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 800, background: color, color: '#fff' }}>{exam}</span>
          <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{domainLabel}</span>
        </div>

        {/* Main content card */}
        <article
          style={{
            background: '#fff', borderRadius: 16, padding: '36px 32px',
            border: '1px solid #E2E8F0', marginTop: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* CTA */}
        <div style={{
          background: examBg, borderRadius: 16, padding: 28,
          border: `1.5px solid ${examBorder}`, marginTop: 24, textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', margin: '0 0 8px' }}>
            Ready to practice {exam} Math?
          </h3>
          <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 16px' }}>
            Test your knowledge with AI-generated {exam}-style questions and get instant feedback.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`/${page.exam}/practice`} style={{
              padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              color: '#fff', background: color, textDecoration: 'none',
            }}>Quick Practice</a>
            <a href={`/${page.exam}/study`} style={{
              padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              color: color, border: `2px solid ${color}`, background: '#fff', textDecoration: 'none',
            }}>All {exam} Topics</a>
          </div>
        </div>
      </div>
    </div>
  )
}
