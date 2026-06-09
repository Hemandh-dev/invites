const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const destDemosPath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'invitation.html');
const destRootPath = path.join(__dirname, '..', 'invitation.html');

if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, destDemosPath);
  console.log(`Copied meenaya.html -> ${destDemosPath}`);
  
  fs.copyFileSync(srcPath, destRootPath);
  console.log(`Copied meenaya.html -> ${destRootPath}`);
} else {
  console.log(`Source file not found at: ${srcPath}`);
}
