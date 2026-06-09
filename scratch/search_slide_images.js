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
        if (lower.includes('slideshow') || lower.includes('carousel') || lower.includes('slider') || lower.includes('gallery')) {
          console.log('Found keyword in file:', fp);
          // print surrounding contexts
          let keywords = ['slideshow', 'carousel', 'slider', 'gallery'];
          keywords.forEach(kw => {
            let idx = lower.indexOf(kw);
            while (idx !== -1) {
              console.log(`  [${kw}] Context:`, content.substring(idx - 100, idx + 100));
              idx = lower.indexOf(kw, idx + 1);
            }
          });
        }
      }
    }
  });
}

walk('.');
