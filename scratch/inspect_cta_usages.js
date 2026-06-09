const fs = require('fs');

const nkq = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/https/framerusercontent.com/modules/mGinzKa7rLPp2rFADrxC/Xs9hqqyZLo97F8nUeVXO/nKQpHmBXO.js', 'utf8');
const vzz = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs', 'utf8');

console.log('--- CTA1 in nKQpHmBXO.js ---');
let idx = -1;
while ((idx = nkq.indexOf('CTA1', idx + 1)) !== -1) {
  console.log(nkq.substring(idx - 100, idx + 200));
}

console.log('\n--- CTA1/bMSELzOfJ in vzzpaPs1.mjs ---');
idx = -1;
while ((idx = vzz.indexOf('bMSELzOfJ', idx + 1)) !== -1) {
  console.log(vzz.substring(idx - 100, idx + 200));
}
