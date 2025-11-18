'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { mockProducts } from '@/lib/mockData';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

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

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.variants?.size && !selectedSize) {
      toast.error('Por favor, selecione um tamanho');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      variant: selectedSize ? { size: selectedSize } : undefined,
    });

    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-neutral-50 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-gold-500">
              Início
            </Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-gold-500">
              Produtos
            </Link>
            <span>/</span>
            <Link href={`/produtos?category=${product.categoryId}`} className="hover:text-gold-500">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-neutral-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-neutral-100 rounded-lg overflow-hidden mb-4 aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-gold-500'
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <Link href={`/produtos?category=${product.categoryId}`}>
                <Badge variant="silver">{product.category}</Badge>
              </Link>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-neutral-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-sm text-neutral-600 ml-2">
                  {product.rating} ({product.reviewCount} avaliações)
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              {product.compareAtPrice && (
                <span className="text-xl text-neutral-400 line-through">
                  R$ {product.compareAtPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="text-4xl font-bold text-gold-500">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {discount > 0 && (
                <Badge variant="error" size="lg">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Material */}
            <div className="mb-6">
              <p className="text-neutral-600">
                <span className="font-medium">Material:</span> {product.material}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-success">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Em estoque ({product.stock} unidades)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-error">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-medium">Produto esgotado</span>
                </div>
              )}
            </div>

            {/* Size Selector */}
            {product.variants?.size && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Tamanho: {selectedSize && <span className="text-gold-500">{selectedSize}</span>}
                </label>
                <div className="flex gap-2">
                  {product.variants.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-md border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-gold-500 bg-gold-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantidade</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  className="w-10 h-10 rounded-md border-2 border-neutral-300 hover:border-neutral-400 disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={!product.inStock}
                  className="w-10 h-10 rounded-md border-2 border-neutral-300 hover:border-neutral-400 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock || (product.variants?.size && !selectedSize)}
              >
                Adicionar ao Carrinho
              </Button>
              <button className="w-12 h-12 rounded-md border-2 border-neutral-300 hover:border-gold-500 hover:text-gold-500 transition-colors flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Frete grátis para compras acima de R$ 500</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Garantia de 12 meses</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Parcelamento em até 10x sem juros</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="border-b mb-6">
            <div className="flex gap-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-gold-500 border-b-2 border-gold-500'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab === 'description' && 'Descrição'}
                  {tab === 'specifications' && 'Especificações'}
                  {tab === 'reviews' && 'Avaliações'}
                </button>
              ))}
            </div>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-neutral-700">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Material</td>
                      <td className="py-3 text-neutral-600">{product.material}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Categoria</td>
                      <td className="py-3 text-neutral-600">{product.category}</td>
                    </tr>
                    {product.variants?.size && (
                      <tr className="border-b">
                        <td className="py-3 font-medium">Tamanhos disponíveis</td>
                        <td className="py-3 text-neutral-600">{product.variants.size.join(', ')}</td>
                      </tr>
                    )}
                    <tr className="border-b">
                      <td className="py-3 font-medium">Garantia</td>
                      <td className="py-3 text-neutral-600">12 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gold-500 mb-2">{product.rating}</div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-neutral-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-neutral-600">{product.reviewCount} avaliações</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-600 mb-4">
                      Sistema de avaliações em desenvolvimento. Em breve você poderá ler e escrever avaliações sobre este produto.
                    </p>
                    <Button variant="outline">Escrever Avaliação</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
