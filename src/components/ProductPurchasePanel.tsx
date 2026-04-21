"use client";

import { useMemo } from "react";

import { useCart } from "@/context/CartContext";
import { getFinishByName, type FinishName, type Product } from "@/data/products";
import { formatCad } from "@/lib/format";
import { QuantityStepper } from "./QuantityStepper";

type ProductPurchasePanelProps = {
  product: Product;
  selectedFinish: FinishName;
  onSelectFinish: (finish: FinishName) => void;
};

export function ProductPurchasePanel({ product, selectedFinish, onSelectFinish }: ProductPurchasePanelProps) {
  const { addItem, getQuantity, setItemQuantity } = useCart();
  const selectedFinishData = getFinishByName(product, selectedFinish) ?? product.finishes[0];
  const quantity = getQuantity(product.slug, selectedFinishData.name);

  const specLine = useMemo(
    () => `${product.material} • ${product.glassThickness.replace("-", "–")} • ${product.weightKg.toFixed(2)}kg`,
    [product.material, product.glassThickness, product.weightKg]
  );

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] md:p-6">
      <h1 className="text-[28px] font-semibold leading-tight md:text-3xl">{product.titleByFinish[selectedFinishData.name]}</h1>
      <p className="mt-2 text-sm text-neutral-500">{specLine}</p>
      <p className="mt-3 text-sm leading-6 text-neutral-700 md:text-base md:leading-7">{product.shortDescription}</p>
      <p className="mt-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
        Fits 10-12mm Glass
      </p>

      <div className="mt-6 inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-neutral-100 p-1">
        {product.finishes.map((finish) => {
          const active = selectedFinishData.name === finish.name;
          return (
            <button
              key={finish.name}
              type="button"
              onClick={() => onSelectFinish(finish.name)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm transition",
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

      <div className="mt-5 text-3xl font-semibold text-neutral-950">{formatCad(selectedFinishData.priceCents)}</div>

      <button
        type="button"
        onClick={() => addItem(product.slug, selectedFinishData.name)}
        className={[
          "mt-4 h-11 rounded-full px-6 text-sm font-semibold text-white transition",
          quantity > 0 ? "bg-neutral-900" : "bg-neutral-950 hover:bg-neutral-900"
        ].join(" ")}
      >
        {quantity > 0 ? "Added ✓" : "Add"}
      </button>

      {quantity > 0 ? (
        <div className="mt-4">
          <QuantityStepper
            quantity={quantity}
            onDecrease={() => setItemQuantity(product.slug, selectedFinishData.name, quantity - 1)}
            onIncrease={() => setItemQuantity(product.slug, selectedFinishData.name, quantity + 1)}
          />
        </div>
      ) : null}
    </div>
  );
}
