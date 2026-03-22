import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

// Load env vars from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        process.env[key] = value;
      }
    }
  }
}

const client = new Anthropic();

interface Topic {
  name: string;
  domain: string;
  domainSlug: string;
  slug: string;
}

export async function generateACTContent(topic: Topic): Promise<string> {
  // Read the system prompt
  const promptPath = path.join(__dirname, '..', 'prompts', 'act-content-prompt.txt');
  const systemPrompt = fs.readFileSync(promptPath, 'utf-8');

  // Generate content
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Topic: ${topic.name} | Domain: ${topic.domain} | Slug: ${topic.domainSlug}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Save to file
  const outputDir = path.join(__dirname, '..', 'content', 'act', topic.domainSlug);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${topic.slug}.md`);
  fs.writeFileSync(outputPath, text, 'utf-8');

  return outputPath;
}
