const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

let idx = 0;
while ((idx = content.indexOf('See the route', idx)) !== -1) {
  console.log(`--- MATCH AT ${idx} ---`);
  // Look backward for "<a " with "href"
  const start = Math.max(0, idx - 1500);
  const end = idx + 200;
  const substring = content.substring(start, end);
  
  // Find all links in the substring
  const regex = /<a[^>]*href="([^"]*)"[^>]*>/gi;
  let match;
  while ((match = regex.exec(substring)) !== null) {
    console.log(`Found link: ${match[0]}`);
  }
  idx += 13;
}
