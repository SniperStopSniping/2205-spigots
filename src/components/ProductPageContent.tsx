"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { ProductDetailsSections } from "@/components/ProductDetailsSections";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { isFinishName, type FinishName, type Product } from "@/data/products";

type ProductPageContentProps = {
  product: Product;
  initialFinish: FinishName;
};

export function ProductPageContent({ product, initialFinish }: ProductPageContentProps) {
  const [selectedFinish, setSelectedFinish] = useState<FinishName>(initialFinish);

  const safeSelectedFinish = useMemo<FinishName>(
    () => (isFinishName(selectedFinish) ? selectedFinish : "Satin"),
    [selectedFinish]
  );

  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-8 md:py-14">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <Image
            src={product.image}
            alt={product.titleByFinish[safeSelectedFinish]}
            width={1200}
            height={1200}
            className="h-full min-h-[320px] w-full object-cover"
            priority
          />
        </div>

        <ProductPurchasePanel
          product={product}
          selectedFinish={safeSelectedFinish}
          onSelectFinish={setSelectedFinish}
        />
      </div>

      <ProductDetailsSections product={product} finish={safeSelectedFinish} />
    </div>
  );
}
