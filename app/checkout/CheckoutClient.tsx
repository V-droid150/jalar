"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatIDR, waLink, type Product } from "@/lib/data";
import FireButton from "@/components/FireButton";

export default function CheckoutClient({ product, initialQty }: { product: Product; initialQty: number }) {
  const [qty, setQty] = useState(initialQty);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(99, q + 1));

  const subtotal = product.price * qty;
  const wa = waLink(
    `Halo JALAR, saya mau order:\n\nProduk: ${product.name} (${product.badge})\nJumlah: ${qty}\nTotal: ${formatIDR(
      subtotal,
    )}\n\nMohon dibantu untuk prosesnya ya!`,
  );

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-orange">Hampir Kepanasan</p>
      <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">Checkout</h1>
      <p className="mt-2 text-white/60">Cek pesananmu, lalu selesaikan order. Berani lanjut?</p>

      <div className="mt-10 grid gap-7 md:grid-cols-[1.25fr_1fr]">
        {/* Item */}
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
          style={{ background: product.cardBg }}
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative aspect-[3/4] w-40 shrink-0 sm:w-44">
              <Image src={product.image} alt={product.name} fill sizes="180px" className="object-contain drop-shadow-2xl" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: product.badgeColor }}>
                {product.badge}
              </span>
              <h2 className="mt-1 font-display text-4xl text-white">{product.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{product.desc}</p>
              <p className="mt-4 font-display text-3xl text-jalar-amber">{formatIDR(product.price)}</p>

              <div className="mt-5 flex items-center justify-center gap-3 sm:justify-start">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Jumlah</span>
                <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/25 p-1">
                  <button onClick={dec} aria-label="Kurangi" className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-9 text-center font-display text-xl text-white">{qty}</span>
                  <button onClick={inc} aria-label="Tambah" className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ringkasan */}
        <div className="flex h-fit flex-col rounded-3xl border border-white/10 bg-jalar-dark-2 p-6 sm:p-7">
          <h3 className="font-display text-2xl text-white">Ringkasan</h3>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-white/75">
              <span>
                {product.name} × {qty}
              </span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-white/75">
              <span>Ongkir</span>
              <span className="font-semibold text-jalar-amber">GRATIS</span>
            </div>
            <div className="my-3 h-px bg-white/10" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-white">Total</span>
              <span className="font-display text-3xl text-jalar-amber">{formatIDR(subtotal)}</span>
            </div>
          </div>

          <div className="mt-6">
            <FireButton href={wa} external size="lg" className="w-full">
              Pesan Sekarang <ArrowRight className="h-5 w-5" />
            </FireButton>
          </div>

          <div className="mt-5 space-y-2 text-xs text-white/55">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-jalar-orange" /> Konfirmasi & pembayaran via WhatsApp
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
