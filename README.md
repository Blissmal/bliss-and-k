# Bliss & K Developers — Official Website

> **Innovative Technology, Reliable Solutions.**

Production-ready Next.js 15 agency website for Bliss & K Developers, built with a dark glassmorphism design system matching the Blissmal SaaS platform aesthetic.

---

## Tech Stack

| Layer         | Technology                                              |
|---------------|---------------------------------------------------------|
| Framework     | [Next.js 15](https://nextjs.org) (App Router)           |
| Language      | TypeScript 5                                            |
| Styling       | Tailwind CSS 3 + CSS custom properties                  |
| Animations    | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger  |
| Motion        | [Framer Motion 12](https://framer.motion)               |
| Icons         | [Lucide React](https://lucide.dev)                      |
| Font          | Inter (via `next/font/google`)                          |

---

## Pages

| Route       | Description                                             |
|-------------|---------------------------------------------------------|
| `/`         | Landing — Hero, Stats, Services, How We Work, Testimonials, FAQ, CTA |
| `/services` | Full grid of all 10 services with detailed descriptions  |
| `/about`    | Team (Beth + K), company story, values                  |
| `/faq`      | Tabbed FAQ with AnimatePresence accordion               |
| `/contact`  | Project enquiry form with budget selector               |
| `/privacy`  | Privacy policy                                          |
| `/terms`    | Terms of service                                        |

---

## Animations

### GSAP
- **Hero text** — staggered word reveal with `y: 90` + `skewY` on page load
- **Stats counters** — number count-up triggered by ScrollTrigger
- **Feature cards** — stagger fade-in on scroll into view

### Framer Motion
- **Page transitions** — smooth `opacity + y` via `template.tsx`
- **Hero visual** — continuous floating (`animate={{ y: [0,-10,0] }}`)
- **Floating stat pills** — scale-in on mount
- **FAQ accordion** — `AnimatePresence` height animation on open/close
- **Testimonial cards** — `whileInView` stagger reveal
- **Service card hover** — `y: -4` lift with border glow
- **FAQ category tabs** — shared `layoutId` background transition
- **Mobile nav** — slide-down height animation

---

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Design tokens, base styles, utilities
│   ├── layout.tsx          # Root layout (Inter font, Navbar, Footer, Blobs)
│   ├── template.tsx        # Framer Motion page transitions
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # Custom 404
│   ├── services/page.tsx
│   ├── about/page.tsx
│   ├── faq/page.tsx        # "use client" — tabs + accordion
│   ├── contact/page.tsx    # "use client" — form with validation state
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── AmbientBlobs.tsx    # Fixed background radial gradients
│   ├── Navbar.tsx          # Scroll-aware glass nav + mobile menu
│   ├── Footer.tsx
│   ├── PageHeader.tsx      # Shared inner-page header with breadcrumbs
│   ├── home/
│   │   ├── HeroSection.tsx        # GSAP text reveal + browser mockup
│   │   ├── StatsSection.tsx       # GSAP counter animation
│   │   ├── FeaturesSection.tsx    # GSAP stagger + FM hover
│   │   ├── HowSection.tsx         # 3-step process
│   │   ├── TestimonialsSection.tsx
│   │   ├── FaqSection.tsx         # Home page FAQ (5 items)
│   │   └── CTASection.tsx
│   └── ui/
│       ├── SectionBadge.tsx       # Small section label
│       ├── AnimatedSection.tsx    # Framer Motion scroll-reveal wrapper
│       └── FaqAccordion.tsx       # AnimatePresence accordion
└── lib/
    └── data.ts             # All content (services, FAQs, team, stats, testimonials)
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## Customisation

### Update contact info
Edit `src/lib/data.ts` and `src/components/Footer.tsx`.
The phone number `0743 942 007` appears in: `Navbar.tsx`, `Footer.tsx`, `HeroSection.tsx`, `CTASection.tsx`, `FaqSection.tsx`, `contact/page.tsx`.

### Update team members
Edit the `TEAM` array in `src/lib/data.ts`.

### Add/edit services
Edit the `SERVICES` array in `src/lib/data.ts`. Each service has: `icon`, `title`, `shortDesc`, `fullDesc`, `color`, `bg`, `tags`.

### Add/edit FAQs
Edit `FAQS_HOME` (5 items for home page) and `FAQS_ALL` (4 categories for /faq) in `src/lib/data.ts`.

### Brand colours
All colours are CSS custom properties in `src/app/globals.css` and Tailwind tokens in `tailwind.config.ts`. The primary brand colours are:
- **Blue**: `#3C50E0`
- **Purple**: `#7C3AED`
- **Green** (M-Pesa / success): `#22AD5C`
- **Orange**: `#F97316`

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Or connect the repo on [vercel.com](https://vercel.com) for automatic deployments.

### Other platforms
Works on any platform supporting Next.js: Railway, Render, DigitalOcean App Platform, or a VPS with Node.js 20+.

---

## Developed by

**Bethuel Maluti (Blissmal)**  
Portfolio: [portfolio.blissmal.store](https://portfolio.blissmal.store)  
GitHub: [@blissmal](https://github.com/blissmal)

---

*© 2026 Bliss & K Developers. All rights reserved.*
