const fs = require('fs');
const content = fs.readFileSync('www.missingpieceinvites.com/demos/meenaya.html', 'utf8');

let idx = -1;
let occurrences = [];
while ((idx = content.indexOf('data-framer-name="CTA - Maps"', idx + 1)) !== -1) {
  let start = content.lastIndexOf('<div class="framer-5ugetn-container"', idx);
  // Find the closing </div> of the inner div (which has data-framer-name="Desktop" or "Phone")
  let innerDivStart = content.indexOf('<div name="CTA - Maps"', idx);
  // find matching close tag for innerDivStart
  let innerDivEnd = content.indexOf('</div>', innerDivStart);
  // Actually, we want to look at the block of HTML. Let's print 300 characters before and 1000 characters after.
  console.log('--- HTML Segment ---');
  console.log(content.substring(start, start + 900));
}
