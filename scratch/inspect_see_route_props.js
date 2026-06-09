const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const content = fs.readFileSync(filePath, 'utf8');

let idx = 0;
while ((idx = content.indexOf('See the route', idx)) !== -1) {
  console.log(`--- MATCH AT ${idx} ---`);
  // Look backward for "d(R,{" or "d(L,{" or similar
  const start = Math.max(0, idx - 400);
  const end = idx + 200;
  console.log(content.substring(start, end).replace(/\n/g, ' '));
  idx += 13;
}
