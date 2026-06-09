const fs = require('fs');
const content = fs.readFileSync('www.missingpieceinvites.com/demos/meenaya.html', 'utf8');

const r1 = /<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">\s*<!--\$-->\s*<div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1x9ovf3" data-framer-name="Desktop" style="width:100%">/;
const r2 = /<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">\s*<!--\$-->\s*<div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1w5tm9c" data-framer-name="Phone" style="width:100%">/;
const r3 = /Click to open the map<\/p>\s*<\/div>\s*<\/div>\s*<!--\/\$-->/g;

console.log('Match r1:', r1.test(content));
console.log('Match r2:', r2.test(content));
console.log('Match r3 count:', (content.match(r3) || []).length);
