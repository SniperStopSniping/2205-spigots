"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { ProductDetailsSections } from "@/components/ProductDetailsSections";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { getProductImagesForFinish, isFinishName, type FinishName, type Product } from "@/data/products";

type ProductPageContentProps = {
  product: Product;
  initialFinish: FinishName;
};

export function ProductPageContent({ product, initialFinish }: ProductPageContentProps) {
  const [selectedFinish, setSelectedFinish] = useState<FinishName>(initialFinish);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const safeSelectedFinish = useMemo<FinishName>(
    () => (isFinishName(selectedFinish) ? selectedFinish : "Satin"),
    [selectedFinish]
  );

  const galleryImages = useMemo(
    () => getProductImagesForFinish(product, safeSelectedFinish),
    [product, safeSelectedFinish]
  );
  const selectedImage = galleryImages[selectedImageIndex] ?? galleryImages[0];

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [safeSelectedFinish]);

  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-8 md:py-14">
        <div>
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <Image
              src={selectedImage}
              alt={product.titleByFinish[safeSelectedFinish]}
              width={1200}
              height={1200}
              className="aspect-square w-full object-contain p-4 md:aspect-[4/3]"
              priority
            />
          </div>

          {galleryImages.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 md:mt-4">
              {galleryImages.map((image, index) => {
                const active = selectedImageIndex === index;
                return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View ${product.name} image ${index + 1}`}
                    aria-pressed={active}
                    className={[
                      "aspect-square overflow-hidden rounded-xl border bg-white transition",
                      active
                        ? "border-blue-400 shadow-[0_0_0_2px_rgba(59,130,246,0.14)]"
                        : "border-neutral-200 hover:border-neutral-300"
                    ].join(" ")}
                  >
                    <Image
                      src={image}
                      alt=""
                      width={240}
                      height={240}
                      className="h-full w-full object-contain p-1.5"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
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
