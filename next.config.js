const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
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
