"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Truck, ShoppingCart } from "lucide-react";
import { formatIDR, waLink, getProduct, type Product } from "@/lib/data";
import { useCart, setQty, removeFromCart } from "@/lib/cart";
import FireButton from "@/components/FireButton";

// URL dasar situs (untuk membentuk link gambar absolut di pesan WhatsApp).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jalar.vercel.app";

type Line = { product: Product; qty: number };

export default function CheckoutClient() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lines: Line[] = items
    .map((i) => ({ product: getProduct(i.id), qty: i.qty }))
    .filter((l): l is Line => Boolean(l.product));

  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  // Pesan bawaan WhatsApp: daftar item + total + link foto tiap produk.
  const waMsg =
    `Halo kak, saya mau order keripik JALAR:\n\n` +
    lines
      .map(
        (l) =>
          `🌶️ *${l.product.name}* — ${l.product.badge}\n` +
          `   ${l.qty} × ${formatIDR(l.product.price)} = ${formatIDR(l.product.price * l.qty)}\n` +
          `   🖼️ ${SITE_URL}${l.product.image}`,
      )
      .join("\n\n") +
    `\n\n💰 *Total: ${formatIDR(total)}* (ongkir GRATIS)\n\nMohon info lanjut ya kak 🙏`;
  const wa = waLink(waMsg);

  // Hindari "flash" empty-state sebelum cart sempat dibaca dari localStorage.
  if (!mounted) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <p className="text-white/50">Memuat keranjang…</p>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
          <ShoppingCart className="h-9 w-9 text-white/40" />
        </div>
        <h1 className="mt-6 font-display text-5xl text-white sm:text-6xl">Keranjang Masih Kosong</h1>
        <p className="mt-3 text-white/60">Pilih dulu level keberanianmu, baru kita lanjut. 🔥</p>
        <div className="mt-8 flex justify-center">
          <FireButton href="/#produk">
            Lihat Produk <ArrowRight className="h-4 w-4" />
          </FireButton>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-orange">Hampir Kepanasan</p>
      <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">Checkout</h1>
      <p className="mt-2 text-white/60">Cek pesananmu, lalu lanjut tanya &amp; order via WhatsApp. Berani lanjut?</p>

      <div className="mt-10 grid gap-7 md:grid-cols-[1.4fr_1fr]">
        {/* Daftar item */}
        <div className="space-y-5">
          {lines.map((l) => (
            <div
              key={l.product.id}
              className="relative overflow-hidden rounded-3xl border border-white/10 p-5 sm:p-6"
              style={{ background: l.product.cardBg }}
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative aspect-[3/4] w-24 shrink-0 sm:w-28">
                  <Image src={l.product.image} alt={l.product.name} fill sizes="120px" className="object-contain drop-shadow-2xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: l.product.badgeColor }}>
                    {l.product.badge}
                  </span>
                  <h2 className="mt-1 font-display text-3xl text-white">{l.product.name}</h2>
                  <p className="mt-1 font-display text-2xl text-jalar-amber">{formatIDR(l.product.price)}</p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/25 p-1">
                      <button
                        onClick={() => setQty(l.product.id, l.qty - 1)}
                        disabled={l.qty <= 1}
                        aria-label="Kurangi"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95 disabled:opacity-40"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-display text-lg text-white">{l.qty}</span>
                      <button
                        onClick={() => setQty(l.product.id, l.qty + 1)}
                        aria-label="Tambah"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(l.product.id)}
                      aria-label={`Hapus ${l.product.name}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white/55 transition hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan */}
        <div className="flex h-fit flex-col rounded-3xl border border-white/10 bg-jalar-dark-2 p-6 sm:p-7">
          <h3 className="font-display text-2xl text-white">Ringkasan</h3>
          <div className="mt-5 space-y-3 text-sm">
            {lines.map((l) => (
              <div key={l.product.id} className="flex justify-between gap-3 text-white/75">
                <span className="min-w-0 truncate">
                  {l.product.name} × {l.qty}
                </span>
                <span className="shrink-0">{formatIDR(l.product.price * l.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between text-white/75">
              <span>Ongkir</span>
              <span className="font-semibold text-jalar-amber">GRATIS</span>
            </div>
            <div className="my-3 h-px bg-white/10" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-white">Total</span>
              <span className="font-display text-3xl text-jalar-amber">{formatIDR(total)}</span>
            </div>
          </div>

          <div className="mt-6">
            <FireButton href={wa} external size="lg" className="w-full">
              Order via WhatsApp <ArrowRight className="h-5 w-5" />
            </FireButton>
          </div>

          <div className="mt-5 space-y-2 text-xs text-white/55">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-jalar-orange" /> Konfirmasi &amp; pembayaran via WhatsApp
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-jalar-orange" /> Pengiriman ke seluruh Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
