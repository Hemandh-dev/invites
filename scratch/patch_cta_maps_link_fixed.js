const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

const htmlPath = path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const jsBundlePath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const secondaryJsPath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js');

// 1. Static HTML links replacements
if (fs.existsSync(htmlPath)) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  const r1 = /<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">\s*<!--\$-->\s*<div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1x9ovf3" data-framer-name="Desktop" style="width:100%">/;
  const r2 = /<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">\s*<!--\$-->\s*<div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1w5tm9c" data-framer-name="Phone" style="width:100%">/;
  const r3 = /Click to open the map<\/p>\s*<\/div>\s*<\/div>\s*<!--\/\$-->/g;

  if (r1.test(content)) {
    content = content.replace(r1, `<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">
                <!--$-->
                <a href="https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw" target="_blank" rel="noopener" style="display: contents;">
                <div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1x9ovf3" data-framer-name="Desktop" style="width:100%">`);
    console.log("  [meenaya.html] Replaced Desktop start tag successfully");
  } else {
    console.log("  [meenaya.html] Desktop start tag NOT found or already replaced!");
  }

  if (r2.test(content)) {
    content = content.replace(r2, `<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">
                <!--$-->
                <a href="https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw" target="_blank" rel="noopener" style="display: contents;">
                <div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1w5tm9c" data-framer-name="Phone" style="width:100%">`);
    console.log("  [meenaya.html] Replaced Phone start tag successfully");
  } else {
    console.log("  [meenaya.html] Phone start tag NOT found or already replaced!");
  }

  let r3Count = (content.match(r3) || []).length;
  if (r3Count > 0) {
    content = content.replace(r3, `Click to open the map</p>
                    </div>
                </div>
                </a>
                <!--/$-->`);
    console.log(`  [meenaya.html] Replaced closing tags successfully (${r3Count} times)`);
  } else {
    console.log("  [meenaya.html] Closing tags NOT found or already replaced!");
  }

  fs.writeFileSync(htmlPath, content, 'utf8');
} else {
  console.log(`HTML file not found: ${htmlPath}`);
}

console.log("HTML patching completed successfully!");
