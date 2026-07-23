"use client";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { city } = useParams();

  return (
    <div className="text-white mt-[100px] w-[50%]">{city} is the Best City.</div>
  );
};

export default page;
