const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'invitation.html');

// Same domains the server.js was rewriting
const domains = [
  'framerusercontent.com',
  'fonts.gstatic.com',
  't.contentsquare.net',
  'events.framer.com',
  'www.googletagmanager.com',
  'slrgkgulru.pixelflow.so',
  'api.pixelflow.so',
  'app.framerstatic.com',
  'c.ba.contentsquare.net',
  'framer.com',
  'www.missingpieceinvites.com'
];

let content = fs.readFileSync(filePath, 'utf8');
let totalReplacements = 0;

for (const domain of domains) {
  const escapedDomain = domain.replace(/\./g, '\\.');
  
  // Replace https://domain and http://domain -> /domain
  const regex = new RegExp(`(https?:)//${escapedDomain}`, 'g');
  const matches = content.match(regex);
  const count = matches ? matches.length : 0;
  
  if (count > 0) {
    content = content.replace(regex, `/${domain}`);
    console.log(`Rewrote ${count} URLs for ${domain}`);
    totalReplacements += count;
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`\nTotal: ${totalReplacements} URLs rewritten in invitation.html`);
