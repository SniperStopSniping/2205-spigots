import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageContent } from "@/components/ProductPageContent";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { buildProductJsonLd, resolveFinish } from "@/lib/productSeo";

type ProductPageProps = {
  params: {
    slug: string;
  };
  searchParams?: {
    finish?: string;
  };
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params, searchParams }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product not found | 2205 Spigots"
    };
  }

  const finish = resolveFinish(searchParams?.finish);

  return {
    title: product.titleByFinish[finish],
    description: product.metaDescriptionByFinish[finish],
    alternates: {
      canonical: `/product/${product.slug}`
    }
  };
}

export default function ProductPage({ params, searchParams }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const finish = resolveFinish(searchParams?.finish);
  const canonicalPath = `/product/${product.slug}`;
  const jsonLd = buildProductJsonLd(product, finish, canonicalPath);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductPageContent product={product} initialFinish={finish} />
    </>
  );
}
