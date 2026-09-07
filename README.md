# techcadd Mohali

Marketing website for **techcadd Computer Education, Mohali** — built with Next.js 16
(App Router), Tailwind CSS v4, GSAP + ScrollTrigger and Lenis smooth scrolling.

The colour system, typography and section rhythm follow the techcadd Jalandhar site:
deep navy (`#060e2b` → `#0b1a4d`), brand blue (`#1c53d1` / `#2f7dff`), cyan glow
(`#00d4ff`) and a gold accent (`#ffd23f`), set in Host Grotesk + Inter.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npx eslint src   # lint
```

## Database (MySQL)

Every form on the site writes one row into a single `enquiries` table.

### One-time setup

1. **Create `.env.local`** at the repo root (copy `.env.example`) and fill in the
   same credentials you use in MySQL Workbench:

   ```
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your-password
   MYSQL_DATABASE=techcadd_mohali
   CAPTCHA_SECRET=any-long-random-string
   ```

2. **Create the database and table** — either run

   ```bash
   npm run db:setup
   ```

   or open `db/schema.sql` in MySQL Workbench and execute it. Both do the same
   thing and both are safe to re-run.

3. **Start the site** with `npm run dev` and submit any form.

### Checking it works

```bash
npm run dev          # terminal 1
npm run forms:test   # terminal 2 — posts one enquiry per form, reads the rows back
```

`forms:test` deletes its own test rows afterwards; pass `--keep` to leave them.

In MySQL Workbench:

```sql
SELECT * FROM techcadd_mohali.enquiries ORDER BY id DESC;
```

### Where the data goes

| Form | Endpoint | `form_type` | `source` |
| --- | --- | --- | --- |
| Contact page form | `/api/enquiry` | `enquiry` | Contact page form |
| Enquiry modal (site-wide) | `/api/enquiry` | `enquiry` | Enquiry modal |
| Home CTA callback bar | `/api/enquiry` | `enquiry` | Home CTA — callback request |
| Career Track tool bar | `/api/enquiry` | `enquiry` | Career Track tool — callback bar |
| Training Matcher modal | `/api/enquiry` | `enquiry` | Training Matcher tool |
| Course page enquiry forms | `/api/course-enquiry` | `course-enquiry` | course-page |

Both endpoints validate first (phone format, email format, honeypot, and a signed
captcha on the course forms), then insert through `src/lib/leads.ts`. If MySQL is
unreachable the route answers 503, the form shows "please call or WhatsApp us
instead", and the full payload is written to the server log so the lead can still
be recovered.

Columns worth knowing: `status` (`new` / `contacted` / `enrolled` / `closed`) and
`notes` are there for the front desk to update as they work through the list;
`page_url`, `referrer`, `ip_address` and `user_agent` are captured automatically.

The table definition lives in three places that must stay in step:
`db/schema.sql` (Workbench), `src/lib/db.ts` (created on demand by the app) and
`scripts/db-setup.mjs`.

## Structure

```
src/
  app/
    layout.tsx              Root layout: fonts, metadata, JSON-LD, chrome
    page.tsx                Home
    about/ training/ placements/ contact/
    courses/                Listing + [slug] detail (16 statically generated pages)
    api/enquiry/route.ts    Enquiry endpoint (validates + logs; see below)
    privacy-policy/ terms/  Legal pages
  components/
    anim/Animator.tsx       Global GSAP + Lenis driver (see "Animation" below)
    layout/                 Navbar, Footer, FloatingActions
    home/                   Home page sections (reused on inner pages)
    courses/                CourseExplorer (filter + search), Curriculum accordion
    contact/ContactForm.tsx
    ui/                     Icon, Logo, SectionHeading, CourseCard, PageHero, LegalPage
  lib/
    site.ts                 Contact details, navigation
    courses.ts              Courses, categories, programmes, FAQs, testimonials
    gsap.ts                 Plugin registration + reduced-motion helper
```

## Animation

`components/anim/Animator.tsx` is a single global driver, so page sections stay
**server components** and only declare intent with data attributes:

| Attribute | Effect |
|---|---|
| `data-anim="up \| fade \| left \| right \| scale \| blur \| words \| mask"` | Scroll-triggered reveal. `words` masks and staggers each word (element children keep their markup and colour). |
| `data-anim-stagger` | Animate the element's direct children in sequence instead of the element itself. |
| `data-anim-delay="0.15"` | Delay in seconds. |
| `data-parallax="-80"` | Translate Y across the scroll range (scrubbed). |
| `data-count="12450"` | Count up to this number when scrolled into view. |
| `data-underline` | Wipe a heading rule in from the left. |
| `data-progress="98"` | Grow a bar to this percentage. |

Sections with bespoke timelines (`Hero`, `Process`, `CourseExplorer`) run their own
`gsap.context` and are the only client components among the sections.

Two conventions worth keeping:

- **Always `fromTo`, never `from`.** A bare `from()` records the element's *current*
  value as the end state, so if an effect re-runs while a tween is mid-flight (React
  strict mode, route changes) the element sticks at its start value.
- Everything is wrapped in `gsap.context()` and reverted on cleanup.

`prefers-reduced-motion: reduce` disables Lenis and every tween, and the CSS fallback
in `globals.css` makes all `[data-anim]` elements visible — content is never hidden
behind an animation that will not run.

## Content

All copy and data live in `src/lib/site.ts` and `src/lib/courses.ts` — courses,
categories, training programmes, FAQs, testimonials, stats and contact details.
Editing those two files updates every page, including the statically generated
course detail routes and the navigation mega-menu.

## Before going live

- **Enquiry storage** — forms write to MySQL (see **Database** above). Set the
  `MYSQL_*` variables on the production host as well, and add an email/CRM
  notification in `src/lib/leads.ts` if the desk should be alerted rather than
  polling the table.
- **`CAPTCHA_SECRET`** must be set in production, or the course-page captcha falls
  back to a known development key.
- **Testimonials** are written as representative examples, not verified quotes.
  Replace them with real, attributable reviews before publishing.
- **Stats** (12,450+ students, 450+ partners, 98% placement, 4.9★/556 reviews) come
  from techcadd's public listings — confirm the Mohali-specific figures.
- **Favicon / OG image** — `src/app/favicon.ico` is still the Next.js default, and no
  Open Graph image is set.
- **Social links** in `site.ts` point at the bare platform URLs.
- **Analytics** are not installed.
