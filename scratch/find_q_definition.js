const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const content = fs.readFileSync(filePath, 'utf8');

// Find variable definitions for q
let idx = 0;
while ((idx = content.indexOf('var q', idx)) !== -1) {
  console.log(`FOUND 'var q' AT ${idx}:`);
  console.log(content.substring(idx - 100, idx + 200).replace(/\n/g, ' '));
  idx += 5;
}

// Find where q is assigned or declared
idx = 0;
while ((idx = content.indexOf('q=', idx)) !== -1) {
  console.log(`FOUND 'q=' AT ${idx}:`);
  console.log(content.substring(idx - 100, idx + 200).replace(/\n/g, ' '));
  idx += 2;
}
