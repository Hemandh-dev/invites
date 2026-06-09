const fs = require('fs');
const content = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/https/framerusercontent.com/modules/CAYlJEtsdIJh39cSI95x/9npA7VwvCKleSurPfUCE/bMSELzOfJ.js', 'utf8');

// Find all data-framer-name
const matches = content.match(/"data-framer-name":\s*"[^"]*"/g) || [];
console.log('Unique data-framer-names:');
console.log([...new Set(matches)]);

// Let's print out what wraps the text "Click to message on WhatsApp"
let idx = content.indexOf('Click to message on WhatsApp');
if (idx !== -1) {
  console.log('\n--- WhatsApp wrapper context ---');
  console.log(content.substring(idx - 600, idx + 400));
}
