const fs = require('fs');
const content = fs.readFileSync('www.missingpieceinvites.com/demos/meenaya.html', 'utf8');

let idx = -1;
let count = 0;
while ((idx = content.indexOf('HbWyQm5Qq', idx + 1)) !== -1) {
  count++;
  console.log('Found in HTML:', content.substring(idx - 100, idx + 200));
}
console.log('Total matches in HTML:', count);
