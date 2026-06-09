const fs = require('fs');
const https = require('https');
const path = require('path');

const localPath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const liveUrl = 'https://www.missingpieceinvites.com/demos/meenaya.html';

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
  if (!fs.existsSync(localPath)) {
    console.log(`[MISSING LOCAL] meenaya.html`);
    return;
  }
  const localContent = fs.readFileSync(localPath);
  try {
    const liveContent = await fetchUrl(liveUrl);
    if (localContent.equals(liveContent)) {
      console.log(`[MATCH] meenaya.html (${localContent.length} bytes)`);
    } else {
      console.log(`[MISMATCH] meenaya.html (local: ${localContent.length} bytes, live: ${liveContent.length} bytes)`);
      // Save live version
      fs.writeFileSync(localPath, liveContent);
      console.log(`  -> RESTORED from live site`);
    }
  } catch (err) {
    console.error(`[ERROR checking HTML]: ${err.message}`);
  }
}

run();
