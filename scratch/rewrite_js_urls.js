const fs = require('fs');
const path = require('path');

const domains = [
  'framerusercontent.com',
  'fonts.gstatic.com',
  't.contentsquare.net',
  'events.framer.com',
  'www.googletagmanager.com',
  'slrgkgulru.pixelflow.so',
  'api.pixelflow.so',
  'app.framerstatic.com',
  'c.ba.contentsquare.net',
  'framer.com',
  'www.missingpieceinvites.com'
];

// Find all .mjs files in framerusercontent.com/sites/
const sitesDir = path.join(__dirname, '..', 'framerusercontent.com', 'sites');

function getAllMjsFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...getAllMjsFiles(fullPath));
    } else if (item.name.endsWith('.mjs')) {
      results.push(fullPath);
    }
  }
  return results;
}

const mjsFiles = getAllMjsFiles(sitesDir);
let grandTotal = 0;

for (const filePath of mjsFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let fileTotal = 0;

  for (const domain of domains) {
    const escapedDomain = domain.replace(/\./g, '\\.');
    const regex = new RegExp(`(https?:)//${escapedDomain}`, 'g');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    if (count > 0) {
      content = content.replace(regex, `/${domain}`);
      fileTotal += count;
    }
  }

  if (fileTotal > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Rewrote ${fileTotal} URLs in ${path.basename(filePath)}`);
    grandTotal += fileTotal;
  }
}

console.log(`\nTotal: ${grandTotal} URLs rewritten across ${mjsFiles.length} JS files`);
