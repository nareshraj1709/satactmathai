import fs from 'fs'
import path from 'path'

export interface ContentPage {
  slug: string
  domainSlug: string
  exam: 'sat' | 'act'
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondaryKeyword: string
  content: string
  fullSlug: string // e.g. /sat/algebra/linear-equations-one-variable
}

function parseContentFile(raw: string, exam: 'sat' | 'act', domainSlug: string, slug: string): ContentPage {
  let metaTitle = ''
  let metaDescription = ''
  let focusKeyword = ''
  let secondaryKeyword = ''
  let content = ''

  // Extract meta block
  const metaMatch = raw.match(/---META BLOCK---\s*([\s\S]*?)---CONTENT---/)
  if (metaMatch) {
    const metaBlock = metaMatch[1]
    metaTitle = metaBlock.match(/meta_title:\s*(.+)/)?.[1]?.trim() || ''
    metaDescription = metaBlock.match(/meta_description:\s*(.+)/)?.[1]?.trim() || ''
    focusKeyword = metaBlock.match(/focus_keyword:\s*(.+)/)?.[1]?.trim() || ''
    secondaryKeyword = metaBlock.match(/secondary_keyword:\s*(.+)/)?.[1]?.trim() || ''
  }

  // Extract content (everything after ---CONTENT---)
  const contentMatch = raw.match(/---CONTENT---\s*([\s\S]*)/)
  if (contentMatch) {
    content = contentMatch[1].trim()
  } else {
    // Fallback: use entire content if no meta block
    content = raw.trim()
  }

  return {
    slug,
    domainSlug,
    exam,
    metaTitle: metaTitle || `${slug.replace(/-/g, ' ')} | ${exam.toUpperCase()} Math Prep`,
    metaDescription: metaDescription || `Master ${slug.replace(/-/g, ' ')} for the ${exam.toUpperCase()} math section. Free practice questions and study notes.`,
    focusKeyword,
    secondaryKeyword,
    content,
    fullSlug: `/${exam}/${domainSlug}/${slug}`,
  }
}

export function getContentPage(exam: 'sat' | 'act', domainSlug: string, slug: string): ContentPage | null {
  const filePath = path.join(process.cwd(), 'content', exam, domainSlug, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return parseContentFile(raw, exam, domainSlug, slug)
}

export function getAllContentPages(exam: 'sat' | 'act'): ContentPage[] {
  const pages: ContentPage[] = []
  const baseDir = path.join(process.cwd(), 'content', exam)
  if (!fs.existsSync(baseDir)) return pages

  const domains = fs.readdirSync(baseDir).filter(d =>
    fs.statSync(path.join(baseDir, d)).isDirectory()
  )

  for (const domain of domains) {
    const domainDir = path.join(baseDir, domain)
    const files = fs.readdirSync(domainDir).filter(f => f.endsWith('.md'))
    for (const file of files) {
      const slug = file.replace('.md', '')
      const raw = fs.readFileSync(path.join(domainDir, file), 'utf-8')
      pages.push(parseContentFile(raw, exam, domain, slug))
    }
  }

  return pages
}

export function getAllSlugs(exam: 'sat' | 'act'): { domainSlug: string; slug: string }[] {
  const slugs: { domainSlug: string; slug: string }[] = []
  const baseDir = path.join(process.cwd(), 'content', exam)
  if (!fs.existsSync(baseDir)) return slugs

  const domains = fs.readdirSync(baseDir).filter(d =>
    fs.statSync(path.join(baseDir, d)).isDirectory()
  )

  for (const domain of domains) {
    const domainDir = path.join(baseDir, domain)
    const files = fs.readdirSync(domainDir).filter(f => f.endsWith('.md'))
    for (const file of files) {
      slugs.push({ domainSlug: domain, slug: file.replace('.md', '') })
    }
  }

  return slugs
}
