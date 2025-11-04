# Valiosa Joias - Frontend

## 🎨 Tecnologias Utilizadas

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Context API** para gerenciamento de estado

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 14+)
│   │   ├── layout.tsx         # Layout principal com Providers
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Estilos globais + Design System
│   │   ├── produtos/          # Página de produtos
│   │   ├── carrinho/          # Carrinho de compras
│   │   ├── checkout/          # Processo de checkout
│   │   ├── conta/             # Área do cliente
│   │   └── admin/             # Dashboard administrativo
│   │
│   ├── components/
│   │   ├── ui/                # Componentes reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Badge.tsx
│   │   └── layout/            # Componentes de layout
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   │
│   ├── contexts/              # Context API
│   │   ├── CartContext.tsx    # Carrinho de compras
│   │   └── SiteConfigContext.tsx  # Configurações do site (banners, logo)
│   │
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilitários e helpers
│   ├── styles/                # Estilos adicionais
│   └── types/                 # TypeScript types/interfaces
│
├── public/                    # Arquivos estáticos
└── package.json
```

## 🎨 Design System

### Paleta de Cores

**Dourado (Gold)** - Cor principal premium
- `--gold-500: #D4AF37` - Dourado principal
- Variações: gold-50 até gold-900

**Prata (Silver)** - Sofisticação
- `--silver-500: #6C757D`
- Variações: silver-50 até silver-900

**Rose Gold** - Toque feminino
- `--rose-gold: #B76E79`

**Neutras**
- Escala de cinzas de neutral-50 até neutral-900

**Estados**
- `--success: #10B981` (Verde)
- `--error: #EF4444` (Vermelho)
- `--warning: #F59E0B` (Laranja)
- `--info: #3B82F6` (Azul)

### Tipografia

- **Font Family**: Sans-serif system font
- **Heading Sizes**: h1 (3rem) até h6 (1rem)
- **Line Height**: 1.6 (corpo), 1.2 (headings)

### Espaçamentos

Baseado em 8px:
- `--spacing-xs`: 0.5rem (8px)
- `--spacing-sm`: 1rem (16px)
- `--spacing-md`: 1.5rem (24px)
- `--spacing-lg`: 2rem (32px)
- `--spacing-xl`: 3rem (48px)
- `--spacing-2xl`: 4rem (64px)

### Border Radius

- `--radius-sm`: 0.25rem
- `--radius-md`: 0.5rem
- `--radius-lg`: 1rem
- `--radius-full`: 9999px

### Shadows

- `--shadow-sm`: Sombra leve
- `--shadow-md`: Sombra média
- `--shadow-lg`: Sombra grande
- `--shadow-xl`: Sombra extra grande

### Transitions

- `--transition-fast`: 150ms ease
- `--transition-normal`: 300ms ease
- `--transition-slow`: 500ms ease

## 🛠️ Componentes Base

### Button

Variantes: `primary`, `secondary`, `outline`, `ghost`
Tamanhos: `sm`, `md`, `lg`

```tsx
<Button variant="primary" size="lg" fullWidth loading={false}>
  Texto do Botão
</Button>
```

### Card

Componente de card com hover animado

```tsx
<Card hover={true} onClick={() => {}}>
  Conteúdo
</Card>
```

### Input

Input com label, erro e helper text

```tsx
<Input
  label="Nome"
  error="Campo obrigatório"
  helperText="Digite seu nome completo"
  fullWidth
/>
```

### Badge

Variantes: `gold`, `silver`, `success`, `error`, `warning`, `info`

```tsx
<Badge variant="gold" size="md">
  Novidade
</Badge>
```

## 🎯 Funcionalidades Implementadas

### 1. Homepage

✅ Carrossel de banners dinâmicos
✅ Grade de categorias
✅ Produtos em destaque
✅ Seção de benefícios (frete, garantia, pagamento)
✅ Hero section responsivo

### 2. Header

✅ Logo dinâmico (gerenciado pelo Context)
✅ Busca de produtos
✅ Ícones de usuário, favoritos e carrinho
✅ Menu de navegação
✅ Contador de itens no carrinho
✅ Responsivo com menu mobile

### 3. Footer

✅ Logo dinâmico
✅ Links rápidos
✅ Newsletter
✅ Redes sociais
✅ Formas de pagamento
✅ Copyright e links legais

