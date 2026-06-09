const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const content = fs.readFileSync(filePath, 'utf8');

// Find where y is used as an element child, e.g. children:y, or inside an array.
// The destructuring was: {style:m,className:g,layoutId:_,variant:v,b0Odmcs_Z:y,...} = rr(e)
// We will look for y in the surrounding code
let startIdx = content.indexOf('b0Odmcs_Z:y');
if (startIdx !== -1) {
  console.log("Found b0Odmcs_Z:y!");
  // Find where y is used after this point
  let nextIdx = startIdx;
  while (true) {
    let yIdx = content.indexOf('y', nextIdx + 1);
    if (yIdx === -1 || yIdx - startIdx > 15000) break;
    
    // Check if y is used as a standalone variable (not part of word)
    const prevChar = content[yIdx - 1];
    const nextChar = content[yIdx + 1];
    const wordRegex = /[a-zA-Z0-9_$]/;
    if (!wordRegex.test(prevChar) && !wordRegex.test(nextChar)) {
      console.log(`FOUND STANDALONE y AT INDEX ${yIdx}:`);
      console.log(content.substring(yIdx - 100, yIdx + 100).replace(/\n/g, ' '));
    }
    nextIdx = yIdx;
  }
}
