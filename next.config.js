/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Improve hydration stability
  experimental: {
    optimizePackageImports: ['@radix-ui/themes', 'lucide-react'],
  },
  
  // Reduce hydration mismatches
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Handle images properly
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
