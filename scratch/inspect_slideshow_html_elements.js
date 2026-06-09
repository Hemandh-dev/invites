const fs = require('fs');
const content = fs.readFileSync('www.missingpieceinvites.com/demos/meenaya.html', 'utf8');

const classNames = [
  'framer-679jd',
  'framer-sif4cl',
  'framer-1w6qfi3',
  'framer-1qvpcia',
  'framer-pft7l8',
  'framer-l15e94'
];

classNames.forEach(cls => {
  let idx = -1;
  let count = 0;
  while ((idx = content.indexOf(cls, idx + 1)) !== -1) {
    count++;
    console.log(`--- Match for class ${cls} ---`);
    // print surrounding block containing <div or <img
    let start = content.lastIndexOf('<div', idx);
    let end = content.indexOf('</div>', idx);
    console.log(content.substring(start, end + 6));
  }
});
