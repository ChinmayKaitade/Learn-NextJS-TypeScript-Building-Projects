"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AboutPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image
        // src="/sample.jpg"
        src="https://plus.unsplash.com/premium_photo-1754269477157-e9f9e9ebedab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Sample Image"
        width={600}
        height={600}
        priority
      />

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
