"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="flex gap-7 list-none text-2xl p-5">
        <Link
          href={"/"}
          className="text-orange-400 hover:text-orange-600 transition-all cursor-pointer"
        >
          <li>Home</li>
        </Link>
        <Link
          href={"/about"}
          className="text-orange-400 hover:text-orange-600 transition-all cursor-pointer"
        >
          <li>About</li>
        </Link>
        <Link
          href={"/contact"}
          className="text-orange-400 hover:text-orange-600 transition-all cursor-pointer"
        >
          <li>Contact</li>
        </Link>
      </div>

      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl">Learning NextJS & TypeScript</h1>

        <button className="text-2xl p-2 bg-blue-800 hover:bg-blue-700 rounded-2xl mt-4 cursor-pointer" onClick={() => router.push("/about")}>Go To About</button>
      </div>
    </>
  );
}
