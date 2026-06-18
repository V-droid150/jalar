"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function BrandStory() {
  return (
    <section id="tentang" className="relative overflow-hidden bg-jalar-dark py-20 md:py-28">
      <div className="dot-pattern absolute inset-0 opacity-[0.04]" />
      {/* Glow api di belakang */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-jalar-orange/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-jalar-red/15 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-6 px-5 sm:px-8 md:grid-cols-[1.15fr_1.3fr_0.95fr] md:gap-4">
        {/* Karakter kiri (diperbesar) */}
        <Reveal className="order-1 flex justify-center md:order-none md:justify-start">
          <Image
            src="/images/about-left.png"
            alt="Maskot JALAR"
            width={285}
            height={337}
            className="h-auto w-[64%] max-w-[320px] drop-shadow-[0_12px_40px_rgba(220,38,38,0.4)] sm:max-w-[380px] md:w-full md:max-w-[480px]"
          />
        </Reveal>

        {/* Teks */}
        <div className="order-2 text-center md:order-none">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-orange">Tentang Kami</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-4 font-display text-5xl leading-[0.95] text-white sm:text-6xl">
              Dari Dapur Kami,
              <br />
              ke Tangan Kamu.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/80">
              JALAR lahir dari satu keyakinan sederhana — keripik pedas yang enak tidak perlu
              bahan tambahan yang ribet. Cukup bahan lokal terbaik, racikan yang jujur, dan
              keberanian untuk bikin yang beda. Begitulah rasa JALAR menjalar — dari dapur kami,
              ke tangan kamu.
            </p>
          </Reveal>
        </div>

        {/* Karakter kanan */}
        <Reveal delay={0.1} className="order-3 flex justify-center md:order-none md:justify-end">
          <Image
            src="/images/about-right.png"
            alt="Maskot JALAR"
            width={286}
            height={337}
            className="h-auto w-[56%] max-w-[270px] drop-shadow-[0_12px_40px_rgba(249,115,22,0.4)] sm:max-w-[320px] md:w-full md:max-w-[380px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
