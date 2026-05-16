import fs from 'fs'
import path from 'path'

export type ExamDifficulty = 'Easy' | 'Medium' | 'Hard'

export interface ExamQuestion {
  question: string
  answer: string
  explanation: string
}

export interface Exam {
  id: string
  sectionSlug: string
  sectionName: string
  topic: string
  difficulty: ExamDifficulty
  examNumber: number
  questions: ExamQuestion[]
  generatedAt?: string
  model?: string
}

const DIFF_DIRS: Record<ExamDifficulty, string> = { Easy: 'easy', Medium: 'medium', Hard: 'hard' }

function examFilePath(sectionSlug: string, difficulty: ExamDifficulty, examNumber: number) {
  return path.join(process.cwd(), 'content', 'exams', sectionSlug, DIFF_DIRS[difficulty], `exam-${examNumber}.json`)
}

export function getExam(sectionSlug: string, difficulty: ExamDifficulty, examNumber: number): Exam | null {
  const fp = examFilePath(sectionSlug, difficulty, examNumber)
  if (!fs.existsSync(fp)) return null
  try {
    const raw = fs.readFileSync(fp, 'utf-8')
    return JSON.parse(raw) as Exam
  } catch {
    return null
  }
}

export function getExamsForSection(sectionSlug: string, difficulty: ExamDifficulty): Exam[] {
  const dir = path.join(process.cwd(), 'content', 'exams', sectionSlug, DIFF_DIRS[difficulty])
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')) as Exam }
      catch { return null }
    })
    .filter((e): e is Exam => e !== null)
    .sort((a, b) => a.examNumber - b.examNumber)
}

export function getAllExamCounts(sectionSlug: string): Record<ExamDifficulty, number> {
  return {
    Easy: getExamsForSection(sectionSlug, 'Easy').length,
    Medium: getExamsForSection(sectionSlug, 'Medium').length,
    Hard: getExamsForSection(sectionSlug, 'Hard').length,
  }
}

export function getAllExamSlugCombinations(): Array<{ sectionSlug: string; difficulty: ExamDifficulty; examNumber: number }> {
  const root = path.join(process.cwd(), 'content', 'exams')
  if (!fs.existsSync(root)) return []
  const out: Array<{ sectionSlug: string; difficulty: ExamDifficulty; examNumber: number }> = []
  for (const sectionSlug of fs.readdirSync(root)) {
    const sectionDir = path.join(root, sectionSlug)
    if (!fs.statSync(sectionDir).isDirectory()) continue
    for (const diffDir of fs.readdirSync(sectionDir)) {
      const fullDiffDir = path.join(sectionDir, diffDir)
      if (!fs.statSync(fullDiffDir).isDirectory()) continue
      const difficulty: ExamDifficulty | null = diffDir === 'easy' ? 'Easy' : diffDir === 'medium' ? 'Medium' : diffDir === 'hard' ? 'Hard' : null
      if (!difficulty) continue
      for (const file of fs.readdirSync(fullDiffDir)) {
        const m = file.match(/^exam-(\d+)\.json$/)
        if (!m) continue
        out.push({ sectionSlug, difficulty, examNumber: Number(m[1]) })
      }
    }
  }
  return out
}
