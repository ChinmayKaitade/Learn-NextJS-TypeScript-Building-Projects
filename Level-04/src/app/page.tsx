"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import Button from "@/app/Button";

const page = () => {
  const [count, setCount] = useState<number>();
  const input = useRef<HTMLInputElement>(null);

  const fn = () => {
    //
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    //
  };

  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    //
  };
  return (
    <div>
      <Button data="chinu" action={fn} />

      <form onSubmit={handleSubmit}>
        <input type="text" ref={input} onChange={handleChange} />
        <button onClick={handleClick}>Click</button>
      </form>
    </div>
  );
};

export default page;
