import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageContent } from "@/components/ProductPageContent";
import { getProductAliasBySlug, PRODUCT_ALIASES } from "@/data/productAliases";
import { getProductBySlug } from "@/data/products";
import { buildProductJsonLd } from "@/lib/productSeo";

type ProductAliasPageProps = {
  params: {
    seoSlug: string;
  };
};

export function generateStaticParams() {
  return PRODUCT_ALIASES.map((alias) => ({ seoSlug: alias.aliasSlug }));
}

export function generateMetadata({ params }: ProductAliasPageProps): Metadata {
  const alias = getProductAliasBySlug(params.seoSlug);
  if (!alias) {
    return {
      title: "Page not found | 2205 Spigots"
    };
  }

  return {
    title: alias.title,
    description: alias.metaDescription,
    alternates: {
      canonical: `/${alias.aliasSlug}`
    }
  };
}

export default function ProductAliasPage({ params }: ProductAliasPageProps) {
  const alias = getProductAliasBySlug(params.seoSlug);
  if (!alias) {
    notFound();
  }

  const product = getProductBySlug(alias.productSlug);
  if (!product) {
    notFound();
  }

  const canonicalPath = `/${alias.aliasSlug}`;
  const jsonLd = buildProductJsonLd(product, alias.finish, canonicalPath);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductPageContent product={product} initialFinish={alias.finish} />
    </>
  );
}
