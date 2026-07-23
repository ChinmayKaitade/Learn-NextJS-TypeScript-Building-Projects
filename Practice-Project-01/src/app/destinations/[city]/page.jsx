"use client";
import { useParams } from "next/navigation";
import React from "react";
import ParisImg from "@/assets/paris.jpg";
import TokyoImg from "@/assets/tokyo.jpg";
import NewyorkImg from "@/assets/newyork.webp";
import Image from "next/image";

const CityPage = ({ params }) => {
  const { city } = useParams();

  return (
    <div className="text-white mt-[100px] w-[50%]">
      {city} is a Beautiful City.
      {city == "Paris" && (
        <Image src={ParisImg} width={400} height={400} alt="Paris Image" />
      )}
      {city == "Tokyo" && (
        <Image src={TokyoImg} width={400} height={400} alt="Tokyo Image" />
      )}
      {city == "NewYork" && (
        <Image src={NewyorkImg} width={400} height={400} alt="New York Image" />
      )}
    </div>
  );
};

export default CityPage;
