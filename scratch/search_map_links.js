const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const filesToSearch = [
  path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html'),
  path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs'),
  path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js')
];

for (const file of filesToSearch) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    // Search for "See the route" or "Click to open the map" or "route"
    const terms = ['See the route', 'Click to open the map'];
    for (const term of terms) {
      let idx = 0;
      while ((idx = content.indexOf(term, idx)) !== -1) {
        console.log(`FOUND '${term}' in ${path.relative(projectDir, file)}:`);
        const start = Math.max(0, idx - 150);
        const end = Math.min(content.length, idx + 250);
        console.log(content.substring(start, end).replace(/\n/g, ' '));
        idx += term.length;
      }
    }
  }
}
