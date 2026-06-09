const fs = require('fs');
const content = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs', 'utf8');

// Search for one of the slide image names: HbWyQm5Qq
let idx = content.indexOf('HbWyQm5Qq');
if (idx !== -1) {
  console.log('--- At index', idx, '---');
  console.log(content.substring(idx - 400, idx + 400));
} else {
  console.log('HbWyQm5Qq not found in main bundle');
}
