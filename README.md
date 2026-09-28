# site-shyam-mallesh

Bespoke real estate website for Shyam Mallesh. Next.js App Router, TypeScript,
Tailwind, React Three Fiber (3D hero), Framer Motion + GSAP ScrollTrigger (scroll
animation), an AI chatbot grounded in this site's own content, a mortgage/affordability
calculator, and a CRM-ready contact form.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- React Three Fiber / drei — 3D hero scene (`components/three/`)
- Framer Motion + GSAP ScrollTrigger — scroll-driven animation
- `@anthropic-ai/sdk` — chatbot backend (`app/api/chat/route.ts`)

## Content — what's real vs. placeholder

This build shipped without any real bio, headshot, listings, or testimonials — both
source links (realtor.com, crexi.com) blocked automated access, and none could be
found by other means. See `intake.md` / `status.md` in the client folder for details.
Every editable fact lives in `data/`:

- `data/site.ts` — agent name, bio, contact info, socials
- `data/listings.ts` — listing inventory (ships with one clearly labeled sample)
- `data/testimonials.ts` — real testimonials only (empty renders no section)
- `data/faq.ts` — general FAQ content

**The chatbot reads these same files live on every request** — edit any of them and
the AI assistant's answers reflect the change on the very next message. No re-indexing
step, no vector database.

## Environment variables (set in Vercel → Project → Settings → Environment Variables)

- `ANTHROPIC_API_KEY` — required for the chatbot to actually answer questions. Without
  it, the chat UI works but replies with a friendly fallback message pointing to the
  Contact page.
- `ANTHROPIC_CHAT_MODEL` — optional, defaults to `claude-haiku-4-5-20251001`.
- `CRM_WEBHOOK_URL` — optional. Point it at a GoHighLevel (or any) inbound webhook URL
  and every Contact page submission POSTs there as JSON automatically. Until it's set,
  submissions are simply logged server-side — nothing is lost, no code change needed
  later.

## Local development

```bash
npm install
npm run dev
```

## Adding real content later

1. Real listings: add entries to `data/listings.ts`, drop photos under
   `public/listings/<slug>/`, remove the sample entry.
2. Real bio/contact/socials: fill in `data/site.ts`.
3. Real testimonials: add to `data/testimonials.ts`.
4. Push — Vercel auto-deploys.
