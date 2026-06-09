const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all div tags that have an id
const regex = /<div[^>]*id="([^"]*)"[^>]*>/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Found div with id: ${match[0]}`);
}
