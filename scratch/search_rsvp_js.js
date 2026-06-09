const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.gemini' && f !== 'scratch') walk(fp);
    } else {
      if (f.endsWith('.js') || f.endsWith('.mjs')) {
        let content = fs.readFileSync(fp, 'utf8');
        let lower = content.toLowerCase();
        if (lower.includes('rsvp')) {
          console.log('Found rsvp in file:', fp);
          let idx = lower.indexOf('rsvp');
          while (idx !== -1) {
            console.log('  Context:', content.substring(idx - 100, idx + 100));
            idx = lower.indexOf('rsvp', idx + 1);
          }
        }
      }
    }
  });
}

walk('.');
