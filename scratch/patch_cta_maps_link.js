const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

const htmlPath = path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const jsBundlePath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const secondaryJsPath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js');

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

console.log("Applying CTA - Maps links in main JS bundle (vzzpaPs1.mjs)...");
replaceInFile(
  jsBundlePath,
  'children:d(M,{breakpoint:E,overrides:{QCtUGa31B:{variant:X(`XUwHzQMHS`)}},children:d(_i,{height:`100%`,id:`EZx_eKpY6`,layoutId:`EZx_eKpY6`,name:`CTA - Maps`,style:{width:`100%`},variant:X(`lr8le1kO5\`),width:`100%`})})',
  'children:d("a",{href:"https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw",target:"_blank",rel:"noopener",style:{display:"contents"},children:d(M,{breakpoint:E,overrides:{QCtUGa31B:{variant:X(`XUwHzQMHS`)}},children:d(_i,{height:`100%`,id:`EZx_eKpY6`,layoutId:`EZx_eKpY6`,name:`CTA - Maps`,style:{width:`100%`},variant:X(`lr8le1kO5\`),width:`100%`})})})'
);

console.log("\nApplying CTA - Maps links in secondary JS file (nKQpHmBXO.js)...");
replaceInFile(
  secondaryJsPath,
  'children:/*#__PURE__*/_jsx(PropertyOverrides,{breakpoint:baseVariant,overrides:{QCtUGa31B:{variant:matchVariant("XUwHzQMHS")}},children:/*#__PURE__*/_jsx(CTA1,{height:"100%",id:"EZx_eKpY6",layoutId:"EZx_eKpY6",name:"CTA - Maps",style:{width:"100%"},variant:matchVariant("lr8le1kO5"),width:"100%"})})',
  'children:/*#__PURE__*/_jsx("a",{href:"https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw",target:"_blank",rel:"noopener",style:{display:"contents"},children:/*#__PURE__*/_jsx(PropertyOverrides,{breakpoint:baseVariant,overrides:{QCtUGa31B:{variant:matchVariant("XUwHzQMHS")}},children:/*#__PURE__*/_jsx(CTA1,{height:"100%",id:"EZx_eKpY6",layoutId:"EZx_eKpY6",name:"CTA - Maps",style:{width:"100%"},variant:matchVariant("lr8le1kO5"),width:"100%"})})})'
);

console.log("\nApplying CTA - Maps links in static HTML (meenaya.html)...");
// For Desktop variant
replaceInFile(
  htmlPath,
  `<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">
                <!--$-->
                <div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1x9ovf3" data-framer-name="Desktop" style="width:100%">`,
  `<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">
                <!--$-->
                <a href="https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw" target="_blank" rel="noopener" style="display: contents;">
                <div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1x9ovf3" data-framer-name="Desktop" style="width:100%">`
);

// For Phone variant
replaceInFile(
  htmlPath,
  `<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">
                <!--$-->
                <div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1w5tm9c" data-framer-name="Phone" style="width:100%">`,
  `<div class="framer-5ugetn-container" data-framer-name="CTA - Maps" name="CTA - Maps">
                <!--$-->
                <a href="https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw" target="_blank" rel="noopener" style="display: contents;">
                <div name="CTA - Maps" class="framer-37b6A framer-1x9ovf3 framer-v-1w5tm9c" data-framer-name="Phone" style="width:100%">`
);

// Wrap closing tags for both (they look identical in HTML)
replaceInFile(
  htmlPath,
  `Click to open the map</p>
                    </div>
                </div>
                <!--/$-->`,
  `Click to open the map</p>
                    </div>
                </div>
                </a>
                <!--/$-->`
);

console.log("CTA Link wrapping completed!");
