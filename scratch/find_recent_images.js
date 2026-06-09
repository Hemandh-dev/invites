const fs = require('fs');
const path = require('path');

const now = Date.now();
const oneHour = 60 * 60 * 1000;

function searchForRecentImages(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let fp = path.join(dir, f);
    try {
      let stat = fs.statSync(fp);
      if (stat.isDirectory()) {
        if (f !== 'node_modules' && f !== '.git') {
          searchForRecentImages(fp);
        }
      } else {
        let ext = path.extname(f).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
          let diff = now - stat.mtimeMs;
          if (diff < oneHour) {
            console.log(`Found recent image: ${fp} (${stat.size} bytes, modified ${stat.mtime})`);
          }
        }
      }
    } catch (e) {}
  });
}

console.log('--- Searching in Workspace ---');
searchForRecentImages('.');

console.log('\n--- Searching in AppData Directory ---');
searchForRecentImages('C:\\Users\\mrhem\\.gemini\\antigravity');
