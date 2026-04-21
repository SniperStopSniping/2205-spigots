"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { PROVINCES, SHIPPING_RULES } from "@/data/products";
import { formatCad } from "@/lib/format";

export default function CartPage() {
  const { items, checkoutItems, subtotalCents, setItemQuantity, removeItem, isReady } = useCart();

  const [province, setProvince] = useState("ON");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const estimateShippingCents = useMemo(() => {
    if (subtotalCents >= SHIPPING_RULES.freeThresholdCents) {
      return 0;
    }

    return province === "ON" ? SHIPPING_RULES.ontario.priceCents : SHIPPING_RULES.restOfCanada.priceCents;
  }, [province, subtotalCents]);

  const freeShippingRemaining = Math.max(SHIPPING_RULES.freeThresholdCents - subtotalCents, 0);
  const shippingProgressPercent = Math.min((subtotalCents / SHIPPING_RULES.freeThresholdCents) * 100, 100);

  const onCheckout = async () => {
    if (!checkoutItems.length || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: checkoutItems,
          provinceHint: province === "ON" ? "ON" : "OTHER"
        })
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Unable to start Stripe checkout.");
      }

      const payload = (await response.json()) as { url?: string };
      if (!payload.url) {
        throw new Error("Stripe checkout URL missing.");
      }

      window.location.href = payload.url;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to start checkout.");
      setIsSubmitting(false);
    }
  };

  if (!isReady) {
    return (
      <div className="mx-auto max-w-6xl px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-10 md:px-8 md:pb-12 md:pt-12">
        <p className="text-neutral-600">Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-12 md:px-8 md:pb-16 md:pt-16">
        <h1 className="text-3xl font-semibold leading-tight md:text-6xl">Cart</h1>
        <p className="mt-4 text-neutral-700">Your cart is empty.</p>
        <Link
          href="/#shop-grid"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-900"
        >
          Shop Hardware
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 md:grid-cols-[minmax(0,1fr)_360px] md:gap-10 md:px-8 md:pb-12 md:pt-12">
      <section>
        <h1 className="text-3xl font-semibold leading-tight md:text-6xl">Cart</h1>

        <div className="mt-6 space-y-5">
          {items.map((item) => {
            const productHref = `/product/${item.productSlug}`;

            return (
              <article
                key={item.key}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link href={productHref} aria-label={`View ${item.name}`} className="shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="h-20 w-20 rounded-lg border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={productHref} className="block focus-visible:outline-none focus-visible:underline">
                      <h2 className="truncate text-base font-semibold text-neutral-950 hover:underline">{item.name}</h2>
                    </Link>
                    <p className="mt-1 text-sm text-neutral-500">Finish: {item.finish}</p>
                    <Link
                      href={productHref}
                      className="mt-1 inline-block text-sm text-blue-700 transition hover:text-blue-800 hover:underline"
                    >
                      View details / change finish →
                    </Link>
                    <p className="mt-1 text-sm font-medium text-neutral-900">{formatCad(item.unitPriceCents)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productSlug, item.finish)}
                    className="self-start rounded-full border border-neutral-200 px-3 py-1 text-sm text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4">
                  <QuantityStepper
                    quantity={item.quantity}
                    onDecrease={() => setItemQuantity(item.productSlug, item.finish, item.quantity - 1)}
                    onIncrease={() => setItemQuantity(item.productSlug, item.finish, item.quantity + 1)}
                    small
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <h2 className="text-xl font-semibold md:text-2xl">Order Summary</h2>

        <div className="mt-5 space-y-3 text-sm text-neutral-700">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-950">{formatCad(subtotalCents)}</span>
          </div>

          {subtotalCents >= SHIPPING_RULES.freeThresholdCents ? (
            <p className="font-medium text-neutral-950">Shipping: FREE</p>
          ) : (
            <>
              <label className="block text-sm font-medium text-neutral-950" htmlFor="province">
                Province (estimate)
              </label>
              <select
                id="province"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900"
              >
                {PROVINCES.map((entry) => (
                  <option key={entry.code} value={entry.code}>
                    {entry.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between">
                <span>Shipping (estimate)</span>
                <span className="font-medium text-neutral-950">{formatCad(estimateShippingCents)}</span>
              </div>
            </>
          )}
        </div>

        <p className="mt-4 text-sm text-neutral-700">
          {freeShippingRemaining > 0
            ? `Add ${formatCad(freeShippingRemaining)} for free shipping.`
            : "You’ve unlocked free shipping."}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${shippingProgressPercent}%` }} />
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={isSubmitting}
          className="mt-5 h-11 w-full rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-900 disabled:opacity-60"
        >
          {isSubmitting ? "Redirecting..." : "Checkout with Stripe"}
        </button>

        {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}

        <p className="mt-5 whitespace-pre-line text-sm text-neutral-700">
          {"Free shipping on orders $150+ (Canada-wide).\nOrders under $150:\n• Ontario: $14.99\n• Rest of Canada: $24.99"}
        </p>
        <p className="mt-3 text-sm text-neutral-700">Taxes calculated at checkout.</p>
      </aside>
    </div>
  );
}
