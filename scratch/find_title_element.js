const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const content = fs.readFileSync(filePath, 'utf8');

let idx = 0;
while ((idx = content.indexOf('b0Odmcs_Z', idx)) !== -1) {
  console.log(`--- MATCH AT ${idx} ---`);
  const start = Math.max(0, idx - 100);
  const end = Math.min(content.length, idx + 300);
  console.log(content.substring(start, end).replace(/\n/g, ' '));
  idx += 10;
}
