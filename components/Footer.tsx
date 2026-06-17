"use client";

import { MessageCircle, Instagram, Mail } from "lucide-react";
import { TAGLINE, waLink } from "@/lib/data";

const NAV = [
  { label: "Produk", href: "#produk" },
  { label: "Tentang", href: "#tentang" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Order", href: "#order" },
];

const SOCIALS = [
  { Icon: MessageCircle, label: "WhatsApp", href: waLink("Halo JALAR!") },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/jalar.id" },
  { Icon: Mail, label: "Email", href: "mailto:halo@jalar.id" },
];

export default function Footer() {
  return (
    <footer className="bg-jalar-dark py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-display text-4xl tracking-wide text-white">JALAR</span>
            <p className="mt-2 font-display text-xl tracking-wide text-jalar-amber">{TAGLINE}</p>
          </div>

          <div className="flex flex-col gap-2.5 md:items-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Menu</p>
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-white/75 transition hover:text-jalar-amber"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Kontak</p>
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-jalar-amber"
              >
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/30">© 2025 JALAR. All rights reserved.</p>
          <a
            href="https://redlens.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 transition hover:text-jalar-amber"
          >
            Built by Red Lens
          </a>
        </div>
      </div>
    </footer>
  );
}
