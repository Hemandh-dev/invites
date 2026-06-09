const fs = require('fs');
const content = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs', 'utf8');

let start = content.indexOf('slots:[d(F,{background:{alt:');
let end = content.indexOf('],startFrom:0', start);
if (start !== -1 && end !== -1) {
  console.log(content.substring(start, end + 13));
} else {
  console.log('Slots array not found');
}
