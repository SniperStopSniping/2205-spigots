# CODEX.md — 2205spigots.ca (Production Build Spec)

## Objective
Build a production-ready ecommerce website for **2205 Spigots** (Canada, CAD) with an **installer-style fast ordering** flow:

Open site → choose finish → Add → keep scrolling → add more → View cart → Stripe checkout.

No admin panel. **Only the 7 products** listed in `src/data/products.ts`. Transparent pricing (same price for everyone). No hidden fees.

---

## Tech Requirements
- Next.js (App Router) + TypeScript + Tailwind
- Host: Vercel
- Payments: Stripe Checkout (Checkout Sessions)
- Currency: CAD
- Country: Canada (shipping address collection CA only)
- Performance: Lighthouse 90+
- Use `next/image` + lazy-load images
- No sliders, no video backgrounds, keep JS light
- No popups, no coupons, no fake discounts

---

## Pages
1. `/` (Homepage = shop-first)
2. `/cart`
3. `/product/[slug]`
4. `/installer-network`
5. `/contact`
6. `/success`
7. `/cancel`

---

## Global Header (Sticky)
Left: **“2205 Spigots”** (logo text)
Nav: Shop | Installer Network | Contact
Right: Cart icon + live item count badge

Announcement bar (below header):
**“Free shipping on orders $150+ (Canada) • Transparent pricing — same price for everyone”**

---

## Homepage Layout
Above fold (compact hero):
- H1: **Frameless Glass Railing Hardware — Canada**
- Sub: **SS2205 & SS316 • No hidden fees • Same price for everyone**
- Buttons:
  - Primary: **Shop Hardware** (scroll to product grid)
  - Secondary: **Find an Installer** (link to `/installer-network`)

Immediately below: **PRODUCT GRID (all products)**  
- Desktop: 3–4 columns
- Mobile: 2 columns
- No long sections before grid

Under grid: trust strip (one line):
**“Canadian supply • Fast shipping • Free shipping $150+ • No hidden pricing”**

Bottom CTA:
Title: **Need Installation?**
Text: **We can connect you with an installer.**
Button: **Get Connected** → `/installer-network`

---

## Product Card Requirements (Homepage and any collection view)
Each card shows:
- Product image (placeholder if none)
- Product name
- Spec line EXACT format:
  - “SS2205 • 10–12mm • 0.33kg”
  - “SS316 • 10–12mm • 1.26kg”
- Finish selector pills: **Satin / Matte Black**
- Price text updates instantly when finish changes
- Add button

Finish behavior:
- Default selected: **Satin**
- Clicking finish updates:
  - selected UI state
  - displayed price
  - variant added to cart

---

## Add-to-Cart UX (Must Implement)
When user taps **Add**:
1) Adds selected finish variant to cart with qty=1 (or increments if already present)
2) Button changes to **“Added ✓”**
3) Inline quantity stepper appears on card: `[-] 1 [+]`
4) Toast: **“Added to cart”**
5) Floating CTA appears:
   - Mobile: bottom bar
   - Desktop: small floating panel
   Buttons:
   - **View Cart**
   - **Continue Shopping** (closes panel/bar; does not navigate)

State rules:
- No full page reloads
- Use client state + localStorage persistence
- Cart badge updates live

---

## Cart Page Requirements
Cart displays:
- Line items: image, name, finish, unit price
- Quantity stepper per item
- Remove button
- Subtotal

Shipping estimate block:
- If subtotal >= 150: show **“Shipping: FREE”**
- If subtotal < 150:
  - Province selector (default **ON**) for estimate only:
    - ON → 14.99
    - All other provinces → 24.99
- Progress text:
  - If subtotal < 150: **“Add $X for free shipping.”**
  - Else: **“You’ve unlocked free shipping.”**

Checkout button: **“Checkout with Stripe”**

Cart shipping copy (display this text):
“Free shipping on orders $150+ (Canada-wide).
Orders under $150:
• Ontario: $14.99
• Rest of Canada: $24.99”

Tax note (display this text):
“Taxes calculated at checkout.”

---

## Stripe Checkout (Server Route)
Use Stripe Checkout Sessions.

Server route:
`POST /api/checkout/create`

Input:
```json
{
  "items": [{ "productSlug": "string", "finish": "Satin|Matte Black", "quantity": 1 }],
  "provinceHint": "ON|OTHER" // optional; used only as a hint
}
```

