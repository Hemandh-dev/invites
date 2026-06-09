const fs = require('fs');
const path = require('path');

const files = [
  'www.missingpieceinvites.com/demos/meenaya.html',
  'framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs',
  'framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/https/framerusercontent.com/modules/mGinzKa7rLPp2rFADrxC/Xs9hqqyZLo97F8nUeVXO/nKQpHmBXO.js'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  let idx = -1;
  while ((idx = content.indexOf('Missing Piece 2025', idx + 1)) !== -1) {
    console.log(`Found in ${f} at index ${idx}:`);
    console.log(content.substring(idx - 100, idx + 100));
  }
  
  idx = -1;
  while ((idx = content.indexOf('© Missing Piece 2025', idx + 1)) !== -1) {
    console.log(`Found © in ${f} at index ${idx}:`);
    console.log(content.substring(idx - 100, idx + 100));
  }
});
