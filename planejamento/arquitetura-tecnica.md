# Arquitetura Técnica - E-commerce de Joias

## 1. Visão Geral da Arquitetura

### 1.1 Stack Tecnológico Recomendado

#### Frontend (Cliente)
- **Framework:** Next.js 14 (React + TypeScript)
- **Estilização:** TailwindCSS + Shadcn/ui
- **Estado:** Zustand ou Redux Toolkit
- **Formulários:** React Hook Form + Zod
- **Requisições:** Axios ou Fetch API
- **Animações:** Framer Motion

#### Frontend (Dashboard Admin)
- **Framework:** Next.js 14 (React + TypeScript)
- **UI:** Material-UI ou Ant Design
- **Gráficos:** Chart.js ou Recharts
- **Tabelas:** TanStack Table (React Table)

#### Backend
- **Runtime:** Node.js 20+
- **Framework:** NestJS (estruturado) ou Express (simples)
- **Linguagem:** TypeScript
- **ORM:** Prisma ou TypeORM
- **Validação:** Class Validator + Class Transformer

#### Banco de Dados
- **Principal:** PostgreSQL 15+ (relacional)
- **Cache:** Redis (sessões, cache de queries)
- **Busca:** Elasticsearch (opcional, para busca avançada)

#### Armazenamento de Arquivos
- **Imagens/Vídeos:** Cloudinary ou AWS S3 + CloudFront
- **Backup:** AWS S3 Glacier

#### Infraestrutura
- **Hospedagem:** AWS, Google Cloud, ou DigitalOcean
- **Containers:** Docker + Docker Compose
- **CI/CD:** GitHub Actions ou GitLab CI
- **Monitoramento:** Sentry (erros) + New Relic (performance)

---

## 2. Arquitetura do Sistema

### 2.1 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├──────────────────────┬──────────────────────────────────────┤
│   Site do Cliente    │      Dashboard Admin                 │
│   (Next.js)          │      (Next.js)                       │
└──────────┬───────────┴──────────────┬───────────────────────┘
           │                          │
           │        HTTPS/REST        │
           │                          │
┌──────────▼──────────────────────────▼───────────────────────┐
│                     API Gateway / Load Balancer              │
│                     (NGINX ou AWS ALB)                       │
└──────────┬──────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────┐
│                     BACKEND (NestJS)                         │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐          │
│  │  Auth      │  │  Products  │  │  Orders      │          │
│  │  Module    │  │  Module    │  │  Module      │          │
│  └────────────┘  └────────────┘  └──────────────┘          │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐          │
│  │  Users     │  │  Payments  │  │  Marketplace │          │
│  │  Module    │  │  Module    │  │  Module      │          │
│  └────────────┘  └────────────┘  └──────────────┘          │
└──────────┬───────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────┐
│                  CAMADA DE DADOS                             │
├─────────────────┬───────────────────┬────────────────────────┤
│  PostgreSQL     │     Redis         │   Cloudinary           │
│  (dados)        │     (cache)       │   (imagens)            │
└─────────────────┴───────────────────┴────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  INTEGRAÇÕES EXTERNAS                         │
├───────────────┬──────────────┬───────────────┬───────────────┤
│ Melhor Envio  │ Mercado Pago │  WhatsApp API │  Google GA4   │
├───────────────┼──────────────┼───────────────┼───────────────┤
│ Magalu API    │  Amazon API  │  Mercado      │  OpenAI       │
│               │              │  Livre API    │  (IA)         │
└───────────────┴──────────────┴───────────────┴───────────────┘
```

---

## 3. Modelagem do Banco de Dados

### 3.1 Principais Tabelas (PostgreSQL)

#### 3.1.1 Users (Usuários)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE,
  phone VARCHAR(20),
  birth_date DATE,
  profile_image_url TEXT,
  role ENUM('customer', 'admin', 'seller', 'marketing') DEFAULT 'customer',
  loyalty_points INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_cpf ON users(cpf);
```

#### 3.1.2 Addresses (Endereços)
```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50), -- 'Casa', 'Trabalho', etc.
  zip_code VARCHAR(9) NOT NULL,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(20) NOT NULL,
  complement VARCHAR(255),
  neighborhood VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
```

