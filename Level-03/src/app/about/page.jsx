"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AboutPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl">About Page</h1>
      <p
        className="text-blue-600 text-2xl underline cursor-pointer mt-2"
        onClick={() => router.back("/")}
      >
        Go Back
      </p>
    </div>
  );
};

export default AboutPage;
