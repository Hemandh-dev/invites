const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const filesToSearch = [];

function getFilesRecursively(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
        getFilesRecursively(fullPath);
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.mjs') || file.endsWith('.html')) {
        filesToSearch.push(fullPath);
      }
    }
  }
}

getFilesRecursively(projectDir);

for (const file of filesToSearch) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('location.')) {
    console.log(`FOUND 'location.' in ${path.relative(projectDir, file)}:`);
    let idx = 0;
    while ((idx = content.indexOf('location.', idx)) !== -1) {
      const start = Math.max(0, idx - 100);
      const end = Math.min(content.length, idx + 100);
      console.log(`... ${content.substring(start, end).replace(/\n/g, ' ')} ...`);
      idx += 9;
    }
    console.log();
  }
}
