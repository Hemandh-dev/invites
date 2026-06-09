const fs = require('fs');
const path = require('path');

const localDir = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep');
const files = fs.readdirSync(localDir);

for (const file of files) {
  if (file.endsWith('.mjs') || file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(localDir, file), 'utf8');
    if (content.includes('fonts.gstatic.com') || content.includes('gstatic')) {
      console.log(`FOUND IN ${file}:`);
      // Find context around it
      let idx = content.indexOf('gstatic');
      if (idx === -1) idx = content.indexOf('fonts.gstatic.com');
      const start = Math.max(0, idx - 150);
      const end = Math.min(content.length, idx + 150);
      console.log(`... ${content.substring(start, end)} ...\n`);
    }
  }
}
