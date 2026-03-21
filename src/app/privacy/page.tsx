export default function PrivacyPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: '0 0 24px', fontFamily: 'Georgia, serif' }}>Privacy Policy</h1>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #E2E8F0', lineHeight: 1.8, color: '#374151', fontSize: 15 }}>
          <p><strong>Last updated:</strong> March 2026</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 24 }}>Information We Collect</h2>
          <p>When you create an account, we collect your email address and password (hashed). When you practice, we store your answers, scores, and progress data to provide personalized feedback.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 24 }}>How We Use Your Data</h2>
          <p>Your data is used solely to provide and improve the SAT ACT MathAI service. We use your practice data to track your progress, identify weak areas, and personalize your experience. We do not sell your data to third parties.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 24 }}>Data Storage</h2>
          <p>Your data is stored securely using Supabase (hosted on AWS). All data is encrypted in transit and at rest.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 24 }}>Your Rights</h2>
          <p>You can request deletion of your account and all associated data at any time by contacting us at support@satactmathai.com.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 24 }}>Contact</h2>
          <p>For privacy-related questions, contact us at <a href="mailto:support@satactmathai.com" style={{ color: '#2563EB' }}>support@satactmathai.com</a>.</p>
        </div>
      </div>
    </div>
  )
}
