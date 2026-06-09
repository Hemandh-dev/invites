const fs = require('fs');
const content = fs.readFileSync('framerusercontent.com/sites/3bR6R2YrHoycodLqL6z8ep/https/framerusercontent.com/modules/mGinzKa7rLPp2rFADrxC/Xs9hqqyZLo97F8nUeVXO/nKQpHmBXO.js', 'utf8');

let idx = content.indexOf('name: "CTA - Maps"');
if (idx === -1) idx = content.indexOf('name:"CTA - Maps"');

if (idx !== -1) {
  console.log('Found CTA - Maps at', idx);
  console.log(content.substring(idx - 600, idx + 400));
} else {
  console.log('CTA - Maps not found');
}
