import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty = 'Medium', count = 5 } = await req.json()

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: `You are an SAT/ACT math question generator. Generate ${count} ${difficulty} difficulty questions on: ${topic}. Questions should match real test style.`,
      messages: [{
        role: 'user',
        content: `Generate ${count} questions. Return ONLY valid JSON:
{"questions": [{"question": "...", "answer": "...", "explanation": "..."}]}
Return ONLY JSON.`,
      }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON')

    return NextResponse.json(JSON.parse(jsonMatch[0]))
  } catch (error) {
    console.error('Quiz generation error:', error)
    return NextResponse.json({ questions: [] }, { status: 500 })
  }
}
