/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      //  temporary images
      { hostname: "tailwindui.com" },
    ],
  },
};

export default nextConfig;
