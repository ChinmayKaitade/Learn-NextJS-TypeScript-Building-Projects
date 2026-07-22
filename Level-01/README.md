# 🚀 Introduction to Next.js

**Next.js** is an open-source, React-based framework designed for building high-performance, SEO-friendly, and production-ready web applications. While standard React renders everything on the client browser, Next.js moves the heavy lifting—like rendering and data fetching—to the server.

> **In short:** It's React, but upgraded with server-side capabilities, file-system routing, automated image/font optimization, and built-in full-stack API capabilities.

---

## 🔑 Core Features & Rendering Modes

Next.js gives you flexibility by letting you choose the right rendering strategy for every page in your application:

- **Server-Side Rendering (SSR):** Generates HTML dynamically on the server for every incoming request. Perfect for real-time dashboards or social feeds where data changes frequently.
- **Static Site Generation (SSG):** Pre-renders pages at build time into static HTML files. Best for blogs, documentation, or landing pages that require fast load times and strong SEO performance.
- **Incremental Static Regeneration (ISR):** Allows you to update static pages in the background without rebuilding the entire application.
- **File-System Routing (App Router):** Layouts, routes, and nested pages are created simply by organizing folders inside the `app/` directory.
- **Built-in Full-Stack APIs:** Write backend endpoints directly inside `route.ts` handlers or execute database actions securely from your components using Server Actions.

---

## 🛠️ Getting Started: Creating Your First App

To initialize a new Next.js project with the latest features, run the official CLI command in your terminal:

```bash
npx create-next-app@latest

```

### ⚙️ Recommended Setup Options

When prompted by the terminal setup wizard, select these standard settings:

```text
✔ What is your project named? my-next-app
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use `src/` directory? No
✔ Would you like to use App Router? (recommended) Yes
✔ Would you like to customize the default import alias (@/*)? Yes

```

---

## 📂 Understanding the App Router Directory

Once created, open your project folder. The App Router architecture revolves around this core layout:

```text
my-next-app/
├── app/
│   ├── layout.tsx      # Global UI shell (navbar, footer, global providers)
│   ├── page.tsx        # Home page component (renders at '/')
│   ├── globals.css     # Tailwind and global CSS styles
│   └── about/
│       └── page.tsx    # Nested route (renders at '/about')
├── public/             # Static assets (images, SVGs, favicons)
├── package.json        # Dependencies & script commands
└── next.config.ts      # Project settings & feature flag configurations

```

---

## 🚀 Running Your Development Server

To launch your application locally, navigate into your directory and start the local dev environment:

```bash
cd my-next-app
npm run dev

```

Open `http://localhost:3000` in your browser to view your live Next.js application!
