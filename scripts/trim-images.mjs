// Trim margin transparan PNG (RGBA) ke bounding-box konten + padding kecil.
// Murni Node (decode + encode PNG sendiri). Menimpa file di public/images.
import { deflateSync, inflateSync } from "zlib";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, "..", "public", "images");

// ── CRC + encoder ─────────────────────────────────────────────────────────────
const crcTable = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
const crc32 = (buf) => { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ crcTable[(c ^ buf[i]) & 0xff]; return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(w, h, rgba) {
  const stride = w * 4;
  const raw = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (stride + 1)] = 0; rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride); }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

// ── Decoder (color type 6, 8-bit, non-interlaced) ─────────────────────────────
const paeth = (a, b, c) => { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
function decodePNG(buf) {
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  const colorType = buf[25], interlace = buf[28];
  if (colorType !== 6 || interlace !== 0) return null;
  let p = 8, idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p); const type = buf.toString("ascii", p + 4, p + 8);
    if (type === "IDAT") idat.push(buf.subarray(p + 8, p + 8 + len));
    if (type === "IEND") break;
    p += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const bpp = 4, stride = w * 4, out = Buffer.alloc(stride * h);
  let pos = 0;
  for (let y = 0; y < h; y++) {
    const ft = raw[pos++];
    for (let x = 0; x < stride; x++) {
      const v = raw[pos++];
      const a = x >= bpp ? out[y * stride + x - bpp] : 0;
      const b = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = x >= bpp && y > 0 ? out[(y - 1) * stride + x - bpp] : 0;
      let r;
      if (ft === 0) r = v; else if (ft === 1) r = v + a; else if (ft === 2) r = v + b;
      else if (ft === 3) r = v + ((a + b) >> 1); else if (ft === 4) r = v + paeth(a, b, c);
      else throw new Error("filter " + ft);
      out[y * stride + x] = r & 0xff;
    }
  }
  return { w, h, data: out };
}

function trimFile(name, pad = 6, threshold = 12) {
  const filePath = join(DIR, name);
  if (!existsSync(filePath)) { console.log(name, "SKIP (file tidak ditemukan)"); return; }
  const buf = readFileSync(filePath);
  const img = decodePNG(buf);
  if (!img) { console.log(name, "SKIP (bukan RGBA/non-interlaced)"); return; }
  const { w, h, data } = img;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * 4 + 3] > threshold) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
  }
  if (maxX < 0) { console.log(name, "kosong, skip"); return; }
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
  const nw = maxX - minX + 1, nh = maxY - minY + 1;
  const crop = Buffer.alloc(nw * nh * 4);
  for (let y = 0; y < nh; y++) data.copy(crop, y * nw * 4, ((minY + y) * w + minX) * 4, ((minY + y) * w + minX) * 4 + nw * 4);
  writeFileSync(join(DIR, name), encodePNG(nw, nh, crop));
  console.log(name, `${w}x${h} -> ${nw}x${nh} (ratio ${(nw / nh).toFixed(2)})`);
}

for (const f of ["logo.png", "jalar-1.png", "jalar-2.png", "jalar-3.png", "jalar-bag-1.png", "jalar-bag-2.png", "jalar-bag-3.png", "about-left.png", "about-right.png"]) {
  trimFile(f);
}
