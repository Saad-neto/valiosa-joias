# Deploy no Cloudflare Pages - valiosajoias.com.br

## 📋 Pré-requisitos

1. Conta no Cloudflare (grátis): https://dash.cloudflare.com/sign-up
2. Repositório no GitHub com o código

## 🚀 Passo a Passo

### 1. Preparar o Repositório GitHub

```bash
# Já feito pelo Claude:
# - .gitignore configurado
# - next.config.ts otimizado para Cloudflare
# - .nvmrc para definir versão Node.js 20
```

### 2. Criar Projeto no Cloudflare Pages

1. Acesse: https://dash.cloudflare.com/
2. Clique em **Workers & Pages**
3. Clique em **Create application** → **Pages**
4. Conecte com GitHub
5. Selecione o repositório: `site-valiosa`

### 3. Configurações de Build

**Framework preset:** `Next.js`

**Build command:**
```bash
cd frontend && npm install && npm run build
```

**Build output directory:**
```
frontend/.next
```

**Root directory:**
```
/
```

**Node version:**
```
20
```

### 4. Variáveis de Ambiente

Adicione se necessário:
- `NODE_VERSION=20`
- Outras variáveis de API (Mercado Pago, etc.) quando configurar backend

### 5. Configurar Domínio Customizado

#### Opção A: DNS na Hostinger (Atual)

1. No Cloudflare Pages, após o deploy:
   - Vá em **Custom domains**
   - Clique **Set up a custom domain**
   - Digite: `valiosajoias.com.br`

2. O Cloudflare vai gerar registros DNS

3. Na Hostinger (DNS), adicione os registros:
   ```
   CNAME  @  seu-projeto.pages.dev
   CNAME  www  seu-projeto.pages.dev
   ```

#### Opção B: Transferir DNS para Cloudflare (Recomendado)

1. No Cloudflare, adicione o site:
   - **Add site** → `valiosajoias.com.br`
   - Plano **Free**

2. Cloudflare vai escanear os DNS atuais

3. Anote os nameservers do Cloudflare:
   ```
   exemplo1.ns.cloudflare.com
   exemplo2.ns.cloudflare.com
   ```

4. Na Hostinger, altere os nameservers:
   - **DNS / Nameservers** → **Alterar nameservers**
   - Cole os nameservers do Cloudflare

5. Aguarde propagação (2-48h, geralmente 2-6h)

6. No Cloudflare Pages:
   - **Custom domains** → Add `valiosajoias.com.br`
   - Será configurado automaticamente!

## ✅ Após Deploy

1. Acesse: `https://valiosajoias.com.br`
2. SSL será automático (Let's Encrypt via Cloudflare)
3. CDN global ativo
4. Cada push no GitHub = deploy automático

## 🔧 Configurações Adicionais Recomendadas

### No Cloudflare (depois do domínio configurado):

1. **SSL/TLS** → Full (strict)
2. **Speed** → Optimization:
   - Auto Minify: HTML, CSS, JS
   - Brotli: On
   - Early Hints: On
3. **Caching** → Configuration:
   - Caching Level: Standard
4. **Security**:
   - Security Level: Medium
   - WAF: Managed rules (free)

## 🌍 URLs

- **Produção:** https://valiosajoias.com.br
- **Preview:** https://[seu-projeto].pages.dev
- **Branch preview:** Automático para cada branch

## 📊 Monitoramento

- **Analytics:** Cloudflare Dashboard → Analytics
- **Logs:** Workers & Pages → [seu-projeto] → Logs
- **Build logs:** Ver histórico de deploys

## ❓ Problemas Comuns

### Build falha
- Verificar se `npm install` funciona localmente
- Verificar versão do Node (deve ser 20)
- Verificar logs de build no Cloudflare

### Domínio não resolve
- Aguardar propagação DNS (até 48h)
- Verificar registros DNS no Cloudflare/Hostinger
- Testar com: `nslookup valiosajoias.com.br`

### Imagens não carregam
- Já configurado `unoptimized: true` no next.config.ts
- Usar `next/image` com loader customizado se necessário

## 🎯 Próximos Passos

1. [ ] Deploy no Cloudflare Pages ✓
2. [ ] Configurar domínio customizado
3. [ ] Configurar backend (API)
4. [ ] Configurar integrações (Mercado Pago, Melhor Envio)
5. [ ] Configurar Analytics (Google Analytics 4)
