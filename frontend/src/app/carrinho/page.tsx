'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const shippingThreshold = 500;
  const freeShipping = total >= shippingThreshold;
  const shippingCost = freeShipping ? 0 : 25;

  const discount = appliedCoupon ? (total * appliedCoupon.discount) / 100 : 0;
  const finalTotal = total - discount + shippingCost;

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons: Record<string, number> = {
      'WELCOME10': 10,
      'PRIMEIRA15': 15,
      'VIP20': 20,
    };

    const upperCode = couponCode.toUpperCase();
    if (validCoupons[upperCode]) {
      setAppliedCoupon({
        code: upperCode,
        discount: validCoupons[upperCode],
      });
    } else {
      alert('Cupom inválido');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <svg className="w-24 h-24 text-neutral-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-neutral-600 mb-8">
            Explore nossa coleção exclusiva de joias e adicione produtos ao seu carrinho.
          </p>
          <Link href="/produtos">
            <Button variant="primary" size="lg">
              Ver Produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-6 border-b last:border-b-0">
                  {/* Image */}
                  <Link href={`/produtos/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1">
                    <Link href={`/produtos/${item.id}`}>
                      <h3 className="font-semibold mb-1 hover:text-gold-500 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    {item.variant?.size && (
                      <p className="text-sm text-neutral-600 mb-2">
                        Tamanho: {item.variant.size}
                      </p>
                    )}
                    <p className="text-lg font-bold text-gold-500">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-400 hover:text-error transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-neutral-300 hover:border-neutral-400"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-neutral-300 hover:border-neutral-400"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-bold">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-sm text-error hover:underline"
            >
              Limpar Carrinho
            </button>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Cupom de Desconto</label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-success/10 text-success rounded-lg">
                    <div>
                      <p className="font-medium">{appliedCoupon.code}</p>
                      <p className="text-sm">{appliedCoupon.discount}% de desconto</p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-error hover:underline text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleApplyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                )}
                <p className="text-xs text-neutral-500 mt-2">
                  Cupons válidos: WELCOME10, PRIMEIRA15, VIP20
                </p>
              </div>

              {/* Shipping Alert */}
              {!freeShipping && (
                <div className="mb-6 p-3 bg-gold-50 border border-gold-200 rounded-lg">
                  <p className="text-sm text-gold-800">
                    Adicione mais <strong>R$ {(shippingThreshold - total).toFixed(2).replace('.', ',')}</strong> para ganhar frete grátis!
                  </p>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Desconto ({appliedCoupon.discount}%)</span>
                    <span className="font-medium">
                      -R$ {discount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Frete</span>
                  <span className={`font-medium ${freeShipping ? 'text-success' : ''}`}>
                    {freeShipping ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gold-500">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link href="/checkout">
                  <Button variant="primary" size="lg" fullWidth>
                    Finalizar Compra
                  </Button>
                </Link>
                <Link href="/produtos">
                  <Button variant="outline" size="lg" fullWidth>
                    Continuar Comprando
                  </Button>
                </Link>
              </div>

              {/* Security Icons */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-neutral-500 text-center mb-3">Compra 100% Segura</p>
                <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>SSL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>PCI DSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
