// ─── Keranjang JALAR (localStorage, lintas-halaman & lintas-tab) ─────────────
// Cart sederhana berbasis localStorage + useSyncExternalStore (SSR-safe).
// Dipakai Navbar (badge + enable tombol), Products (tambah), Checkout (isi).
import { useSyncExternalStore } from "react";

export type CartItem = { id: number; qty: number };

const KEY = "jalar_cart_v1";
const EMPTY: CartItem[] = [];
let cache: CartItem[] = EMPTY;

function parse(raw: string | null): CartItem[] {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return EMPTY;
    const items = data
      .filter((x) => x && typeof x.id === "number" && typeof x.qty === "number")
      .map((x) => ({ id: x.id, qty: Math.min(99, Math.max(1, Math.trunc(x.qty))) }));
    return items.length ? items : EMPTY;
  } catch {
    return EMPTY;
  }
}

function equal(a: CartItem[], b: CartItem[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].qty !== b[i].qty) return false;
  }
  return true;
}

function emit() {
  window.dispatchEvent(new Event("jalar:cart"));
}

function commit(next: CartItem[]) {
  cache = next.length ? next : EMPTY;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEY, JSON.stringify(cache));
    } catch {
      /* storage penuh / diblokir → abaikan, state in-memory tetap jalan */
    }
    emit();
  }
}

function syncFromStorage() {
  if (typeof window === "undefined") return;
  const next = parse(localStorage.getItem(KEY));
  if (!equal(next, cache)) {
    cache = next;
    emit();
  }
}

export function addToCart(id: number, qty = 1) {
  const add = Math.min(99, Math.max(1, Math.trunc(qty)));
  const existing = cache.find((i) => i.id === id);
  const next = existing
    ? cache.map((i) => (i.id === id ? { id, qty: Math.min(99, i.qty + add) } : i))
    : [...cache, { id, qty: add }];
  commit(next);
}

export function setQty(id: number, qty: number) {
  const clamped = Math.min(99, Math.max(1, Math.trunc(qty)));
  commit(cache.map((i) => (i.id === id ? { id, qty: clamped } : i)));
}

export function removeFromCart(id: number) {
  commit(cache.filter((i) => i.id !== id));
}

export function clearCart() {
  commit(EMPTY);
}

function subscribe(cb: () => void) {
  const onCart = () => cb();
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) syncFromStorage();
  };
  window.addEventListener("jalar:cart", onCart);
  window.addEventListener("storage", onStorage);
  // Hidrasi dari localStorage DITUNDA via microtask: useSyncExternalStore melarang
  // memanggil callback secara sinkron selama fase subscribe. queueMicrotask membuat
  // syncFromStorage (yang bisa memicu emit→cb) berjalan setelah subscribe selesai.
  queueMicrotask(syncFromStorage);
  return () => {
    window.removeEventListener("jalar:cart", onCart);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => cache;
const getServerSnapshot = () => EMPTY;

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = items.reduce((n, i) => n + i.qty, 0);
  return { items, count };
}
