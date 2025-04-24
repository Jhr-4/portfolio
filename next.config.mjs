/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add any remote image domains you might use
    ],
  },
  experimental: {
    // Enable useful experimental features
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default nextConfig;