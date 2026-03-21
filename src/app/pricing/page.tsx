'use client'

export default function PricingPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1E293B', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
          Simple Pricing
        </h1>
        <p style={{ color: '#64748B', fontSize: 18, margin: '0 0 48px' }}>
          Everything you need to ace your test. For free.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 700, margin: '0 auto' }}>
          {/* Free Plan */}
          <div style={{
            background: '#fff', borderRadius: 20, padding: 36,
            border: '2px solid #2563EB', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              color: '#fff', padding: '4px 16px', borderRadius: 100,
              fontSize: 12, fontWeight: 700,
            }}>MOST POPULAR</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', margin: '8px 0 4px' }}>Free</h3>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#2563EB', margin: '8px 0' }}>$0</div>
            <p style={{ color: '#64748B', fontSize: 14, margin: '0 0 24px' }}>Forever. No credit card needed.</p>

            <ul style={{ textAlign: 'left', padding: 0, listStyle: 'none', margin: '0 0 24px' }}>
              {[
                'AI-generated practice questions',
                'Instant AI marking & feedback',
                'Full SAT & ACT topic coverage',
                'Study notes for every topic',
                'Progress tracking & streaks',
                'Badges & XP system',
                '25+ topic tests',
                'Full practice papers',
                'Formula sheet',
              ].map(f => (
                <li key={f} style={{ padding: '6px 0', fontSize: 14, color: '#374151', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#059669', fontSize: 16 }}>✓</span> {f}
                </li>
              ))}
            </ul>

            <a href="/auth" style={{
              display: 'block', padding: '14px', borderRadius: 10,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 16,
            }}>Get Started Free</a>
          </div>

          {/* Coming Soon */}
          <div style={{
            background: '#fff', borderRadius: 20, padding: 36,
            border: '1px solid #E2E8F0', opacity: 0.7,
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', margin: '0 0 4px' }}>Pro</h3>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#94A3B8', margin: '8px 0' }}>TBD</div>
            <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 24px' }}>Coming soon</p>

            <ul style={{ textAlign: 'left', padding: 0, listStyle: 'none', margin: '0 0 24px' }}>
              {[
                'Everything in Free',
                'Unlimited practice papers',
                'Detailed analytics dashboard',
                'Score prediction model',
                'Priority AI responses',
                'Study plan generator',
              ].map(f => (
                <li key={f} style={{ padding: '6px 0', fontSize: 14, color: '#94A3B8', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#94A3B8', fontSize: 16 }}>✓</span> {f}
                </li>
              ))}
            </ul>

            <div style={{
              padding: '14px', borderRadius: 10, border: '1px solid #E2E8F0',
              color: '#94A3B8', fontWeight: 700, fontSize: 16, textAlign: 'center',
            }}>Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  )
}
