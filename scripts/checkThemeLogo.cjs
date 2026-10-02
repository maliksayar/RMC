const fs = require('fs');
const { PNG } = require('pngjs');

fs.createReadStream('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-logo-theme.png')
  .pipe(new PNG())
  .on('parsed', function() {
    let minX = this.width, maxX = 0, minY = this.height, maxY = 0;
    let solidPixels = 0;
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const a = this.data[(this.width * y + x) * 4 + 3];
        if (a > 30) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          solidPixels++;
        }
      }
    }
    console.log(`Solid ink pixels: ${solidPixels}`);
    console.log(`Bounding box: x: [${minX}, ${maxX}] (${maxX - minX}px), y: [${minY}, ${maxY}] (${maxY - minY}px)`);
  });
