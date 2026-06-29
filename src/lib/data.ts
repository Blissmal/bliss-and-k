import {
  Code2, Monitor, CreditCard, ShoppingCart, Palette,
  Database, Settings, Zap, Globe, Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  bg: string;
  tags: string[];
}

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    shortDesc: "Modern, responsive websites built with cutting-edge frameworks.",
    fullDesc: "From marketing landing pages to feature-rich business sites, we architect and ship responsive, performant websites. Every project is mobile-first, SEO-ready, and built for speed.",
    color: "#3C50E0",
    bg: "rgba(60,80,224,0.1)",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
  },
  {
    icon: Monitor,
    title: "Web App Development",
    shortDesc: "Full-stack applications built to scale with your business.",
    fullDesc: "Complex workflows, custom dashboards, internal tools, or customer-facing SaaS — we architect and build full-stack applications that handle real load and grow with your business.",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.1)",
    tags: ["Next.js", "Node.js", "PostgreSQL", "APIs"],
  },
  {
    icon: CreditCard,
    title: "POS Systems",
    shortDesc: "Point-of-sale tailored for Kenyan business environments.",
    fullDesc: "Fast, offline-capable point-of-sale systems designed for restaurants, retail shops, and service businesses. Includes inventory, sales tracking, receipts, and M-Pesa integration.",
    color: "#F97316",
    bg: "rgba(249,115,22,0.1)",
    tags: ["Desktop", "Web", "Offline-Ready", "M-Pesa"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    shortDesc: "Complete online stores with M-Pesa checkout built in.",
    fullDesc: "Multi-tenant and single-tenant e-commerce platforms with M-Pesa STK Push, inventory management, order tracking, coupon systems, and admin dashboards — built and deployed end-to-end.",
    color: "#22AD5C",
    bg: "rgba(34,173,92,0.1)",
    tags: ["M-Pesa", "Cart", "Admin Dashboard", "Orders"],
  },
  {
    icon: Palette,
    title: "Graphic & UI/UX Design",
    shortDesc: "Brand identities and interfaces that convert visitors.",
    fullDesc: "From logo creation to full product design — we craft visual identities and user interfaces that build trust, guide users naturally, and turn visitors into customers.",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.1)",
    tags: ["Figma", "Branding", "Wireframes", "Prototyping"],
  },
  {
    icon: Database,
    title: "Database Development",
    shortDesc: "Optimised data architecture for any scale.",
    fullDesc: "Schema design, query optimisation, migrations, backups, and managed database services. We work with PostgreSQL, MySQL, MongoDB, and more — choosing the right tool for your data model.",
    color: "#0EA5E9",
    bg: "rgba(14,165,233,0.1)",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
  },
  {
    icon: Settings,
    title: "Software Maintenance",
    shortDesc: "Ongoing support to keep your systems running smoothly.",
    fullDesc: "Security patches, dependency updates, performance monitoring, and bug fixes on a retainer basis. We keep your production systems healthy so you can focus on your business.",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    tags: ["Support", "Updates", "Monitoring", "SLA"],
  },
  {
    icon: Zap,
    title: "API Development",
    shortDesc: "RESTful and GraphQL APIs, third-party integrations.",
    fullDesc: "Custom REST and GraphQL APIs, M-Pesa Daraja (STK Push, C2B, B2C), Safaricom integrations, payment gateways, SMS providers, and microservice architectures.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    tags: ["REST", "GraphQL", "Daraja", "Webhooks"],
  },
  {
    icon: Globe,
    title: "Domain & Web Hosting",
    shortDesc: "Managed hosting with 99.9% uptime and daily backups.",
    fullDesc: "Domain registration, SSL certificates, managed cloud hosting with daily backups, uptime monitoring, and CDN configuration. We handle the infrastructure so you don't have to.",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
    tags: ["cPanel", "VPS", "SSL", "CDN"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    shortDesc: "Data-driven SEO that builds lasting organic traffic.",
    fullDesc: "Technical SEO audits, on-page optimisation, keyword strategy, content planning, and link building. We help Kenyan businesses rank and be found by the right customers.",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    tags: ["Technical SEO", "Content", "Analytics", "Keywords"],
  },
];

