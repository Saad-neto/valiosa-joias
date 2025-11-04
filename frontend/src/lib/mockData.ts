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
  variants?: {
    size?: string[];
    color?: string[];
  };
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Anel Solitário Diamante Premium',
    description: 'Elegante anel solitário com diamante de 0.5 quilates em ouro 18k. Perfeito para noivados e ocasiões especiais.',
    price: 2499.90,
    compareAtPrice: 2999.90,
    category: 'Anéis',
    categoryId: '1',
    material: 'Ouro 18k',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    badge: 'Novidade',
    inStock: true,
    stock: 5,
    rating: 4.8,
    reviewCount: 24,
    variants: {
      size: ['14', '16', '18', '20'],
    },
  },
  {
    id: '2',
    name: 'Colar Pérola Clássico',
    description: 'Colar clássico com pérolas naturais de 8mm. Fecho em ouro branco 18k com segurança adicional.',
    price: 1899.90,
    category: 'Colares',
    categoryId: '2',
    material: 'Pérolas Naturais',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&h=800&fit=crop',
    badge: 'Best Seller',
    inStock: true,
    stock: 10,
    rating: 4.9,
    reviewCount: 48,
  },
  {
    id: '3',
    name: 'Brinco Argola Ouro 18k',
    description: 'Elegantes brincos de argola em ouro 18k com acabamento polido. Design atemporal e sofisticado.',
    price: 1299.90,
    compareAtPrice: 1599.90,
    category: 'Brincos',
    categoryId: '3',
    material: 'Ouro 18k',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=800&h=800&fit=crop',
    badge: '20% OFF',
    inStock: true,
    stock: 8,
    rating: 4.7,
    reviewCount: 32,
  },
  {
    id: '4',
    name: 'Pulseira Prata 925 Veneziana',
    description: 'Pulseira em prata 925 com corrente veneziana. Fecho lagosta com extensor ajustável.',
    price: 899.90,
    category: 'Pulseiras',
    categoryId: '4',
    material: 'Prata 925',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1599459183200-59c7687a0275?w=800&h=800&fit=crop',
    badge: 'Promoção',
    inStock: true,
    stock: 15,
    rating: 4.6,
    reviewCount: 19,
  },
  {
    id: '5',
    name: 'Anel Aliança Compromisso',
    description: 'Elegante aliança de compromisso em ouro rosé 18k com acabamento fosco nas laterais.',
    price: 1799.90,
    category: 'Anéis',
    categoryId: '1',
    material: 'Ouro Rosé 18k',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&h=800&fit=crop',
    inStock: true,
    stock: 12,
    rating: 4.8,
    reviewCount: 41,
    variants: {
      size: ['14', '16', '18', '20', '22'],
    },
  },
  {
    id: '6',
    name: 'Colar Pingente Coração Diamante',
    description: 'Delicado colar com pingente em formato de coração cravejado com diamantes.',
    price: 2199.90,
    category: 'Colares',
    categoryId: '2',
    material: 'Ouro Branco 18k',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop',
    badge: 'Novidade',
    inStock: true,
    stock: 6,
    rating: 5.0,
    reviewCount: 15,
  },
  {
    id: '7',
    name: 'Brinco Solitário Zircônia',
    description: 'Brincos solitários com zircônias premium. Acabamento em ródio branco.',
    price: 599.90,
    category: 'Brincos',
    categoryId: '3',
    material: 'Prata 925',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=800&h=800&fit=crop',
    inStock: true,
    stock: 20,
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: '8',
    name: 'Pulseira Riviera Zircônias',
    description: 'Sofisticada pulseira riviera com zircônias em lapidação brilhante.',
    price: 1499.90,
    category: 'Pulseiras',
    categoryId: '4',
    material: 'Ouro 18k',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&h=800&fit=crop',
    badge: 'Exclusivo',
    inStock: true,
    stock: 4,
    rating: 4.9,
    reviewCount: 28,
  },
  {
    id: '9',
    name: 'Anel Meia Aliança Diamantes',
    description: 'Sofisticado anel meia aliança cravejado com 7 diamantes naturais.',
    price: 3299.90,
    category: 'Anéis',
    categoryId: '1',
    material: 'Ouro Branco 18k',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&h=800&fit=crop',
    inStock: false,
    stock: 0,
    rating: 4.7,
    reviewCount: 12,
    variants: {
      size: ['14', '16', '18'],
    },
  },
  {
    id: '10',
    name: 'Colar Choker Prata',
    description: 'Moderno colar choker em prata 925 com acabamento escovado.',
    price: 799.90,
    category: 'Colares',
    categoryId: '2',
    material: 'Prata 925',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop',
    inStock: true,
    stock: 8,
    rating: 4.4,
    reviewCount: 22,
  },
  {
    id: '11',
    name: 'Brinco Ear Cuff Minimalista',
    description: 'Conjunto ear cuff minimalista em ouro 18k. Uso sem furo.',
    price: 949.90,
    category: 'Brincos',
    categoryId: '3',
    material: 'Ouro 18k',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1596944924591-4cc082006a92?w=800&h=800&fit=crop',
    badge: 'Tendência',
    inStock: true,
    stock: 7,
    rating: 4.6,
    reviewCount: 34,
  },
  {
    id: '12',
    name: 'Pulseira Berloque Personalizada',
    description: 'Pulseira de berloques em prata 925 com 5 pingentes intercambiáveis.',
    price: 1099.90,
    category: 'Pulseiras',
    categoryId: '4',
    material: 'Prata 925',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
    ],
    hoverImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=800&fit=crop',
    inStock: true,
    stock: 11,
    rating: 4.8,
    reviewCount: 56,
  },
];

export const categories = [
  { id: '1', name: 'Anéis', slug: 'aneis', count: 4 },
  { id: '2', name: 'Colares', slug: 'colares', count: 3 },
  { id: '3', name: 'Brincos', slug: 'brincos', count: 3 },
  { id: '4', name: 'Pulseiras', slug: 'pulseiras', count: 3 },
];

export const materials = [
  { id: '1', name: 'Ouro 18k' },
  { id: '2', name: 'Ouro Branco 18k' },
  { id: '3', name: 'Ouro Rosé 18k' },
  { id: '4', name: 'Prata 925' },
  { id: '5', name: 'Pérolas Naturais' },
];

export const priceRanges = [
  { id: '1', label: 'Até R$ 500', min: 0, max: 500 },
  { id: '2', label: 'R$ 500 - R$ 1.000', min: 500, max: 1000 },
  { id: '3', label: 'R$ 1.000 - R$ 2.000', min: 1000, max: 2000 },
  { id: '4', label: 'R$ 2.000 - R$ 3.000', min: 2000, max: 3000 },
  { id: '5', label: 'Acima de R$ 3.000', min: 3000, max: 999999 },
];
