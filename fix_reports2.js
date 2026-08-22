const fs = require('fs');
const file = 'frontend/src/app/(app)/reports/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const toneClassesIndex = content.indexOf('const toneClasses = {');
if (toneClassesIndex !== -1) {
  const toneClassesStr = content.substring(toneClassesIndex);
  content = content.substring(0, toneClassesIndex);
  content = content.replace('const tabs =', toneClassesStr + '\n\nconst tabs =');
  fs.writeFileSync(file, content);
  console.log("Moved toneClasses to top");
} else {
  console.log("Could not find toneClasses");
}
