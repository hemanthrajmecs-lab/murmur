// Generates assets/icon.png (a simple indigo circle with a white mic glyph)
// Pure Node — no image libraries. Writes a valid 64x64 RGBA PNG.
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function makeCrcTable() {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
}
const CRC = makeCrcTable();
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = CRC[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const W = 64, H = 64;
const rowBytes = W * 4 + 1;
const raw = Buffer.alloc(rowBytes * H);

function inRoundedRect(x, y, cx, cy, hw, hh, r) {
  const dx = Math.abs(x - cx) - (hw - r);
  const dy = Math.abs(y - cy) - (hh - r);
  const ox = Math.max(dx, 0), oy = Math.max(dy, 0);
  const outside = Math.sqrt(ox * ox + oy * oy) - r;
  const inside = Math.min(Math.max(dx, dy), 0);
  return outside + inside; // <0 means inside
}

for (let y = 0; y < H; y++) {
  raw[y * rowBytes] = 0; // filter: none
  for (let x = 0; x < W; x++) {
    const idx = y * rowBytes + 1 + x * 4;
    const dx = x - 32 + 0.5, dy = y - 32 + 0.5;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Indigo disc background
    let r = 99, g = 102, b = 241, a = 0;
    if (dist < 30) a = 255;
    else if (dist < 31) a = Math.round(255 * (31 - dist));

    // White mic glyph on top (capsule body + stand + base)
    const body = inRoundedRect(x, y, 32, 27, 7, 13, 7);        // rounded capsule
    const base = (y >= 46 && y <= 49 && x >= 22 && x <= 42);    // base bar
    const stand = (x >= 30.5 && x <= 33.5 && y >= 40 && y <= 47); // stand
    if (body < 0 || base || stand) { r = 255; g = 255; b = 255; a = 255; }

    raw[idx] = r; raw[idx + 1] = g; raw[idx + 2] = b; raw[idx + 3] = a;
  }
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 6;  // color type RGBA
ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

const outDir = path.join(__dirname, 'assets');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'icon.png'), png);
console.log('Wrote assets/icon.png (' + png.length + ' bytes)');
