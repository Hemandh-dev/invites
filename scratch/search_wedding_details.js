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
  if (content.toLowerCase().includes('vishu') || content.toLowerCase().includes('kavya')) {
    console.log(`FOUND matches in ${path.relative(projectDir, file)}:`);
    let idx = 0;
    const lowerContent = content.toLowerCase();
    while (true) {
      let idxV = lowerContent.indexOf('vishu', idx);
      let idxK = lowerContent.indexOf('kavya', idx);
      let nextIdx = -1;
      if (idxV !== -1 && idxK !== -1) nextIdx = Math.min(idxV, idxK);
      else if (idxV !== -1) nextIdx = idxV;
      else if (idxK !== -1) nextIdx = idxK;
      
      if (nextIdx === -1) break;
      
      const start = Math.max(0, nextIdx - 80);
      const end = Math.min(content.length, nextIdx + 80);
      console.log(`... ${content.substring(start, end).replace(/\n/g, ' ')} ...`);
      idx = nextIdx + 5;
    }
    console.log();
  }
}