#### 3.1.3 Categories (Categorias)
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id), -- Para subcategorias
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
```

#### 3.1.4 Products (Produtos)
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description TEXT,
  full_description TEXT,

  -- Preços
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2), -- Preço "de" (antes do desconto)
  cost_price DECIMAL(10, 2), -- Custo de aquisição

  -- Estoque
  stock_quantity INT DEFAULT 0,
  low_stock_alert INT DEFAULT 5,
  allow_backorder BOOLEAN DEFAULT false,

  -- Especificações de Joias
  material VARCHAR(100), -- 'Ouro 18k', 'Prata 925', etc.
  weight_grams DECIMAL(8, 2),
  gemstone VARCHAR(100), -- 'Diamante', 'Rubi', etc.
  gemstone_carat DECIMAL(6, 2),
  dimensions VARCHAR(100), -- '2cm x 1.5cm'

  -- SEO
  seo_title VARCHAR(255),
  seo_description TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,

  -- Datas
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
```

#### 3.1.5 Product_Images (Imagens de Produtos)
```sql
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
```

#### 3.1.6 Product_Videos (Vídeos de Produtos)
```sql
CREATE TABLE product_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  video_type ENUM('youtube', 'vimeo', 'direct', '360') DEFAULT 'direct',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.7 Product_Categories (Relação N:N)
```sql
CREATE TABLE product_categories (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);
```

#### 3.1.8 Product_Variants (Variações de Produtos)
```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255), -- 'Aro 16', 'Ouro Amarelo', etc.
  price DECIMAL(10, 2),
  stock_quantity INT DEFAULT 0,
  attributes JSONB, -- {size: '16', color: 'amarelo'}
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
```

#### 3.1.9 Orders (Pedidos)
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- 'ORD-2025-0001'
  user_id UUID REFERENCES users(id),

  -- Status
  status ENUM(
    'pending_payment',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
  ) DEFAULT 'pending_payment',

  -- Valores
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,

  -- Pagamento
  payment_method VARCHAR(50), -- 'credit_card', 'pix', 'boleto'
  payment_status VARCHAR(50),
  paid_at TIMESTAMP,

  -- Entrega
  shipping_address JSONB, -- Endereço completo
  shipping_method VARCHAR(100),
  tracking_code VARCHAR(255),
  estimated_delivery_date DATE,
  delivered_at TIMESTAMP,

  -- Origem
  channel VARCHAR(50) DEFAULT 'website', -- 'website', 'magalu', 'amazon', etc.

  -- Notas
  customer_notes TEXT,
  internal_notes TEXT,

  -- Datas
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_channel ON orders(channel);
```

#### 3.1.10 Order_Items (Itens do Pedido)
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_variant_id UUID REFERENCES product_variants(id),

  -- Snapshot dos dados (caso produto seja editado/deletado depois)
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100) NOT NULL,
  product_image_url TEXT,

  -- Valores
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

#### 3.1.11 Carts (Carrinhos)
```sql
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(255), -- Para usuários não logados
  expires_at TIMESTAMP, -- Carrinho expira após X dias
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_carts_user_id ON carts(user_id);
CREATE INDEX idx_carts_session_id ON carts(session_id);
```

#### 3.1.12 Cart_Items (Itens do Carrinho)
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  product_variant_id UUID REFERENCES product_variants(id),
  quantity INT NOT NULL,
  added_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
