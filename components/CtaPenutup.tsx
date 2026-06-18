"use client";

import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import FireButton from "@/components/FireButton";
import { waLink } from "@/lib/data";

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
          <div className="mt-9">
            <FireButton href={waLink("Halo JALAR, saya mau order keripiknya!")} external size="lg">
              Order Sekarang <ArrowRight className="h-5 w-5" />
            </FireButton>
          </div>
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
