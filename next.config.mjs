// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-b7a958248070423db848a79644c934ea.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