```

#### 3.1.13 Wishlists (Lista de Desejos)
```sql
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);
```

#### 3.1.14 Price_Alerts (Alertas de Preço)
```sql
CREATE TABLE price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  current_price DECIMAL(10, 2) NOT NULL,
  desired_price DECIMAL(10, 2) NOT NULL,
  notification_type VARCHAR(50) DEFAULT 'email', -- 'email', 'whatsapp', 'push'
  status ENUM('active', 'triggered', 'expired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  triggered_at TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE INDEX idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX idx_price_alerts_product_id ON price_alerts(product_id);
CREATE INDEX idx_price_alerts_status ON price_alerts(status);
```

#### 3.1.15 Reviews (Avaliações)
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  admin_response TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
```

#### 3.1.16 Coupons (Cupons de Desconto)
```sql
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type ENUM('percentage', 'fixed_amount', 'free_shipping'),
  discount_value DECIMAL(10, 2) NOT NULL,
  minimum_purchase DECIMAL(10, 2),
  maximum_discount DECIMAL(10, 2), -- Limite para desconto percentual
  usage_limit INT, -- Limite total de usos
  usage_per_customer INT DEFAULT 1,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_coupons_code ON coupons(code);
```

#### 3.1.17 Coupon_Usages (Uso de Cupons)
```sql
CREATE TABLE coupon_usages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID REFERENCES coupons(id),
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  used_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_coupon_usages_coupon_id ON coupon_usages(coupon_id);
CREATE INDEX idx_coupon_usages_user_id ON coupon_usages(user_id);
```

#### 3.1.18 Campaigns (Campanhas de Marketing)
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50), -- 'mothers_day', 'black_friday', etc.
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  banner_url TEXT,
  landing_page_url TEXT,
  coupon_code VARCHAR(50),
  target_audience JSONB, -- Segmentação
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.19 Blog_Posts (Posts do Blog)
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  featured_image_url TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  category VARCHAR(100),
  tags TEXT[], -- Array de tags
  seo_title VARCHAR(255),
  seo_description TEXT,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at TIMESTAMP,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
```

#### 3.1.20 Newsletter_Subscribers (Inscritos na Newsletter)
```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
```

#### 3.1.21 Marketplace_Products (Produtos nos Marketplaces)
```sql
CREATE TABLE marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  marketplace VARCHAR(50) NOT NULL, -- 'magalu', 'amazon', 'mercadolivre'
  external_id VARCHAR(255), -- ID do produto no marketplace
  status VARCHAR(50), -- 'pending', 'active', 'rejected', 'paused'
  price DECIMAL(10, 2), -- Preço no marketplace (pode ser diferente)
  last_sync_at TIMESTAMP,
  sync_errors TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_marketplace_products_product_id ON marketplace_products(product_id);
