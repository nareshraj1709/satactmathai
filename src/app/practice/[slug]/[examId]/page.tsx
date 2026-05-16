import { notFound } from 'next/navigation'
import { resolveSectionSlug } from '@/lib/sections-data'
import { getExam, ExamDifficulty, getAllExamSlugCombinations } from '@/lib/exams-loader'
import PracticeExamRunner from './PracticeExamRunner'

interface Props {
  params: Promise<{ slug: string; examId: string }>
}

export async function generateStaticParams() {
  const combos = getAllExamSlugCombinations()
  return combos.map(c => ({
    slug: c.sectionSlug,
    examId: `${c.difficulty.toLowerCase()}-${c.examNumber}`,
  }))
}

function parseExamId(examId: string): { difficulty: ExamDifficulty; examNumber: number } | null {
  const m = examId.match(/^(easy|medium|hard)-(\d+)$/)
  if (!m) return null
  const diff = m[1]
  const difficulty: ExamDifficulty = diff === 'easy' ? 'Easy' : diff === 'medium' ? 'Medium' : 'Hard'
  return { difficulty, examNumber: Number(m[2]) }
}

export async function generateMetadata({ params }: Props) {
  const { slug, examId } = await params
  const section = resolveSectionSlug(slug)
  const parsed = parseExamId(examId)
  if (!section || !parsed) return { title: 'Practice' }
  return {
    title: `${section.name} · ${parsed.difficulty} Exam ${parsed.examNumber} — SATACTMathAI`,
    description: section.description,
  }
}

export default async function PracticeExamPage({ params }: Props) {
  const { slug, examId } = await params
  const section = resolveSectionSlug(slug)
  if (!section) notFound()
  const parsed = parseExamId(examId)
  if (!parsed) notFound()
  const exam = getExam(section.slug, parsed.difficulty, parsed.examNumber)
  if (!exam) notFound()

  return <PracticeExamRunner section={{ slug: section.slug, number: section.number, name: section.name, topic: section.topic, tier: section.tier, description: section.description }} exam={exam} />
}
