// Wraps assets/icon.png into assets/icon.ico (for the desktop shortcut).
const fs = require('fs');
const path = require('path');

const png = fs.readFileSync(path.join(__dirname, 'assets', 'icon.png'));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(1, 4); // image count

const entry = Buffer.alloc(16);
entry[0] = 64;                     // width (64px)
entry[1] = 64;                     // height (64px)
entry[2] = 0;                      // palette
entry[3] = 0;                      // reserved
entry.writeUInt16LE(1, 4);         // color planes
entry.writeUInt16LE(32, 6);        // bits per pixel
entry.writeUInt32LE(png.length, 8);// size of image data
entry.writeUInt32LE(22, 12);       // offset (6 + 16)

fs.writeFileSync(path.join(__dirname, 'assets', 'icon.ico'), Buffer.concat([header, entry, png]));
console.log('Wrote assets/icon.ico');
