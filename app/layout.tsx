import type { Metadata, Viewport } from "next";
import "./globals.css";

import { CartToast } from "@/components/CartToast";
import { FloatingCartCta } from "@/components/FloatingCartCta";
import { SiteHeader } from "@/components/SiteHeader";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://2205spigots.ca"),
  title: "2205 Spigots",
  description:
    "Buy SS2205 and SS316 frameless glass railing hardware in Canada with transparent pricing and fast shipping."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className="bg-white font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <FloatingCartCta />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
