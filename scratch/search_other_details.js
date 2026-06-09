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

const terms = ['Kamakshi', 'Parvathi', 'Rambagh', 'March 9th', 'Varaverpu', 'Nichiyam'];

for (const file of filesToSearch) {
  const content = fs.readFileSync(file, 'utf8');
  for (const term of terms) {
    if (content.toLowerCase().includes(term.toLowerCase())) {
      console.log(`FOUND '${term}' in ${path.relative(projectDir, file)}`);
    }
  }
}
