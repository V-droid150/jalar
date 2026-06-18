import { NextResponse } from "next/server";
import { getSupabaseAdmin, type OrderStatus } from "@/lib/supabase";
import { verifySignature } from "@/lib/midtrans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Petakan transaction_status (+ fraud_status) Midtrans → status order kita.
function mapStatus(
  transactionStatus: string,
  fraudStatus: string | undefined,
): OrderStatus | null {
  switch (transactionStatus) {
    case "capture":
      // kartu kredit: 'accept' = lunas, 'challenge' = tunggu review
      return fraudStatus === "challenge" ? "pending" : "paid";
    case "settlement":
      return "paid";
    case "pending":
      return "pending";
    case "deny":
      return "failed";
    case "cancel":
      return "cancelled";
    case "expire":
      return "expired";
    default:
      return null;
  }
}

export async function POST(req: Request) {
  let payload: Record<string, string>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { order_id, status_code, gross_amount, signature_key } = payload;
  if (!order_id || !status_code || !gross_amount || !signature_key) {
    return NextResponse.json({ error: "field kurang" }, { status: 400 });
  }

  // ── Verifikasi keaslian notifikasi ───────────────────────────────────────────
  if (!verifySignature({ order_id, status_code, gross_amount, signature_key })) {
    console.warn("[webhook] signature tidak valid untuk", order_id);
    return NextResponse.json({ error: "signature tidak valid" }, { status: 403 });
  }

  const nextStatus = mapStatus(
    payload.transaction_status,
    payload.fraud_status,
  );
  if (!nextStatus) {
    // status yang tidak kita kenal → akui saja agar Midtrans berhenti retry.
    return NextResponse.json({ ok: true, ignored: payload.transaction_status });
  }

  const supabase = getSupabaseAdmin();

  // Idempoten: order yang sudah 'paid' tidak ditimpa kembali ke status lain.
  const { data: existing, error: selErr } = await supabase
    .from("orders")
    .select("status")
    .eq("order_id", order_id)
    .single();

  if (selErr || !existing) {
    console.warn("[webhook] order tidak ditemukan:", order_id);
    return NextResponse.json({ error: "order tidak ditemukan" }, { status: 404 });
  }
  if (existing.status === "paid") {
    return NextResponse.json({ ok: true, already: "paid" });
  }

  const update: Record<string, unknown> = {
    status: nextStatus,
    payment_type: payload.payment_type ?? null,
    midtrans_txn_id: payload.transaction_id ?? null,
  };
  if (nextStatus === "paid") update.paid_at = new Date().toISOString();

  const { error: updErr } = await supabase
    .from("orders")
    .update(update)
    .eq("order_id", order_id);

  if (updErr) {
    console.error("[webhook] gagal update order:", updErr);
    return NextResponse.json({ error: "gagal update" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status: nextStatus });
}
