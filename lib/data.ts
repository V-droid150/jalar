// ─── Konten brand JALAR (terpusat) ───────────────────────────────────────────
// Ganti WA_NUMBER dengan nomor WhatsApp asli (format internasional tanpa +).
export const WA_NUMBER = "6281234567890";

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const TAGLINE = "Nggak Ada Rem-nya.";

// ── Hero slides ───────────────────────────────────────────────────────────────
export type Slide = {
  id: number;
  level: string;
  levelColor: string;
  gradient: string;
  image: string;
  tagline: string;
  subtext: string;
  heat: number; // 1..3 dot menyala
  heatLabel: string;
  cta: string;
};

export const slides: Slide[] = [
  {
    id: 1,
    level: "LEVEL 1",
    levelColor: "#fbbf24",
    gradient: "linear-gradient(135deg, #e05a00 0%, #f97316 100%)",
    image: "/images/jalar-1.png",
    tagline: "Enak dulu, panas belakangan.",
    subtext: "Cocok buat pemanasan.",
    heat: 1,
    heatLabel: "MILD",
    cta: "Cobain Sekarang",
  },
  {
    id: 2,
    level: "LEVEL 2",
    levelColor: "#ffb454",
    gradient: "linear-gradient(135deg, #c0392b 0%, #e85d04 100%)",
    image: "/images/jalar-2.png",
    tagline: "Mulai serius. Masih mau lanjut?",
    subtext: "Rasa yang bikin mikir dua kali.",
    heat: 2,
    heatLabel: "HOT",
    cta: "Lanjut Terus",
  },
  {
    id: 3,
    level: "LEVEL 3",
    levelColor: "#fca5a5",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    image: "/images/jalar-3.png",
    tagline: "Ini bukan buat semua orang.",
    subtext: "Kalau kamu berani, kita salut.",
    heat: 3,
    heatLabel: "MAUT",
    cta: "Berani Coba?",
  },
];

// ── Produk ────────────────────────────────────────────────────────────────────
export type Product = {
  id: number;
  name: string;
  badge: string;
  badgeColor: string;
  image: string;
  desc: string;
  heat: number;
  cardBg: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "JALAR 1",
    badge: "LEVEL 1 · MILD",
    badgeColor: "#fbbf24",
    image: "/images/jalar-bag-1.png",
    desc: "Enak dulu, panas belakangan. Cocok buat pemanasan.",
    heat: 1,
    cardBg: "linear-gradient(160deg, #b8480a 0%, #7a2e05 100%)",
  },
  {
    id: 2,
    name: "JALAR 2",
    badge: "LEVEL 2 · HOT",
    badgeColor: "#fb923c",
    image: "/images/jalar-bag-2.png",
    desc: "Mulai serius. Masih mau lanjut?",
    heat: 2,
    cardBg: "linear-gradient(160deg, #a8341f 0%, #6b1a10 100%)",
    featured: true,
  },
  {
    id: 3,
    name: "JALAR 3",
    badge: "LEVEL 3 · MAUT",
    badgeColor: "#fca5a5",
    image: "/images/jalar-bag-3.png",
    desc: "Ini bukan buat semua orang.",
    heat: 3,
    cardBg: "linear-gradient(160deg, #5e1010 0%, #2a0606 100%)",
  },
];

// ── Keunggulan ────────────────────────────────────────────────────────────────
export const features = [
  { icon: "wheat", title: "Bahan Lokal Pilihan", desc: "Bukan bahan seadanya. Kami pilih yang terbaik dari sumber lokal." },
  { icon: "ban", title: "Tanpa MSG & Pengawet", desc: "Beneran. Cek labelnya kalau nggak percaya." },
  { icon: "hand", title: "Diracik Manual", desc: "Dibuat terbatas, diproduksi dengan tangan. Bukan pabrik massal." },
  { icon: "cookie", title: "Renyah Sampai Habis", desc: "Dari gigitan pertama sampai remah terakhir." },
];

// ── Testimoni ─────────────────────────────────────────────────────────────────
export const testimonials = [
  { quote: "Udah coba banyak keripik pedas, JALAR 3 yang paling nggak bisa berhenti.", name: "Rizky", city: "Bandung" },
  { quote: "Pedesnya nagih tapi nggak bikin mules. Ini yang susah dicari.", name: "Sari", city: "Jakarta" },
  { quote: "Beli buat oleh-oleh, habis di jalan. Terpaksa pesan lagi.", name: "Dimas", city: "Surabaya" },
];
