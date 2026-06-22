// ─── Konfigurasi & helper Midtrans (server-side saja) ────────────────────────
import midtransClient from "midtrans-client";
import crypto from "crypto";

export const MIDTRANS_IS_PRODUCTION =
  process.env.MIDTRANS_IS_PRODUCTION === "true";

function serverKey(): string {
  const key = process.env.MIDTRANS_SERVER_KEY;
  if (!key) {
    throw new Error(
      "Midtrans belum dikonfigurasi: set MIDTRANS_SERVER_KEY di .env.local",
    );
  }
  return key;
}

// Snap client untuk membuat transaksi (mengembalikan token + redirect_url).
export function getSnap() {
  return new midtransClient.Snap({
    isProduction: MIDTRANS_IS_PRODUCTION,
    serverKey: serverKey(),
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  });
}

/**
 * Verifikasi signature webhook Midtrans.
 * signature_key = sha512(order_id + status_code + gross_amount + serverKey)
 * gross_amount dari Midtrans berformat string "22000.00".
 */
export function verifySignature(payload: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
}): boolean {
  const expected = crypto
    .createHash("sha512")
    .update(payload.order_id + payload.status_code + payload.gross_amount + serverKey())
    .digest("hex");
  const actual = payload.signature_key ?? "";
  // Bandingkan konstan-waktu (anti timing attack). Panjang beda → langsung gagal
  // (timingSafeEqual butuh buffer sama panjang).
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
}

// Buat order_id unik & mudah dibaca: JALAR-<base36 timestamp>-<4 char acak>
export function makeOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `JALAR-${ts}-${rand}`;
}