export const HOW_STEPS = [
  {
    step: "01",
    title: "Discovery call",
    desc: "We start with a conversation — no forms, no bots. You tell us what you need, we ask the right questions. You leave with a clear scope and a realistic timeline.",
    icon: "💬",
    color: "#3C50E0",
  },
  {
    step: "02",
    title: "Design & build",
    desc: "We design and develop in close collaboration. You see progress at every milestone, give feedback early, and always know exactly where your project stands.",
    icon: "⚡",
    color: "#7C3AED",
  },
  {
    step: "03",
    title: "Launch & handover",
    desc: "We deploy, test, and hand over everything — source code, documentation, training, and a 30-day warranty. Your project, fully yours.",
    icon: "🚀",
    color: "#22AD5C",
  },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Projects delivered", color: "#3C50E0" },
  { value: 30, suffix: "+", label: "Satisfied clients", color: "#7C3AED" },
  { value: 3,  suffix: "+", label: "Years of active work", color: "#F97316" },
  { value: 10, suffix: "",  label: "Service categories", color: "#22AD5C" },
];

export const FAQS_HOME = [
  {
    q: "How much does a website cost?",
    a: "A basic business website starts from KES 15,000. Complex web apps are quoted after a discovery call. We're transparent about pricing — you'll always see a full breakdown before we start.",
  },
  {
    q: "Do you integrate M-Pesa?",
    a: "Yes. We've built M-Pesa STK Push, C2B, and B2C flows for multiple clients using the Safaricom Daraja API. M-Pesa integration is available in any web or app project.",
  },
  {
    q: "How long does a project take?",
    a: "A standard business website: 1–2 weeks. Web apps and e-commerce: 3–8 weeks. You'll get a clear written timeline before any work begins — no surprises.",
  },
  {
    q: "Will I own the code after delivery?",
    a: "Yes, completely. Full payment = full ownership of all source code, design files, and database. No lock-ins, no recurring license fees. It's yours.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes — monthly maintenance packages cover updates, backups, security patches, and minor changes. We also provide a 30-day warranty on all delivered work.",
  },
];

