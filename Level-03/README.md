# 🧭 Navigation, Image & Font Optimization in Next.js

Mastering client-side navigation along with built-in asset optimizations (`<Image>` and `next/font`) is essential for building ultra-fast Next.js applications that achieve high Web Vitals scores.

---

## 🚦 Navigation in Next.js

There are two primary ways to navigate between routes in Next.js:

### 1. Declarative Navigation (`<Link>`)

This is the **default and recommended** method for user-driven navigation. The `<Link>` component extends the HTML `<a>` tag with performance optimizations like client-side routing and automatic background prefetching.

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <nav className="flex gap-4 p-4">
      {/* 🚀 Next.js automatically prefetches /about when this link enters the viewport */}
      <Link href="/about" className="text-indigo-600 hover:underline">
        Go to About Page
      </Link>
    </nav>
  );
}
```

> ⚡ **Why use `<Link>` over `<a>`?** Standard HTML `<a>` tags trigger a full browser page refresh, dropping React state and executing extra server round trips. `<Link>` intercepts navigation to perform instant client-side transitions.

---

### 2. Programmatic Navigation (`useRouter`)

When navigation needs to happen as a side-effect (e.g., after a form submission, payment verification, or button click), use the `useRouter` hook from **`next/navigation`**.

> ⚠️ **Crucial Import Check:** In the App Router, always import `useRouter` from **`next/navigation`**, NOT `next/router` (which is legacy Pages Router code). Because `useRouter` uses React hooks, the component must be marked with `"use client"`.

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = async () => {
    // 1. Authenticate user...
    // 2. Programmatically redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
    >
      Login & Redirect
    </button>
  );
}
```

#### 🧰 Useful `router` Methods

- `router.push('/path')` $\rightarrow$ Navigates to a new route (adds entry to browser history).
- `router.replace('/path')` $\rightarrow$ Navigates to a new route without adding a new history entry (great for redirects).
- `router.refresh()` $\rightarrow$ Refreshes the current server component tree without losing client state.
- `router.back()` / `router.forward()` $\rightarrow$ Moves backward or forward in the browser history stack.

---

