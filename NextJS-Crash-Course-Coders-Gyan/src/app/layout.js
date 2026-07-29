import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "NextJS Crash Course - Coder's Gyan",
  description:
    "This is a NextJS Crash Course by YouTube - Coder's Gyan Channel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <nav className="p-4 bg-gray-800 text-amber-50 flex gap-4">
          <Link href={"/"} className="text-orange-400 tracking-widest">
            Logo
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/blog"}>Blog</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}
