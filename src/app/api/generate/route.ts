import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { topic, count = 5, type = 'practice', exam = 'SAT', difficulty = 'Medium' } = await req.json()

    const systemPrompt = type === 'paper'
      ? `You are an expert ${exam} math test creator. Generate ${count} questions that match the exact style and difficulty of the real ${exam} Math section. Difficulty level: ${difficulty}. Cover topics: ${topic}. Each question should test a specific skill.`
      : type === 'section'
      ? `You are an expert ${exam || 'SAT/ACT'} math tutor. Generate ${count} practice questions on the topic: ${topic}. Questions should progress from easier to harder. Mix question types: calculation, word problems, and conceptual.`
      : `You are an expert SAT/ACT math tutor. Generate ${count} practice questions${topic ? ` on: ${topic}` : ' covering mixed SAT/ACT math topics'}. Questions should be similar to what students see on the actual test.`

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `Generate exactly ${count} math questions. Return ONLY valid JSON in this format:
{"questions": [{"question": "...", "answer": "...", "explanation": "..."}]}

Each question needs:
- question: Clear math problem (no multiple choice, student must solve it)
- answer: The correct answer (keep it concise — a number, expression, or short phrase)
- explanation: Brief step-by-step solution

Return ONLY the JSON, no other text.`,
      }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const data = JSON.parse(jsonMatch[0])
    return NextResponse.json(data)
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json({ questions: [] }, { status: 500 })
  }
}
