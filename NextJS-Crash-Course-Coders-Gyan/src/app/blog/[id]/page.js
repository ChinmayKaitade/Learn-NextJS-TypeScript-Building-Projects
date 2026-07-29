import Link from "next/link";
import React from "react";

const PageOne = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl">Nested Router Page - Post No.{id}</h1>

      <Link href={"/blog"} className="underline text-blue-600 p-2 text-md">
        Return Back
      </Link>
    </div>
  );
};

export default PageOne;
