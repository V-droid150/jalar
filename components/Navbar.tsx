"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Flame } from "lucide-react";
import FireButton from "@/components/FireButton";
import { useCart } from "@/lib/cart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

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

        {/* Checkout CTA — hanya aktif kalau keranjang ada isinya. Saat kosong
            tombol disabled (tak bisa diklik) agar tak nyasar ke checkout kosong. */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 sm:right-8">
          {count > 0 ? (
            <div className="relative">
              <FireButton href="/checkout" size="sm" className="px-4 sm:px-5">
                <span className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Flame className="absolute -right-1.5 -top-2 h-3 w-3 fill-current text-red-700" />
                </span>
                <span className="hidden sm:inline">Checkout</span>
              </FireButton>
              <span
                aria-label={`${count} item di keranjang`}
                className="pointer-events-none absolute -right-2 -top-2 z-10 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-jalar-dark bg-white px-1 text-[11px] font-extrabold leading-none text-jalar-red"
              >
                {count}
              </span>
            </div>
          ) : (
            <FireButton size="sm" disabled className="px-4 sm:px-5">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Checkout</span>
            </FireButton>
          )}
        </div>
      </nav>

      {/* Garis ember saat scroll */}
      {scrolled && <div className="ember-line pointer-events-none absolute inset-x-0 bottom-0 h-[2px]" />}
    </header>
  );
}