Server logic:
	1.	Validate items strictly against src/data/products.ts (no extra products)
	2.	Build Stripe line_items:
	•	Prefer Stripe Price IDs stored in product data OR inline price_data
	•	Choose one method and be consistent (if Price IDs are used, do not hardcode amounts)
	3.	Compute subtotal in cents
	4.	Determine shipping:
	•	If subtotal >= 15000 → shipping = 0
	•	Else:
	•	Use Stripe shipping address province if available (final authority)
	•	Else use provinceHint
	•	Ontario → 1499, other provinces → 2499
	5.	Add shipping:
	•	Either as separate line_item named “Shipping” OR Stripe shipping_options fixed_amount
	6.	shipping_address_collection.allowed_countries = ['CA']
	7.	Enable Stripe Tax (automatic tax by province)
	8.	Return { url: session.url } and redirect client

Success/Cancel:
	•	/success: “Order confirmed. We’ll email tracking.”
	•	/cancel: “Checkout canceled. Your cart is saved.”

ENV:
	•	STRIPE_SECRET_KEY
	•	NEXT_PUBLIC_SITE_URL
	•	(optional) STRIPE_WEBHOOK_SECRET

⸻

Installer Network Page

H1: Need an Installer?
Text: “Tell us your city and project type — we’ll connect you.”

Form fields:
	•	Name
	•	Phone
	•	Email
	•	City / Postal Code
	•	Project Type (Residential / Commercial / Pool fence / Balcony / Other)
	•	Message

Submit → confirmation message:
“Thanks — we’ll connect you with an installer soon.”

⸻

Contact Page

H1: Contact
Fields:
	•	Name
	•	Email
	•	Message
Also show email/phone placeholders (blank if unknown).

⸻

Products (ONLY THESE 7 — No model codes anywhere)

Each product has 2 finishes: Satin and Matte Black.
Glass thickness always 10–12mm.

Data source: src/data/products.ts MUST be the single source of truth.
Include: name, slug, material, glassThickness, weightKg, finishes, shortDescription

Product List
	1.	2205 Adjustable Base Spigot
slug: 2205-adjustable-base-spigot
material: SS2205
weight: 2.03kg
prices: Satin 36.99 / Black 39.99
	2.	Adjustable Angle Glass-to-Glass Clamp
slug: adjustable-angle-glass-to-glass-clamp
material: SS2205
weight: 0.46kg
prices: Satin 14.99 / Black 17.99
	3.	180° Glass-to-Glass Clamp
slug: 180-glass-to-glass-clamp
material: SS2205
weight: 0.33kg
prices: Satin 11.99 / Black 14.99
	4.	90° Glass-to-Glass Clamp
slug: 90-glass-to-glass-clamp
material: SS2205
weight: 0.31kg
prices: Satin 11.99 / Black 13.99
	5.	Glass-to-Wall Clamp
slug: glass-to-wall-clamp
material: SS2205
weight: 0.22kg
prices: Satin 9.99 / Black 10.99
	6.	Self-Closing Glass Gate Hinges
slug: self-closing-glass-gate-hinges
material: SS316
weight: 1.26kg
prices: Satin 48.99 / Black 54.99
	7.	Glass-to-Glass Gate Lock
slug: glass-to-glass-gate-lock
material: SS2205
weight: 0.85kg
prices: Satin 39.99 / Black 42.99

⸻

SEO

Homepage:
	•	title: “Stainless Glass Railing Hardware Canada | 2205 Spigots”
	•	description: “Buy SS2205 & SS316 frameless glass railing hardware in Canada. Spigots, clamps, hinges, and gate locks. Transparent pricing. Free shipping $150+.”

Headings:
	•	H1: Frameless Glass Railing Hardware — Canada
	•	H2: Shop Hardware
	•	H2: Need Installation?

⸻

Non-negotiables
	•	No coupons, no promo codes, no “was/now”
	•	No popups
	•	No extra products
	•	Transparent pricing messaging sitewide
	•	Cart persists via localStorage
	•	Smooth/minimal animation only

If you want it even more “general” (so you can reuse it for other brands later), tell me and I’ll strip brand-specific text and turn it into a template with placeholders like `{BRAND_NAME}`, `{DOMAIN}`, `{FREE_SHIP_THRESHOLD}`.