CREATE INDEX idx_marketplace_products_marketplace ON marketplace_products(marketplace);
```

---

## 4. APIs e Endpoints

### 4.1 Estrutura de APIs REST

#### Base URL
```
Produção: https://api.valiosa.com.br/v1
Desenvolvimento: http://localhost:3000/api/v1
```

#### Autenticação
- **JWT (JSON Web Token)**
- Header: `Authorization: Bearer {token}`
- Refresh Token para renovação

### 4.2 Principais Endpoints

#### 4.2.1 Autenticação
```
POST   /auth/register          - Registrar novo usuário
POST   /auth/login             - Login
POST   /auth/logout            - Logout
POST   /auth/refresh           - Renovar token
POST   /auth/forgot-password   - Solicitar reset de senha
POST   /auth/reset-password    - Resetar senha
GET    /auth/verify-email      - Verificar email
```

#### 4.2.2 Usuários
```
GET    /users/me               - Dados do usuário logado
PUT    /users/me               - Atualizar perfil
PUT    /users/me/password      - Alterar senha
GET    /users/me/orders        - Pedidos do usuário
GET    /users/me/addresses     - Endereços do usuário
POST   /users/me/addresses     - Adicionar endereço
PUT    /users/me/addresses/:id - Editar endereço
DELETE /users/me/addresses/:id - Deletar endereço
```

#### 4.2.3 Produtos
```
GET    /products                    - Listar produtos (com filtros, paginação)
GET    /products/:slug              - Detalhes do produto
GET    /products/:id/related        - Produtos relacionados
GET    /products/:id/reviews        - Avaliações do produto
POST   /products/:id/reviews        - Criar avaliação
GET    /products/featured           - Produtos em destaque
GET    /products/search?q=anel      - Buscar produtos
```

#### 4.2.4 Categorias
```
GET    /categories              - Listar categorias
GET    /categories/:slug        - Detalhes da categoria
GET    /categories/:slug/products - Produtos da categoria
```

#### 4.2.5 Carrinho
```
GET    /cart                    - Ver carrinho
POST   /cart/items              - Adicionar item
PUT    /cart/items/:id          - Atualizar quantidade
DELETE /cart/items/:id          - Remover item
DELETE /cart                    - Limpar carrinho
```

#### 4.2.6 Lista de Desejos
```
GET    /wishlist                - Ver lista de desejos
POST   /wishlist                - Adicionar produto
DELETE /wishlist/:productId     - Remover produto
```

#### 4.2.7 Pedidos
```
POST   /orders                  - Criar pedido
GET    /orders                  - Listar pedidos do usuário
GET    /orders/:id              - Detalhes do pedido
POST   /orders/:id/cancel       - Cancelar pedido
GET    /orders/:id/track        - Rastrear pedido
```

#### 4.2.8 Pagamentos
```
POST   /payments/pix            - Gerar pagamento PIX
POST   /payments/credit-card    - Pagar com cartão
POST   /payments/boleto         - Gerar boleto
POST   /payments/webhook        - Webhook do gateway de pagamento
```

#### 4.2.9 Frete
```
POST   /shipping/calculate      - Calcular frete (via Melhor Envio)
GET    /shipping/methods        - Métodos de envio disponíveis
```

#### 4.2.10 Alertas de Preço
```
POST   /price-alerts            - Criar alerta
GET    /price-alerts            - Listar meus alertas
DELETE /price-alerts/:id        - Deletar alerta
```

#### 4.2.11 Blog
```
GET    /blog/posts              - Listar posts
GET    /blog/posts/:slug        - Ver post
POST   /blog/posts/:id/comments - Comentar
```

#### 4.2.12 Admin - Produtos
```
GET    /admin/products          - Listar todos os produtos
POST   /admin/products          - Criar produto
PUT    /admin/products/:id      - Editar produto
DELETE /admin/products/:id      - Deletar produto
POST   /admin/products/:id/images - Upload de imagens
```

#### 4.2.13 Admin - Pedidos
```
GET    /admin/orders            - Listar todos os pedidos
PUT    /admin/orders/:id/status - Atualizar status
POST   /admin/orders/:id/tracking - Adicionar rastreamento
GET    /admin/orders/stats      - Estatísticas de pedidos
```

#### 4.2.14 Admin - Marketplaces
```
POST   /admin/marketplaces/sync-product/:id    - Sincronizar produto
GET    /admin/marketplaces/orders              - Pedidos dos marketplaces
POST   /admin/marketplaces/import-orders       - Importar pedidos
```

#### 4.2.15 Analytics
```
GET    /admin/analytics/dashboard  - Métricas gerais
GET    /admin/analytics/sales      - Análise de vendas
GET    /admin/analytics/products   - Produtos mais vendidos
GET    /admin/analytics/ga4        - Dados do Google Analytics 4
```

---

## 5. Integrações Externas

### 5.1 Melhor Envio (Frete)

#### Configuração
```javascript
const melhorEnvio = {
  baseURL: 'https://melhorenvio.com.br/api/v2',
  token: process.env.MELHOR_ENVIO_TOKEN
}
```

#### Endpoints Utilizados
```
POST   /shipment/calculate  - Calcular frete
POST   /cart                - Adicionar envio ao carrinho
POST   /checkout            - Comprar etiqueta
GET    /tracking/:tracking  - Rastrear envio
```

#### Fluxo
1. Cliente insere CEP no checkout
2. Backend chama API do Melhor Envio para calcular
3. Retorna opções (Correios, Jadlog, etc.) com preços
4. Cliente escolhe
5. Após pagamento, gerar etiqueta via API
6. Imprimir etiqueta
7. Rastreamento automático

### 5.2 Mercado Pago (Pagamento)

#### Configuração
```javascript
const mercadoPago = {
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  publicKey: process.env.MERCADO_PAGO_PUBLIC_KEY
}
```

#### Métodos de Pagamento
- **PIX:** Gerar QR Code
- **Cartão de Crédito:** Tokenização no frontend
- **Boleto:** Gerar boleto

#### Webhooks
```
POST /payments/webhook/mercadopago
```
- Recebe notificações de status de pagamento
- Atualiza pedido automaticamente

### 5.3 WhatsApp Business API

#### Fornecedores
- **Twilio** (mais popular)
- **MessageBird**
- **Infobip**
- **API oficial do WhatsApp**

#### Uso
```javascript
// Exemplo com Twilio
await twilioClient.messages.create({
  from: 'whatsapp:+5511999999999',
  to: `whatsapp:${customerPhone}`,
  body: 'Seu pedido foi enviado! Código de rastreamento: ABC123'
})
```

#### Funcionalidades
- Confirmar pedido
- Atualizar status
- Campanhas de marketing
- Alertas de promoção
- Recuperar carrinho abandonado

### 5.4 Google Analytics 4 (GA4)

#### Configuração
```javascript
// Frontend - Next.js
import ReactGA from 'react-ga4'

