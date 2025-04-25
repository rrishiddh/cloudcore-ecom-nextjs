/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'admin.refabry.com',
          pathname: '/storage/product/**',
        },
      ],
    },
  }
export default nextConfig;
