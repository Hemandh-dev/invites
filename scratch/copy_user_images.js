const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\mrhem\\.gemini\\antigravity\\brain\\be7efa84-d747-4be9-9295-344e3301e915';
const destDir = path.join(__dirname, '..', 'framerusercontent.com', 'images');

const files = [
  'media__1781017365100.jpg',
  'media__1781017365106.jpg',
  'media__1781017365111.jpg',
  'media__1781017365114.jpg',
  'media__1781017365136.jpg'
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f);
  const destPath = path.join(destDir, f);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f} -> ${destPath}`);
  } else {
    console.log(`Source not found: ${srcPath}`);
  }
});
