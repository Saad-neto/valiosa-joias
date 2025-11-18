'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useCart } from '@/contexts/CartContext';
import Button from '../ui/Button';

export default function Header() {
  const router = useRouter();
  const { config } = useSiteConfig();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Categorias', href: '/categorias' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-100">
      {/* Top Bar - Minimalista */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-2">
        <div className="container">
          <div className="flex justify-between items-center text-xs tracking-wide">
            <p className="text-neutral-600 font-light">Frete grátis para compras acima de R$ 500</p>
            <div className="flex gap-6">
              <Link href="/contato" className="text-neutral-600 hover:text-gold-500 transition-colors font-light">
                Contato
              </Link>
              <Link href="/conta" className="text-neutral-600 hover:text-gold-500 transition-colors font-light">
                Minha Conta
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={config.logo}
              alt={config.siteName}
              width={200}
              height={56}
              className="h-14 w-auto transition-opacity hover:opacity-80"
              priority
            />
          </Link>

          {/* Search Bar - Desktop - Minimalista */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar joias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 border border-neutral-200 rounded-full focus:outline-none focus:border-gold-400 transition-colors text-sm font-light bg-neutral-50"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-neutral-500 hover:text-gold-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Icons - Minimalista */}
          <div className="flex items-center gap-6">
            {/* User Icon */}
            <Link href="/conta" className="text-neutral-600 hover:text-gold-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Wishlist Icon */}
            <Link href="/favoritos" className="text-neutral-600 hover:text-gold-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Cart Icon */}
            <Link href="/carrinho" className="relative text-neutral-600 hover:text-gold-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation - Desktop - Minimalista */}
        <nav className="hidden md:flex items-center justify-center gap-10 mt-6 border-t border-neutral-100 py-5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-neutral-700 hover:text-gold-500 font-light text-sm tracking-wide uppercase transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-3 text-neutral-700 hover:text-gold-500 font-light text-sm tracking-wide uppercase transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
