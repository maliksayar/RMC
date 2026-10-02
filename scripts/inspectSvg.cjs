const fs = require('fs');
const potrace = require('potrace');

const inputPath = 'C:\\Users\\Passcom\\.gemini\\antigravity-ide\\brain\\4ce924bf-a0bc-4b54-abd9-1d0155284316\\.user_uploaded\\media_1790955157643.png';

// Trace black lines on white
potrace.trace(inputPath, {
  threshold: 125,
  optTolerance: 0.3,
  turdSize: 10,
  blackOnWhite: true,
  color: 'black'
}, (err, svg) => {
  if (err) throw err;
  fs.writeFileSync('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-clean.svg', svg);
  console.log('brain-clean.svg written, length:', svg.length);
});
