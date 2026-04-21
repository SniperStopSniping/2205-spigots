import type { FinishName } from "@/data/products";
import { getProductBySlug } from "@/data/products";

export type ProductAlias = {
  aliasSlug: string;
  productSlug: string;
  finish: FinishName;
  title: string;
  metaDescription: string;
};

const createAlias = (aliasSlug: string, productSlug: string, finish: FinishName): ProductAlias => {
  const product = getProductBySlug(productSlug);
  if (!product) {
    throw new Error(`Unknown product slug for alias: ${productSlug}`);
  }

  return {
    aliasSlug,
    productSlug,
    finish,
    title: product.titleByFinish[finish],
    metaDescription: product.metaDescriptionByFinish[finish]
  };
};

export const PRODUCT_ALIASES: ProductAlias[] = [
  createAlias("6-inch-glass-spigot-duplex-2205-satin", "2205-adjustable-base-spigot", "Satin"),
  createAlias("6-inch-glass-spigot-duplex-2205-matte-black", "2205-adjustable-base-spigot", "Matte Black"),
  createAlias(
    "adjustable-angle-glass-to-glass-clamp-duplex-2205-satin",
    "adjustable-angle-glass-to-glass-clamp",
    "Satin"
  ),
  createAlias(
    "adjustable-angle-glass-to-glass-clamp-duplex-2205-matte-black",
    "adjustable-angle-glass-to-glass-clamp",
    "Matte Black"
  ),
  createAlias("180-glass-to-glass-clamp-duplex-2205-satin", "180-glass-to-glass-clamp", "Satin"),
  createAlias("180-glass-to-glass-clamp-duplex-2205-matte-black", "180-glass-to-glass-clamp", "Matte Black"),
  createAlias("90-glass-to-glass-clamp-duplex-2205-satin", "90-glass-to-glass-clamp", "Satin"),
  createAlias("90-glass-to-glass-clamp-duplex-2205-matte-black", "90-glass-to-glass-clamp", "Matte Black"),
  createAlias("glass-to-wall-clamp-duplex-2205-satin", "glass-to-wall-clamp", "Satin"),
  createAlias("glass-to-wall-clamp-duplex-2205-matte-black", "glass-to-wall-clamp", "Matte Black"),
  createAlias(
    "self-closing-glass-gate-hinges-316-stainless-steel-satin",
    "self-closing-glass-gate-hinges",
    "Satin"
  ),
  createAlias(
    "self-closing-glass-gate-hinges-316-stainless-steel-matte-black",
    "self-closing-glass-gate-hinges",
    "Matte Black"
  ),
  createAlias("glass-to-glass-gate-lock-duplex-2205-satin", "glass-to-glass-gate-lock", "Satin"),
  createAlias("glass-to-glass-gate-lock-duplex-2205-matte-black", "glass-to-glass-gate-lock", "Matte Black")
];

export const PRODUCT_ALIASES_BY_SLUG: Record<string, ProductAlias> = Object.fromEntries(
  PRODUCT_ALIASES.map((alias) => [alias.aliasSlug, alias])
);

export const getProductAliasBySlug = (aliasSlug: string): ProductAlias | undefined => PRODUCT_ALIASES_BY_SLUG[aliasSlug];
