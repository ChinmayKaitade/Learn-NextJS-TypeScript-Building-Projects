# 📂 Next.js App Router: File-System Routing Demystified

In the Next.js App Router, routing is completely driven by your file directory structure. Every folder inside the `app/` directory represents a **Route Segment**, and every route segment maps directly to a URL path segment.

To make a route publicly accessible, a folder **must** contain a `page.tsx` (or `page.js`) file.

---

## 🧭 Route Types at a Glance

```text
app/
├── page.tsx                    # Renders at '/'
├── about/
│   └── page.tsx                # Renders at '/about' (Nested Route)
├── blog/
│   └── [slug]/
│       └── page.tsx            # Renders at '/blog/hello-world' (Dynamic Route)
├── shop/
│   └── [...slug]/
│       └── page.tsx            # Renders at '/shop/a/b/c' (Catch-All)
└── docs/
    └── [[...slug]]/
        └── page.tsx            # Renders at '/docs', '/docs/a', '/docs/a/b' (Optional Catch-All)

```

---

## 🎯 1. Dynamic Route Segments (`[folderName]`)

When you don't know the exact path segment name at build time (e.g., blog post slugs or product IDs), wrap the folder name in single square brackets: `[slug]`.

### 💻 Reading Parameters (`app/blog/[slug]/page.tsx`)

In modern Next.js (Next.js 15+), the `params` prop is an **asynchronous Promise**. You must `await` `params` before accessing its properties.

```tsx
// app/blog/[slug]/page.tsx

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  // ⚡ Must await params in modern App Router
  const { slug } = await params;

  return (
    <article className="p-8">
      <h1 className="text-3xl font-bold">Viewing Post: {slug}</h1>
    </article>
  );
}
```

---

## 🎣 2. Catch-All Segments (`[...folderName]`)

Catch-All routes extend dynamic segments to match **all subsequent nested path segments**. Create them by adding an ellipsis (`...`) inside single brackets: `[...slug]`.

- **Folder Path:** `app/shop/[...slug]/page.tsx`
- **Matches:**
- `/shop/clothes` $\rightarrow$ `params.slug = ['clothes']`
- `/shop/clothes/tops` $\rightarrow$ `params.slug = ['clothes', 'tops']`
- `/shop/clothes/tops/t-shirts` $\rightarrow$ `params.slug = ['clothes', 'tops', 't-shirts']`

- 🛑 **Does NOT Match:** `/shop` (Triggers a 404 unless handled elsewhere).

```tsx
// app/shop/[...slug]/page.tsx

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function ShopCategory({ params }: Props) {
  const { slug } = await params; // Array of path segments

  return (
    <div className="p-8">
      <p>Breadcrumbs: Shop &gt; {slug.join(" > ")}</p>
    </div>
  );
}
```

---

## 🔓 3. Optional Catch-All Segments (`[[...folderName]]`)

Optional Catch-All routes work exactly like standard Catch-Alls, but with one key upgrade: **the base route without parameters is also matched**. Create them using double square brackets: `[[...slug]]`.

- **Folder Path:** `app/docs/[[...slug]]/page.tsx`
- **Matches:**
- `/docs` $\rightarrow$ `params.slug = undefined` _(Included!)_
- `/docs/getting-started` $\rightarrow$ `params.slug = ['getting-started']`
- `/docs/api/v1/endpoints` $\rightarrow$ `params.slug = ['api', 'v1', 'endpoints']`

```tsx
// app/docs/[[...slug]]/page.tsx

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function Documentation({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return <div className="p-8">Welcome to the Main Documentation Hub 📖</div>;
  }

  return (
    <div className="p-8">
      <h1>Section: {slug.join(" / ")}</h1>
    </div>
  );
}
```

---

## 📁 4. Route Groups (`(folderName)`)

Route Groups allow you to organize route files and layouts logically **without affecting the URL path structure**. Create a Route Group by wrapping a folder's name in parentheses: `(folderName)`.

### 🌟 Primary Use Cases

1. **Organizational Isolation:** Group related routes (e.g., marketing pages vs. dashboard routes) without adding redundant prefix slugs to the URL.
2. **Multiple Layouts:** Apply a custom `layout.tsx` to a specific subset of routes without sharing it across the entire root level.

```text
app/
├── (marketing)/           # Folder name in () is omitted from URL!
│   ├── layout.tsx         # Marketing layout (Navbar + Footer)
│   ├── about/
│   │   └── page.tsx       # Renders at '/about'
│   └── contact/
│       └── page.tsx       # Renders at '/contact'
│
└── (dashboard)/           # Omitted from URL!
    ├── layout.tsx         # Dashboard layout (Sidebar + User Menu)
    └── analytics/
        └── page.tsx       # Renders at '/analytics'

```

---

# 🔀 Parallel Routes in Next.js

**Parallel Routes** allow you to simultaneously or conditionally render one or more pages within the exact same layout. They are perfect for complex, dynamic interfaces like dashboards, split views, or social feeds where different sections have independent data streams, loading states, and error boundaries.

---

## 🎰 Slots: The `@folder` Convention

Parallel routes are created using named **slots**. Slots are defined using the **`@folder`** naming convention.

Slots are **not** included in the URL structure. A folder named `@analytics` renders at the same URL path as its parent directory, but is passed directly into the parent `layout.tsx` as an explicit React prop.

### 📂 Directory Architecture

