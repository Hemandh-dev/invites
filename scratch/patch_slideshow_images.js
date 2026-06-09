const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

const htmlPath = path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const jsBundlePath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const secondaryJsPath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', '6ivVeBrLahc2F3GtSoUk', 'tYlZ8mj63wnLi9iR7scz', 'a_Q6oz22n.js');

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

// 1. Update static HTML (meenaya.html) images
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace the original image references
  const imageMap = [
    ['https://framerusercontent.com/images/HbWyQm5QqRuXQY7LxMf5kx10akU.png', '/framerusercontent.com/images/media__1781017365100.jpg'],
    ['https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png', '/framerusercontent.com/images/media__1781017365106.jpg'],
    ['https://framerusercontent.com/images/VgBpHrwsihOjP7HT4E3SSrxEs0.png', '/framerusercontent.com/images/media__1781017365111.jpg'],
    ['https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png', '/framerusercontent.com/images/media__1781017365114.jpg']
  ];
  
  let replacedAny = false;
  imageMap.forEach(([target, replacement]) => {
    if (html.includes(target)) {
      html = html.split(target).join(replacement);
      replacedAny = true;
    }
  });
  
  if (replacedAny) {
    console.log('  [meenaya.html] Replaced image links successfully');
    fs.writeFileSync(htmlPath, html, 'utf8');
  }
}

// 2. Update slots in main JS bundle (vzzpaPs1.mjs)
const vzzTarget = `slots:[d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1834,pixelWidth:1026,sizes:\`268px\`,src:\`https://framerusercontent.com/images/HbWyQm5QqRuXQY7LxMf5kx10akU.png?width=1026&height=1834\`,srcSet:\`https://framerusercontent.com/images/HbWyQm5QqRuXQY7LxMf5kx10akU.png?scale-down-to=1024&width=1026&height=1834 572w,https://framerusercontent.com/images/HbWyQm5QqRuXQY7LxMf5kx10akU.png?width=1026&height=1834 1026w\`},className:\`framer-679jd\`,"data-framer-name":\`Wedding shoot 1\`,layoutDependency:j,layoutId:\`UTOcBWItA\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1840,pixelWidth:1030,sizes:\`268px\`,src:\`https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840\`,srcSet:\`https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?scale-down-to=1024&width=1030&height=1840 573w,https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840 1030w\`},className:\`framer-sif4cl\`,"data-framer-name":\`Wedding shoot 2\`,layoutDependency:j,layoutId:\`ym41tHEP9\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1832,pixelWidth:1028,sizes:\`268px\`,src:\`https://framerusercontent.com/images/VgBpHrwsihOjP7HT4E3SSrxEs0.png?width=1028&height=1832\`,srcSet:\`https://framerusercontent.com/images/VgBpHrwsihOjP7HT4E3SSrxEs0.png?scale-down-to=1024&width=1028&height=1832 574w,https://framerusercontent.com/images/VgBpHrwsihOjP7HT4E3SSrxEs0.png?width=1028&height=1832 1028w\`},className:\`framer-1w6qfi3\`,"data-framer-name":` + '`Wedding shoot 3`' + `,layoutDependency:j,layoutId:\`a2ZckpiNZ\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1834,pixelWidth:1032,sizes:\`268px\`,src:\`https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834\`,srcSet:\`https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?scale-down-to=1024&width=1032&height=1834 576w,https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834 1032w\`},className:\`framer-1qvpcia\`,"data-framer-name":\`Wedding shoot 4\`,layoutDependency:j,layoutId:\`UCPIHFPhp\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1834,pixelWidth:1032,sizes:\`268px\`,src:\`https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834\`,srcSet:\`https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?scale-down-to=1024&width=1032&height=1834 576w,https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834 1032w\`},className:\`framer-pft7l8\`,"data-framer-name":\`Wedding shoot 5\`,layoutDependency:j,layoutId:\`XU9cUQ2Ih\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1840,pixelWidth:1030,sizes:\`268px\`,src:\`https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840\`,srcSet:\`https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?scale-down-to=1024&width=1030&height=1840 573w,https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840 1030w\`},className:\`framer-l15e94\`,"data-framer-name":\`Wedding shoot 6\`,layoutDependency:j,layoutId:\`fJDoBVEZO\`})]`;

