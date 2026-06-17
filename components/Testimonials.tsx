"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  return (
    <section
      className="py-24 md:py-32"
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

        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="min-w-[82%] snap-center sm:min-w-[60%] md:min-w-0">
              <div className="flex h-full flex-col rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm">
                <div className="flex gap-1 text-jalar-amber">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-lg leading-relaxed text-white">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/80">
                  {t.name} · {t.city}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
