import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

export const metadata = {
  title: 'Privacy Policy — SATACTMathAI',
  description: 'How we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <Container className="py-20 max-w-[760px]">
      <Eyebrow className="mb-5">Last updated · March 2026</Eyebrow>
      <h1 className="headline text-[42px] mb-10">Privacy <em>policy</em>.</h1>

      <article className="prose-legal">
        <h2>Information we collect</h2>
        <p>When you create an account we collect your email and a hashed password. When you practise we store your answers, scores, and progress so we can mark, track, and personalise your prep.</p>

        <h2>How we use your data</h2>
        <p>Your data is used only to provide and improve the SATACTMathAI service: marking, weak-spot detection, and predicted-score estimates. We do not sell your data to third parties.</p>

        <h2>Storage</h2>
        <p>Data is stored using Supabase (AWS), encrypted in transit and at rest.</p>

        <h2>Your rights</h2>
        <p>You can request deletion of your account and all associated data at any time by emailing <a href="mailto:support@satactmathai.com">support@satactmathai.com</a>.</p>

        <h2>Contact</h2>
        <p>Privacy questions go to <a href="mailto:support@satactmathai.com">support@satactmathai.com</a>.</p>
      </article>

      <style>{`
        .prose-legal h2 { font-family: var(--font-serif); font-size: 22px; font-weight: 600; margin: 32px 0 10px; color: var(--color-ink); border-top: 1px solid var(--color-rule); padding-top: 24px; }
        .prose-legal h2:first-child { border-top: 0; padding-top: 0; margin-top: 0; }
        .prose-legal p { font-size: 15px; line-height: 1.75; color: var(--color-ink-2); margin: 8px 0; }
        .prose-legal a { color: var(--color-marker); border-bottom: 1px solid var(--color-marker); }
      `}</style>
    </Container>
  )
}
