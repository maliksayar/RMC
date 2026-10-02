const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:\\Users\\Passcom\\.gemini\\antigravity-ide\\brain\\4ce924bf-a0bc-4b54-abd9-1d0155284316\\.user_uploaded\\media_1790957854319.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;
    
    // Background extraction
    const radius = 14;
    const bgMap = new Float32Array(W * H);
    
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
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
        bgMap[y * W + x] = vals[Math.floor(vals.length * 0.85)];
      }
    }
    
    // Find precise ink bounding box
    let minX = W, maxX = 0, minY = H, maxY = 0;
    const alphaMap = new Float32Array(W * H);
    
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        const br = 0.299 * this.data[idx] + 0.587 * this.data[idx+1] + 0.114 * this.data[idx+2];
        const bg = bgMap[y * W + x];
        const ratio = br / bg;
        
        let alpha = 0;
        if (ratio < 0.52) {
          alpha = 1;
        } else if (ratio < 0.82) {
          const t = (0.82 - ratio) / (0.82 - 0.52);
          alpha = t * t * (3 - 2 * t);
        }
        
        // Edge cleanup
        if (x < 4 || x > W - 5 || y < 2 || y > H - 3) {
          if (ratio > 0.45) alpha = 0;
        }
        
        alphaMap[y * W + x] = alpha;
        if (alpha > 0.25) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    const pad = 6;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(W, maxX + pad + 1) - cropX;
    const cropH = Math.min(H, maxY + pad + 1) - cropY;
    
    // 2x supersampling for high-DPI displays
    const scale = 2;
    const outW = cropW * scale;
    const outH = cropH * scale;
    
    console.log(`Generating high-res theme logo: ${outW} x ${outH}`);
    
    const highResPng = new PNG({ width: outW, height: outH });
    
    // Bicubic / bilinear interpolation
    for (let oy = 0; oy < outH; oy++) {
      const sy = cropY + oy / scale;
      const y0 = Math.floor(sy);
      const y1 = Math.min(H - 1, y0 + 1);
      const ty = sy - y0;
      
      for (let ox = 0; ox < outW; ox++) {
        const sx = cropX + ox / scale;
        const x0 = Math.floor(sx);
        const x1 = Math.min(W - 1, x0 + 1);
        const tx = sx - x0;
        
        // Bilinear sample of alpha
        const a00 = alphaMap[y0 * W + x0];
        const a10 = alphaMap[y0 * W + x1];
        const a01 = alphaMap[y1 * W + x0];
        const a11 = alphaMap[y1 * W + x1];
        
        const aTop = a00 * (1 - tx) + a10 * tx;
        const aBot = a01 * (1 - tx) + a11 * tx;
        const alpha = aTop * (1 - ty) + aBot * ty;
        
        const outIdx = (outW * oy + ox) << 2;
        highResPng.data[outIdx] = 18;
        highResPng.data[outIdx + 1] = 18;
        highResPng.data[outIdx + 2] = 18;
        highResPng.data[outIdx + 3] = Math.round(alpha * 255);
      }
    }
    
    highResPng.pack().pipe(fs.createWriteStream('c:\\Users\\Passcom\\Desktop\\RMC\\public\\brain-logo-theme.png'))
      .on('finish', () => console.log('Successfully written high-res public/brain-logo-theme.png'));
  });
