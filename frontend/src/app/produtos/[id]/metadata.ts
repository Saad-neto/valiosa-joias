import type { Metadata } from 'next';
import { mockProducts } from '@/lib/mockData';

export function generateProductMetadata(id: string): Metadata {
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Produto não encontrado | Valiosa Joias',
      description: 'Produto não encontrado em nossa loja.',
    };
  }

  return {
    title: `${product.name} | Valiosa Joias`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
    keywords: [
      product.name,
      product.category,
      product.material,
      'joias',
      'joalheria',
      'Valiosa Joias',
    ],
  };
}
