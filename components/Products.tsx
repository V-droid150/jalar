"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { products, formatIDR, type Product } from "@/lib/data";
import Reveal from "@/components/Reveal";
import FireButton from "@/components/FireButton";

function Heat({ heat, color }: { heat: number; color: string }) {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full border"
          style={{
            background: i < heat ? color : "transparent",
            borderColor: i < heat ? color : "rgba(255,255,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [qty, setQty] = useState(1);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(99, q + 1));

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 p-7 shadow-xl shadow-black/30 transition-shadow hover:shadow-[0_24px_60px_rgba(220,38,38,0.25)]"
      style={{ background: p.cardBg }}
    >
      {p.featured && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-jalar-amber px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-jalar-dark">
          Terlaris
        </span>
      )}

      <div className="relative mx-auto aspect-[3/4] w-[78%]">
        <div
          className="absolute inset-[14%] rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, ${p.badgeColor}55, transparent 70%)`, opacity: 0.5 }}
        />
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 768px) 75vw, 320px"
          className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: p.badgeColor }}>
          {p.badge}
        </span>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <h3 className="font-display text-4xl text-white">{p.name}</h3>
          <span className="font-display text-2xl text-jalar-amber">{formatIDR(p.price)}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{p.desc}</p>
        <div className="mt-4">
          <Heat heat={p.heat} color={p.badgeColor} />
        </div>

        {/* UI jumlah pesanan */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Jumlah</span>
          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/20 p-1">
            <button
              onClick={dec}
              aria-label="Kurangi"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-display text-xl text-white">{qty}</span>
            <button
              onClick={inc}
              aria-label="Tambah"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <FireButton href={`/checkout?product=${p.id}&qty=${qty}`} className="w-full">
            Cobain Sekarang <ArrowRight className="h-4 w-4" />
          </FireButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  return (
    <section id="produk" className="relative overflow-hidden bg-jalar-dark-2 py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-orange">Pilih Level Kamu</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-5xl text-white sm:text-6xl">Tiga Level. Satu Pilihan.</h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className="h-full">
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
