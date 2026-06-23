// ─── Konten brand JALAR (terpusat) ───────────────────────────────────────────
// Nomor WhatsApp bisnis JALAR (format internasional tanpa +). 082113515619 → 62...
export const WA_NUMBER = "6282113515619";

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export const TAGLINE = "Nggak Ada Rem-nya.";

// ── Hero slides ───────────────────────────────────────────────────────────────
export type Slide = {
  id: number;
  poster?: boolean; // true = tampilkan gambar full-bleed (poster jadi), tanpa layout teks+produk
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
    // Slide pembuka: poster peluncuran (full-bleed). Field di bawah dummy — tak
    // dirender untuk slide poster (lihat HeroSlider).
    id: 0,
    poster: true,
    image: "/images/hero-poster.jpg",
    level: "",
    levelColor: "#f97316",
    gradient: "#0d0000",
    tagline: "",
    subtext: "",
    heat: 0,
    heatLabel: "",
    cta: "",
  },
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
  price: number;
  cardBg: string;
  featured?: boolean;
};

export function getProduct(id: number) {
  return products.find((p) => p.id === id);
}

export const products: Product[] = [
  {
    id: 1,
    name: "JALAR 1",
    badge: "LEVEL 1 · MILD",
    badgeColor: "#fbbf24",
    image: "/images/jalar-bag-1.png",
    desc: "Enak dulu, panas belakangan. Cocok buat pemanasan.",
    heat: 1,
    price: 22000,
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
    price: 25000,
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
    price: 28000,
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
export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  city: string;
  avatar: string;
};

// Foto profil pakai layanan avatar pravatar.cc (dipakai via <img>, frame dibulatkan
// di komponen). Ganti `avatar` dgn foto asli kapan saja — frame tetap bulat & fit.
export const testimonials: Testimonial[] = [
  { id: 1, quote: "Udah coba banyak keripik pedas, JALAR 3 yang paling nggak bisa berhenti.", name: "Rizky", city: "Bandung", avatar: "https://i.pravatar.cc/160?img=12" },
  { id: 2, quote: "Pedesnya nagih tapi nggak bikin mules. Ini yang susah dicari.", name: "Sari", city: "Jakarta", avatar: "https://i.pravatar.cc/160?img=5" },
  { id: 3, quote: "Beli buat oleh-oleh, habis di jalan. Terpaksa pesan lagi.", name: "Dimas", city: "Surabaya", avatar: "https://i.pravatar.cc/160?img=33" },
  { id: 4, quote: "Level 2 pas banget. Renyahnya beda dari keripik biasa.", name: "Nadia", city: "Yogyakarta", avatar: "https://i.pravatar.cc/160?img=47" },
  { id: 5, quote: "Awalnya nantang temen, eh malah aku yang ketagihan sendiri.", name: "Bagas", city: "Semarang", avatar: "https://i.pravatar.cc/160?img=15" },
  { id: 6, quote: "Pedes maut tapi rasanya tetap kebaca. Bukan sekadar pedes doang.", name: "Putri", city: "Medan", avatar: "https://i.pravatar.cc/160?img=9" },
  { id: 7, quote: "Packaging-nya kece, isinya lebih kece. Worth banget.", name: "Fajar", city: "Makassar", avatar: "https://i.pravatar.cc/160?img=51" },
  { id: 8, quote: "Cocok nemenin nonton bola. Sekali buka langsung ludes bertiga.", name: "Intan", city: "Denpasar", avatar: "https://i.pravatar.cc/160?img=24" },
  { id: 9, quote: "Aku nggak kuat pedes, Level 1 ramah banget di lidah. Suka!", name: "Yoga", city: "Malang", avatar: "https://i.pravatar.cc/160?img=60" },
  { id: 10, quote: "Order lagi buat ketiga kalinya bulan ini. Cukup jelas ya.", name: "Mega", city: "Bekasi", avatar: "https://i.pravatar.cc/160?img=44" },
];
