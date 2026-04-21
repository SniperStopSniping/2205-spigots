"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { formatCad } from "@/lib/format";
import { QuantityStepper } from "./QuantityStepper";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, getQuantity, setItemQuantity } = useCart();
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]);

  const quantity = getQuantity(product.slug, selectedFinish.name);

  const specLine = useMemo(
    () => `${product.material} • ${product.glassThickness.replace("-", "–")} • ${product.weightKg.toFixed(2)}kg`,
    [product.material, product.glassThickness, product.weightKg]
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:p-4">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden rounded-xl">
        <div className="h-32 bg-gradient-to-b from-neutral-50 to-white md:h-44">
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="mt-3 flex flex-1 flex-col md:mt-4">
        <Link
          href={`/product/${product.slug}`}
          className="text-base font-semibold leading-5 text-neutral-950 transition hover:text-neutral-700 md:text-[20px] md:leading-6"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-xs text-neutral-500 md:text-sm">{specLine}</p>

        <div className="mt-3 inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-neutral-100 p-1 md:mt-4">
          {product.finishes.map((finish) => {
            const active = selectedFinish.name === finish.name;
            return (
              <button
                key={finish.name}
                type="button"
                onClick={() => setSelectedFinish(finish)}
                className={[
                  "rounded-full border px-2.5 py-1 text-xs transition md:px-3 md:py-1.5 md:text-sm",
                  active
                    ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-transparent bg-transparent text-neutral-700 hover:bg-white hover:text-neutral-950"
                ].join(" ")}
              >
                {finish.name}
              </button>
            );
          })}
        </div>

        <div className="mt-2 text-base font-semibold text-neutral-950 md:mt-3 md:text-lg">
          {formatCad(selectedFinish.priceCents)}
        </div>

        <button
          type="button"
          onClick={() => addItem(product.slug, selectedFinish.name)}
          className={[
            "mt-3 h-10 rounded-full px-4 text-sm font-semibold text-white transition md:mt-4 md:h-11",
            quantity > 0 ? "bg-neutral-900" : "bg-neutral-950 hover:bg-neutral-900"
          ].join(" ")}
        >
          {quantity > 0 ? "Added ✓" : "Add"}
        </button>

        {quantity > 0 ? (
          <div className="mt-2 md:mt-3">
            <QuantityStepper
              quantity={quantity}
              onDecrease={() => setItemQuantity(product.slug, selectedFinish.name, quantity - 1)}
              onIncrease={() => setItemQuantity(product.slug, selectedFinish.name, quantity + 1)}
              small
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
