const fs = require('fs');
const svg = fs.readFileSync('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-exact.svg', 'utf8');

const dMatch = svg.match(/d="([^"]+)"/);
const d = dMatch[1];

let minX = 9999, minY = 9999, maxX = -9999, maxY = -9999;

// Match all coordinates in d (numbers that follow letters or commas)
const tokens = d.match(/[-+]?\d*\.?\d+/g);
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

console.log('Bounding Box: minX:', minX, 'minY:', minY, 'maxX:', maxX, 'maxY:', maxY);
const width = maxX - minX;
const height = maxY - minY;
console.log('Width:', width, 'Height:', height);

// Set optimal viewBox with 5px padding
const pad = 4;
const viewBox = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(width + pad * 2).toFixed(1)} ${(height + pad * 2).toFixed(1)}`;
console.log('Optimal ViewBox:', viewBox);

const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%">
  <path d="${d}" stroke="none" fill="currentColor" fill-rule="evenodd" />
</svg>`;

fs.writeFileSync('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-exact.svg', finalSvg);
console.log('Updated brain-exact.svg with optimal viewBox!');