export const FAQS_ALL = [
  {
    category: "Services & pricing",
    items: [
      { q: "How much does a website cost?", a: "A basic business website starts from KES 15,000. E-commerce stores start from KES 40,000. Complex web apps are quoted individually after a discovery session. We provide a full, itemised breakdown before any work begins." },
      { q: "Do you offer payment plans?", a: "Yes — 50% deposit upfront, 50% on delivery. For larger projects (KES 100k+), we can structure milestone-based payments. We accept M-Pesa and bank transfers." },
      { q: "What's included in a web development package?", a: "Design, development, mobile responsiveness, basic SEO setup, deployment, and a handover session with documentation. We also offer content writing as an add-on service." },
      { q: "Can you work with my existing website?", a: "Absolutely — redesigns, bug fixes, feature additions, and platform migrations are all within scope. Share the details and we'll give you an honest assessment and quote." },
      { q: "Do you build mobile apps?", a: "Yes — cross-platform mobile apps with React Native. Mobile projects are scoped and quoted separately. Let us know your requirements for a detailed proposal." },
    ],
  },
  {
    category: "Project process",
    items: [
      { q: "How do you manage projects?", a: "We work in clearly defined stages: discovery → design → development → testing → delivery. You receive updates at every milestone and can give feedback before we move to the next stage." },
      { q: "What do I need to provide to get started?", a: "A clear brief, your brand assets (logo and colors if you have them), any content you want on the site, and your target audience. We can help create content at an additional cost." },
      { q: "How do revisions work?", a: "Every project includes up to 3 revision rounds. Revisions must fall within the original agreed scope. Out-of-scope changes are quoted separately before being carried out." },
      { q: "What happens after delivery?", a: "You receive complete source code, deployment details, a documentation pack, and a walkthrough session. We then provide a 30-day warranty for any bugs in our code." },
    ],
  },
  {
    category: "Technical & support",
    items: [
      { q: "Do you integrate M-Pesa?", a: "Yes. We've implemented the Safaricom Daraja API across multiple client projects — STK Push, C2B, B2C, and real-time payment confirmation. M-Pesa is available for any web or app project." },
      { q: "What tech stack do you use?", a: "Primarily Next.js, TypeScript, Node.js, PostgreSQL, and Prisma for web projects. We also work with React Native for mobile, and Laravel/PHP for legacy projects. We choose the best tool for each job." },
      { q: "Do you offer hosting?", a: "Yes — managed hosting with domain, SSL, daily backups, and uptime monitoring starting from KES 3,000/year. We can also advise on self-managed hosting if you prefer full control." },
      { q: "What's covered in the 30-day warranty?", a: "Any bugs or issues that arise from our own code within 30 days of delivery are fixed at no charge. This excludes issues caused by third-party services, hosting problems, or client-side modifications." },
    ],
  },
  {
    category: "General",
    items: [
      { q: "Where are you based?", a: "We're based in Kenya and serve clients across the country and internationally. We work fully remotely and can arrange in-person meetings for Nairobi and major towns when needed." },
      { q: "How do I contact you?", a: "Call or WhatsApp 0743 942 007 (Mon–Sat, 8am–8pm EAT). We typically respond within 2–4 hours during business hours." },
      { q: "Do you sign NDAs?", a: "Yes — we take confidentiality seriously and are happy to sign an NDA before any project discussions. Just ask and we'll send one over." },
      { q: "Can I see examples of your work?", a: "Yes. The lead developer's portfolio is at portfolio.blissmal.store. We can also share relevant project examples during a discovery call." },
    ],
  },
];

export const TEAM = [
  {
    initials: "BM",
    name: "Bethuel Maluti",
    role: "Lead Developer",
    color: "#3C50E0",
    bg: "rgba(60,80,224,0.12)",
    desc: "Full-stack developer specialising in Next.js, TypeScript, Node.js, and PostgreSQL. Builds everything from pixel-perfect frontends to scalable backend systems, APIs, and cloud deployments.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "React Native"],
    handle: "portfolio.blissmal.store",
    href: "https://portfolio.blissmal.store",
    social: "@blissmal",
  },
  {
    initials: "K",
    name: "K — Business Lead",
    role: "Client Relations & Contracts",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.12)",
    desc: "Handles all client engagements, project scoping, contracts, pricing negotiations, and business development. Your first point of contact — ensuring every project starts with clarity.",
    tags: ["Client Relations", "Project Scoping", "Contracts", "Business Dev"],
    handle: "0743 942 007",
    href: "tel:0743942007",
    social: "WhatsApp",
  },
];

export const TESTIMONIALS = [
  {
    name: "Amina W.",
    role: "Restaurant Owner, Nairobi",
    quote: "Bliss & K delivered our website and POS system in under two weeks. The M-Pesa integration just works — no headaches, no back-and-forth. Best decision we made.",
    avatar: "AW",
    color: "#3C50E0",
  },
  {
    name: "Brian K.",
    role: "E-commerce Retailer, Mombasa",
    quote: "They built our full e-commerce store from scratch. Clean code, proper documentation, and they actually explained how everything works. Now we manage it ourselves.",
    avatar: "BK",
    color: "#22AD5C",
  },
  {
    name: "Cynthia M.",
    role: "Skincare Brand, Kisumu",
    quote: "Professional, fast, and they genuinely care about the outcome. The SEO work they did moved us to page one for our main keyword in under 3 months.",
    avatar: "CM",
    color: "#7C3AED",
  },
];
