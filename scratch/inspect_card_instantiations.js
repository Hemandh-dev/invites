const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const content = fs.readFileSync(filePath, 'utf8');

// Find all occurrences of the event card instantiations (children:d(q,{...}))
let idx = 0;
while ((idx = content.indexOf('children:d(q,{', idx)) !== -1) {
  console.log(`--- MATCH AT ${idx} ---`);
  const end = content.indexOf('})', idx);
  console.log(content.substring(idx, end + 2));
  idx = end + 2;
}
