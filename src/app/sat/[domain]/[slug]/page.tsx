import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getContentPage, getAllSlugs } from '@/lib/content-loader'
import ContentRenderer from '@/components/ContentRenderer'

interface Props {
  params: Promise<{ domain: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('sat').map(({ domainSlug, slug }) => ({
    domain: domainSlug,
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain, slug } = await params
  const page = getContentPage('sat', domain, slug)
  if (!page) return { title: 'Not Found' }

  const title = page.metaTitle || `${slug.replace(/-/g, ' ')} | SAT Math Prep`
  const description = page.metaDescription

  return {
    title,
    description,
    keywords: [page.focusKeyword, page.secondaryKeyword, 'SAT math', 'SAT prep', 'Digital SAT', 'College Board', 'SAT math practice'].filter(Boolean),
    alternates: {
      canonical: `https://www.satactmathai.com${page.fullSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.satactmathai.com${page.fullSlug}`,
      siteName: 'SAT ACT MathAI',
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function SATContentPage({ params }: Props) {
  const { domain, slug } = await params
  const page = getContentPage('sat', domain, slug)
  if (!page) notFound()

  // Schema.org structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.metaTitle,
    description: page.metaDescription,
    url: `https://www.satactmathai.com${page.fullSlug}`,
    publisher: {
      '@type': 'Organization',
      name: 'SAT ACT MathAI',
      url: 'https://www.satactmathai.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.satactmathai.com${page.fullSlug}`,
    },
    about: {
      '@type': 'Thing',
      name: page.focusKeyword,
    },
    educationalLevel: 'High School',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
  }

  const faqItems = extractFAQ(page.content)
  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ContentRenderer page={page} exam="SAT" color="#2563EB" />
    </>
  )
}

function extractFAQ(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  // Extract H2/H3 headings as potential FAQ items
  const headings = content.match(/^#{2,3}\s+(.+)/gm) || []
  for (const h of headings.slice(0, 3)) {
    const question = h.replace(/^#{2,3}\s+/, '').trim()
    if (question.includes('?') || question.startsWith('How') || question.startsWith('What') || question.startsWith('Common')) {
      // Get content until next heading
      const idx = content.indexOf(h)
      const nextHeading = content.indexOf('\n#', idx + h.length)
      const answer = content.slice(idx + h.length, nextHeading > 0 ? nextHeading : idx + 500).trim().slice(0, 300)
      if (answer) faqs.push({ question, answer })
    }
  }
  return faqs
}
