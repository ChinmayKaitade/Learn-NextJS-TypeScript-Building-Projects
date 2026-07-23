// "use client"
// import { useState } from "react";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // const [name, setName] = useState("Chinmay");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl">Learning NextJS & TypeScript</h1>
      {/* {name} */}
    </div>
  );
}
