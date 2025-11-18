// Tipos centralizados do projeto Valiosa Joias

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categoryId: string;
  material: string;
  images: string[];
  hoverImage?: string; // Imagem lifestyle/em uso para efeito hover Tiffany
  badge?: string;
  inStock: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  variants?: ProductVariants;
}

export interface ProductVariants {
  size?: string[];
  color?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: CartItemVariant;
}

export interface CartItemVariant {
  size?: string;
  color?: string;
  material?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Material {
  id: string;
  name: string;
}

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
  active: boolean;
  order: number;
  startDate?: string;
  endDate?: string;
}

export interface SiteConfig {
  logo: string;
  favicon: string;
  siteName: string;
  banners: Banner[];
  categories: {
    id: string;
    name: string;
    image: string;
  }[];
}
