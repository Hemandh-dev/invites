const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

const htmlPath = path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const jsBundlePath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const secondaryJsPath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js');

function replaceInFile(filePath, target, replacement) {
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(target)) {
    const parts = content.split(target);
    const count = parts.length - 1;
    content = parts.join(replacement);
    console.log(`  [${path.basename(filePath)}] Replaced successfully (${count} times)`);
    fs.writeFileSync(filePath, content, 'utf8');
  } else {
    console.log(`  [${path.basename(filePath)}] Target NOT found!`);
  }
}

console.log("Removing copyright text in static HTML (meenaya.html)...");
replaceInFile(htmlPath, 'class="framer-text">© Missing Piece 2025</p>', 'class="framer-text"></p>');

console.log("\nRemoving copyright text in main JS bundle (vzzpaPs1.mjs)...");
replaceInFile(jsBundlePath, 'children:`© Missing Piece 2025`', 'children:``');

console.log("\nRemoving copyright text in secondary JS (nKQpHmBXO.js)...");
replaceInFile(secondaryJsPath, 'children:"\\xa9 Missing Piece 2025"', 'children:""');

console.log("Copyright removal completed!");
