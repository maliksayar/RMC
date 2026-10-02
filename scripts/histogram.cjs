const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:\\Users\\Passcom\\.gemini\\antigravity-ide\\brain\\4ce924bf-a0bc-4b54-abd9-1d0155284316\\.user_uploaded\\media_1790957854319.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    let min = 255, max = 0;
    let hist = new Array(256).fill(0);
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const br = Math.round(0.299 * this.data[idx] + 0.587 * this.data[idx+1] + 0.114 * this.data[idx+2]);
        if (br < min) min = br;
        if (br > max) max = br;
        hist[br]++;
      }
    }
    console.log(`Min: ${min}, Max: ${max}`);
    
    // Print 10 buckets
    let buckets = new Array(10).fill(0);
    for (let i = 0; i < 256; i++) {
      let b = Math.min(9, Math.floor(i / 25.6));
      buckets[b] += hist[i];
    }
    console.log('Buckets (0-25 to 230-255):', buckets);
  });
