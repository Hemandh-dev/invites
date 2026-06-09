const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /data-framer-name="([^"]*)"/gi;
let match;
const buyNames = new Set();
while ((match = regex.exec(content)) !== null) {
  if (match[1].toLowerCase().includes('buy')) {
    buyNames.add(match[1]);
  }
}
console.log("Found data-framer-names with 'buy':");
console.log(Array.from(buyNames));
