"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { slides } from "@/lib/data";
import FireButton from "@/components/FireButton";

function HeatRow({ heat, label, color }: { heat: number; label: string; color: string }) {
  return (
    <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full border"
            style={{
              background: i < heat ? color : "transparent",
              borderColor: i < heat ? color : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
      <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((s, i) => {
            const active = i === selected;
            return (
              <div key={s.id} className="embla__slide relative">
                {/* Background gradient */}
                <div className="absolute inset-0" style={{ background: s.gradient }} />
                {/* Dekorasi */}
                <div className="dot-pattern absolute inset-0 opacity-[0.06]" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[-4%] top-1/2 -translate-y-1/2 select-none font-display leading-none text-white/[0.04]"
                  style={{ fontSize: "min(78vw, 720px)" }}
                >
                  {s.id}
                </span>
                <div className="pointer-events-none absolute -left-1/4 top-0 h-[140%] w-44 rotate-12 bg-white/[0.06] blur-3xl" />

                {/* Konten — min-h penuh layar; di HP kecil boleh memanjang agar
                    CTA & teks TIDAK terpotong (sebelumnya h-full + overflow clip). */}
                <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-4 px-5 pb-24 pt-24 sm:gap-6 sm:px-8 md:grid-cols-2 md:gap-8 md:pb-0 md:pt-0">
                  {/* Teks */}
                  <div className="order-2 text-center md:order-1 md:text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
                      Keripik Pedas Artisanal
                    </p>
                    <div className="mt-2">
                      <Image
                        src="/images/logo.png"
                        alt="JALAR"
                        width={330}
                        height={151}
                        priority={i === 0}
                        className="mx-auto h-auto w-[56vw] max-w-[240px] drop-shadow-[0_8px_26px_rgba(0,0,0,0.5)] md:mx-0 md:max-w-[400px]"
                      />
                    </div>
                    <p className="mt-2 font-display text-3xl tracking-wide sm:text-4xl" style={{ color: s.levelColor }}>
                      {s.level}
                    </p>
                    <p className="mt-4 text-lg italic text-white sm:text-xl" style={{ fontFamily: "Georgia, serif" }}>
                      &ldquo;{s.tagline}&rdquo;
                    </p>
                    <p className="mt-2 text-sm text-white/70">{s.subtext}</p>
                    <HeatRow heat={s.heat} label={s.heatLabel} color={s.levelColor} />
                    <div className="mt-7">
                      <FireButton href={`/checkout?product=${s.id}&qty=1`}>
                        {s.cta} <ArrowRight className="h-4 w-4" />
                      </FireButton>
                    </div>
                  </div>

                  {/* Gambar produk */}
                  <div className="order-1 flex items-center justify-center md:order-2">
                    <motion.div
                      className="relative aspect-[33/47] w-[48%] max-w-[185px] sm:max-w-[240px] md:w-full md:max-w-[440px]"
                      animate={{
                        x: active ? 0 : 50,
                        scale: active ? 1 : 0.85,
                        opacity: active ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Glow di belakang produk */}
                      <div
                        className="absolute inset-[8%] rounded-full blur-3xl"
                        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.5), transparent 70%)" }}
                      />
                      <Image
                        src={s.image}
                        alt={`JALAR ${s.level}`}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 768px) 48vw, 440px"
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === selected ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Pagination angka */}
      <div className="absolute bottom-6 right-6 z-20 font-display text-2xl tracking-widest sm:text-3xl">
        <span className="text-white">{String(selected + 1).padStart(2, "0")}</span>
        <span className="text-white/40"> / {String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
