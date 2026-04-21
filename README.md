# 2205 Spigots Ecommerce

Production-oriented Next.js storefront for 2205 Spigots (Canada, CAD) with Stripe Checkout and a fast installer-style ordering flow.

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Stripe Checkout Sessions
- Vercel hosting

## Product Source of Truth
All 7 products and finish pricing are defined in `src/data/products.ts`.

This file includes placeholder Stripe Price IDs. Replace each placeholder with real Stripe `price_...` IDs from your Dashboard without changing checkout logic.

## Local Development
1. Install dependencies:
```bash
npm install
```
2. Create `.env.local` from `.env.example`.
3. Start dev server:
```bash
npm run dev
```
4. Open `http://localhost:3000`.

## Required Environment Variables
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET` (optional)

## Stripe Setup
1. In Stripe test mode, create all 7 products and 2 prices per product (Satin + Matte Black), CAD one-time.
2. Copy each price ID and replace placeholders in `src/data/products.ts`.
3. Optional: create shipping price IDs and replace `price_ship_on_1499` and `price_ship_ca_2499` in `src/data/products.ts`.
4. Enable Stripe Tax in Dashboard.

## Checkout Route
- Endpoint: `POST /api/checkout/create`
- Input:
```json
{
  "items": [{ "productSlug": "string", "finish": "Satin", "quantity": 1 }],
  "provinceHint": "ON"
}
```
- Server validates cart strictly against `src/data/products.ts`, builds Stripe line items by price ID, applies shipping rule, enables tax, and returns checkout URL.

## Shipping Rules
- Free shipping at subtotal >= `$150.00`
- Under `$150.00`:
  - Ontario: `$14.99`
  - Rest of Canada: `$24.99`

## Deploy to Vercel
1. Push repo to GitHub.
2. In Vercel, import project.
3. Set environment variables in Vercel Project Settings.
4. Deploy.
5. Set `NEXT_PUBLIC_SITE_URL` to your production domain (`https://2205spigots.ca`).

## Notes
- Cart state persists in localStorage.
- No popups, no coupons, no fake discount UI.
- Images use `next/image` with lazy loading.
