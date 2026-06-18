"use client";

import Link from "next/link";
import { ReactNode } from "react";

/**
 * Tombol bernuansa "api membara": gradient kuning→merah, dengan lapisan nyala
 * (.flames) yang menyala & berkobar saat hover. Bisa jadi <Link> internal,
 * <a> eksternal, atau <button> (onClick).
 */
export default function FireButton({
  href,
  external = false,
  onClick,
  children,
  size = "md",
  className = "",
  disabled = false,
}: {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}) {
  const pad =
    size === "lg"
      ? "px-9 py-4 text-base sm:text-lg"
      : size === "sm"
        ? "px-5 py-2.5 text-xs"
        : "px-7 py-3.5 text-sm";
  const disabledCls = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  const cls = `btn-fire group inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide text-white ${pad} ${disabledCls} ${className}`;
  const inner = (
    <>
      <span className="fire-fx" aria-hidden>
        <span className="fire-base" />
        <span className="tongue t1" />
        <span className="tongue t2" />
        <span className="tongue t3" />
        <span className="tongue t4" />
        <span className="tongue t5" />
      </span>
      <span className="label inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={cls}
    >
      {inner}
    </button>
  );
}
