import { NextResponse } from "next/server";
import { getProduct } from "@/lib/data";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSnap, makeOrderId } from "@/lib/midtrans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  productId?: unknown;
  qty?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  address?: unknown;
  city?: unknown;
  province?: unknown;
  postal?: unknown;
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid." }, { status: 400 });
  }

  // ── Validasi item (harga TIDAK diambil dari client) ──────────────────────────
  const productId = Number(body.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json({ error: "Produk tidak valid." }, { status: 400 });
  }
  const product = getProduct(productId);
  if (!product) {
    return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
  }

  const qty = Number(body.qty);
  if (!Number.isInteger(qty) || qty < 1 || qty > 99) {
    return NextResponse.json({ error: "Jumlah harus 1–99." }, { status: 400 });
  }

  // ── Validasi data pembeli & pengiriman ───────────────────────────────────────
  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email);
  const address = str(body.address);
  const city = str(body.city);
  const province = str(body.province);
  const postal = str(body.postal);

  const missing: string[] = [];
  if (name.length < 2) missing.push("nama");
  if (!/^[0-9+\-\s]{8,20}$/.test(phone)) missing.push("nomor HP");
  if (!EMAIL_RE.test(email)) missing.push("email");
  if (address.length < 5) missing.push("alamat");
  if (city.length < 2) missing.push("kota");
  if (province.length < 2) missing.push("provinsi");
  if (!/^\d{5}$/.test(postal)) missing.push("kode pos (5 digit)");
  if (missing.length) {
    return NextResponse.json(
      { error: `Lengkapi/perbaiki: ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  // ── Harga dikunci server-side ────────────────────────────────────────────────
  const unitPrice = product.price;
  const subtotal = unitPrice * qty;
  const orderId = makeOrderId();

  // ── Simpan order (status pending) SEBELUM ke Midtrans ────────────────────────
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message }, { status: 500 },
    );
  }

  const { error: insertErr } = await supabase.from("orders").insert({
    order_id: orderId,
    product_id: product.id,
    product_name: product.name,
    qty,
    unit_price: unitPrice,
    subtotal,
    customer_name: name,
    customer_phone: phone,
    customer_email: email,
    ship_address: address,
    ship_city: city,
    ship_province: province,
    ship_postal: postal,
    status: "pending",
  });
  if (insertErr) {
    console.error("[checkout] gagal insert order:", insertErr);
    return NextResponse.json({ error: "Gagal menyimpan order." }, { status: 500 });
  }

  // ── Buat transaksi Snap ──────────────────────────────────────────────────────
  const [firstName, ...rest] = name.split(" ");
  try {
    const snap = getSnap();
    const tx = await snap.createTransaction({
      transaction_details: { order_id: orderId, gross_amount: subtotal },
      item_details: [
        {
          id: String(product.id),
          name: `${product.name} (${product.badge})`.slice(0, 50),
          price: unitPrice,
          quantity: qty,
        },
      ],
      customer_details: {
        first_name: firstName,
        last_name: rest.join(" ") || undefined,
        email,
        phone,
        shipping_address: {
          first_name: firstName,
          last_name: rest.join(" ") || undefined,
          phone,
          address,
          city,
          postal_code: postal,
          country_code: "IDN",
        },
      },
    });

    return NextResponse.json({ token: tx.token, orderId, redirectUrl: tx.redirect_url });
  } catch (e) {
    console.error("[checkout] gagal createTransaction Midtrans:", e);
    // Tandai order gagal agar tidak menggantung sebagai pending palsu.
    await supabase.from("orders").update({ status: "failed" }).eq("order_id", orderId);
    return NextResponse.json(
      { error: "Gagal membuat transaksi pembayaran." }, { status: 502 },
    );
  }
}
