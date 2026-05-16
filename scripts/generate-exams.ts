import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'

// Load env vars from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim()
        const value = trimmed.slice(eqIdx + 1).trim()
        process.env[key] = value
      }
    }
  }
}

const client = new Anthropic()
const MODEL = 'claude-haiku-4-5-20251001'

type Difficulty = 'Easy' | 'Medium' | 'Hard'

interface Section {
  slug: string
  number: number
  name: string
  topic: string
  description: string
  tier: 'SAT' | 'ACT' | 'Both'
}

// Mirror of the SECTIONS array from src/lib/sections-data.ts.
// Keep in sync with that file.
const SECTIONS: Section[] = [
  { slug: 'linear-equations-basics', number: 1, name: 'Linear Equations Basics', topic: 'Heart of Algebra', tier: 'Both', description: 'Solve one-variable linear equations including fractions and decimals' },
  { slug: 'slope-and-linear-graphs', number: 2, name: 'Slope & Linear Graphs', topic: 'Heart of Algebra', tier: 'Both', description: 'Find slope, graph lines, and convert between forms' },
  { slug: 'systems-of-equations', number: 3, name: 'Systems of Equations', topic: 'Heart of Algebra', tier: 'Both', description: 'Solve systems using substitution and elimination' },
  { slug: 'inequalities-and-graphs', number: 4, name: 'Inequalities & Graphs', topic: 'Heart of Algebra', tier: 'Both', description: 'Solve and graph linear inequalities and systems' },
  { slug: 'absolute-value', number: 5, name: 'Absolute Value', topic: 'Heart of Algebra', tier: 'Both', description: 'Solve absolute value equations and inequalities' },
  { slug: 'ratios-and-proportions', number: 6, name: 'Ratios & Proportions', topic: 'Problem Solving & Data Analysis', tier: 'Both', description: 'Set up and solve ratio and proportion problems' },
  { slug: 'percentages', number: 7, name: 'Percentages', topic: 'Problem Solving & Data Analysis', tier: 'Both', description: 'Percent change, tax, tip, discount, and successive percent problems' },
  { slug: 'data-and-scatterplots', number: 8, name: 'Data & Scatterplots', topic: 'Problem Solving & Data Analysis', tier: 'Both', description: 'Read scatterplots, identify trends, use lines of best fit' },
  { slug: 'statistics-and-averages', number: 9, name: 'Statistics & Averages', topic: 'Problem Solving & Data Analysis', tier: 'Both', description: 'Mean, median, mode, range, and standard deviation concepts' },
  { slug: 'probability', number: 10, name: 'Probability', topic: 'Problem Solving & Data Analysis', tier: 'Both', description: 'Basic probability, conditional probability, two-way tables' },
  { slug: 'quadratics-factoring', number: 11, name: 'Quadratics: Factoring', topic: 'Passport to Advanced Math', tier: 'Both', description: 'Factor quadratics and solve by factoring' },
  { slug: 'quadratic-formula-and-discriminant', number: 12, name: 'Quadratic Formula & Discriminant', topic: 'Passport to Advanced Math', tier: 'Both', description: 'Apply the quadratic formula and analyze the discriminant' },
  { slug: 'polynomials', number: 13, name: 'Polynomials', topic: 'Passport to Advanced Math', tier: 'Both', description: 'Add, multiply, divide polynomials and find zeros' },
  { slug: 'exponential-growth-and-decay', number: 14, name: 'Exponential Growth & Decay', topic: 'Passport to Advanced Math', tier: 'Both', description: 'Model exponential growth, decay, and compound interest' },
  { slug: 'radicals-and-rational-expressions', number: 15, name: 'Radicals & Rational Expressions', topic: 'Passport to Advanced Math', tier: 'Both', description: 'Simplify radicals and solve radical/rational equations' },
  { slug: 'functions', number: 16, name: 'Functions', topic: 'Passport to Advanced Math', tier: 'Both', description: 'Evaluate, compose, and transform functions' },
  { slug: 'triangles-and-angles', number: 17, name: 'Triangles & Angles', topic: 'Additional Topics', tier: 'Both', description: 'Triangle properties, special triangles, angle relationships' },
  { slug: 'circles', number: 18, name: 'Circles', topic: 'Additional Topics', tier: 'Both', description: 'Circle equations, arc length, sector area, tangent lines' },
  { slug: 'trigonometry', number: 19, name: 'Trigonometry', topic: 'Additional Topics', tier: 'Both', description: 'SOH-CAH-TOA, unit circle, trig identities' },
  { slug: 'complex-numbers', number: 20, name: 'Complex Numbers', topic: 'Additional Topics', tier: 'Both', description: 'Operations with complex numbers and powers of i' },
  { slug: 'number-properties', number: 21, name: 'Number Properties', topic: 'Pre-Algebra (ACT)', tier: 'ACT', description: 'Factors, multiples, primes, divisibility, GCF/LCM' },
  { slug: 'matrices', number: 22, name: 'Matrices', topic: 'Elementary Algebra (ACT)', tier: 'ACT', description: 'Matrix operations, determinants, and multiplication' },
  { slug: '3d-geometry-and-volume', number: 23, name: '3D Geometry & Volume', topic: 'Geometry (ACT)', tier: 'ACT', description: 'Volume and surface area of prisms, cylinders, cones, spheres' },
  { slug: 'trig-graphs-and-laws', number: 24, name: 'Trig Graphs & Laws', topic: 'Trigonometry (ACT)', tier: 'ACT', description: 'Trig function graphs, law of sines and cosines' },
  { slug: 'conic-sections', number: 25, name: 'Conic Sections', topic: 'Geometry (ACT)', tier: 'ACT', description: 'Parabolas, ellipses, and hyperbolas' },
]

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']
const EXAMS_PER_DIFFICULTY = 10
const QUESTIONS_PER_EXAM = 6

