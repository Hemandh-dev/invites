const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all paragraphs, headings, and spans that contain text
// Framer uses tags like p, h1, h2, span, etc. with some styling
const regex = /<(h[1-6]|p|span|div)[^>]*>(.*?)<\/\1>/gi;
let match;
const foundTexts = [];

// Let's filter out HTML tags inside the match or empty strings
while ((match = regex.exec(content)) !== null) {
  let text = match[2].replace(/<[^>]*>/g, '').trim();
  if (text.length > 2 && text.length < 200) {
    // Check if it looks like English text and is not code
    if (!text.includes('{') && !text.includes('}') && !text.includes('function') && !text.includes('var ')) {
      foundTexts.push(text);
    }
  }
}

// Print unique texts that might be wedding details
const uniqueTexts = Array.from(new Set(foundTexts));
console.log("Found texts in HTML:");
uniqueTexts.forEach((t, i) => {
  // Let's print the first 100 interesting ones
  if (t.includes('Wedding') || t.includes('Ceremony') || t.includes('Save') || t.includes('Invite') || t.match(/[A-Z][a-z]+ & [A-Z][a-z]+/)) {
    console.log(`[!] ${t}`);
  } else if (i < 200) {
    console.log(`[${i}] ${t}`);
  }
});
