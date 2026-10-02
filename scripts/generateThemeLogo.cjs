const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:\\Users\\Passcom\\.gemini\\antigravity-ide\\brain\\4ce924bf-a0bc-4b54-abd9-1d0155284316\\.user_uploaded\\media_1790957854319.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;
    
    // Compute local background using large median / percentile or block max
    // Since lines are thin (3-8 pixels), a 25x25 window's 85th percentile is guaranteed to be paper background!
    const outPng = new PNG({ width: W, height: H });
    
    // First, let's find background map
    const bgMap = new Float32Array(W * H);
    const radius = 15;
    
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        let maxVal = 0;
        let vals = [];
        for (let dy = -radius; dy <= radius; dy += 2) {
          const py = Math.min(H - 1, Math.max(0, y + dy));
          for (let dx = -radius; dx <= radius; dx += 2) {
            const px = Math.min(W - 1, Math.max(0, x + dx));
            const idx = (W * py + px) << 2;
            const br = 0.299 * this.data[idx] + 0.587 * this.data[idx+1] + 0.114 * this.data[idx+2];
            vals.push(br);
          }
        }
        vals.sort((a, b) => a - b);
        // Take 85th percentile as local paper background
        bgMap[y * W + x] = vals[Math.floor(vals.length * 0.85)];
      }
    }
    
    // Now normalize: pixel / localBg
    // If pixel / localBg < 0.65 -> strong ink
    // If pixel / localBg > 0.85 -> paper background
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        const br = 0.299 * this.data[idx] + 0.587 * this.data[idx+1] + 0.114 * this.data[idx+2];
        const bg = bgMap[y * W + x];
        const ratio = br / bg; // ranges from ~0.2 (dark ink) to 1.0 (paper)
        
        // Target: Paper background matches project theme (pure white #ffffff or transparent)
        // If we make transparent:
        // Ink is black (0, 0, 0) with alpha:
        // ratio >= 0.82 -> alpha = 0 (completely transparent)
        // ratio <= 0.50 -> alpha = 1 (pure ink)
        let alpha = 0;
        if (ratio < 0.52) {
          alpha = 1;
        } else if (ratio < 0.82) {
          // Smooth Hermite interpolation
          const t = (0.82 - ratio) / (0.82 - 0.52);
          alpha = t * t * (3 - 2 * t);
        }
        
        // Also ensure boundary borders don't have artifacts
        if (x < 3 || x > W - 4 || y < 3 || y > H - 4) {
          // If close to edge and ratio > 0.45, fade out
          if (ratio > 0.45) alpha = 0;
        }
        
        outPng.data[idx] = 18; // sleek dark ink
        outPng.data[idx + 1] = 18;
        outPng.data[idx + 2] = 18;
        outPng.data[idx + 3] = Math.round(alpha * 255);
      }
    }
    
    outPng.pack().pipe(fs.createWriteStream('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-logo-theme.png'))
      .on('finish', () => console.log('Successfully created public/brain-logo-theme.png'));
  });
