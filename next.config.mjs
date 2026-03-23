/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async redirects() {
    return [
      {
        source: '/resume',
        destination: 'https://drive.google.com/file/d/1Ae3dx-PYWJt1_luJGHlUZnlBSK0RAdI7/view?usp=sharing',
        permanent: false,
        basePath: false,
      },
    ]
  },
};

export default nextConfig;



