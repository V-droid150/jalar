"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { waLink } from "@/lib/data";

const NAV = [
  { label: "Produk", href: "#produk" },
  { label: "Tentang", href: "#tentang" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Order", href: "#order" },
];

const WA = waLink("Halo JALAR, saya mau pesan keripiknya. Boleh info?");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-jalar-dark/85 shadow-lg shadow-black/30 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="JALAR">
          <span className="font-display text-3xl leading-none tracking-wide text-white">JALAR</span>
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className="text-sm font-medium uppercase tracking-wide text-white/80 transition hover:text-amber-300"
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-jalar-amber px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-jalar-dark transition hover:brightness-110 sm:block"
          >
            Pesan Sekarang
          </a>
          <button onClick={() => setOpen((o) => !o)} className="text-white md:hidden" aria-label="Menu">
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-jalar-dark/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-5 py-3">
            {NAV.map((n) => (
              <button
                key={n.href}
                onClick={() => go(n.href)}
                className="py-3 text-left text-base font-medium uppercase tracking-wide text-white/85 transition hover:text-amber-300"
              >
                {n.label}
              </button>
            ))}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-jalar-amber px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-jalar-dark"
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
