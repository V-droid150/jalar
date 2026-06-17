"use client";

import Reveal from "@/components/Reveal";

export default function BrandStory() {
  return (
    <section id="tentang" className="relative overflow-hidden bg-jalar-dark py-24 md:py-32">
      <div className="dot-pattern absolute inset-0 opacity-[0.04]" />
      <div className="relative z-10 mx-auto max-w-[680px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-red">Tentang Kami</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-4 font-display text-5xl leading-[0.95] text-white sm:text-6xl">
            Dari Dapur Kami,
            <br />
            ke Tangan Kamu.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 border-l-2 border-jalar-red pl-6 text-left">
            <p className="text-base leading-relaxed text-white/80 sm:text-lg">
              JALAR lahir dari satu keyakinan sederhana — keripik pedas yang enak tidak
              perlu bahan tambahan yang ribet. Cukup bahan lokal terbaik, racikan yang
              jujur, dan keberanian untuk bikin yang beda. Begitulah rasa JALAR menjalar —
              dari dapur kami, ke tangan kamu.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
