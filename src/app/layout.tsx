import type { Metadata } from 'next'
import { Geist, Geist_Mono, EB_Garamond } from 'next/font/google'
import NavWrapper from '@/components/NavWrapper'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })
const garamond = EB_Garamond({ variable: '--font-eb-garamond', subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700'], style: ['normal', 'italic'] })

export const metadata: Metadata = {
  title: 'SATACTMathAI — Preparation worthy of the score you want',
  description: 'AI-marked SAT and ACT math preparation. 22 topics, every past paper from 2016 to 2025, instant feedback on your working. Built for the test you actually take.',
  keywords: ['SAT math prep', 'ACT math prep', 'SAT practice test', 'ACT practice test', 'AI math marking', 'SAT past papers', 'ACT past papers', 'AI math tutor'],
  metadataBase: new URL('https://www.satactmathai.com'),
  openGraph: {
    title: 'SATACTMathAI — Preparation worthy of the score you want',
    description: 'AI-marked SAT and ACT math prep. Every past paper from 2016 to 2025, marked like the real thing.',
    url: 'https://www.satactmathai.com',
    siteName: 'SATACTMathAI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SATACTMathAI — Preparation worthy of the score you want',
    description: 'AI-marked SAT and ACT math prep.',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'k523JR76eDXssB63wyLWTBxmcqIQs64KKuBFqXYYS-w',
    other: { 'msvalidate.01': ['969F490FB0B57C74181EAD0353ACB0E6'] },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${garamond.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SATACTMathAI',
              url: 'https://www.satactmathai.com',
              description: 'AI-marked SAT and ACT math preparation.',
            }),
          }}
        />
      </head>
      <body>
        <NavWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
