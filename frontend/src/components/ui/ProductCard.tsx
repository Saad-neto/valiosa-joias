'use client';

import { Product } from '@/lib/mockData';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <Link href={`/produtos/${product.id}`}>
      <Card className="group h-full flex flex-col">
        {/* Image - Tiffany-style hover effect */}
        <div
          className="relative overflow-hidden rounded-lg mb-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main product image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-64 object-cover transition-all duration-700 ease-in-out ${
              isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}
          />

          {/* Lifestyle/hover image - Only shown if available */}
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} em uso`}
              className={`absolute inset-0 w-full h-64 object-cover transition-all duration-700 ease-in-out ${
                isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
              }`}
            />
          )}

          {/* Badges - Tiffany Minimal */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="text-[10px] uppercase tracking-wider bg-white/90 px-2 py-1 text-neutral-600 font-light">
                {product.badge}
              </span>
            )}
            {!product.inStock && (
              <span className="text-[10px] uppercase tracking-wider bg-white/90 px-2 py-1 text-neutral-600 font-light">
                Esgotado
              </span>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            className="absolute top-2 left-2 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Add to wishlist
            }}
          >
            <svg className="w-5 h-5 text-neutral-600 hover:text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content - Tiffany Minimal Style */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-sm font-normal mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors leading-relaxed text-center">
            {product.name}
          </h3>

          {/* Price - Discrete */}
          <div className="mt-auto text-center">
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-sm font-normal text-neutral-700">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-neutral-400 line-through font-light">
                  R$ {product.compareAtPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>

            {/* Add to Cart Button - Minimal */}
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Adicionar' : 'Esgotado'}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
