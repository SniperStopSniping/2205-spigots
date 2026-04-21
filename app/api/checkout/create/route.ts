import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getFinishByName, getProductBySlug, SHIPPING_RULES, type FinishName } from "@/data/products";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

type InputItem = {
  productSlug: string;
  finish: FinishName;
  quantity: number;
};

type CheckoutRequestBody = {
  items?: unknown;
  provinceHint?: unknown;
  shippingProvince?: unknown;
};

type ProvinceBucket = "ON" | "OTHER";

const isFinishName = (value: unknown): value is FinishName => value === "Satin" || value === "Matte Black";

const sanitizeItems = (value: unknown): InputItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const sanitized: InputItem[] = [];

  for (const rawItem of value) {
    if (typeof rawItem !== "object" || rawItem === null) {
      continue;
    }

    const record = rawItem as Record<string, unknown>;
    const productSlug = typeof record.productSlug === "string" ? record.productSlug : "";
    const finish = record.finish;
    const quantity = typeof record.quantity === "number" ? Math.floor(record.quantity) : NaN;

    if (!productSlug || !isFinishName(finish) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      continue;
    }

    const product = getProductBySlug(productSlug);
    if (!product) {
      continue;
    }

    const productFinish = getFinishByName(product, finish);
    if (!productFinish) {
      continue;
    }

    sanitized.push({
      productSlug,
      finish,
      quantity
    });
  }

  return sanitized;
};

const resolveProvinceBucket = (provinceHint: unknown, shippingProvince: unknown): ProvinceBucket => {
  const normalizedShippingProvince =
    typeof shippingProvince === "string" ? shippingProvince.trim().toUpperCase() : "";

  if (normalizedShippingProvince) {
    return normalizedShippingProvince === "ON" ? "ON" : "OTHER";
  }

  return provinceHint === "ON" ? "ON" : "OTHER";
};

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY." }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_SITE_URL." }, { status: 500 });
  }

  let body: CheckoutRequestBody;

  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const items = sanitizeItems(body.items);
  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty or invalid." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotalCents = 0;

  for (const item of items) {
    const product = getProductBySlug(item.productSlug);
    if (!product) {
      return NextResponse.json({ error: "Invalid product in cart." }, { status: 400 });
    }

    const finish = getFinishByName(product, item.finish);
    if (!finish) {
      return NextResponse.json({ error: "Invalid product finish in cart." }, { status: 400 });
    }

    lineItems.push({
      price: finish.priceId,
      quantity: item.quantity
    });

    subtotalCents += finish.priceCents * item.quantity;
  }

  const provinceBucket = resolveProvinceBucket(body.provinceHint, body.shippingProvince);

  if (subtotalCents < SHIPPING_RULES.freeThresholdCents) {
    const shippingPriceId =
      provinceBucket === "ON" ? SHIPPING_RULES.ontario.priceId : SHIPPING_RULES.restOfCanada.priceId;

    lineItems.push({
      price: shippingPriceId,
      quantity: 1
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      automatic_tax: {
        enabled: true
      },
      shipping_address_collection: {
        allowed_countries: ["CA"]
      },
      billing_address_collection: "required",
      customer_creation: "always",
      allow_promotion_codes: false,
      metadata: {
        subtotal_cents: String(subtotalCents),
        province_hint: provinceBucket
      }
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe session URL missing." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout session creation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
