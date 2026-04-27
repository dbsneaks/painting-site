# Project Planning Template

Use this template at the start of any web project to think through key decisions upfront.

---

## 1. Project Overview

**Project Name:**  
**Purpose:** (What problem does this solve?)  
**Target Audience:**  
**Success Criteria:** (How will you know it's working?)

---

## 2. Content & Data

### What content will this site have?
- [ ] Static pages (about, contact, etc.)
- [ ] Dynamic collections (blog posts, products, portfolio items, etc.)
- [ ] User-generated content
- [ ] Media (images, videos, downloads)

### How will content be managed?

**Initial approach:**
- [ ] Hard-coded in HTML
- [ ] Data file (JSON, YAML, JS)
- [ ] CMS from day one
- [ ] Database

**Future approach (if different):**
- [ ] Will need a CMS eventually
- [ ] Will need user accounts/authentication
- [ ] Will need search functionality
- [ ] Will stay static

### Data format decision:
If using a data file, choose based on:
- **JSON (.json)**: ✅ CMS-compatible, ✅ Easy to parse, ✅ Widely supported
- **YAML (.yml)**: ✅ CMS-compatible, ✅ Human-readable, ⚠️ Less common
- **JavaScript (.js)**: ❌ Not CMS-compatible, ✅ Can include logic
- **Markdown (.md)**: ✅ CMS-compatible, ✅ Great for text-heavy content

**Decision:** [Your choice and why]

---

## 3. Technical Stack

### Frontend
**Framework/Library:**
- [ ] Vanilla HTML/CSS/JS (simplest, no build step)
- [ ] React/Vue/Svelte (component-based, more complex)
- [ ] Static site generator (Hugo, 11ty, Astro)

**Why this choice:**

**CSS Approach:**
- [ ] Plain CSS
- [ ] CSS framework (Tailwind, Bootstrap, etc.)
- [ ] CSS-in-JS

### Build Process
- [ ] No build step (static files)
- [ ] Build step required (npm, webpack, vite, etc.)

**Why:**

---

## 4. Hosting & Deployment

**Hosting Platform:**
- [ ] Vercel (free, auto-deploy, serverless functions)
- [ ] Netlify (free, auto-deploy, forms, functions)
- [ ] GitHub Pages (free, simple, static only)
- [ ] Traditional hosting (control, cost)

**Deployment Strategy:**
- [ ] Auto-deploy on push to main branch
- [ ] Manual deployment
- [ ] Continuous integration pipeline

**Domain:**
- [ ] Free subdomain (.vercel.app, .netlify.app)
- [ ] Custom domain (purchased where?)

---

## 5. Content Management Strategy

### Will editors need a CMS?
- [ ] Yes, from day one
- [ ] Maybe later
- [ ] No, technical team only

### If yes/maybe, which approach?

**Headless CMS options:**
- [ ] **Decap CMS** (free, GitHub-based, needs OAuth)
- [ ] **Tina CMS** (free tier, Git-based, better auth)
- [ ] **Sanity** (free tier, external hosting, powerful)
- [ ] **Contentful/Strapi** (more features, complexity)

**Key CMS requirements:**
- [ ] Multiple editors/users
- [ ] Image management
- [ ] Preview before publish
- [ ] Workflow/approvals
- [ ] Works offline

**Authentication needs:**
- [ ] GitHub OAuth (requires setup)
- [ ] Email/password
- [ ] SSO (Google, etc.)

---

## 6. Media & Assets

**Image hosting:**
- [ ] Committed to repo (simple, limited size)
- [ ] CDN (Cloudinary, Imgix) (optimized, costs)
- [ ] Self-hosted (control, bandwidth)

**Image optimization:**
- [ ] Manual (export from Photoshop, etc.)
- [ ] Automated (build-time optimization)
- [ ] CDN handles it

**Asset size considerations:**
- Max repo size: ~1GB recommended
- Expected number of images:
- Average image size:

---

## 7. Features & Functionality

### Core features (MVP):
- [ ] 
- [ ] 
- [ ] 

### Phase 2 features:
- [ ] 
- [ ] 

### Future considerations:
- [ ] Search
- [ ] Filtering/sorting
- [ ] User accounts
- [ ] Comments
- [ ] Forms/contact
- [ ] Analytics
- [ ] E-commerce
- [ ] Multi-language

---

## 8. Performance & SEO

**Performance targets:**
- [ ] Lighthouse score > 90
- [ ] Page load < 3 seconds
- [ ] Mobile-optimized

**SEO requirements:**
- [ ] Meta tags/Open Graph
- [ ] Sitemap
- [ ] Analytics (Google, Plausible, etc.)
- [ ] Schema markup

---

## 9. Browser & Device Support

**Target browsers:**
- [ ] Modern evergreen (Chrome, Firefox, Safari, Edge)
- [ ] IE11 support needed? (hopefully no)

**Device support:**
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] Specific breakpoints:

---

## 10. Timeline & Phases

**Phase 1 - MVP:** [Date]
- Core features
- Basic design
- Manual content management

**Phase 2 - Enhancement:** [Date]
- CMS integration
- Performance optimization
- Additional features

**Phase 3 - Growth:** [Date]
- Advanced features
- Scaling considerations

---

## 11. Risks & Unknowns

What could go wrong or need research?
- [ ] 
- [ ] 
- [ ] 

---

## 12. Decision Checklist

Before writing code, confirm:
- [ ] Data format supports future CMS integration (if needed)
- [ ] Hosting platform supports planned features
- [ ] Authentication strategy is clear (if needed)
- [ ] Image/asset strategy won't hit limits
- [ ] Tech stack matches team skills
- [ ] Deployment process is documented
- [ ] Performance targets are realistic

---

## Notes & References

[Space for links, research, design files, etc.]

---

**Last Updated:** [Date]  
**Next Review:** [Date]
