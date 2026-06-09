const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const htmlPath = path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Find occurrences of "See the route" and look backwards for "<a href="
let idx = 0;
while ((idx = content.indexOf('See the route', idx)) !== -1) {
  console.log(`--- MATCH AT ${idx} ---`);
  // Look backward for "<a " and forward for "</a>"
  const start = Math.max(0, idx - 400);
  const end = Math.min(content.length, idx + 200);
  console.log(content.substring(start, end).replace(/\n/g, ' '));
  idx += 13;
}
