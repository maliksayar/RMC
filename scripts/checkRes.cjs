const fs = require('fs');
const { PNG } = require('pngjs');

const files = [
  'media_1790957854319.png',
  'media_1790955157643.png',
  'media_1790954252875.png'
];

for (const f of files) {
  const p = 'C:\\Users\\Passcom\\.gemini\\antigravity-ide\\brain\\4ce924bf-a0bc-4b54-abd9-1d0155284316\\.user_uploaded\\' + f;
  if (fs.existsSync(p)) {
    fs.createReadStream(p)
      .pipe(new PNG())
      .on('parsed', function() {
        console.log(`${f}: ${this.width} x ${this.height}`);
      });
  }
}
