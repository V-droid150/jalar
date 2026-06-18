-- ─── Skema tabel `orders` untuk JALAR ────────────────────────────────────────
-- Jalankan di SQL Editor Supabase (atau via `supabase db push`).
-- Semua angka harga dalam Rupiah penuh (bukan sen).

create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_id        text not null unique,           -- dikirim ke Midtrans, mis. JALAR-1718...-AB12

  -- Item (harga dikunci server-side saat order dibuat)
  product_id      integer not null,
  product_name    text    not null,
  qty             integer not null check (qty >= 1 and qty <= 99),
  unit_price      integer not null check (unit_price >= 0),
  subtotal        integer not null check (subtotal >= 0),

  -- Data pembeli
  customer_name   text not null,
  customer_phone  text not null,
  customer_email  text not null,

  -- Pengiriman
  ship_address    text not null,
  ship_city       text not null,
  ship_province   text not null,
  ship_postal     text not null,

  -- Status pembayaran
  status          text not null default 'pending'
                  check (status in ('pending','paid','failed','expired','cancelled')),
  payment_type    text,                           -- gopay/qris/bank_transfer/... dari webhook
  midtrans_txn_id text,                            -- transaction_id dari Midtrans

  created_at      timestamptz not null default now(),
  paid_at         timestamptz
);

create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- RLS: aktifkan, tapi TANPA policy publik. Order ditulis/dibaca hanya lewat
-- service-role key di server (yang melewati RLS). Anon key tidak boleh akses.
alter table public.orders enable row level security;
