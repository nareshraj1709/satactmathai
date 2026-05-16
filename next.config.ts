import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old per-exam landings → new flat routes
      { source: '/sat/study', destination: '/syllabus?exam=sat', permanent: true },
      { source: '/act/study', destination: '/syllabus?exam=act', permanent: true },
      { source: '/sat/practice', destination: '/practice?exam=sat', permanent: true },
      { source: '/act/practice', destination: '/practice?exam=act', permanent: true },
      { source: '/sat/sections', destination: '/practice?exam=sat', permanent: true },
      { source: '/act/sections', destination: '/practice?exam=act', permanent: true },
      { source: '/sat/papers', destination: '/past-papers?exam=sat', permanent: true },
      { source: '/act/papers', destination: '/past-papers?exam=act', permanent: true },
      // Old generic routes
      { source: '/study', destination: '/syllabus', permanent: true },
      { source: '/study/:slug', destination: '/syllabus/:slug', permanent: true },
      { source: '/sections', destination: '/practice', permanent: true },
      { source: '/sections/:id', destination: '/practice', permanent: true },
      { source: '/papers', destination: '/past-papers', permanent: true },
      { source: '/papers/:id', destination: '/past-papers/:id', permanent: true },
      { source: '/formula-sheet', destination: '/formulas', permanent: true },
      // SEO content pages (preserves ranking of the 96 markdown pages)
      { source: '/sat/:domain/:slug', destination: '/syllabus/:slug?exam=sat', permanent: true },
      { source: '/act/:domain/:slug', destination: '/syllabus/:slug?exam=act', permanent: true },
    ]
  },
}

export default nextConfig
