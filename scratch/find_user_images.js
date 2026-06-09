const fs = require('fs');
const path = require('path');

function searchForImages(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let fp = path.join(dir, f);
    try {
      let stat = fs.statSync(fp);
      if (stat.isDirectory()) {
        // Skip node_modules, .git
        if (f !== 'node_modules' && f !== '.git') {
          searchForImages(fp);
        }
      } else {
        let ext = path.extname(f).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
          console.log(`Found image: ${fp} (${stat.size} bytes, created ${stat.birthtime})`);
        }
      }
    } catch (e) {}
  });
}

console.log('--- Searching in Workspace ---');
searchForImages('.');

console.log('\n--- Searching in AppData Directory ---');
searchForImages('C:\\Users\\mrhem\\.gemini\\antigravity');
