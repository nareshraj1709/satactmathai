import { SAT_CONTENT, ACT_ADDITIONAL_CONTENT, Subtopic, TopicSection } from './study-content'
import { getContentPage, getAllSlugs, ContentPage } from './content-loader'

export interface SyllabusEntry {
  slug: string
  name: string
  exam: 'SAT' | 'ACT'
  strand: string
  strandSlug: string
  domainSlug: string
  videoSearchTerms?: string[]
  notes?: string          // From study-content.ts
  markdown?: ContentPage  // From content-loader
}

const SAT_DOMAIN_MAP: Record<string, string> = {
  'Heart of Algebra': 'algebra',
  'Problem Solving & Data Analysis': 'problem-solving-data-analysis',
  'Passport to Advanced Math': 'advanced-math',
  'Additional Topics in Math': 'geometry-trigonometry',
}

const ACT_DOMAIN_MAP: Record<string, string> = {
  'Pre-Algebra (ACT)': 'pre-algebra',
  'Elementary Algebra (ACT)': 'elementary-algebra',
  'Plane & Coordinate Geometry (ACT)': 'plane-geometry',
  'Trigonometry (ACT)': 'trigonometry',
}

function strandSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function buildFromStudyContent(sections: TopicSection[], exam: 'SAT' | 'ACT', domainMap: Record<string, string>): SyllabusEntry[] {
  return sections.flatMap(sec =>
    sec.subtopics.map<SyllabusEntry>(sub => ({
      slug: sub.slug,
      name: sub.name,
      exam,
      strand: sec.topic,
      strandSlug: strandSlug(sec.topic),
      domainSlug: domainMap[sec.topic] || strandSlug(sec.topic),
      videoSearchTerms: sub.videoSearchTerms,
      notes: sub.notes,
    }))
  )
}

let _cache: SyllabusEntry[] | null = null

export function getAllSyllabusEntries(): SyllabusEntry[] {
  if (_cache) return _cache

  const fromSAT = buildFromStudyContent(SAT_CONTENT, 'SAT', SAT_DOMAIN_MAP)
  const fromACT = buildFromStudyContent(ACT_ADDITIONAL_CONTENT, 'ACT', ACT_DOMAIN_MAP)
  const merged: SyllabusEntry[] = [...fromSAT, ...fromACT]

  // Attach SEO markdown to existing entries when slug+exam matches
  for (const e of merged) {
    const md = getContentPage(e.exam.toLowerCase() as 'sat' | 'act', e.domainSlug, e.slug)
    if (md) e.markdown = md
  }

  // Add any SEO-only pages that aren't in study-content.ts
  for (const exam of ['sat', 'act'] as const) {
    for (const { domainSlug, slug } of getAllSlugs(exam)) {
      const already = merged.find(e => e.exam.toLowerCase() === exam && e.slug === slug)
      if (already) continue
      const md = getContentPage(exam, domainSlug, slug)
      if (!md) continue
      merged.push({
        slug,
        name: md.metaTitle.replace(/\s*\|.*$/, '') || slug.replace(/-/g, ' '),
        exam: exam.toUpperCase() as 'SAT' | 'ACT',
        strand: domainSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        strandSlug: domainSlug,
        domainSlug,
        markdown: md,
      })
    }
  }

  _cache = merged
  return merged
}

export function getSyllabusEntry(slug: string, examHint?: 'SAT' | 'ACT'): SyllabusEntry | null {
  const all = getAllSyllabusEntries()
  if (examHint) {
    const hit = all.find(e => e.slug === slug && e.exam === examHint)
    if (hit) return hit
  }
  return all.find(e => e.slug === slug) ?? null
}

export function getStrands() {
  const all = getAllSyllabusEntries()
  const map = new Map<string, { strand: string; strandSlug: string; exam: 'SAT' | 'ACT'; entries: SyllabusEntry[] }>()
  for (const e of all) {
    const key = `${e.exam}::${e.strandSlug}`
    if (!map.has(key)) map.set(key, { strand: e.strand, strandSlug: e.strandSlug, exam: e.exam, entries: [] })
    map.get(key)!.entries.push(e)
  }
  return Array.from(map.values())
}

export type { Subtopic, TopicSection }