const vzzReplacement = `slots:[d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1834,pixelWidth:1026,sizes:\`268px\`,src:\`/framerusercontent.com/images/media__1781017365100.jpg\`},className:\`framer-679jd\`,"data-framer-name":\`Wedding shoot 1\`,layoutDependency:j,layoutId:\`UTOcBWItA\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1840,pixelWidth:1030,sizes:\`268px\`,src:\`/framerusercontent.com/images/media__1781017365106.jpg\`},className:\`framer-sif4cl\`,"data-framer-name":\`Wedding shoot 2\`,layoutDependency:j,layoutId:\`ym41tHEP9\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1832,pixelWidth:1028,sizes:\`268px\`,src:\`/framerusercontent.com/images/media__1781017365111.jpg\`},className:\`framer-1w6qfi3\`,"data-framer-name":\`Wedding shoot 3\`,layoutDependency:j,layoutId:\`a2ZckpiNZ\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1834,pixelWidth:1032,sizes:\`268px\`,src:\`/framerusercontent.com/images/media__1781017365114.jpg\`},className:\`framer-1qvpcia\`,"data-framer-name":\`Wedding shoot 4\`,layoutDependency:j,layoutId:\`UCPIHFPhp\`}),d(F,{background:{alt:\`\`,fit:\`fill\`,intrinsicHeight:810,intrinsicWidth:540,pixelHeight:1834,pixelWidth:1032,sizes:\`268px\`,src:\`/framerusercontent.com/images/media__1781017365136.jpg\`},className:\`framer-pft7l8\`,"data-framer-name":\`Wedding shoot 5\`,layoutDependency:j,layoutId:\`XU9cUQ2Ih\`})]`;

replaceInFile(jsBundlePath, vzzTarget, vzzReplacement);

