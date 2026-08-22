require('@babel/register')({
  presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}], '@babel/preset-typescript'],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});
const fs = require('fs');

const files = fs.readdirSync('frontend/src/components/agents').filter(f => f.endsWith('.tsx'));
for (const file of files) {
  try {
    require('./frontend/src/components/agents/' + file);
    console.log(file, 'OK');
  } catch(e) {
    console.log(file, 'ERROR:', e.message);
  }
}
