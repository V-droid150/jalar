"use client";

import { Wheat, Ban, Hand, Cookie } from "lucide-react";
import { features } from "@/lib/data";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wheat: Wheat,
  ban: Ban,
  hand: Hand,
  cookie: Cookie,
};

export default function Keunggulan() {
  return (
    <section id="keunggulan" className="bg-jalar-cream py-24 text-jalar-dark-2 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jalar-red">Kenapa JALAR?</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-5xl text-jalar-red sm:text-6xl">Bukan Keripik Biasa.</h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = ICONS[f.icon] ?? (() => {
              if (process.env.NODE_ENV === "development") {
                console.warn(`[Keunggulan] Unknown icon key: "${f.icon}" — falling back to Wheat`);
              }
              return Wheat;
            })();
            return (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="flex h-full items-start gap-5 rounded-3xl border border-jalar-red/10 bg-white p-7 shadow-sm transition hover:border-jalar-red/30 hover:shadow-md">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-jalar-red/10 text-jalar-red">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-wide text-jalar-dark-2">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-jalar-dark-2/70">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
