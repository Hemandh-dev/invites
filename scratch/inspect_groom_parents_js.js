const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const filesToSearch = [
  path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs'),
  path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js')
];

for (const file of filesToSearch) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    let idx = 0;
    while ((idx = content.indexOf('Kamakshi', idx)) !== -1) {
      const start = Math.max(0, idx - 40);
      const end = Math.min(content.length, idx + 60);
      console.log(`File: ${path.basename(file)}`);
      console.log(`Context: ${content.substring(start, end).replace(/\n/g, ' ')}`);
      idx += 8;
    }
  }
}
