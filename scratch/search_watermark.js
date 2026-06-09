const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find occurrences of watermark (case-insensitive)
const regex = /.{0,50}watermark.{0,50}/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Found: ${match[0].trim()}`);
}
