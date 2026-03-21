import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { questions, answers, exam = 'SAT' } = await req.json()

    const qaPairs = questions.map((q: { question: string; answer: string }, i: number) => (
      `Q${i + 1}: ${q.question}\nCorrect Answer: ${q.answer}\nStudent Answer: ${answers[i] || '(no answer)'}`
    )).join('\n\n')

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: `You are an expert ${exam} math marker. Mark each student answer as correct or incorrect. Be generous with equivalent forms: 1/2 = 0.5, x=3 = 3, etc. Accept reasonable mathematical equivalences.`,
      messages: [{
        role: 'user',
        content: `Mark these answers. Return ONLY valid JSON:
{"results": [{"correct": true/false, "explanation": "brief explanation"}]}

${qaPairs}

Return ONLY JSON, no other text.`,
      }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const data = JSON.parse(jsonMatch[0])
    return NextResponse.json(data)
  } catch (error) {
    console.error('Mark error:', error)
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}
