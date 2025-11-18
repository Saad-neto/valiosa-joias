import { mockProducts } from '@/lib/mockData';
import ProductDetail from './ProductDetail';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Generate static params for all products
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/produtos">
          <Button variant="primary">Ver todos os produtos</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
