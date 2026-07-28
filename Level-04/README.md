# 📘 Master TypeScript Cheat Sheet & Reference Guide

TypeScript extends JavaScript by adding **static typing**, allowing bugs to be caught during compilation rather than at runtime.

---

## 🎯 Basic Types & Type Annotations

```typescript
// Explicit Type Annotations
let age: number = 25;
let username: string = "Chinmay";
let isOnline: boolean = true;

// Arrays
let scores: number[] = [10, 20, 30];
let names: Array<string> = ["Chinmay", "Aman"];

// Tuples: Fixed-length, ordered structures with specific types per index
let userTuple: [string, number, boolean] = ["Chinmay", 25, true];

// Enums: Named constants
enum Role {
  User = "USER",
  Admin = "ADMIN",
  Guest = "GUEST",
}
let currentRole: Role = Role.Admin;

// Any: Bypasses type checking (use sparingly)
let unknownPayload: any = "Can be anything";

// Void & Never
function logMessage(msg: string): void {
  console.log(msg); // Returns nothing
}

function throwError(errorMsg: string): never {
  throw new Error(errorMsg); // Never reaches an end point
}
```

---

## 🔀 Type Aliases vs. Interfaces

Both `type` and `interface` define object shapes and contracts, but they excel in different scenarios:

### 1. Type Aliases (`type`)

Best for primitive unions, function signatures, and tuple definitions.

```typescript
type ID = number | string;
type Status = "success" | "error" | "pending";

type MathFn = (a: number, b: number) => number;
const add: MathFn = (a, b) => a + b;

// Intersection using &
type Person = { name: string };
type Contact = { phone: string };
type FullUser = Person & Contact; // Must contain both 'name' and 'phone'
```

### 2. Interfaces (`interface`)

Best for object shapes, class implementations, and library definitions (supports declaration merging).

```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional field
  readonly role: string; // Immutable field
}

// Extension using 'extends'
interface Employee extends User {
  salary: number;
}

const dev: Employee = {
  id: 1,
  name: "Chinmay",
  role: "Admin",
  salary: 100000,
};
```

### ⚔️ Quick Comparison Matrix

| Feature                 | Type Alias (`type`)                   | Interface (`interface`)                 |
| ----------------------- | ------------------------------------- | --------------------------------------- | ----- |
| **Combine Structures**  | Intersection (`&`)                    | Extension (`extends`)                   |
| **Declaration Merging** | ❌ No                                 | ✅ Yes (re-declaring merges properties) |
| **Unions & Primitives** | ✅ Yes (`type ID = string             | number`)                                | ❌ No |
| **Primary Use Case**    | Functions, primitives, unions, tuples | Object shapes, public APIs, OOP         |

---

## 🧬 Generics: Reusable Type Safety

Generics allow you to write reusable code components that work across multiple data types while keeping strict type safety intact.

```typescript
// Generic Function
function identity<T>(value: T): T {
  return value;
}

const numVal = identity<number>(18);
const strVal = identity<string>("Chinmay");

// Generic Interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 100 };
const stringBox: Box<string> = { value: "TypeScript" };
```

---

## ⚛️ React with TypeScript: Core Types Cheat Sheet

When typing React components, selecting the correct type for props and return signatures is crucial:

```tsx
import React, { useState, useRef } from "react";

// 1. Typing Props & Children
type CardProps = {
  title: string;
  children: React.ReactNode; // 👈 Standard choice for any renderable React content
  headerElement?: React.ReactElement; // 👈 Forces a single React element instance
  onClick: () => void;
};

export const Card = ({
  title,
  children,
  headerElement,
  onClick,
}: CardProps) => {
  // 2. Typing Hooks
  const [count, setCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div onClick={onClick}>
      {headerElement}
      <h1>{title}</h1>
      <div>{children}</div>
      <input ref={inputRef} />
    </div>
  );
};
```

### 📊 React Type Selection Guide

| React Type                   | Description                                                                      | Ideal Use Case                                       |
| ---------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **`React.ReactNode`**        | Anything React can render (strings, numbers, elements, null, fragments, arrays). | **`children` prop** (Most flexible).                 |
| **`React.ReactElement`**     | A single rendered React element instance object.                                 | Props requiring a specific component structure.      |
| **`JSX.Element`**            | The direct output of a React component execution.                                | Explicit function component return type annotations. |
| **`React.ComponentType<P>`** | A component function/class accepting props `P`.                                  | Dynamic or higher-order components passed as props.  |

---

## 🌐 Global Type Declarations (`types.d.ts`)

To extend environmental objects (like `window`) or define globally available interfaces without importing them in every file, use ambient module declarations:

```typescript
// src/types.d.ts
declare global {
  interface Window {
    appVersion: string;
  }

  type ApiResponse<T> = {
    data: T;
    error?: string;
    statusCode: number;
  };
}

export {}; // Ensures file is treated as a module scope
```
