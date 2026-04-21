import type { Metadata } from "next";
import Link from "next/link";

import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { InfoStrip } from "@/components/InfoStrip";
import { ProductGrid } from "@/components/ProductGrid";
import { GOOGLE_MAP_EMBED_SRC, SERVICE_AREA_LABEL } from "@/data/location";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Stainless Glass Railing Hardware Canada | 2205 Spigots",
  description:
    "Buy SS2205 & SS316 frameless glass railing hardware in Canada. Spigots, clamps, hinges, and gate locks. Transparent pricing. Free shipping $150+."
};

export default function HomePage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-4 md:px-8 md:pb-14 md:pt-7">
        <section className="max-w-4xl">
          <h1 className="mt-2 text-[30px] font-semibold leading-[1.08] md:text-[60px]">
            Frameless Glass Railing Hardware — Canada
          </h1>
          <p className="mt-3 text-base leading-6 text-neutral-700 md:mt-4 md:text-lg md:leading-7">
            SS2205 Spigots • No hidden fees • Same price for everyone
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
            <a
              href="#shop-grid"
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-900"
            >
              Shop Hardware
            </a>
            <Link
              href="/installer-network"
              className="inline-flex h-11 items-center justify-center rounded-full border border-blue-200 px-6 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Find an Installer
            </Link>
          </div>
        </section>

        <section id="shop-grid" className="mt-8 md:mt-12">
          <h2 className="mb-4 text-lg font-semibold md:mb-5 md:text-2xl">Shop Hardware</h2>
          <ProductGrid products={PRODUCTS} />
        </section>
      </div>

      <InfoStrip className="mt-8 md:mt-10">
        Canadian supply • Fast shipping • Free shipping $150+ • No hidden pricing
      </InfoStrip>

      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-14">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-center text-xs text-neutral-600 md:text-sm">{SERVICE_AREA_LABEL}</p>
            <GoogleMapEmbed
              src={GOOGLE_MAP_EMBED_SRC}
              title="2450 Victoria Park Ave #100 service area map"
              className="mx-auto"
            />
          </div>

          <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-[0_1px_0_rgba(0,0,0,0.04)] md:mt-6 md:p-8">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor">
                <path
                  d="M12 22s7-5.7 7-12a7 7 0 1 0-14 0c0 6.3 7 12 7 12Z"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.5" strokeWidth="1.8" />
              </svg>
            </div>
            <h2 className="mt-3 text-lg font-semibold md:mt-4 md:text-2xl">Need Installation?</h2>
            <p className="mt-2 text-sm text-neutral-700 md:text-base">We can connect you with an installer.</p>
            <Link
              href="/installer-network"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-900 md:mt-5"
            >
              Get Connected
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
