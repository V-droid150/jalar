import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import FireButton from "@/components/FireButton";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Status Pesanan — JALAR",
  robots: { index: false },
};

export default function SuksesPage({
  searchParams,
}: {
  searchParams?: { order?: string; status?: string };
}) {
  const orderId = searchParams?.order ?? null;
  const pending = searchParams?.status === "pending";

  return (
    <main className="flex min-h-screen flex-col bg-jalar-dark">
      <header className="sticky top-0 z-50 bg-jalar-dark/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" aria-label="JALAR">
            <Image src="/images/logo.png" alt="JALAR" width={130} height={52} priority className="h-8 w-auto sm:h-9" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-amber-300">
            <ArrowLeft className="h-4 w-4" /> Beranda
          </Link>
        </div>
        <div className="ember-line pointer-events-none h-[2px] w-full" />
      </header>

      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-5 py-20 text-center sm:px-8">
        {pending ? (
          <Clock className="h-16 w-16 text-jalar-amber" />
        ) : (
          <CheckCircle2 className="h-16 w-16 text-jalar-orange" />
        )}
        <h1 className="mt-6 font-display text-5xl text-white sm:text-6xl">
          {pending ? "Menunggu Pembayaran" : "Pesanan Diterima!"}
        </h1>
        <p className="mt-4 max-w-md text-white/65">
          {pending
            ? "Pembayaranmu sedang diproses. Selesaikan sesuai instruksi yang dikirim. Status akan ter-update otomatis setelah pembayaran masuk."
            : "Terima kasih! Pembayaranmu sudah kami terima. Pesanan keripik pedas JALAR-mu segera diproses & dikirim."}
        </p>

        {orderId && (
          <p className="mt-6 rounded-xl border border-white/10 bg-jalar-dark-2 px-5 py-3 text-sm text-white/70">
            Nomor pesanan: <span className="font-mono font-semibold text-white">{orderId}</span>
          </p>
        )}

        <div className="mt-10">
          <FireButton href="/" size="lg">Kembali ke Beranda</FireButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
