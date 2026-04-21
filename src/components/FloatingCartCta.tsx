"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export function FloatingCartCta() {
  const { floatingCtaVisible, itemCount, closeFloatingCta } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/cart" && floatingCtaVisible) {
      closeFloatingCta();
    }
  }, [pathname, floatingCtaVisible, closeFloatingCta]);

  if (!floatingCtaVisible || itemCount === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 px-6 md:inset-x-auto md:bottom-4 md:right-6 md:w-[320px] md:px-0">
      <div className="pointer-events-auto rounded-2xl border border-neutral-200 bg-white/90 p-3 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        <p className="mb-3 text-sm text-neutral-700">Items added to cart.</p>
        <div className="flex gap-2">
          <Link
            href="/cart"
            onClick={closeFloatingCta}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-900"
          >
            View Cart
          </Link>
          <button
            type="button"
            onClick={closeFloatingCta}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
