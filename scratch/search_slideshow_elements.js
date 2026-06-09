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
        if (content.includes('UTOcBWItA')) {
          console.log('Found UTOcBWItA in file:', fp);
        }
      }
    }
  });
}

walk('.');
