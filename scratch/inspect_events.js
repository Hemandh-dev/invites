const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const content = fs.readFileSync(filePath, 'utf8');

const terms = ['Mehendi', 'Haldi', 'Sangeet', 'Engagement', 'Muhurtham', 'Reception'];

for (const term of terms) {
  let idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`--- MATCH FOR '${term}' ---`);
    const start = Math.max(0, idx - 100);
    const end = Math.min(content.length, idx + 100);
    console.log(content.substring(start, end));
  }
}