```text
app/
└── dashboard/
    ├── layout.tsx         # Receives @team, @analytics, and children props
    ├── page.tsx           # Renders as the default 'children' prop
    ├── @team/
    │   └── page.tsx       # Team slot view
    └── @analytics/
        └── page.tsx       # Analytics slot view

```

---

## 💻 Implementation Example

### Step 1: Define the Slot Components

```tsx
// app/dashboard/@analytics/page.tsx
export default async function AnalyticsSlot() {
  // ⚡ Each slot can fetch its own data independently
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white">
      <h2 className="text-xl font-bold mb-2">📊 Real-Time Analytics</h2>
      <p className="text-slate-400 text-sm">Active Visitors: 1,420</p>
    </div>
  );
}
```

```tsx
// app/dashboard/@team/page.tsx
export default async function TeamSlot() {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white">
      <h2 className="text-xl font-bold mb-2">👥 Team Members</h2>
      <p className="text-slate-400 text-sm">Active Engineers: 8 online</p>
    </div>
  );
}
```

### Step 2: Inject Slots into the Parent Layout

Pass the slots as props alongside the standard `children` prop inside `app/dashboard/layout.tsx`:

```tsx
// app/dashboard/layout.tsx
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  analytics: React.ReactNode; // 👈 Maps to @analytics
  team: React.ReactNode; // 👈 Maps to @team
}

export default function DashboardLayout({
  children,
  analytics,
  team,
}: DashboardLayoutProps) {
  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* Primary Page Content */}
      <main>{children}</main>

      {/* Render Slots Simultaneously in a Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  );
}
```

---

## 🏆 Key Architectural Benefits

- **Independent Streaming & Loading States:** Each slot can include its own `loading.tsx` file. If `@analytics` takes 3 seconds to fetch data while `@team` finishes in 100ms, `@team` renders instantly while `@analytics` shows a localized skeleton loader—without blocking the rest of the layout!
- **Isolated Error Handling:** Place an `error.tsx` file inside an individual slot (`@analytics/error.tsx`). If the analytics API fails, an error boundary catches it inside that specific card without crashing the entire dashboard.
- **Conditional Rendering:** You can conditionally display slots based on user authentication or roles directly inside `layout.tsx`:

```tsx
// Conditional rendering inside dashboard layout
export default async function Layout({ team, analytics }: Props) {
  const user = await getCurrentUser();

  return (
    <div className="grid grid-cols-2 gap-4">
      {team}
      {user.isAdmin ? analytics : <p>Access Denied for Analytics</p>}
    </div>
  );
}
```

---

## 📄 The Role of `default.tsx`

When navigating hard reloads or unmatched sub-routes, Next.js needs a fallback file to render inside a slot if the URL doesn't explicitly match a sub-page. Place a **`default.tsx`** file directly inside your slot folder (`@analytics/default.tsx`) to serve as a fallback component and prevent 404 errors.

# 📁 Next.js App Router: File Conventions Reference

In the Next.js App Router, routing behavior, error boundaries, streaming, and layouts are configured using specialized file naming conventions inside your route folders.

---

## 🧭 Complete Routing Files Matrix

| File Name          | Extension      | Primary Purpose & Behavior                                                                                                                          |
| ------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`layout`**       | `.tsx`, `.jsx` | **Shared Layout Shell:** Persists across sub-route navigations, maintains state, and does **not** re-render on navigation.                          |
| **`page`**         | `.tsx`, `.jsx` | **Unique Page UI:** Makes a route segment publicly accessible in the browser URL.                                                                   |
| **`loading`**      | `.tsx`, `.jsx` | **Instant Loading UI:** Automatically wraps the sibling `page.tsx` inside a React `Suspense` boundary to stream UI instantly.                       |
| **`not-found`**    | `.tsx`, `.jsx` | **404 UI:** Renders when `notFound()` is triggered or when a requested URL path segment does not exist.                                             |
| **`error`**        | `.tsx`, `.jsx` | **Segment Error Boundary:** Wraps sibling page subtrees in a React Error Boundary. Must be a Client Component (`"use client"`).                     |
| **`global-error`** | `.tsx`, `.jsx` | **Root Error Boundary:** Replaces the root `<html>` and `<body>` tags to catch fatal errors occurring inside the top-level `layout.tsx`.            |
| **`route`**        | `.ts`, `.js`   | **Serverless API Endpoint:** Handles standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`). Cannot exist alongside `page.tsx` in the same folder.    |
| **`template`**     | `.tsx`, `.jsx` | **Re-rendering Layout:** Similar to `layout.tsx`, but creates a brand-new component instance and re-renders state on every navigation.              |
| **`default`**      | `.tsx`, `.jsx` | **Parallel Route Fallback:** Acts as the fallback UI for Parallel Route slots (`@slot`) when Next.js cannot recover slot state after a hard reload. |

---

## ⚡ Server Components vs. Client Components

> 💡 **Important Distinction:** In the Next.js App Router, **every component inside the `app/` directory is a React Server Component (RSC) by default**.

- **Server Components (Default):** Render exclusively on the server. They can fetch data asynchronously using standard `async/await`, directly query databases, and keep secret keys hidden from the client bundle.
- **Client Components (`"use client"`):** Enable interactivity. If you need client-side React features like state (`useState`), side-effects (`useEffect`), event handlers (`onClick`), or browser APIs (`window`), you must place the `"use client"` directive at the very top of your file.

```tsx
// Example Client Component (e.g., app/components/Counter.tsx)
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
    >
      Count: {count}
    </button>
  );
}
```