// 3. Update slots in secondary JS (a_Q6oz22n.js)
const secondaryTarget = `                                    slots: [ /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 810,
                                            intrinsicWidth: 540,
                                            pixelHeight: 1834,
                                            pixelWidth: 1026,
                                            sizes: "268px",
                                            src: "https://framerusercontent.com/images/HbWyQm5QqRuXQY7LxMf5kx10akU.png?width=1026&height=1834",
                                            srcSet: "https://framerusercontent.com/images/HbWyQm5QqRuXQY7LxMf5kx10akU.png?scale-down-to=1024&width=1026&height=1834 572w,https://framerusercontent.com/images/HbWyQm5QqRuXQY7LxMf5kx10akU.png?width=1026&height=1834 1026w"
                                        },
                                        className: "framer-679jd",
                                        "data-framer-name": "Wedding shoot 1",
                                        layoutDependency: layoutDependency,
                                        layoutId: "UTOcBWItA"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 810,
                                            intrinsicWidth: 540,
                                            pixelHeight: 1840,
                                            pixelWidth: 1030,
                                            sizes: "268px",
                                            src: "https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840",
                                            srcSet: "https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?scale-down-to=1024&width=1030&height=1840 573w,https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840 1030w"
                                        },
                                        className: "framer-sif4cl",
                                        "data-framer-name": "Wedding shoot 2",
                                        layoutDependency: layoutDependency,
                                        layoutId: "ym41tHEP9"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 810,
                                            intrinsicWidth: 540,
                                            pixelHeight: 1832,
                                            pixelWidth: 1028,
                                            sizes: "268px",
                                            src: "https://framerusercontent.com/images/VgBpHrwsihOjP7HT4E3SSrxEs0.png?width=1028&height=1832",
                                            srcSet: "https://framerusercontent.com/images/VgBpHrwsihOjP7HT4E3SSrxEs0.png?scale-down-to=1024&width=1028&height=1832 574w,https://framerusercontent.com/images/VgBpHrwsihOjP7HT4E3SSrxEs0.png?width=1028&height=1832 1028w"
                                        },
                                        className: "framer-1w6qfi3",
                                        "data-framer-name": "Wedding shoot 3",
                                        layoutDependency: layoutDependency,
                                        layoutId: "a2ZckpiNZ"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 810,
                                            intrinsicWidth: 540,
                                            pixelHeight: 1834,
                                            pixelWidth: 1032,
                                            sizes: "268px",
                                            src: "https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834",
                                            srcSet: "https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?scale-down-to=1024&width=1032&height=1834 576w,https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834 1032w"
                                        },
                                        className: "framer-1qvpcia",
                                        "data-framer-name": "Wedding shoot 4",
                                        layoutDependency: layoutDependency,
                                        layoutId: "UCPIHFPhp"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 810,
                                            intrinsicWidth: 540,
                                            pixelHeight: 1834,
                                            pixelWidth: 1032,
                                            sizes: "268px",
                                            src: "https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834",
                                            srcSet: "https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?scale-down-to=1024&width=1032&height=1834 576w,https://framerusercontent.com/images/4moRDGJdHuGozf1nEo8Y2t4pdw.png?width=1032&height=1834 1032w"
                                        },
                                        className: "framer-pft7l8",
                                        "data-framer-name": "Wedding shoot 5",
                                        layoutDependency: layoutDependency,
                                        layoutId: "XU9cUQ2Ih"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 810,
                                            intrinsicWidth: 540,
                                            pixelHeight: 1840,
                                            pixelWidth: 1030,
                                            sizes: "268px",
                                            src: "https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840",
                                            srcSet: "https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?scale-down-to=1024&width=1030&height=1840 573w,https://framerusercontent.com/images/gXWpfu1hEOSPMvZeJtINB07pfJU.png?width=1030&height=1840 1030w"
                                        },
                                        className: "framer-l15e94",
                                        "data-framer-name": "Wedding shoot 6",
                                        layoutDependency: layoutDependency,
                                        layoutId: "fJDoBVEZO"
                                    })]`;

const secondaryReplacement = `                                    slots: [ /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            src: "/framerusercontent.com/images/media__1781017365100.jpg"
                                        },
                                        className: "framer-679jd",
                                        "data-framer-name": "Wedding shoot 1",
                                        layoutDependency: layoutDependency,
                                        layoutId: "UTOcBWItA"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            src: "/framerusercontent.com/images/media__1781017365106.jpg"
                                        },
                                        className: "framer-sif4cl",
                                        "data-framer-name": "Wedding shoot 2",
                                        layoutDependency: layoutDependency,
                                        layoutId: "ym41tHEP9"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            src: "/framerusercontent.com/images/media__1781017365111.jpg"
                                        },
                                        className: "framer-1w6qfi3",
                                        "data-framer-name": "Wedding shoot 3",
                                        layoutDependency: layoutDependency,
                                        layoutId: "a2ZckpiNZ"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            src: "/framerusercontent.com/images/media__1781017365114.jpg"
                                        },
                                        className: "framer-1qvpcia",
                                        "data-framer-name": "Wedding shoot 4",
                                        layoutDependency: layoutDependency,
                                        layoutId: "UCPIHFPhp"
                                    }), /*#__PURE__*/ _jsx(Image, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            src: "/framerusercontent.com/images/media__1781017365136.jpg"
                                        },
                                        className: "framer-pft7l8",
                                        "data-framer-name": "Wedding shoot 5",
                                        layoutDependency: layoutDependency,
                                        layoutId: "XU9cUQ2Ih"
                                    })]`;

replaceInFile(secondaryJsPath, secondaryTarget, secondaryReplacement);

console.log("Slideshow image updates complete!");
