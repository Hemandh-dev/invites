const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

const htmlPath = path.join(projectDir, 'www.missingpieceinvites.com', 'demos', 'meenaya.html');
const jsBundlePath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', '-XZpmxfF1qm1oVTXMUajuqutYRzxhY2USEO22jmpgfI.vzzpaPs1.mjs');
const secondaryJsPath = path.join(projectDir, 'framerusercontent.com', 'sites', '3bR6R2YrHoycodLqL6z8ep', 'https', 'framerusercontent.com', 'modules', 'mGinzKa7rLPp2rFADrxC', 'Xs9hqqyZLo97F8nUeVXO', 'nKQpHmBXO.js');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const [target, replacement] of replacements) {
    let count = 0;
    while (content.includes(target)) {
      content = content.replace(target, replacement);
      count++;
    }
    if (count > 0) {
      console.log(`  [${path.basename(filePath)}] Replaced string successfully (${count} times)`);
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. General replacements for names & parents
const generalReplacements = [
  ['Vishu', 'Siva Dhanush'],
  ['Kavya', 'Renukadevi'],
  ['Smt. Kamakshi Ammal & Shri Srinivasan Iyer', 'Mr. K. Siva Kumar & Mrs. Prema Siva Kumar'],
  ['Smt. Kamakshi Ammal &amp; Shri Srinivasan Iyer', 'Mr. K. Siva Kumar &amp; Mrs. Prema Siva Kumar'],
  ['Smt. Parvathi & Shri K. Ramaswamy', 'Mr. M. Subramani & Mrs. S. Banumathi'],
  ['Smt. Parvathi &amp; Shri K. Ramaswamy', 'Mr. M. Subramani &amp; Mrs. S. Banumathi'],
  ['Smt. Parvathi Ammal & Shri Krishnan Iyer ', 'Mr. M. Subramani & Mrs. S. Banumathi'],
  ['Smt. Parvathi Ammal & Shri Krishnan Iyer\n', 'Mr. M. Subramani & Mrs. S. Banumathi'],
  ['Smt. Parvathi Ammal & Shri Krishnan Iyer', 'Mr. M. Subramani & Mrs. S. Banumathi'],
  ['Smt. Parvathi Ammal &amp; Shri Krishnan Iyer', 'Mr. M. Subramani &amp; Mrs. S. Banumathi']
];

console.log("Applying general replacements (names & parents)...");
replaceInFile(htmlPath, generalReplacements);
replaceInFile(jsBundlePath, generalReplacements);
replaceInFile(secondaryJsPath, generalReplacements);

// 2. Event card replacements in JS bundle (vzzpaPs1.mjs)
console.log("\nApplying event card replacements in JS bundle...");
const jsBundleReplacements = [
  [
    'd(q,{b0Odmcs_Z:`Mandabam Purapaduthal`,Ee2cAuq7F:`Evening (04:00-05:00)`,height:`100%`,I7wqgbAd_:`22.08.2026`,id:`NYC73E7qn`,layoutId:`NYC73E7qn`,name:`Card 1`,Oz7wr6hEc:``,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})',
    'd(q,{b0Odmcs_Z:`Mandabam Purapaduthal`,Ee2cAuq7F:`Evening (04:00-05:00)`,height:`100%`,I7wqgbAd_:`22.08.2026`,id:`NYC73E7qn`,layoutId:`NYC73E7qn`,name:`Card 1`,Oz7wr6hEc:``,location:`https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw`,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})'
  ],
  [
    'd(q,{b0Odmcs_Z:`Varaverpu`,Ee2cAuq7F:`Evening (05:00-09:00)`,height:`100%`,I7wqgbAd_:`22.08.2026`,id:`TCbflwnqi`,layoutId:`TCbflwnqi`,name:`Card 2`,Oz7wr6hEc:``,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})',
    'd(q,{b0Odmcs_Z:`Varaverpu`,Ee2cAuq7F:`Evening (05:00-09:00)`,height:`100%`,I7wqgbAd_:`22.08.2026`,id:`TCbflwnqi`,layoutId:`TCbflwnqi`,name:`Card 2`,Oz7wr6hEc:``,location:`https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw`,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})'
  ],
  [
    'd(q,{b0Odmcs_Z:`Nichiyam`,Ee2cAuq7F:`Night (09:00-10:00)`,height:`100%`,I7wqgbAd_:`22.08.2026`,id:`b6EIVO2aE`,layoutId:`b6EIVO2aE`,name:`Card 3`,Oz7wr6hEc:``,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})',
    'd(q,{b0Odmcs_Z:`Nichiyam`,Ee2cAuq7F:`Night (09:00-10:00)`,height:`100%`,I7wqgbAd_:`22.08.2026`,id:`b6EIVO2aE`,layoutId:`b6EIVO2aE`,name:`Card 3`,Oz7wr6hEc:``,location:`https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw`,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})'
  ],
  [
    'd(q,{b0Odmcs_Z:`Mugurtham`,Ee2cAuq7F:`Morning 04:30-06:00`,height:`100%`,I7wqgbAd_:`23.08.2026`,id:`Qob9mh6Wt`,layoutId:`Qob9mh6Wt`,name:`Card 5`,Oz7wr6hEc:``,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})',
    'd(q,{b0Odmcs_Z:`Mugurtham`,Ee2cAuq7F:`Morning 04:30-06:00`,height:`100%`,I7wqgbAd_:`23.08.2026`,id:`Qob9mh6Wt`,layoutId:`Qob9mh6Wt`,name:`Card 5`,Oz7wr6hEc:``,location:`https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw`,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})'
  ],
  [
    'd(q,{b0Odmcs_Z:`Vidu purapaduthal`,Ee2cAuq7F:`Afternoon 01:35-04:00`,height:`100%`,I7wqgbAd_:`23.08.2026`,id:`o3Sh4c7Fi`,layoutId:`o3Sh4c7Fi`,name:`Card 6`,Oz7wr6hEc:``,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})',
    'd(q,{b0Odmcs_Z:`Vidu purapaduthal`,Ee2cAuq7F:`Afternoon 01:35-04:00`,height:`100%`,I7wqgbAd_:`23.08.2026`,id:`o3Sh4c7Fi`,layoutId:`o3Sh4c7Fi`,name:`Card 6`,Oz7wr6hEc:``,location:`https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw`,style:{height:`100%`,width:`100%`},variant:X(`tsVqQQAfI`),width:`100%`})'
  ]
];
replaceInFile(jsBundlePath, jsBundleReplacements);

// 3. Event card replacements in secondary JS file (nKQpHmBXO.js)
console.log("\nApplying event card replacements in secondary JS file...");
const secondaryJsReplacements = [
  [
    '_jsx(EventCard,{b0Odmcs_Z:"Mehendi",Ee2cAuq7F:"6pm Onwards",height:"100%",I7wqgbAd_:"Friday, March 9th 2026",id:"NYC73E7qn",layoutId:"NYC73E7qn",name:"Card 1",Oz7wr6hEc:"Rambagh, Jaipur",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})',
    '_jsx(EventCard,{b0Odmcs_Z:"Mandabam Purapaduthal",Ee2cAuq7F:"Evening (04:00-05:00)",height:"100%",I7wqgbAd_:"22.08.2026",id:"NYC73E7qn",layoutId:"NYC73E7qn",name:"Card 1",Oz7wr6hEc:"",location:"https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})'
  ],
  [
    '_jsx(EventCard,{b0Odmcs_Z:"Haldi",Ee2cAuq7F:"6pm Onwards",height:"100%",I7wqgbAd_:"Friday, March 10th 2026",id:"TCbflwnqi",layoutId:"TCbflwnqi",name:"Card 2",Oz7wr6hEc:"Rambagh, Jaipur",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})',
    '_jsx(EventCard,{b0Odmcs_Z:"Varaverpu",Ee2cAuq7F:"Evening (05:00-09:00)",height:"100%",I7wqgbAd_:"22.08.2026",id:"TCbflwnqi",layoutId:"TCbflwnqi",name:"Card 2",Oz7wr6hEc:"",location:"https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})'
  ],
  [
    '_jsx(EventCard,{b0Odmcs_Z:"Sangeet",Ee2cAuq7F:"6pm Onwards",height:"100%",I7wqgbAd_:"Friday, March 10th 2026",id:"b6EIVO2aE",layoutId:"b6EIVO2aE",name:"Card 3",Oz7wr6hEc:"Rambagh, Jaipur",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})',
    '_jsx(EventCard,{b0Odmcs_Z:"Nichiyam",Ee2cAuq7F:"Night (09:00-10:00)",height:"100%",I7wqgbAd_:"22.08.2026",id:"b6EIVO2aE",layoutId:"b6EIVO2aE",name:"Card 3",Oz7wr6hEc:"",location:"https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})'
  ],
  [
    '_jsx(EventCard,{b0Odmcs_Z:"Muhurtham",Ee2cAuq7F:"6pm Onwards",height:"100%",I7wqgbAd_:"Friday, March 12th 2026",id:"Qob9mh6Wt",layoutId:"Qob9mh6Wt",name:"Card 5",Oz7wr6hEc:"Rambagh, Jaipur",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})',
    '_jsx(EventCard,{b0Odmcs_Z:"Mugurtham",Ee2cAuq7F:"Morning 04:30-06:00",height:"100%",I7wqgbAd_:"23.08.2026",id:"Qob9mh6Wt",layoutId:"Qob9mh6Wt",name:"Card 5",Oz7wr6hEc:"",location:"https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})'
  ],
  [
    '_jsx(EventCard,{b0Odmcs_Z:"Reception",Ee2cAuq7F:"6pm Onwards",height:"100%",I7wqgbAd_:"Friday, March 17th 2026",id:"o3Sh4c7Fi",layoutId:"o3Sh4c7Fi",name:"Card 6",Oz7wr6hEc:"Rambagh, Jaipur",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})',
    '_jsx(EventCard,{b0Odmcs_Z:"Vidu purapaduthal",Ee2cAuq7F:"Afternoon 01:35-04:00",height:"100%",I7wqgbAd_:"23.08.2026",id:"o3Sh4c7Fi",layoutId:"o3Sh4c7Fi",name:"Card 6",Oz7wr6hEc:"",location:"https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw",style:{height:"100%",width:"100%"},variant:matchVariant("tsVqQQAfI"),width:"100%"})'
  ]
];
replaceInFile(secondaryJsPath, secondaryJsReplacements);

// 4. Static HTML links replacements
console.log("\nUpdating static HTML links in meenaya.html...");
replaceInFile(htmlPath, [
  [
    'data-styles-preset="LLOdYO6e3">See the route</a>',
    'data-styles-preset="LLOdYO6e3" href="https://maps.app.goo.gl/RZRRsUd5kpDHGSax5?g_st=iw" target="_blank" rel="noopener">See the route</a>'
  ]
]);

console.log("All replacements completed successfully!");
