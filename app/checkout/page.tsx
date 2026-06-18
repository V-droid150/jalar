import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, products } from "@/lib/data";
import Footer from "@/components/Footer";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — JALAR",
  description: "Selesaikan pesanan keripik pedas JALAR kamu.",
};

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: { product?: string; qty?: string };
}) {
  // Jika param product ada tapi tidak valid / tidak dikenal → 404 (bukan diam-diam
  // menampilkan produk lain). Tanpa param sama sekali → default ke produk pertama.
  const rawProduct = searchParams?.product;
  // Hanya terima string integer murni (mis. "1", "2", "3") — tolak "1.0", " 1 ", "1e0", dll.
  const isStrictInt = rawProduct != null && /^\d+$/.test(rawProduct);
  const parsedId = isStrictInt ? Number(rawProduct) : NaN;
  const resolved = parsedId > 0 ? getProduct(parsedId) : undefined;
  if (rawProduct != null && rawProduct !== "" && !resolved) notFound();
  const product = resolved ?? products[0];
  if (!product) notFound();

  const parsedQty = Number(searchParams?.qty);
  const qty = Number.isFinite(parsedQty)
    ? Math.min(99, Math.max(1, Math.trunc(parsedQty)))
    : 1;

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

      <CheckoutClient product={product} initialQty={qty} />
      <Footer />
    </main>
  );
}
