# GEE.WRLD Clothing Store

A full-stack, mobile-first e-commerce site for **GEE.WRLD Clothing Store**, a Nairobi clothing shop at Rasumal House, Shop 3F,17, 3rd Floor. Built with Next.js 14 (App Router), Tailwind CSS, M-Pesa Daraja (STK Push), and the WhatsApp Business Cloud API.

No database, no auth, no admin dashboard — the entire catalogue lives in static JSON files, and orders are placed via M-Pesa + a WhatsApp notification to the shop owner.

---

## ⭐ To rebrand this site for a different shop, edit only `src/config/brand.ts`

Every page, component, and piece of copy pulls its brand-specific values (name, tagline, contact info, address, hours, colours, fonts, categories, and all micro-copy) from that one file. Nothing brand-specific is hardcoded anywhere else in the codebase. Rebrand = update that file, swap `src/data/products.json`, done.

---

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Test at **375px width first** — this site is built mobile-first.

```bash
npm run build   # production build
npm run start   # run the production build locally
```

---

## Project Structure

```
src/
├── config/brand.ts          ⭐ single source of truth for all brand identity
├── app/                     Pages (App Router)
├── components/              Layout, home, shop, cart, and UI components
├── context/                 CartContext + WishlistContext (React Context + localStorage)
├── data/                    products.json, blogs.json, testimonials.json, faqs.json
├── lib/utils.ts             cn(), formatPrice(), slugify(), KENYA_COUNTIES, getShippingFee()
└── types/index.ts           Shared TypeScript types
```

---

## Updating Products

Edit `src/data/products.json` directly — it's a plain array of product objects (see `src/types/index.ts` for the shape). There's no admin panel or database; add, remove, or edit entries in the JSON file and redeploy.

The current catalogue (328 products) was generated from 7 ASOS category exports (shirts, hoodies, jackets, suits, dresses, women's new-in, spring essentials), converted to KES pricing, and tagged with the app's category/gender/size conventions.

## Adding Blog Posts

Edit `src/data/blogs.json`. Each entry needs `id`, `slug`, `title`, `excerpt`, `author`, `date`, `read_time`, and `content` (HTML string — rendered via `dangerouslySetInnerHTML` inside `.prose-article` styling, so only paste trusted/authored HTML here, not user input).

## Editing Testimonials / FAQs

`src/data/testimonials.json` and `src/data/faqs.json` — same pattern, plain arrays.

---

## M-Pesa Setup (Daraja)

1. Create an app at [developer.safaricom.co.ke](https://developer.safaricom.co.ke) and get your Consumer Key/Secret.
2. Fill in `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_BUSINESS_SHORT_CODE`, and `MPESA_PASSKEY` in `.env.local`.
3. Set `MPESA_CALLBACK_URL` to `https://your-domain.vercel.app/api/mpesa/callback` once deployed (Daraja can't reach `localhost`).
4. The integration currently points at the **sandbox** endpoint (`sandbox.safaricom.co.ke`) in `src/app/api/orders/route.ts` — switch to the production endpoint when you go live with a production shortcode.
5. If the M-Pesa env vars aren't set, the STK push call is skipped gracefully (checkout still records/notifies the order via WhatsApp) rather than crashing — useful for local dev without live credentials.

## WhatsApp Setup (Business Cloud API)

1. Set up a WhatsApp Business app at [developers.facebook.com](https://developers.facebook.com) → WhatsApp → API Setup.
2. Fill in `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and `OWNER_WHATSAPP_NUMBER` (the shop's number that should receive new-order alerts) in `.env.local`.
3. Every checkout submission sends a formatted order summary to `OWNER_WHATSAPP_NUMBER` via `/api/orders`. Like M-Pesa, this is skipped gracefully if the env vars are missing.
4. Customer-facing "DM Us" / "Check My Size" buttons link straight to `brand.whatsappUrl` (`wa.me/...`) — no API needed for those, they just open WhatsApp.

---

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import it in [vercel.com](https://vercel.com) → New Project.
3. Add all the environment variables from `.env.local` in the Vercel project settings.
4. Deploy. Update `MPESA_CALLBACK_URL` and `NEXT_PUBLIC_SITE_URL` to the live Vercel URL, then redeploy.

---

## Testing Mobile Responsiveness

- Open Chrome DevTools → toggle device toolbar → set width to **375px** first.
- Check: horizontally scrollable category nav, 2-column product grid, sticky bottom "Add to Cart" bar on product pages, sticky checkout bar on the cart page, bottom-sheet filters on the shop page, 44×44px tap targets throughout, and the fixed WhatsApp button bottom-right.
- Then check `sm:`, `lg:` breakpoints up to desktop.

---

## Notes

- Images are served with `images.unoptimized: true` in `next.config.js` (fixed catalogue, no user uploads — this sidesteps Next's remote image optimizer entirely rather than fighting it).
- Fonts (Bebas Neue + DM Sans) load via a plain `<link>` tag in `src/app/layout.tsx`'s `<head>`, not `next/font/google`, with `optimizeFonts: false` set in `next.config.js` — this keeps a flaky/restricted network from ever failing `npm run build`.
- `useSearchParams()` on the shop page is wrapped in `<Suspense>` per Next.js App Router requirements.
