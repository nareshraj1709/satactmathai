import { actTopics } from './act-topics';
import { generateACTContent } from './generate-act-content';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const total = actTopics.length;
  let success = 0;
  let failed = 0;

  console.log(`\n🚀 Starting ACT content generation for ${total} topics...\n`);

  for (let i = 0; i < total; i++) {
    const topic = actTopics[i];
    console.log(`⏳ Generating [${i + 1}/${total}]: ${topic.name}...`);

    try {
      const outputPath = await generateACTContent(topic);
      console.log(`✅ Saved: content/act/${topic.domainSlug}/${topic.slug}.md`);
      success++;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`❌ Failed: ${topic.name} — ${message}`);
      failed++;
    }

    // 2 second delay between calls to avoid rate limiting
    if (i < total - 1) {
      await sleep(2000);
    }
  }

  console.log(`\n🎉 Done! Generated ${success} pages`);
  if (failed > 0) {
    console.log(`⚠️  Failed: ${failed} pages`);
  }
}

main().catch(console.error);
