import React from "react";

async function DynamicProfilePage({ params }) {
  const { username } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl">Dynamic Profile Page</h1>
      <p className="text-4xl">Welcome, {username}!</p>
    </div>
  );
}

export default DynamicProfilePage;
