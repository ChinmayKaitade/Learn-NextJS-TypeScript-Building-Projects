/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
