'use client'

const blogPosts = [
  {
    slug: 'how-to-get-800-sat-math',
    title: 'How to Get an 800 on SAT Math: Complete Guide',
    excerpt: 'A step-by-step strategy guide from students who scored perfect on SAT Math.',
    date: '2026-03-15',
    readTime: '8 min',
    category: 'SAT Strategy',
  },
  {
    slug: 'sat-vs-act-math-differences',
    title: 'SAT vs ACT Math: Key Differences You Need to Know',
    excerpt: 'Understanding the differences between SAT and ACT math sections to choose the right test for you.',
    date: '2026-03-10',
    readTime: '6 min',
    category: 'Test Comparison',
  },
  {
    slug: 'act-math-formula-sheet',
    title: 'The Complete ACT Math Formula Sheet (Free PDF)',
    excerpt: 'Every formula you need to memorize for the ACT Math section, organized by topic.',
    date: '2026-03-05',
    readTime: '5 min',
    category: 'ACT Prep',
  },
  {
    slug: 'sat-math-time-management',
    title: 'SAT Math Time Management: Finish Every Question',
    excerpt: 'Proven strategies to manage your time and avoid running out on the SAT Math section.',
    date: '2026-02-28',
    readTime: '7 min',
    category: 'SAT Strategy',
  },
  {
    slug: 'common-sat-math-mistakes',
    title: '10 Common SAT Math Mistakes and How to Avoid Them',
    excerpt: 'The most frequent errors students make on SAT Math — and simple fixes for each one.',
    date: '2026-02-20',
    readTime: '6 min',
    category: 'SAT Tips',
  },
  {
    slug: 'quadratic-equations-sat-act',
    title: 'Mastering Quadratics: SAT & ACT Question Types Explained',
    excerpt: 'Every type of quadratic question you\'ll see on test day, with worked examples.',
    date: '2026-02-15',
    readTime: '9 min',
    category: 'Math Topics',
  },
]

const categoryColors: Record<string, string> = {
  'SAT Strategy': '#2563EB',
  'Test Comparison': '#7C3AED',
  'ACT Prep': '#D97706',
  'SAT Tips': '#059669',
  'Math Topics': '#DC2626',
}

export default function BlogPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>Blog</h1>
        <p style={{ color: '#64748B', fontSize: 16, margin: '0 0 32px' }}>Tips, strategies, and guides for SAT & ACT Math</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {blogPosts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} style={{
              background: '#fff', borderRadius: 16, padding: 24,
              border: '1px solid #E2E8F0', textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <span style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                  color: categoryColors[post.category] || '#64748B',
                  background: (categoryColors[post.category] || '#64748B') + '15',
                }}>{post.category}</span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{post.readTime}</span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', margin: '0 0 6px' }}>{post.title}</h2>
              <p style={{ fontSize: 14, color: '#64748B', margin: 0, lineHeight: 1.6 }}>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
