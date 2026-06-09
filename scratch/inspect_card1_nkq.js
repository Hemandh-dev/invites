const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js');
const content = fs.readFileSync(filePath, 'utf8');

let idx = 0;
while ((idx = content.indexOf('b0Odmcs_Z: "Mehendi"', idx)) !== -1) {
  const start = Math.max(0, idx - 50);
  const end = Math.min(content.length, idx + 400);
  console.log(content.substring(start, end));
  idx += 20;
}
