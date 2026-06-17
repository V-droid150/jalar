// Generator placeholder PNG (chip-bag silhouette) — murni Node, tanpa dependency.
// Hasil ditimpa nanti dengan artwork asli (nama file sama).
import { deflateSync } from "zlib";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images");
mkdirSync(OUT, { recursive: true });

// ── PNG encoder (RGBA, 8-bit) ────────────────────────────────────────────────
const crcTable = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function makePNG(w, h, fn) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  let p = 0;
  for (let y = 0; y < h; y++) {
    raw[p++] = 0;
    for (let x = 0; x < w; x++) {
      const [r, g, b, a] = fn(x, y);
      raw[p++] = r; raw[p++] = g; raw[p++] = b; raw[p++] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit, RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

function roundRectAlpha(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const dx = Math.max(x0 + r - x, 0, x - (x1 - r));
  const dy = Math.max(y0 + r - y, 0, y - (y1 - r));
  return dx * dx + dy * dy <= r * r;
}

// Gambar "kemasan keripik": rounded rect + gradient + seal + pita label amber + sheen
function bag(w, h, light, base, dark) {
  const cL = hex(light), cB = hex(base), cD = hex(dark), amber = hex("#fbbf24");
  const x0 = w * 0.2, x1 = w * 0.8, y0 = h * 0.1, y1 = h * 0.92;
  const r = w * 0.07;
  const cy = (y0 + y1) / 2;
  return (x, y) => {
    if (!roundRectAlpha(x, y, x0, y0, x1, y1, r)) return [0, 0, 0, 0];
    const t = (y - y0) / (y1 - y0);
    let col = t < 0.5 ? mix(cL, cB, t * 2) : mix(cB, cD, (t - 0.5) * 2);
    // seal atas
    if (y < y0 + h * 0.06) col = mix(col, cD, 0.5);
    // pita label amber di tengah
    if (Math.abs(y - cy) < h * 0.085) col = mix(col, amber, 0.85);
    // sheen vertikal
    const sx = x0 + (x1 - x0) * 0.32;
    if (Math.abs(x - sx) < w * 0.03) col = mix(col, [255, 255, 255], 0.22);
    return [col[0], col[1], col[2], 255];
  };
}

const levels = [
  { name: "1", light: "#fdba74", base: "#f97316", dark: "#c2410c" },
  { name: "2", light: "#fb923c", base: "#e85d04", dark: "#9a3412" },
  { name: "3", light: "#f87171", base: "#dc2626", dark: "#7f1d1d" },
];

for (const lv of levels) {
  // Hero (kanvas lebih persegi)
  writeFileSync(join(OUT, `jalar-${lv.name}.png`), makePNG(760, 800, bag(760, 800, lv.light, lv.base, lv.dark)));
  // Product bag (portrait)
  writeFileSync(join(OUT, `jalar-bag-${lv.name}.png`), makePNG(560, 760, bag(560, 760, lv.light, lv.base, lv.dark)));
}

console.log("Placeholder images generated in public/images/");
