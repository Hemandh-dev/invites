const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js');
const content = fs.readFileSync(filePath, 'utf8');

// Search for Card instances or where the property values like "Mehendi" are defined
const searchTerms = ['Mehendi', 'Haldi', 'Sangeet', 'Engagement', 'Muhurtham', 'Reception', '6pm Onwards', 'Rambagh'];
for (const term of searchTerms) {
  let idx = 0;
  while ((idx = content.indexOf(term, idx)) !== -1) {
    console.log(`FOUND '${term}' in nKQpHmBXO.js. Context:`);
    const start = Math.max(0, idx - 80);
    const end = Math.min(content.length, idx + 80);
    console.log(content.substring(start, end).replace(/\n/g, ' '));
    idx += term.length;
  }
}
