const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@sanity/icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Optimize images for better performance
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: "/firm-logo/hero-video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.mp4",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.webm",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect old query param URLs to new SEO-friendly slugs
      {
        source: '/uslugi',
        has: [
          {
            type: 'query',
            key: 'tab',
            value: 'schetovodstvo',
          },
        ],
        destination: '/uslugi/schetovodni-uslugi',
        permanent: true,
      },
      {
        source: '/uslugi',
        has: [
          {
            type: 'query',
            key: 'tab',
            value: 'danaci',
          },
        ],
        destination: '/uslugi/danachni-konsultacii',
        permanent: true,
      },
      {
        source: '/uslugi',
        has: [
          {
            type: 'query',
            key: 'tab',
            value: 'pravni',
          },
        ],
        destination: '/uslugi/pravni-uslugi',
        permanent: true,
      },
      {
        source: '/uslugi',
        has: [
          {
            type: 'query',
            key: 'tab',
            value: 'registraciq',
          },
        ],
        destination: '/uslugi/registraciq-na-firmi',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