### 4. Carrinho de Compras (Context)

✅ Adicionar produtos
✅ Remover produtos
✅ Atualizar quantidade
✅ Calcular total
✅ Persistência em localStorage
✅ Contador de itens

### 5. Configurações do Site (Context)

✅ Logo dinâmico
✅ Favicon dinâmico
✅ Banners do carrossel (CRUD)
✅ Agendamento de banners por data
✅ Gerenciamento de categorias

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção
npm start
```

## 📝 Próximos Passos

### Sistema de Upload (Pendente)

- [ ] Componente de upload de imagens
- [ ] Integração com Cloudinary/AWS S3
- [ ] Preview de imagens antes do upload
- [ ] Crop e redimensionamento
- [ ] Dashboard para gerenciar banners/logo

### Páginas a Desenvolver

- [ ] `/produtos` - Listagem com filtros
- [ ] `/produtos/[id]` - Detalhes do produto
- [ ] `/carrinho` - Página do carrinho
- [ ] `/checkout` - Processo de pagamento
- [ ] `/conta` - Área do cliente
- [ ] `/admin` - Dashboard administrativo
- [ ] Páginas institucionais (Sobre, Contato, FAQ)

### Funcionalidades

- [ ] Integração com API backend
- [ ] Sistema de autenticação (JWT)
- [ ] Integração Mercado Pago
- [ ] Cálculo de frete (Melhor Envio)
- [ ] Sistema de avaliações
- [ ] Wishlist/Favoritos
- [ ] Filtros de produtos
- [ ] Busca avançada
- [ ] Zoom em imagens de produtos

## 📦 Dependências

```json
{
  "dependencies": {
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "next": "16.0.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.0.1"
  }
}
```

## 🎨 Classes CSS Utilitárias

### Containers

```css
.container /* Max-width 1280px, padding responsivo */
```

### Botões

```css
.btn
.btn-primary
.btn-secondary
.btn-outline
```

### Cards

```css
.card /* Card com shadow e hover */
```

### Badges

```css
.badge
.badge-gold
.badge-silver
.badge-success
.badge-error
```

## 🔥 Features Especiais

### 1. Logo e Banners Dinâmicos

O cliente pode alterar o logo e os banners através do dashboard administrativo.
Esses dados são gerenciados pelo `SiteConfigContext` e podem ser persistidos via API.

### 2. Carrossel Automático

O carrossel de banners tem navegação automática (pode ser implementada) e manual com setas e dots.

### 3. Carrinho Persistente

O carrinho é salvo no localStorage, mantendo os itens mesmo após fechar o navegador.

### 4. Design Responsivo

Todo o layout é responsivo e otimizado para mobile, tablet e desktop.

### 5. Animações Suaves

Transições e hover effects em toda a interface para uma experiência premium.

## 🛡️ Boas Práticas

- ✅ TypeScript para type safety
- ✅ Context API para estado global
- ✅ Componentização
- ✅ Separação de concerns
- ✅ Código limpo e comentado
- ✅ Design System consistente
- ✅ Acessibilidade (focus states, alt texts)
- ✅ Performance (lazy loading, optimized images)

## 🎯 Objetivos de UX

1. **Elegância**: Design sofisticado com cores gold e silver
2. **Simplicidade**: Interface limpa e fácil de navegar
3. **Confiança**: Badges de segurança, garantia e frete grátis
4. **Performance**: Carregamento rápido e transições suaves
5. **Mobile-first**: Experiência otimizada para mobile

## 📸 Screenshots

(Adicionar screenshots após rodar o projeto)

## 💡 Dicas

- Use as classes `.container` para manter o conteúdo centralizado
- Aproveite as variáveis CSS para customização
- Os componentes em `components/ui` são reutilizáveis
- Use o `useSiteConfig()` hook para acessar banners/logo
- Use o `useCart()` hook para gerenciar o carrinho

## 🐛 Troubleshooting

### Erros comuns

**Erro: "Module not found"**
- Verifique se todas as dependências estão instaladas: `npm install`

**Erro: "Cannot find module '@/components/...'"**
- O alias `@/` está configurado para apontar para `src/`
- Verifique o `tsconfig.json`

**Imagens não carregam**
- Certifique-se de que as URLs das imagens são válidas
- Para imagens externas (Unsplash), adicione ao `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

---

**Desenvolvido com ❤️ por Claude Code**
