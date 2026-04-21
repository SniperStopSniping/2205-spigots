import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Balcony Glass Railings Hardware | 2205 Spigots",
  description:
    "Discover hardware for balcony glass railings including adjustable spigots, clamps, and gate hardware built for Canada."
};

export default function BalconyGlassRailingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
      <h1 className="text-[28px] font-semibold leading-tight md:text-4xl">Balcony Glass Railings</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-neutral-700 md:text-base md:leading-7">
        Build modern balcony systems with installer-ready glass railing hardware designed for precise alignment,
        durable finishes, and long-term corrosion resistance.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/#shop-grid"
          className="inline-flex h-11 items-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-900"
        >
          Shop Hardware
        </Link>
        <Link
          href="/installer-network"
          className="inline-flex h-11 items-center rounded-full border border-blue-200 px-6 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
        >
          Find an Installer
        </Link>
      </div>
    </div>
  );
}
