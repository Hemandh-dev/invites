const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const content = fs.readFileSync(filePath, 'utf8');

let idx = content.indexOf('o3Sh4c7Fi');
if (idx !== -1) {
  const start = Math.max(0, idx - 50);
  const end = Math.min(content.length, idx + 500);
  console.log(content.substring(start, end));
}
