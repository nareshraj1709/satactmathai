import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import NavWrapper from '@/components/NavWrapper'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SAT ACT MathAI — Free AI-Powered Math Prep',
  description: 'Free SAT and ACT math prep powered by AI. Practice with real-style questions, get instant AI marking, track your progress, and boost your score. 100% free.',
  keywords: ['SAT math prep', 'ACT math prep', 'SAT practice test', 'ACT practice test', 'free SAT prep', 'AI math tutor', 'SAT math questions', 'ACT math questions', 'college board', 'math practice'],
  metadataBase: new URL('https://www.satactmathai.com'),
  openGraph: {
    title: 'SAT ACT MathAI — Free AI-Powered Math Prep',
    description: 'Boost your SAT/ACT math score with AI-powered practice. Instant marking, detailed feedback, and progress tracking. 100% free.',
    url: 'https://www.satactmathai.com',
    siteName: 'SAT ACT MathAI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAT ACT MathAI — Free AI-Powered Math Prep',
    description: 'Boost your SAT/ACT math score with AI-powered practice.',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'k523JR76eDXssB63wyLWTBxmcqIQs64KKuBFqXYYS-w',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SAT ACT MathAI',
              url: 'https://www.satactmathai.com',
              description: 'Free AI-powered SAT and ACT math preparation platform.',
            }),
          }}
        />
      </head>
      <body style={{ margin: 0 }}>
        <NavWrapper />
        {children}
      </body>
    </html>
  )
}
