"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Flame } from "lucide-react";
import FireButton from "@/components/FireButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-jalar-dark/90 shadow-[0_8px_30px_rgba(220,38,38,0.18)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-center px-5 py-3.5 sm:px-8">
        {/* Logo di tengah, sedikit diperbesar */}
        <Link href="/" aria-label="JALAR" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="JALAR"
            width={330}
            height={151}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        {/* Checkout CTA — tombol berbentuk api, di kanan */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 sm:right-8">
          <FireButton href="/checkout" size="sm" className="px-4 sm:px-5">
            <span className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Flame className="absolute -right-1.5 -top-2 h-3 w-3 fill-current text-red-700" />
            </span>
            <span className="hidden sm:inline">Checkout</span>
          </FireButton>
        </div>
      </nav>

      {/* Garis ember saat scroll */}
      {scrolled && <div className="ember-line pointer-events-none absolute inset-x-0 bottom-0 h-[2px]" />}
    </header>
  );
}
