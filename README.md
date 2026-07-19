# M.A. Interiors & Exteriors - Luxury Design Studio Website

This is a premium, production-ready website built with Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP, and Prisma ORM for **M.A. Interiors & Exteriors**, located in Mira Road East, Maharashtra, India.

---

## 🌟 Architecture & Features

1. **Luxury Editorial Design**: Handcrafted aesthetics inspired by Apple & Aesop, featuring large whitespace, typography-driven structures (`Cormorant Garamond` & `Inter`), and premium styling palettes.
2. **Turnkey Metamorphosis Slider**: An interactive side-by-side Before/After slider to demonstrate on-site renovations and structural transformations.
3. **Smooth Scroll Experience**: Global Lenis smooth-scrolling integration aligned with custom-spring cursor followers to ensure a premium desktop feel.
4. **Three.js Particles Overlay**: Custom floating dust point elements generated natively on Canvas to add visual depth to the cinematic video hero.
5. **Secure Administrative CMS**: Dynamic CRUD tables for portfolio projects, design services, journal entries, and a inbox message reader secured by Auth.js credentials.
6. **Robust Server Actions**: Type-safe forms validated with Zod & React Hook Form, submitting inquiries to PostgreSQL database and triggering auto-reply acknowledgment emails via Nodemailer SMTP.

---

## 🛠️ Tech Stack & Key Libraries

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Animations**: GSAP, ScrollTrigger, Lenis, React Three Fiber, Three.js
- **Database & Auth**: Prisma ORM, PostgreSQL, NextAuth/Auth.js v5 (Beta)
- **Communications & Services**: Cloudinary (Media uploads), Nodemailer (SMTP Alerts), Canvas Confetti (Inquiry animations)

---

## 🚀 Setup & Launch Checklist

### 1. Configure Environment Variables
Verify or edit `.env` variables located at the project root:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
NEXTAUTH_SECRET="8afb55f1fde1885f269cd9c766e4a29a07172551a3a41bc789b5c2c77174e92a"
NEXTAUTH_URL="http://localhost:3000"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 2. Run Database Container
Launch the preconfigured PostgreSQL server:
```bash
docker-compose up -d
```

### 3. Generate Models & Seed Database
Build the database tables and populate sample luxury projects/services:
```bash
npx prisma db push
npx prisma db seed
```

*Note: Default seeded Admin credentials are:*
- **Email**: `admin@mainteriors.in`
- **Password**: `admin123`

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Workspace Directory Map

- `/app` - Web pages and server APIs
- `/components` - Common buttons, sliders, GSAP timelines, and canvas overlays
- `/actions` - Server Actions handling contact notifications and dashboard operations
- `/lib` - Database client, authentication configurations, and Nodemailer configs
- `/types` - NextAuth type extensions
- `/prisma` - Schemas, migrations, and seed files
- `/public` - Royalty free architectural photography and video clips
