const fs = require('fs');
const content = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/bMSELzOfJ.wY9l5jnL.mjs', 'utf8');

let idx = -1;
while ((idx = content.indexOf('Please', idx + 1)) !== -1) {
  console.log('--- At index', idx, '---');
  console.log(content.substring(idx - 150, idx + 250));
}
