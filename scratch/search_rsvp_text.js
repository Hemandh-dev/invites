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
        if (lower.includes('please rsvp') || lower.includes('please\nrsvp') || lower.includes('please<br') || lower.includes('pleasersvp')) {
          console.log('Found in file:', fp);
          // Print some surrounding context
          let idx = lower.indexOf('please');
          while (idx !== -1) {
            console.log('  Context:', content.substring(idx - 100, idx + 200));
            idx = lower.indexOf('please', idx + 1);
          }
        }
      }
    }
  });
}

walk('.');
