const fs = require('fs');
const file = 'frontend/src/components/agents/ParliamentPageClient.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `{session.recommendation.priorityActions.map((action) => (`;
const replacement = `{Array.isArray(session.recommendation.priorityActions) && session.recommendation.priorityActions.map((action) => (`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log("Fixed ParliamentPageClient.tsx priorityActions");
} else {
  console.log("Target not found!");
}
