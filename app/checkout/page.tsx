import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — JALAR",
  description: "Selesaikan pesanan keripik pedas JALAR kamu.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-jalar-dark">
      {/* Header ringkas */}
      <header className="sticky top-0 z-50 bg-jalar-dark/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" aria-label="JALAR">
            <Image src="/images/logo.png" alt="JALAR" width={130} height={52} priority className="h-8 w-auto sm:h-9" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-amber-300"
          >
            <ArrowLeft className="h-4 w-4" /> Beranda
          </Link>
        </div>
        <div className="ember-line pointer-events-none h-[2px] w-full" />
      </header>

      <CheckoutClient />
      <Footer />
    </main>
  );
}
