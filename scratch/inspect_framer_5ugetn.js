const fs = require('fs');
const content = fs.readFileSync('www.missingpieceinvites.com/demos/meenaya.html', 'utf8');

let count = 0;
let idx = -1;
while ((idx = content.indexOf('framer-5ugetn-container', idx + 1)) !== -1) {
  count++;
  console.log(`Occurrence ${count} at index ${idx}:`);
  console.log(content.substring(idx - 100, idx + 400));
}
console.log('Total occurrences:', count);
