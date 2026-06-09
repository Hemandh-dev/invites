const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

let idx = 0;
while ((idx = content.indexOf('window.location', idx)) !== -1) {
  console.log(`--- MATCH AT INDEX ${idx} ---`);
  const start = Math.max(0, idx - 150);
  const end = Math.min(content.length, idx + 400);
  console.log(content.substring(start, end));
  idx += 15;
}
