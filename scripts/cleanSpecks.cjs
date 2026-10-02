const fs = require('fs');

const svg = fs.readFileSync('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-exact.svg', 'utf8');
const dMatch = svg.match(/d="([^"]+)"/);
const fullD = dMatch[1];
const subpaths = fullD.split(/(?=M\s)/);

console.log('Subpaths count:', subpaths.length);

// Keep only the real anatomical brain paths (length > 200)
const majorPaths = subpaths.filter((sp) => {
  const isMajor = sp.trim().length > 150;
  console.log('Path length:', sp.trim().length, 'kept:', isMajor);
  return isMajor;
});

console.log('Major paths count:', majorPaths.length);

const cleanedD = majorPaths.join(' ');

// Calculate exact bounding box for major paths
let minX = 9999, minY = 9999, maxX = -9999, maxY = -9999;
const tokens = cleanedD.match(/[-+]?\d*\.?\d+/g);
if (tokens) {
  for (let i = 0; i < tokens.length; i += 2) {
    const x = parseFloat(tokens[i]);
    const y = parseFloat(tokens[i+1]);
    if (!isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 3;
const viewBox = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(maxX - minX + pad * 2).toFixed(1)} ${(maxY - minY + pad * 2).toFixed(1)}`;
console.log('Cleaned ViewBox:', viewBox);

const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%">
  <path d="${cleanedD}" stroke="none" fill="currentColor" fill-rule="evenodd" />
</svg>`;

fs.writeFileSync('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-exact.svg', finalSvg);
console.log('brain-exact.svg cleaned with 0 speckles!');
