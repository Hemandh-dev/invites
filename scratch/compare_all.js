const fs = require('fs');
const https = require('https');
const path = require('path');

const files = [
  'react.DGqWOrNJ.mjs',
  'rolldown-runtime.B_hqT06A.mjs',
  'motion.tcKmG7wX.mjs',
  'framer.6CW7Szc7.mjs',
  'rNzK92DPl.DuYGZFRI.mjs',
  'qlbbgH4df.BKI-tkou.mjs',
  'bqzoPsKqs.DnRf_5Ph.mjs',
  '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs',
  'Countdown.CgLEBX9l.mjs',
  'OIjZRBmWDcIE2B6qgG1j.e6XzBne5.mjs',
  'index.es.CBl3SKZx.mjs',
  'KHQgVYK_f.C_7rCHEo.mjs',
  'bMSELzOfJ.wY9l5jnL.mjs',
  'LpQMHSxlP.Dh1Bm4Mu.mjs',
  'Badge.B02oQXR-.mjs',
  'SmoothScroll_Prod.C7gBc5lY.mjs',
  'LLOdYO6e3.BZlcpGdy.mjs',
  'nKQpHmBXO.B0f-XCdU.mjs',
  'siteMetadata.CbQgKIRc.mjs',
  'script_main.xsKu8kgO.mjs'
];

const localDir = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep');
const cdnBase = 'https://framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url}: Status ${res.statusCode}`));
        return;
      }
      let chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  for (const file of files) {
    const localPath = path.join(localDir, file);
    if (!fs.existsSync(localPath)) {
      console.log(`[MISSING LOCAL] ${file}`);
      continue;
    }
    const localContent = fs.readFileSync(localPath);
    const cdnUrl = `${cdnBase}/${file}`;
    try {
      const cdnContent = await fetchUrl(cdnUrl);
      if (localContent.equals(cdnContent)) {
        console.log(`[MATCH] ${file} (${localContent.length} bytes)`);
      } else {
        console.log(`[MISMATCH] ${file} (local: ${localContent.length} bytes, CDN: ${cdnContent.length} bytes)`);
        // Save the correct file
        fs.writeFileSync(localPath, cdnContent);
        console.log(`  -> RESTORED from CDN`);
      }
    } catch (err) {
      console.error(`[ERROR checking ${file}]: ${err.message}`);
    }
  }
}

run();
