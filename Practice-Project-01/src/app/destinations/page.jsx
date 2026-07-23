"use client";
import { useRouter } from "next/navigation";
import React from "react";

const DestinationsPage = () => {
  const destinations = ["Paris", "Tokyo", "NewYork"];
  const router = useRouter();

  return (
    <div className="flex items-center justify-center text-white text-4xl h-screen flex-col gap-4">
      <div className="font-bold text-4xl">Choose Your Destination</div>

      <div className="flex flex-col gap-4 cursor-pointer">
        {destinations.map((d, index) => (
          <div
            key={index}
            className="text-black font-black text-2xl flex items-center justify-center rounded-2xl w-[200px] h-[100px] bg-white hover:opacity-[0.5] transition-all"
            onClick={() => {
              router.push(`/destinations/${d}`);
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
