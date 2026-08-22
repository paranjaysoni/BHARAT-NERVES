const fs = require('fs');
const file = 'backend/src/services/ai-parliament/ai-parliament.service.ts';
let content = fs.readFileSync(file, 'utf8');

const target = "const finalRecommendation = await generateWithGeminiFallback(prompt, deterministicRecommendation);";
const replacement = `const finalRecommendation = await generateWithGeminiFallback(
      prompt,
      deterministicRecommendation,
      (text) => ({ ...deterministicRecommendation, summary: text.trim() })
    );`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log("Fixed ai-parliament.service.ts");
} else {
  console.log("Target not found!");
}
