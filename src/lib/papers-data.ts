export interface Paper {
  id: string
  type: 'historical' | 'ai'
  exam: 'SAT' | 'ACT'
  year?: number
  paperNumber?: number
  questionCount: number
  totalMarks: number
  timeMinutes: number
  topics: string[]
  style: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  pdfUrl?: string
}

function buildHistoricalSAT(): Paper[] {
  const papers: Paper[] = []
  for (let year = 2016; year <= 2025; year++) {
    for (let num = 1; num <= 3; num++) {
      papers.push({
        id: `sat-${year}-${num}`,
        type: 'historical',
        exam: 'SAT',
        year,
        paperNumber: num,
        questionCount: 44,
        totalMarks: 800,
        timeMinutes: 70,
        topics: ['Heart of Algebra', 'Problem Solving & Data Analysis', 'Passport to Advanced Math', 'Additional Topics'],
        style: `SAT Math ${year} Practice Test ${num}`,
        pdfUrl: `https://collegereadiness.collegeboard.org/sat/practice/full-length-practice-tests`,
      })
    }
  }
  return papers
}

function buildHistoricalACT(): Paper[] {
  const papers: Paper[] = []
  for (let year = 2016; year <= 2025; year++) {
    for (let num = 1; num <= 3; num++) {
      papers.push({
        id: `act-${year}-${num}`,
        type: 'historical',
        exam: 'ACT',
        year,
        paperNumber: num,
        questionCount: 60,
        totalMarks: 36,
        timeMinutes: 60,
        topics: ['Pre-Algebra', 'Elementary Algebra', 'Intermediate Algebra', 'Coordinate Geometry', 'Plane Geometry', 'Trigonometry'],
        style: `ACT Math ${year} Practice Test ${num}`,
        pdfUrl: `https://www.act.org/content/act/en/products-and-services/the-act/test-preparation.html`,
      })
    }
  }
  return papers
}

function buildAIPapers(exam: 'SAT' | 'ACT'): Paper[] {
  const papers: Paper[] = []
  const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard']
  const isSAT = exam === 'SAT'

  for (let i = 1; i <= 30; i++) {
    const diff = difficulties[(i - 1) % 3]
    papers.push({
      id: `ai-${exam.toLowerCase()}-${i}`,
      type: 'ai',
      exam,
      questionCount: isSAT ? 44 : 60,
      totalMarks: isSAT ? 800 : 36,
      timeMinutes: isSAT ? 70 : 60,
      topics: isSAT
        ? ['Heart of Algebra', 'Problem Solving & Data Analysis', 'Passport to Advanced Math', 'Additional Topics']
        : ['Pre-Algebra', 'Elementary Algebra', 'Intermediate Algebra', 'Coordinate Geometry', 'Plane Geometry', 'Trigonometry'],
      style: `AI-Generated ${exam} Practice Paper ${i}`,
      difficulty: diff,
    })
  }
  return papers
}

export const HISTORICAL_SAT = buildHistoricalSAT()
export const HISTORICAL_ACT = buildHistoricalACT()
export const AI_SAT_PAPERS = buildAIPapers('SAT')
export const AI_ACT_PAPERS = buildAIPapers('ACT')

export function estimateSATScore(correct: number, total: number): number {
  const percent = correct / total
  // Approximate SAT Math score (200-800)
  return Math.round(200 + percent * 600)
}

export function estimateACTScore(correct: number, total: number): number {
  const percent = correct / total
  // Approximate ACT Math score (1-36)
  return Math.max(1, Math.round(percent * 36))
}
