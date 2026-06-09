const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.gemini' && f !== 'scratch') walk(fp);
    } else {
      if (f.endsWith('.js') || f.endsWith('.mjs') || f.endsWith('.html')) {
        let content = fs.readFileSync(fp, 'utf8');
        let lower = content.toLowerCase();
        if (lower.includes('missing piece 2025') || lower.includes('missing piece') || lower.includes('©')) {
          console.log('Found in file:', fp);
          let idx = lower.indexOf('missing piece');
          if (idx === -1) idx = lower.indexOf('©');
          while (idx !== -1) {
            console.log('  Context:', content.substring(idx - 100, idx + 100));
            idx = lower.indexOf('missing piece', idx + 1);
            if (idx === -1 && lower.includes('©')) idx = lower.indexOf('©', idx + 1);
          }
        }
      }
    }
  });
}

walk('.');
