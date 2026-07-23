"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-[80px] bg-white flex justify-between items-center px-[20px] fixed top-0">
      <div className="text-black font-bold text-2xl">🧳Travel Guide</div>

      <div>
        <ul className="flex justify-center items-center gap-[10px] font-semibold">
          <Link href={"/"} className={pathname == "/" ? "text-blue-500" : ""}>
            <li>Home</li>
          </Link>
          <Link
            href={"/destinations"}
            className={pathname == "/destinations" ? "text-blue-500" : ""}
          >
            <li>Destinations</li>
          </Link>
          <Link
            href={"/contact"}
            className={pathname == "/contact" ? "text-blue-500" : ""}
          >
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
