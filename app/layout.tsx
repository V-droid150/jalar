import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://jalar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "JALAR — Nggak Ada Rem-nya.",
  description:
    "JALAR, keripik pedas artisanal dengan tiga level kepedasan. Bahan lokal pilihan, tanpa MSG & pengawet, diracik manual. Enak dulu, panas belakangan.",
  keywords: ["JALAR", "keripik pedas", "snack pedas", "keripik artisanal", "camilan pedas Indonesia"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "JALAR",
    title: "JALAR — Nggak Ada Rem-nya.",
    description: "Keripik pedas artisanal, tiga level kepedasan. Berani coba?",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-jalar-dark font-sans text-white antialiased">{children}</body>
    </html>
  );
}
