"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { InfoStrip } from "@/components/InfoStrip";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.7L21 7H7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="10" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex items-center gap-3 py-0 md:py-0.5">
          <Link href="/" className="inline-flex min-w-0 items-center leading-none">
            <Image
              src="/2205-spigots.png"
              alt="2205 Spigots"
              width={240}
              height={64}
              className="block h-[4.75rem] w-auto sm:h-[5.5rem] md:h-[7.5rem]"
              priority
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-7 text-sm md:flex">
            <Link
              href="/#shop-grid"
              className={[
                "transition",
                pathname === "/" ? "font-medium text-blue-700" : "text-neutral-700 hover:text-neutral-900"
              ].join(" ")}
            >
              Shop
            </Link>
            <Link
              href="/installer-network"
              className={[
                "transition",
                pathname === "/installer-network"
                  ? "font-medium text-blue-700"
                  : "text-neutral-700 hover:text-neutral-900"
              ].join(" ")}
            >
              Installer Network
            </Link>
            <Link
              href="/contact"
              className={[
                "transition",
                pathname === "/contact" ? "font-medium text-blue-700" : "text-neutral-700 hover:text-neutral-900"
              ].join(" ")}
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative ml-auto inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm"
          >
            <CartIcon />
            <span className="hidden lg:inline">Cart</span>
            <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
              {itemCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-900 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileNavOpen}
          >
            <span className="relative block h-4 w-5">
              <span className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current" />
              <span className="absolute left-0 top-[6px] h-[2px] w-5 rounded-full bg-current" />
              <span className="absolute left-0 top-[12px] h-[2px] w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>

        {mobileNavOpen ? (
          <nav className="pb-2 text-sm md:hidden">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <Link
                href="/#shop-grid"
                onClick={closeMobileNav}
                className={[
                  "block px-4 py-3 transition",
                  pathname === "/" ? "font-medium text-blue-700" : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                ].join(" ")}
              >
                Shop
              </Link>
              <Link
                href="/installer-network"
                onClick={closeMobileNav}
                className={[
                  "block border-t border-neutral-200 px-4 py-3 transition",
                  pathname === "/installer-network"
                    ? "font-medium text-blue-700"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                ].join(" ")}
              >
                Installer Network
              </Link>
              <Link
                href="/contact"
                onClick={closeMobileNav}
                className={[
                  "block border-t border-neutral-200 px-4 py-3 transition",
                  pathname === "/contact"
                    ? "font-medium text-blue-700"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                ].join(" ")}
              >
                Contact
              </Link>
            </div>
          </nav>
        ) : null}
      </div>

      <InfoStrip>
        Free shipping on orders $150+ (Canada) • Transparent pricing — same price for everyone
      </InfoStrip>
    </header>
  );
}
