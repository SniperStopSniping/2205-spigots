import {
  getFinishByName,
  getProductImagesForFinish,
  normalizeFinishName,
  type FinishName,
  type Product
} from "@/data/products";

const FALLBACK_SITE_URL = "https://2205spigots.ca";

export const getSiteUrl = (): string => {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL;
  if (!candidate) {
    return FALLBACK_SITE_URL;
  }

  try {
    const parsed = new URL(candidate);
    return parsed.toString();
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const resolveFinish = (rawFinish: string | null | undefined): FinishName => normalizeFinishName(rawFinish);

export const toAbsoluteUrl = (path: string): string => {
  const base = getSiteUrl();
  return new URL(path, base).toString();
};

export const buildProductJsonLd = (product: Product, finish: FinishName, canonicalPath: string) => {
  const selectedFinish = getFinishByName(product, finish) ?? product.finishes[0];
  const images = getProductImagesForFinish(product, selectedFinish.name).map(toAbsoluteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.titleByFinish[selectedFinish.name],
    description: product.metaDescriptionByFinish[selectedFinish.name],
    image: images,
    material: product.material === "SS2205" ? "Duplex 2205 Stainless Steel" : "SS316 Stainless Steel",
    weight: `${product.weightKg}kg`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "CAD",
      price: (selectedFinish.priceCents / 100).toFixed(2),
      url: toAbsoluteUrl(canonicalPath)
    }
  };
};
