// ==========================================
// 1. PRIMITIVE TYPES & ANNOTATIONS
// ==========================================

// Explicit Type Annotation for numbers
let a: number;
a = 18;
console.log("a:", a);

// Explicit Type Annotation for strings
let b: string;
b = "chinmay";
console.log("b:", b);

// Explicit Type Annotation for booleans
let isOnline: boolean;
isOnline = true;
console.log("isOnline:", isOnline);

// ==========================================
// 2. ARRAYS & TUPLES
// ==========================================

// Array of numbers (number[])
let arr: number[];
arr = [10, 20, 30];
console.log("arr:", arr);

// Array of strings (string[])
let arr1: string[];
arr1 = ["chinmay", "aman", "dipak"];
console.log("arr1:", arr1);

// Tuple: Fixed length and specific type order [number, string, boolean]
let arr3: [number, string, boolean];
arr3 = [18, "chinu", true];
console.log("arr3:", arr3);

// ==========================================
// 3. ENUMS & ANY TYPE
// ==========================================

// Enum: Defines a set of named constants (auto-indexes starting from 0: User=0, Admin=1, Guest=2)
enum Role {
  User,
  Admin,
  Guest,
}

// Accessing enum members
console.log("Role User:", Role.User); // Output: 0
console.log("Role Admin:", Role.Admin); // Output: 1

// 'any' type disables type checking, allowing reassignment to any type
let c: any;
c = 18;
c = "chinmay";
c = ["chinu", 18];
c = false;

// ==========================================
// 4. FUNCTIONS & PARAMETERS
// ==========================================

// Function with typed parameters and explicit return type (: number)
function chinmay(a: number, b: string): number {
  return 17;
}
chinmay(18, "chinmay");

// Function with a default parameter value (b: string = "ayush")
function ayush(a: number, b: string = "ayush"): boolean {
  return true;
}
ayush(89); // Second parameter defaults to "ayush"

// ==========================================
// 5. INFERENCE VS ANNOTATION
// ==========================================

// Type Inference: TypeScript automatically infers 'd' as a literal type 18 (or number)
const d = 18;

// Type Annotation: Explicitly telling TypeScript that 'e' is a number
let e: number;

// ==========================================
// 6. TYPE ALIASES & UNIONS
// ==========================================

// Union Type Alias: Variable can be either a number OR a string
type Aman = number | string;
let x: Aman;
x = 18;
x = "chinu";

// String Literal Union: Variable can ONLY be one of these exact strings
type Status = "success" | "error" | "pending";
let y: Status;
y = "success";
y = "error";
y = "pending";

// Object Type Alias
type User = {
  name: string;
  age: number;
};

const g: User = {
  name: "Chinmay",
  age: 25,
};

// Object Type Alias with an optional field (image?)
type Post = {
  description: string;
  image?: string; // Optional field
  likes: number;
};

const obj2: Post = {
  description: "First Post",
  likes: 89, // 'image' is omitted without raising a type error
};

// Function Type Alias: Defines a signature taking two numbers and returning a number
type MathFn = (i: number, j: number) => number;

const add: MathFn = (a, b) => {
  return a;
};

// ==========================================
// 7. INTERFACES & EXTENSIONS
// ==========================================

// Interface definition for an object shape
interface Post2 {
  name: string;
  image?: string;
  likes: number;
}

// Intersection Types (&): Combines multiple types into one
type A = { a: number };
type B = { b: string };
type AB = A & B; // Must contain both 'a' and 'b'

// Interface Inheritance using 'extends'
interface X {
  x: number;
}
interface Y extends X {
  y: string; // Inherits property 'x' from X
}

interface C {
  c: number;
}

interface D extends C {
  d: string;
}

const obj: D = {
  c: 90,
  d: "chinu",
};

// ==========================================
// 8. GENERICS (REUSABLE TYPES)
// ==========================================

// Generic Function: Accepts a type parameter <T> and enforces matching parameter/return types
function hello<T>(a: T, b: T): T {
  return a;
}

// Valid calls:
hello<number>(12, 10);
hello<string>("hello", "chinu");

// Generic Interface: Passes a dynamic type <T> into property definitions
interface Student<T> {
  name: string;
  age: T;
}

// Instantiating Student with 'number' as the type for 'age'
const studentUser: Student<number> = {
  name: "chinu",
  age: 21,
};
