const fs = require('fs');
const content = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs', 'utf8');

let idx = -1;
while ((idx = content.indexOf('CTA - Maps', idx + 1)) !== -1) {
  console.log('Found CTA - Maps at', idx);
  console.log(content.substring(idx - 300, idx + 300));
}