ReactGA.initialize('G-XXXXXXXXXX')
```

#### Eventos a Rastrear
```javascript
// View de produto
ReactGA.event('view_item', {
  items: [{
    item_id: product.id,
    item_name: product.name,
    price: product.price
  }]
})

// Adicionar ao carrinho
ReactGA.event('add_to_cart', {
  value: product.price,
  items: [...]
})

// Compra
ReactGA.event('purchase', {
  transaction_id: order.id,
  value: order.total,
  items: [...]
})
```

#### Integração no Dashboard
- Usar **Google Analytics Data API**
- Buscar métricas e exibir no dashboard admin
- Métricas: visitantes, conversão, receita, etc.

### 5.5 OpenAI (Editor de Imagens com IA)

#### Uso
```javascript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Gerar descrição de produto automaticamente
const description = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{
    role: 'user',
    content: 'Escreva uma descrição atraente para um anel de ouro 18k com diamante'
  }]
})

// Editar imagem (remover fundo)
const editedImage = await openai.images.edit({
  image: productImage,
  prompt: 'Remove background, white background'
})
```

### 5.6 Cloudinary (Armazenamento e Otimização de Imagens)

#### Configuração
```javascript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
```

#### Upload de Imagem
```javascript
const result = await cloudinary.uploader.upload(imageFile, {
  folder: 'products',
  transformation: [
    { width: 1000, height: 1000, crop: 'limit' },
    { quality: 'auto' },
    { fetch_format: 'auto' }
  ]
})
```

#### Benefícios
- CDN global (imagens carregam rápido)
- Otimização automática (WebP, AVIF)
- Redimensionamento on-the-fly
- Backup automático

### 5.7 Integrações de Marketplaces

#### Magazine Luiza API
```javascript
const magaluAPI = axios.create({
  baseURL: 'https://api-mp.magazineluiza.com.br',
  headers: {
    'Authorization': `Bearer ${process.env.MAGALU_TOKEN}`,
    'Content-Type': 'application/json'
  }
})
```

#### Amazon SP-API
```javascript
const SellingPartnerAPI = require('amazon-sp-api')

