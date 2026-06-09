const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js');
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log("File exists! Searching for Card instantiations...");
  
  const terms = ['NYC73E7qn', 'TCbflwnqi', 'b6EIVO2aE', 'xQ3RPoPuE', 'Qob9mh6Wt', 'o3Sh4c7Fi'];
  for (const term of terms) {
    let idx = content.indexOf(term);
    if (idx !== -1) {
      console.log(`FOUND ${term} in nKQpHmBXO.js. Context:`);
      const start = Math.max(0, idx - 100);
      const end = Math.min(content.length, idx + 100);
      console.log(content.substring(start, end).replace(/\n/g, ' '));
    }
  }
} else {
  console.log("nKQpHmBXO.js does not exist at path!");
}
