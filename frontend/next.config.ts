import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output export para Cloudflare Pages (gera HTML estático)
  output: 'export',

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
};

export default nextConfig;
