"use client";
import Link from "next/link";
import React from "react";
import { use } from "react";

const Posts = ({ promise }) => {
  // console.log(promise);
  const posts = use(promise);
  console.log("Client Component");

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 m-2 rounded shadow">
          <Link href={`/blog/${post.id}`}>
            <h2 className="text-2xl font-bold">{post.title}</h2>
          </Link>
          <p className="text-gray-600">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
