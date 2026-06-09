const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

const htmlPath = path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const jsModulePath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'CAYlJEtsdIJh39cSI95x', '9npA7VwvCKleSurPfUCE', 'bMSELzOfJ.js');
const jsMinifiedPath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'bMSELzOfJ.wY9l5jnL.mjs');

function replaceInFile(filePath, target, replacement) {
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(target)) {
    const parts = content.split(target);
    const count = parts.length - 1;
    content = parts.join(replacement);
    console.log(`  [${path.basename(filePath)}] Replaced successfully (${count} times)`);
    fs.writeFileSync(filePath, content, 'utf8');
  } else {
    console.log(`  [${path.basename(filePath)}] Target NOT found!`);
  }
}

console.log("Applying text changes in static HTML (meenaya.html)...");
replaceInFile(htmlPath, 'Please<br class="framer-text">rsvp', 'Contact');

console.log("\nApplying text changes in bMSELzOfJ.js...");
replaceInFile(
  jsModulePath,
  'children: ["Please", /*#__PURE__*/ _jsx(motion.br, {}), "rsvp"]',
  'children: "Contact"'
);

const complexJsTarget = `      children: [ /*#__PURE__*/ _jsx(motion.span, {
                                                style: {
                                                    "--framer-font-size": "70px"
                                                },
                                                children: "Please"
                                            }), /*#__PURE__*/ _jsx(motion.br, {}), /*#__PURE__*/ _jsx(motion.span, {
                                                style: {
                                                    "--framer-font-size": "70px"
                                                },
                                                children: "rsvp"
                                            })]`;

const complexJsReplacement = `      children: /*#__PURE__*/ _jsx(motion.span, {
                                                style: {
                                                    "--framer-font-size": "70px"
                                                },
                                                children: "Contact"
                                            })`;

replaceInFile(jsModulePath, complexJsTarget, complexJsReplacement);

console.log("\nApplying text changes in bMSELzOfJ.wY9l5jnL.mjs...");
replaceInFile(
  jsMinifiedPath,
  'children:[`Please`,u(m.br,{}),`rsvp`]',
  'children:`Contact`'
);

replaceInFile(
  jsMinifiedPath,
  'children:[u(m.span,{style:{"--framer-font-size":`70px`},children:`Please`}),u(m.br,{}),u(m.span,{style:{"--framer-font-size":`70px`},children:`rsvp`})]',
  'children:u(m.span,{style:{"--framer-font-size":`70px`},children:`Contact`})'
);

console.log("RSVP text update completed!");