const spApi = new SellingPartnerAPI({
  region: 'na',
  refresh_token: process.env.AMAZON_REFRESH_TOKEN
})
```

#### Mercado Livre API
```javascript
const mercadoLibreAPI = axios.create({
  baseURL: 'https://api.mercadolibre.com',
  headers: {
    'Authorization': `Bearer ${process.env.ML_ACCESS_TOKEN}`
  }
})
```

---

## 6. Segurança

### 6.1 Autenticação e Autorização
- **JWT com Refresh Token**
- Tokens com expiração curta (15 min)
- Refresh token armazenado em HttpOnly cookie
- Rate limiting (limite de requisições)
- Proteção contra brute force

### 6.2 Dados Sensíveis
- **Senhas:** Hash com bcrypt (custo 12)
- **Dados de pagamento:** Nunca armazenar cartão
- **Tokenização:** Usar gateway de pagamento
- **Criptografia:** SSL/TLS (HTTPS obrigatório)

### 6.3 Proteção contra Ataques
- **SQL Injection:** Usar ORM (Prisma) e queries preparadas
- **XSS:** Sanitizar inputs
- **CSRF:** Tokens CSRF
- **DDoS:** Cloudflare ou AWS Shield

### 6.4 LGPD
- Política de privacidade clara
- Consentimento para uso de dados
- Direito de deletar conta
- Anonimização de dados após X tempo

### 6.5 Backup
- Backup automático diário (banco de dados)
- Backup de imagens (Cloudinary já faz)
- Retenção: 30 dias
- Testes de restore mensais

---

## 7. Performance e Escalabilidade

### 7.1 Cache
- **Redis** para:
  - Sessões de usuário
  - Cache de queries frequentes (produtos, categorias)
  - Rate limiting
  - Fila de jobs

### 7.2 Otimização de Queries
- Indexes nas colunas mais buscadas
- Paginação (não retornar tudo de uma vez)
- Eager loading (evitar N+1 queries)

### 7.3 CDN
- Cloudinary para imagens
- AWS CloudFront para assets estáticos

### 7.4 Escalabilidade Horizontal
- Containers Docker
- Load Balancer (NGINX ou AWS ALB)
- Auto-scaling (aumentar instâncias em Black Friday)

---

## 8. Monitoramento e Logs

### 8.1 Logs
- **Winston** ou **Pino** (Node.js logging)
- Níveis: error, warn, info, debug
- Centralização: AWS CloudWatch ou ELK Stack

### 8.2 Monitoramento de Erros
- **Sentry:** Captura erros frontend e backend
- Alertas em tempo real

### 8.3 Monitoramento de Performance
- **New Relic** ou **Datadog**
- Métricas: tempo de resposta, throughput, erros

### 8.4 Uptime Monitoring
- **UptimeRobot** ou **Pingdom**
- Alerta se site cair

---

## 9. Ambiente de Desenvolvimento

### 9.1 Docker Compose (Desenvolvimento Local)
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: valiosa
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - '5432:5432'

  redis:
    image: redis:7
    ports:
      - '6379:6379'

  backend:
    build: ./backend
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/valiosa
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - '3001:3000'
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3000
```

### 9.2 Variáveis de Ambiente (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/valiosa

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=seu-secret-super-seguro
JWT_REFRESH_SECRET=outro-secret

# APIs
MELHOR_ENVIO_TOKEN=...
MERCADO_PAGO_ACCESS_TOKEN=...
CLOUDINARY_CLOUD_NAME=...
OPENAI_API_KEY=...
WHATSAPP_API_TOKEN=...

# Marketplaces
MAGALU_TOKEN=...
AMAZON_REFRESH_TOKEN=...
MERCADO_LIVRE_TOKEN=...

# Google
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 10. CI/CD Pipeline

### 10.1 GitHub Actions (Exemplo)
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: docker build -t valiosa-api .

      - name: Deploy to production
        run: |
          # Deploy para AWS, DigitalOcean, etc.
```

---

## 11. Estimativa de Custos Mensais (Estimativa Inicial)

### 11.1 Infraestrutura
- **Servidor:** R$ 200 - R$ 800/mês (DigitalOcean, AWS)
- **Banco de Dados:** R$ 100 - R$ 300/mês
- **CDN/Imagens:** R$ 50 - R$ 200/mês (Cloudinary)
- **Monitoramento:** R$ 50 - R$ 150/mês (Sentry, New Relic)

### 11.2 APIs e Integrações
- **WhatsApp (Twilio):** R$ 0,10 por mensagem enviada
- **Melhor Envio:** Sem custo fixo (paga pelo frete)
- **Mercado Pago:** 4% a 5% por transação
- **Hub de Marketplaces:** R$ 50 - R$ 500/mês

### 11.3 Total Estimado
**R$ 450 a R$ 2.000/mês** (varia conforme escala)

---

## Próximos Passos
1. Definir MVP (funcionalidades essenciais para lançar)
2. Criar cronograma de desenvolvimento
3. Configurar ambiente de desenvolvimento
4. Iniciar desenvolvimento em sprints
