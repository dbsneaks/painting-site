# Architecture Decisions

A record of the key choices made building this site, and why.

---

## Stack: Vanilla HTML/CSS/JS, no framework

**Decision:** No React, Vue, Next.js, or build toolchain. Plain `.html`, `.css`, and `.js` files served statically.

**Why:** The site is a portfolio of paintings — mostly images with minimal interactivity. A framework would add complexity and a build step with no meaningful benefit. The entire site loads fast with zero JavaScript dependencies at runtime (except Google Fonts and the CMS admin, which are opt-in).

**Trade-off:** Adding a CMS later is harder because there's no module system or data layer to hook into.

---

## Data: paintings.js (JavaScript array)

**Decision:** All painting data lives in a single `const paintings = [...]` declaration in `paintings.js`.

**Why:** Easy to edit by hand, no tooling required, loads as a plain `<script>` tag. Each entry has: `id`, `title`, `theme`, `image`, `images[]`, `sold`, `size`, `medium`, `price`, `blurb`, `description`.

**Trade-off:** Not readable by most CMSs, which expect JSON, YAML, or Markdown. If a CMS is added later, this file needs to be converted or replaced. See `RETROSPECTIVE.md`.

---

## Routing: Query-string based, single detail page

**Decision:** All painting detail pages use `detail.html?id=X`. There is no server-side routing or separate HTML file per painting.

**Why:** Static hosting (no server). `detail.js` reads `?id=` from the URL, looks up the painting in `paintings.js`, and renders the page client-side.

**Trade-off:** Not great for SEO — each painting has the same `<title>` and OG tags at the HTML level (though `detail.js` does update `document.title` at runtime). Deep links work, but social share previews show the generic site OG image.

---

## Layout: CSS Grid, 12-column, no utility framework

**Decision:** Custom 12-column grid using CSS Grid, `32px` gutters, `32px` margins. No Tailwind, Bootstrap, or similar.

**Why:** Full control over spacing and breakpoints. The design is intentional and doesn't map to a utility framework's defaults.

**Breakpoints:**
- `1200px+` — 12-column two-up layout on detail pages
- `1023px` and below — 2-up painting grid (6 of 12 cols each)
- `900px` and below — detail page collapses to single column, carousel activates
- `767px` and below — 2-up painting grid continues, 16px margins
- `640px` and below — mobile header/nav adjustments

---

## Images: WebP, served from /images/paintings/

**Decision:** All painting images are `.webp` format, stored in `images/paintings/`. Thumbnails and full-res are the same file.

**Why:** WebP gives good compression for photographic content. No CDN or image optimization pipeline — the images are hand-prepared before upload.

---

## Page transitions: CSS opacity fade via sessionStorage flag

**Decision:** A custom `transitions.js` handles fade-out on link click and fade-in on page load. Uses `sessionStorage` to pass state across the navigation boundary. Duration: 250ms.

**Why:** Gives the site a polished feel without the View Transitions API (which has inconsistent browser support and complex bfcache interactions). The sessionStorage flag approach is reliable across all browsers.

**Notable quirk:** Browser back/forward uses bfcache, which freezes the page at `opacity: 0`. A `pageshow` listener with `event.persisted` detects this and fades back in.

---

## Custom cursor: Canvas-free, rAF loop

**Decision:** The "VIEW" cursor on the home page grid is a plain `<div>` animated via `requestAnimationFrame`. It morphs/stretches along the direction of movement using `scaleX`/`scaleY` transforms.

**Why:** No canvas, no library. The cursor only appears over `.grid-item` elements and fades in/out with asymmetric timing (slow in, fast out).

---

## Hosting: Vercel

**Decision:** Deployed on Vercel via GitHub integration.

**Why:** Free tier, automatic deploys on push to `main`, supports serverless functions (used for the CMS OAuth endpoint).

---

## CMS: Decap CMS (admin-only, not fully operational)

**Decision:** A Decap CMS interface lives at `/admin/`. It is not the primary editing workflow.

**Status:** Partially set up. The `paintings.js` data format is incompatible with Decap's file widget expectations (it reads JSON/YAML, not a JS module). The OAuth flow via `/api/auth.js` (Vercel serverless function) is in place but untested end-to-end.

**Primary editing workflow:** Direct editing of `paintings.js` by hand.

---

## Fonts: Google Fonts — Gabarito

**Decision:** Single font family: Gabarito (weights 400 and 600), loaded from Google Fonts.

**Why:** Chosen for the design. Loaded via `<link rel="preconnect">` + stylesheet for performance.
