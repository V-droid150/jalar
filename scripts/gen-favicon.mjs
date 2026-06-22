// Buat favicon JALAR (kotak) dari wordmark header public/images/logo.png:
// logo di-scale & dikomposit di atas latar gelap-merah berglow (tema "api").
// Murni Node (decode + encode PNG sendiri, tanpa dependency) — pola sama dgn
// trim-images.mjs. Output: app/icon.png (512) + app/apple-icon.png (512).
// Jalankan ulang jika logo.png diganti:  node scripts/gen-favicon.mjs
import { deflateSync, inflateSync } from "zlib";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGO = join(ROOT, "public", "images", "logo.png");

// ── CRC + encoder (RGBA, color type 6) ────────────────────────────────────────
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
  if (colorType !== 6 || interlace !== 0) throw new Error("logo.png harus RGBA 8-bit non-interlaced");
  let p = 8; const idat = [];
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

// ── Resize bilinear (premultiplied alpha → tepi bersih, tanpa halo gelap) ──────
function resizePremult(src, sw, sh, dw, dh) {
  // premultiply
  const pm = Buffer.alloc(sw * sh * 4);
  for (let i = 0; i < sw * sh; i++) {
    const a = src[i * 4 + 3];
    pm[i * 4] = Math.round((src[i * 4] * a) / 255);
    pm[i * 4 + 1] = Math.round((src[i * 4 + 1] * a) / 255);
    pm[i * 4 + 2] = Math.round((src[i * 4 + 2] * a) / 255);
    pm[i * 4 + 3] = a;
  }
  const dst = Buffer.alloc(dw * dh * 4);
  for (let y = 0; y < dh; y++) {
    const sy = ((y + 0.5) * sh) / dh - 0.5;
    const y0 = Math.max(0, Math.floor(sy)), y1 = Math.min(sh - 1, y0 + 1), fy = sy - Math.floor(sy);
    for (let x = 0; x < dw; x++) {
      const sx = ((x + 0.5) * sw) / dw - 0.5;
      const x0 = Math.max(0, Math.floor(sx)), x1 = Math.min(sw - 1, x0 + 1), fx = sx - Math.floor(sx);
      for (let c = 0; c < 4; c++) {
        const p00 = pm[(y0 * sw + x0) * 4 + c], p01 = pm[(y0 * sw + x1) * 4 + c];
        const p10 = pm[(y1 * sw + x0) * 4 + c], p11 = pm[(y1 * sw + x1) * 4 + c];
        const top = p00 + (p01 - p00) * fx, bot = p10 + (p11 - p10) * fx;
        dst[(y * dw + x) * 4 + c] = Math.round(top + (bot - top) * fy);
      }
    }
  }
  return dst; // premultiplied
}

// ── Susun favicon ─────────────────────────────────────────────────────────────
function buildIcon(size) {
  if (!existsSync(LOGO)) throw new Error("public/images/logo.png tidak ditemukan");
  const logo = decodePNG(readFileSync(LOGO));

  // Latar: glow ember radial (hangat di tengah → gelap di tepi).
  const out = Buffer.alloc(size * size * 4);
  const cx = size / 2, cy = size * 0.46, maxR = size * 0.72;
  const inner = [74, 22, 6], outer = [13, 1, 1];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - cx, y - cy) / maxR;
      let t = Math.max(0, Math.min(1, d));
      t = t * t * (3 - 2 * t); // smoothstep
      const i = (y * size + x) * 4;
      out[i] = Math.round(inner[0] + (outer[0] - inner[0]) * t);
      out[i + 1] = Math.round(inner[1] + (outer[1] - inner[1]) * t);
      out[i + 2] = Math.round(inner[2] + (outer[2] - inner[2]) * t);
      out[i + 3] = 255;
    }
  }

  // Scale logo agar muat dalam kotak (size - 2*pad), pertahankan rasio.
  const pad = Math.round(size * 0.16);
  const box = size - pad * 2;
  const scale = Math.min(box / logo.w, box / logo.h);
  const lw = Math.max(1, Math.round(logo.w * scale));
  const lh = Math.max(1, Math.round(logo.h * scale));
  const scaled = resizePremult(logo.data, logo.w, logo.h, lw, lh); // premultiplied
  const ox = Math.round((size - lw) / 2);
  const oy = Math.round((size - lh) / 2);

  // Komposit "over" (logo premultiplied di atas latar opaque).
  for (let y = 0; y < lh; y++) {
    for (let x = 0; x < lw; x++) {
      const a = scaled[(y * lw + x) * 4 + 3];
      if (a === 0) continue;
      const di = ((oy + y) * size + (ox + x)) * 4;
      const inv = (255 - a) / 255;
      out[di] = Math.min(255, scaled[(y * lw + x) * 4] + out[di] * inv);
      out[di + 1] = Math.min(255, scaled[(y * lw + x) * 4 + 1] + out[di + 1] * inv);
      out[di + 2] = Math.min(255, scaled[(y * lw + x) * 4 + 2] + out[di + 2] * inv);
      out[di + 3] = 255;
    }
  }
  return encodePNG(size, size, out);
}

const icon = buildIcon(512);
writeFileSync(join(ROOT, "app", "icon.png"), icon);
writeFileSync(join(ROOT, "app", "apple-icon.png"), icon);
console.log("favicon dibuat: app/icon.png + app/apple-icon.png (512x512)");
