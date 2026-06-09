const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

// Search for maps and whatsapp links
const links = [];
const regex = /href="([^"]*(whatsapp|wa\.me|maps\.google|goo\.gl)[^"]*)"/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  links.push(match[1]);
}

console.log("Found interactive links:");
console.log(Array.from(new Set(links)));
