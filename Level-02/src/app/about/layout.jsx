import React from "react";

const AboutLayout = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl">About Layout Page</h1>
      {children}
    </div>
  );
};

export default AboutLayout;
