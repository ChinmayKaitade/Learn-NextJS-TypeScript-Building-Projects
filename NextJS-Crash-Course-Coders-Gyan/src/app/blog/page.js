import React from "react";
import Link from "next/link";
import Posts from "@/app/blog/components/posts";
import { Suspense } from "react";

const BlogPage = async () => {
  console.log("Server Component");
  // const data = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //   cache: "no-store",
  // });
  // const posts = await data.json();

  // const posts = [
  //   {
  //     id: 1,
  //     title: "First Blog Post",
  //     body: "This is the content of the first blog post.",
  //   },
  //   {
  //     id: 2,
  //     title: "Second Blog Post",
  //     body: "This is the content of the second blog post.",
  //   },
  //   {
  //     id: 3,
  //     title: "Third Blog Post",
  //     body: "This is the content of the third blog post.",
  //   },
  // ];

  const promise = fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json(),
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <h1 className="text-4xl">Blog Page</h1>

      {/* <div>
        {posts.map((post) => (
          <div key={post.id} className="border p-4 m-2 rounded shadow">
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-bold">{post.title}</h2>
            </Link>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div> */}

      <Suspense
        fallback={
          <div className="text-2xl text-gray-600 tracking-widest">
            Loading...
          </div>
        }
      >
        <Posts promise={promise} />
      </Suspense>

      <Link href={"/"} className="underline text-blue-600 p-2 text-md">
        Return Back
      </Link>
    </div>
  );
};

export default BlogPage;
