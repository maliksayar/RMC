const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:\\Users\\Passcom\\.gemini\\antigravity-ide\\brain\\4ce924bf-a0bc-4b54-abd9-1d0155284316\\.user_uploaded\\media_1790957854319.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Dimensions: ${this.width} x ${this.height}`);
    
    // Sample corners to find background color
    let cornerBrightness = [];
    const corners = [
      [0, 0], [this.width - 1, 0], [0, this.height - 1], [this.width - 1, this.height - 1],
      [10, 10], [this.width - 10, 10], [10, this.height - 10], [this.width - 10, this.height - 10]
    ];
    
    for (const [x, y] of corners) {
      const idx = (this.width * y + x) << 2;
      const r = this.data[idx];
      const g = this.data[idx + 1];
      const b = this.data[idx + 2];
      const br = 0.299 * r + 0.587 * g + 0.114 * b;
      cornerBrightness.push(br);
    }
    
    console.log('Corner brightness values:', cornerBrightness);
  });
