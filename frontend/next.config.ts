import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone para Cloudflare Pages
  output: 'standalone',

  // Configurações de imagem para Cloudflare
  images: {
    unoptimized: true, // Cloudflare Pages requer isso
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },

  // Configurações de domínio
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
