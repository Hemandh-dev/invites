const fs = require('fs');
const content = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/https/framerusercontent.com/modules/CAYlJEtsdIJh39cSI95x/9npA7VwvCKleSurPfUCE/bMSELzOfJ.js', 'utf8');

let idx = content.indexOf('Please', 5500);
if (idx !== -1) {
  console.log('--- At index', idx, '---');
  console.log(content.substring(idx - 300, idx + 400));
}
