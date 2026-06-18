"use client";

import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/data";
import Reveal from "@/components/Reveal";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="mx-3 flex h-full w-[300px] shrink-0 flex-col rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm sm:w-[340px]">
      <div className="flex gap-1 text-jalar-amber">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 flex-1 text-base leading-relaxed text-white">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        {/* Frame foto profil bulat — gambar selalu fit via object-cover */}
        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-jalar-amber/60 bg-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.avatar}
            alt={t.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </span>
        <span className="text-sm font-semibold uppercase tracking-wide text-white/85">
          {t.name} · {t.city}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Digandakan 2x agar loop -50% mulus tanpa jeda.
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      className="overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(135deg, #7a1f08 0%, #b8340f 55%, #c0392b 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-amber">Kata Mereka</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-5xl text-white sm:text-6xl">Yang Udah Coba, Ngomong.</h2>
          </Reveal>
        </div>
      </div>

      {/* Auto infinity slider — jeda saat hover */}
      <div className="marquee-wrap marquee-mask mt-14 w-full">
        <div className="marquee-track">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
