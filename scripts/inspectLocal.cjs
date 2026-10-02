const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:\\Users\\Passcom\\.gemini\\antigravity-ide\\brain\\4ce924bf-a0bc-4b54-abd9-1d0155284316\\.user_uploaded\\media_1790957854319.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Let's estimate local background using a large blur/window or morphological opening
    const W = this.width;
    const H = this.height;
    const gray = new Float32Array(W * H);
    
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        gray[y * W + x] = 0.299 * this.data[idx] + 0.587 * this.data[idx+1] + 0.114 * this.data[idx+2];
      }
    }
    
    // Check top-left corner values
    console.log('Top left 5x5:');
    for (let y = 0; y < 5; y++) {
      let row = [];
      for (let x = 0; x < 5; x++) {
        row.push(Math.round(gray[y * W + x]));
      }
      console.log(row.join(' '));
    }
    
    // Check center values (around 126, 85)
    console.log('Center 5x5:');
    for (let y = 83; y < 88; y++) {
      let row = [];
      for (let x = 124; x < 129; x++) {
        row.push(Math.round(gray[y * W + x]));
      }
      console.log(row.join(' '));
    }
  });