const DIFF_DIR: Record<Difficulty, string> = { Easy: 'easy', Medium: 'medium', Hard: 'hard' }

function difficultyGuidance(d: Difficulty): string {
  if (d === 'Easy') return 'Easy — straightforward single-step or two-step problems; numbers stay small; no multi-stage reasoning required.'
  if (d === 'Medium') return 'Medium — multi-step problems requiring two or three coordinated skills; common SAT/ACT mid-difficulty band.'
  return 'Hard — top-difficulty problems requiring layered reasoning, careful algebra, or non-obvious set-up; the band where most students lose marks.'
}

interface GeneratedExam {
  id: string
  sectionSlug: string
  sectionName: string
  topic: string
  difficulty: Difficulty
  examNumber: number
  questions: Array<{ question: string; answer: string; explanation: string }>
  generatedAt: string
  model: string
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function generateExam(section: Section, difficulty: Difficulty, examNumber: number): Promise<GeneratedExam> {
  const examFor = section.tier === 'ACT' ? 'ACT' : section.tier === 'SAT' ? 'SAT' : 'SAT and ACT'
  const systemPrompt = `You are an expert ${examFor} math test writer with 20 years of experience grading the College Board SAT and ACT Math rubrics. Produce calibrated practice problems that match the real test in vocabulary, scope, and difficulty.

Difficulty band: ${difficultyGuidance(difficulty)}
Section: ${section.name} (${section.topic})
Section scope: ${section.description}

Style requirements:
- Each question must be solvable without a calculator unless the topic obviously needs one.
- Vary the question style: short numeric, short word problem, conceptual.
- Never use multiple-choice — students must produce the answer.
- Answers must be concise: a number, an expression like "x = 3", or a short phrase.
- Explanations: 2–4 short lines, showing the key step, not a textbook.`

  const userPrompt = `Generate exam-${examNumber} for the practice section "${section.name}" at ${difficulty} difficulty. Produce EXACTLY ${QUESTIONS_PER_EXAM} questions.

Return ONLY valid JSON in this shape (no surrounding prose, no markdown fences):
{
  "questions": [
    { "question": "...", "answer": "...", "explanation": "..." }
  ]
}`

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 2500,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const text = resp.content[0].type === 'text' ? resp.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in response')
  const parsed = JSON.parse(jsonMatch[0]) as { questions: Array<{ question: string; answer: string; explanation: string }> }
  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('Empty questions array')
  }

  return {
    id: `${section.slug}-${DIFF_DIR[difficulty]}-${examNumber}`,
    sectionSlug: section.slug,
    sectionName: section.name,
    topic: section.topic,
    difficulty,
    examNumber,
    questions: parsed.questions.slice(0, QUESTIONS_PER_EXAM),
    generatedAt: new Date().toISOString(),
    model: MODEL,
  }
}

function examFilePath(section: Section, difficulty: Difficulty, examNumber: number) {
  return path.join(process.cwd(), 'content', 'exams', section.slug, DIFF_DIR[difficulty], `exam-${examNumber}.json`)
}

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true })
}

async function generateOne(section: Section, difficulty: Difficulty, examNumber: number, force: boolean) {
  const fp = examFilePath(section, difficulty, examNumber)
  if (!force && fs.existsSync(fp)) return { skipped: true as const, fp }
  await ensureDir(path.dirname(fp))
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const exam = await generateExam(section, difficulty, examNumber)
      await fs.promises.writeFile(fp, JSON.stringify(exam, null, 2), 'utf-8')
      return { skipped: false as const, fp }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (attempt === 3) throw new Error(msg)
      await sleep(2000 * attempt)
    }
  }
  throw new Error('unreachable')
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const sectionFilter = args.find(a => a.startsWith('--section='))?.split('=')[1]
  const concurrency = Number(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] ?? '6')

  const sectionsToRun = sectionFilter ? SECTIONS.filter(s => s.slug === sectionFilter) : SECTIONS

  const jobs: Array<{ section: Section; difficulty: Difficulty; examNumber: number }> = []
  for (const section of sectionsToRun) {
    for (const difficulty of DIFFICULTIES) {
      for (let n = 1; n <= EXAMS_PER_DIFFICULTY; n++) {
        jobs.push({ section, difficulty, examNumber: n })
      }
    }
  }

  console.log(`📚 ${jobs.length} exams queued · ${sectionsToRun.length} sections × ${DIFFICULTIES.length} difficulties × ${EXAMS_PER_DIFFICULTY} exams`)
  console.log(`⚙️  concurrency=${concurrency} force=${force}\n`)

  let done = 0
  let skipped = 0
  let failed = 0

  let nextIndex = 0
  async function worker(workerId: number) {
    while (true) {
      const idx = nextIndex++
      if (idx >= jobs.length) return
      const job = jobs[idx]
      const tag = `[${idx + 1}/${jobs.length}] ${job.section.slug}/${DIFF_DIR[job.difficulty]}/exam-${job.examNumber}`
      try {
        const res = await generateOne(job.section, job.difficulty, job.examNumber, force)
        if (res.skipped) {
          skipped++
          process.stdout.write(`⏭️  ${tag}\n`)
        } else {
          done++
          process.stdout.write(`✅ ${tag}\n`)
        }
      } catch (err: unknown) {
        failed++
        const msg = err instanceof Error ? err.message : String(err)
        process.stdout.write(`❌ ${tag} — ${msg}\n`)
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i))
  await Promise.all(workers)

  console.log(`\n🎉 Done. generated=${done} skipped=${skipped} failed=${failed}`)
}

main().catch(err => { console.error(err); process.exit(1) })
