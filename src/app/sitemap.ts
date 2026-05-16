import { MetadataRoute } from 'next'
import { getAllSyllabusEntries } from '@/lib/syllabus-resolver'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.satactmathai.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/syllabus`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/practice`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/past-papers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/formulas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Syllabus entries — high-priority SEO pages
  const entries = getAllSyllabusEntries()
  const seen = new Set<string>()
  const syllabusPages: MetadataRoute.Sitemap = []
  for (const e of entries) {
    if (seen.has(e.slug)) continue
    seen.add(e.slug)
    syllabusPages.push({
      url: `${baseUrl}/syllabus/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  }

  return [...staticPages, ...syllabusPages]
}
