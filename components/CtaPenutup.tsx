"use client";

import { ArrowRight } from "lucide-react";
import { waLink } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function CtaPenutup() {
  return (
    <section id="order" className="relative overflow-hidden bg-jalar-red py-24 md:py-32">
      <div className="dot-pattern absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-jalar-orange/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-jalar-amber/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.9] text-white sm:text-7xl md:text-8xl">
            Yuk, Buktiin Sendiri.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Gratis ongkir buat kamu yang pertama kali order. Nggak ada alasan buat nggak coba.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={waLink("Halo JALAR, saya mau order keripiknya. Boleh dibantu?")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-jalar-amber px-10 py-5 text-base font-bold uppercase tracking-wide text-jalar-dark transition hover:scale-[1.03] hover:brightness-110 sm:text-lg"
          >
            Order Sekarang <ArrowRight className="h-5 w-5" />
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-xs uppercase tracking-wide text-white/70">
            Via WhatsApp · Respon cepat · Pengiriman ke seluruh Indonesia
          </p>
        </Reveal>
      </div>
    </section>
  );
}
