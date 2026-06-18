// ─── Supabase admin client (server-side saja) ────────────────────────────────
// Memakai SERVICE_ROLE_KEY yang melewati Row Level Security. JANGAN pernah
// meng-import file ini dari komponen client / kode yang dikirim ke browser.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase belum dikonfigurasi: set NEXT_PUBLIC_SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY di .env.local",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

// Bentuk row `orders` (selaras dengan supabase/migrations/0001_orders.sql)
export type OrderStatus = "pending" | "paid" | "failed" | "expired" | "cancelled";

export type OrderRow = {
  id: string;
  order_id: string;
  product_id: number;
  product_name: string;
  qty: number;
  unit_price: number;
  subtotal: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  ship_address: string;
  ship_city: string;
  ship_province: string;
  ship_postal: string;
  status: OrderStatus;
  payment_type: string | null;
  midtrans_txn_id: string | null;
  created_at: string;
  paid_at: string | null;
};
