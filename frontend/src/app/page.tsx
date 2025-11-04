'use client';

import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useCart } from '@/contexts/CartContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

// Mock data - será substituído por dados da API
const mockProducts = [
  {
    id: '1',
    name: 'Anel Solitário Diamante',
    price: 2499.90,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    category: 'Anéis',
    badge: 'Novidade',
  },
  {
    id: '2',
    name: 'Colar Pérola Clássico',
    price: 1899.90,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Colares',
    badge: 'Best Seller',
  },
  {
    id: '3',
    name: 'Brinco Ouro 18k',
    price: 1299.90,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    category: 'Brincos',
    badge: '20% OFF',
  },
  {
    id: '4',
    name: 'Pulseira Prata 925',
    price: 899.90,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
    category: 'Pulseiras',
    badge: 'Promoção',
  },
];

export default function HomePage() {
  const { config } = useSiteConfig();
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div>
      {/* Hero Section - Fixed Tiffany Style */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-neutral-100">
        {/* Placeholder for image/video - will be replaced */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 via-neutral-100 to-neutral-200"></div>

        {/* Fixed Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-neutral-900 px-4 max-w-2xl">
            <h1 className="font-serif text-4xl md:text-6xl font-normal mb-6 tracking-tight">
              Coleção Premium
            </h1>
            <p className="text-base md:text-lg mb-10 font-light tracking-wide">
              Joias exclusivas com design sofisticado
            </p>
            <Link href="/produtos">
              <Button variant="outline" size="lg">
                Explorar Coleção
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categorias em Destaque - Tiffany Style */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-center text-sm uppercase tracking-widest mb-12 font-light">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {config.categories.map((category) => (
              <Link key={category.id} href={`/produtos?category=${category.id}`}>
                <Card className="text-center group p-0 overflow-hidden border-0 shadow-none hover:shadow-md">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover mb-4 group-hover:scale-105 transition-all duration-500"
                  />
                  <h3 className="font-serif text-base font-normal pb-4 tracking-wide">{category.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque - Tiffany Style */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-widest mb-4 font-light">Produtos em Destaque</h2>
            <p className="text-neutral-600 font-light text-sm tracking-wide">
              Descubra nossa seleção de joias exclusivas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.map((product) => (
              <Card key={product.id} className="group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-sm mb-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge
                    variant="gold"
                    className="absolute top-3 right-3"
                  >
                    {product.badge}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-neutral-400 uppercase tracking-wider font-light">{product.category}</p>
                  <h3 className="font-serif text-lg font-normal">{product.name}</h3>
                  <p className="text-2xl font-light text-gold-600">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/produtos">
              <Button variant="outline" size="lg">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios - Tiffany Style */}
      <section className="py-12 bg-white border-t border-neutral-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-14 h-14 border border-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-normal mb-3">Frete Grátis</h3>
              <p className="text-neutral-500 font-light text-sm">Acima de R$ 500</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 border border-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-normal mb-3">Garantia Premium</h3>
              <p className="text-neutral-500 font-light text-sm">12 meses de garantia</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 border border-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-normal mb-3">Pagamento Seguro</h3>
              <p className="text-neutral-500 font-light text-sm">Parcelamento em até 10x</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
