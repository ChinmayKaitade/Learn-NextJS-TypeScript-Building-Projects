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
