"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export function CartToast() {
  const { toastMessage, toastToken, dismissToast } = useCart();

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      dismissToast();
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [toastMessage, toastToken, dismissToast]);

  if (!toastMessage) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-6 md:bottom-6 md:justify-end md:pr-6">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white/95 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        <div className="border-l-4 border-blue-500 px-4 py-2 text-sm font-medium text-neutral-900">{toastMessage}</div>
      </div>
    </div>
  );
}
