const fs = require('fs');
const file = 'frontend/src/app/(app)/reports/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// find toneClasses at bottom
const regex = /const toneClasses = \{\n([\s\S]*?)\};\n/;
const match = content.match(regex);
if (match) {
  content = content.replace(match[0], '');
  // Insert right after imports
  content = content.replace('const tabs =', match[0] + '\nconst tabs =');
  fs.writeFileSync(file, content);
  console.log("Moved toneClasses to top");
} else {
  console.log("Could not find toneClasses");
}
