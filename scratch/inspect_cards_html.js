const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

const cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'];
for (const card of cards) {
  let idx = content.indexOf(`name="${card}"`);
  if (idx !== -1) {
    console.log(`--- HTML FOR ${card} ---`);
    console.log(content.substring(idx - 50, idx + 800));
  }
}
