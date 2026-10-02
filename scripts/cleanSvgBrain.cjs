const fs = require('fs');

const svg = fs.readFileSync('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-clean.svg', 'utf8');

// The main brain path in brain-clean.svg is composed of subpaths starting with 'M '
// Let's filter out the stray artifact subpaths that touch the extreme left edge x < 35
const dMatch = svg.match(/d="([^"]+)"/);
if (!dMatch) {
  console.error('No d attribute found');
  process.exit(1);
}

const fullD = dMatch[1];
const subpaths = fullD.split(/(?=M\s)/);

console.log('Total subpaths:', subpaths.length);

const cleanedSubpaths = subpaths.filter((sp, idx) => {
  // Check if this subpath starts at the extreme left (photo border artifact)
  const firstM = sp.match(/M\s+([-\d.]+)\s+([-\d.]+)/);
  if (firstM) {
    const x = parseFloat(firstM[1]);
    const y = parseFloat(firstM[2]);
    // If it's the outer photo edge (x < 35 or x > 255 or y < 5)
    if (x < 35 && y < 80) {
      console.log('Skipping left border artifact subpath:', x, y);
      return false;
    }
    if (x < 15) {
      console.log('Skipping edge artifact:', x, y);
      return false;
    }
  }
  return true;
});

console.log('Cleaned subpaths:', cleanedSubpaths.length);

// Reconstruct SVG with viewBox tailored to the brain: x from 40 to 240 (width 200), y from 5 to 170 (height 165)
// Or viewBox="40 5 200 165"
const cleanedD = cleanedSubpaths.join(' ');
const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 5 200 165" width="100%" height="100%" fill="currentColor">
  <path d="${cleanedD}" stroke="none" fill="currentColor" fill-rule="evenodd" />
</svg>`;

fs.writeFileSync('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-exact.svg', newSvg);
console.log('Created brain-exact.svg successfully!');
