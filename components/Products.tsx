"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products, waLink } from "@/lib/data";
import Reveal from "@/components/Reveal";

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

export default function Products() {
  return (
    <section id="produk" className="relative overflow-hidden bg-jalar-dark-2 py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-orange">
              Pilih Level Kamu
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-5xl text-white sm:text-6xl">Tiga Level. Satu Pilihan.</h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
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

                <div className="relative mx-auto aspect-[3/4] w-[72%]">
                  <div
                    className="absolute inset-[14%] rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${p.badgeColor}55, transparent 70%)`, opacity: 0.5 }}
                  />
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 70vw, 300px"
                    className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: p.badgeColor }}
                  >
                    {p.badge}
                  </span>
                  <h3 className="mt-2 font-display text-4xl text-white">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{p.desc}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Heat heat={p.heat} color={p.badgeColor} />
                  </div>

                  <a
                    href={waLink(`Halo JALAR, saya mau pesan ${p.name} (${p.badge}). Boleh info?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-jalar-amber px-6 py-3 text-sm font-bold uppercase tracking-wide text-jalar-dark transition hover:brightness-110"
                  >
                    Pesan via WhatsApp <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
