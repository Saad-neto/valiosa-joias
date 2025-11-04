# Integração com Marketplaces - E-commerce de Joias

## 1. Visão Geral

### 1.1 Por que integrar com marketplaces?
- **Alcance:** Milhões de compradores já navegando nessas plataformas
- **Credibilidade:** Confiança da marca do marketplace
- **Diversificação:** Não depender apenas do site próprio
- **Aumento de vendas:** Múltiplos canais de venda

### 1.2 Principais Marketplaces no Brasil
1. **Mercado Livre** (maior marketplace do Brasil)
2. **Amazon Brasil**
3. **Magazine Luiza (Magalu)**
4. **Americanas/B2W**
5. **Shopee**
6. **Via (Casas Bahia + Ponto)**
7. **Carrefour**

### 1.3 Conceito de Hub de Integração
- **Sistema centralizado** que sincroniza:
  - Produtos
  - Estoque
  - Preços
  - Pedidos
  - Rastreamento
- Gerenciar tudo em **um único painel** (dashboard do e-commerce)
- Evitar vender produto sem estoque
- Atualização em tempo real

---

## 2. Integração com Magazine Luiza (Magalu)

### 2.1 Como Funciona
- Magazine Luiza oferece API para sellers
- Modelo: **Marketplace Magalu**
- Você vende, Magalu intermedia e cobra comissão

### 2.2 Requisitos para Vender no Magalu
- CNPJ ativo
- Inscrição Estadual
- Conta bancária PJ
- Certificado digital e-CNPJ (para nota fiscal)
- Aprovação do Magalu (análise de cadastro)

### 2.3 Comissões e Taxas
- **Comissão:** 10% a 18% sobre o valor do produto (varia por categoria)
- **Joias:** comissão aproximada de 15%
- Repasse: recebe em 14 a 30 dias após entrega confirmada

### 2.4 API do Magalu
Documentação oficial: https://api-marketplace.magalu.com/

**Endpoints principais:**
- `POST /products` - Cadastrar produto
- `PUT /products/{id}` - Atualizar produto
- `GET /orders` - Buscar pedidos
- `PUT /orders/{id}/invoice` - Enviar nota fiscal
- `PUT /orders/{id}/tracking` - Atualizar rastreamento
- `PUT /stocks/{sku}` - Atualizar estoque

### 2.5 Fluxo de Integração

#### 2.5.1 Cadastro de Produtos
1. No dashboard do e-commerce, marcar produto para vender no Magalu
2. Sistema envia produto via API:
   - Título
   - Descrição
   - Preço
   - Estoque
   - Fotos (até 8 imagens)
   - Categoria
   - Atributos (peso, material, etc.)
3. Magalu analisa e aprova
4. Produto fica disponível no marketplace

#### 2.5.2 Sincronização de Estoque
- Cliente compra no Magalu → estoque diminui automaticamente no sistema
- Cliente compra no site próprio → estoque diminui no Magalu
- **Sincronização bidirecional em tempo real**

#### 2.5.3 Gestão de Pedidos
1. Cliente compra no Magalu
2. Pedido chega via API no dashboard do e-commerce
3. Notification: "Novo pedido do Magalu"
4. Processar pedido:
   - Emitir nota fiscal
   - Enviar NF-e via API para Magalu
   - Despachar produto
   - Informar código de rastreamento via API
5. Magalu repassa valor após confirmação de entrega

---

## 3. Integração com Amazon Brasil

### 3.1 Como Funciona
- Modelo: **Amazon Marketplace**
- Você é um "seller" da Amazon
- Amazon cobra comissão por venda

### 3.2 Requisitos
- CNPJ ativo
- Conta bancária PJ
- Inscrição no programa Amazon Seller Central
- Aprovação da Amazon

### 3.3 Comissões
- **Joias e Acessórios:** 15% de comissão
- Custo adicional: Amazon pode cobrar taxa de armazenamento (se usar FBA)

### 3.4 Modelos de Venda

#### 3.4.1 FBM (Fulfilled by Merchant)
- **Você** armazena e envia os produtos
- Menor custo
- Mais controle

#### 3.4.2 FBA (Fulfilled by Amazon)
- Você envia estoque para **centro de distribuição da Amazon**
- Amazon armazena, embala e envia para o cliente
- Frete mais rápido (Prime)
- Maior custo, mas maior conversão

**Recomendação para joias:** FBM (você envia), pois joias são produtos de alto valor e delicados.

### 3.5 API da Amazon (SP-API)
Documentação: https://developer-docs.amazon.com/sp-api/

**Endpoints principais:**
- `POST /catalog/2022-04-01/items` - Cadastrar produto
- `GET /orders/v0/orders` - Buscar pedidos
- `POST /fulfillment/outbound/2020-07-01/fulfillmentOrders` - Criar ordem de envio
- `PUT /listings/2021-08-01/items/{sku}` - Atualizar listagem

### 3.6 Fluxo de Integração
Similar ao Magalu:
1. Cadastrar produtos via API
2. Sincronizar estoque
3. Receber pedidos
4. Enviar rastreamento
5. Receber pagamento

---

## 4. Integração com Mercado Livre

### 4.1 Por que integrar?
- **Maior marketplace da América Latina**
- Alcance massivo
- Confiança consolidada

### 4.2 Comissões
- **Joias:** 11% a 16% de comissão (depende do volume)
- **Mercado Envios:** taxa adicional de frete (se usar)

### 4.3 API do Mercado Livre
Documentação: https://developers.mercadolivre.com.br/

**Endpoints principais:**
- `POST /items` - Cadastrar produto
- `PUT /items/{id}` - Atualizar produto
- `GET /orders/search` - Buscar pedidos
- `POST /shipments/{id}/tracking` - Atualizar rastreamento

### 4.4 Recursos do Mercado Livre
- **Mercado Pago integrado** (pagamento facilitado)
- **Mercado Envios** (logística do ML)
- **Anúncios pagos** (impulsionar produtos)
- **Mercado Shops** (loja dentro do ML)

---

## 5. Outras Integrações

### 5.1 Shopee
- Crescimento rápido no Brasil
- Público: mais jovem, busca preços baixos
- Comissão: 2% a 5% (uma das menores)
- API disponível: https://open.shopee.com/

### 5.2 Americanas/B2W
- Marketplaces: Americanas, Submarino, Shoptime
- API única para os 3: https://api-marketplace.b2w.io/
- Comissão: 12% a 18%

### 5.3 Via (Casas Bahia + Ponto)
- Grande alcance
- Público: classe C e D
- Comissão: 15% a 20%

---

## 6. Hub de Integração (ERP Omnichannel)

### 6.1 O que é?
Sistema centralizado que conecta:
- Seu e-commerce
- Todos os marketplaces
- Gestão de estoque unificada

### 6.2 Soluções Prontas (SaaS)

#### 6.2.1 Bling
- https://www.bling.com.br/
- **Preço:** A partir de R$ 50/mês
- **Integrações:** Magalu, Amazon, Mercado Livre, Shopee, etc.
- **Funcionalidades:**
  - Sincronização de estoque
  - Importação de pedidos
  - Emissão de notas fiscais
  - Gestão financeira

#### 6.2.2 Tiny ERP
- https://www.tiny.com.br/
- **Preço:** A partir de R$ 50/mês
- Similar ao Bling

#### 6.2.3 Anymarket
- https://anymarket.com.br/
- **Preço:** A partir de R$ 149/mês
- Mais robusto, para operações maiores

#### 6.2.4 Olist
- https://olist.com/
- Focado em onboarding nos marketplaces
- Cuida de toda integração por você

#### 6.2.5 Sistema Próprio (Desenvolvimento Customizado)
- Desenvolver hub próprio
- Maior controle e personalização
- Custo de desenvolvimento inicial maior
- Vantagem: sem mensalidade de terceiros

### 6.3 Funcionalidades Essenciais do Hub

#### 6.3.1 Dashboard Unificado
- Ver todos os canais em uma tela:
  - Site próprio
  - Magalu
  - Amazon
  - Mercado Livre
- Métricas:
  - Total de vendas
  - Vendas por canal
  - Produtos mais vendidos por canal
  - Estoque unificado

#### 6.3.2 Gestão de Produtos
- Cadastrar produto uma vez
- Publicar em múltiplos marketplaces
- Ajustar informações específicas por canal:
  - Preço diferente (ex: Amazon mais caro que site próprio)
  - Título otimizado por marketplace
  - Descrição adaptada

#### 6.3.3 Sincronização de Estoque
- **Tempo real:**
  - Vendeu 1 anel no Magalu → estoque diminui no site e Amazon
  - Vendeu 1 anel no site → estoque diminui no Magalu e Amazon
- **Regras de segurança:**
  - Manter X unidades de reserva
  - Pausar anúncio se estoque < 2 unidades

#### 6.3.4 Gestão de Pedidos Centralizada
- Todos os pedidos em uma lista:
  - Pedidos do site próprio
  - Pedidos do Magalu
  - Pedidos da Amazon
  - Pedidos do Mercado Livre
- Filtros:
  - Por status (pendente, enviado, entregue)
  - Por canal
  - Por data
- Ações em lote:
  - Marcar vários como enviados
  - Imprimir etiquetas

#### 6.3.5 Emissão de Notas Fiscais
- Integração com sistemas fiscais:
  - Focus NFe
  - Enotas
  - PlugNotas
- Emitir NF automaticamente ao confirmar pedido
- Enviar XML da NF para o marketplace via API

#### 6.3.6 Gestão de Preços
- Ajustar preço de todos os canais de uma vez
- Ou ajustar preço individualizado
- Regras automáticas:
  - "Amazon sempre 5% mais caro que site próprio"
  - "Magalu desconto de 10% em relação ao site"

#### 6.3.7 Reprecificação Inteligente
- Monitorar concorrência
- Ajustar preço automaticamente para se manter competitivo
- Ferramentas: Buscapé, Zoom, ou própria

---

## 7. Fluxo Completo de Venda Omnichannel

### 7.1 Cenário 1: Venda no Site Próprio
1. Cliente compra anel no site
2. Sistema registra pedido
3. **Hub sincroniza:** estoque diminui em todos os canais (Magalu, Amazon, ML)
4. Pedido processado normalmente

### 7.2 Cenário 2: Venda no Marketplace
1. Cliente compra anel no Magalu
2. Magalu notifica via API
3. **Hub importa pedido** para dashboard do e-commerce
4. Sistema emite nota fiscal
5. NF-e enviada para Magalu via API
6. Produto despachado
7. Código de rastreamento enviado para Magalu via API
8. **Hub sincroniza:** estoque diminui no site e outros marketplaces
9. Cliente recebe produto
10. Magalu confirma entrega
11. Magalu repassa pagamento

### 7.3 Cenário 3: Venda Simultânea (Conflito de Estoque)
1. Última unidade de um anel
2. Cliente A compra no site
3. **Ao mesmo tempo**, Cliente B compra no Magalu
4. Sistema detecta conflito
5. **Ação automática:**
   - Confirma venda do Cliente A (site próprio = prioridade)
   - Cancela pedido do Cliente B no Magalu
   - Envia notificação de cancelamento
   - Marketplace reembolsa Cliente B

**Solução:** Sincronização em tempo real para evitar isso.

---

## 8. Desafios e Soluções

### 8.1 Desafio: Diferentes Políticas de Devolução
- Site próprio: 30 dias
- Amazon: 30 dias
- Magalu: 7 dias (por lei)

**Solução:** Deixar claro no marketplace a política específica.

### 8.2 Desafio: Comissões Diferentes
- Produto precisa ter margem suficiente
- Calcular preço considerando comissão

**Solução:**
- Preço no marketplace pode ser maior (para cobrir comissão)
- Ou aceitar margem menor pela visibilidade

### 8.3 Desafio: Prazo de Entrega
- Marketplaces exigem prazos competitivos
- Joias podem ter fabricação sob encomenda

**Solução:**
- Vender apenas itens em estoque nos marketplaces
- Ou informar prazo maior (pode reduzir conversão)

### 8.4 Desafio: Fotos e Descrições
- Cada marketplace tem regras diferentes
- Amazon exige fundo branco
- Mercado Livre permite mais criatividade

**Solução:**
- Ter banco de imagens variado
- Adaptar conteúdo por canal

---

## 9. Estratégia de Precificação Omnichannel

### 9.1 Modelo 1: Preço Único
- Mesmo preço em todos os canais
- Simplicidade
- Menor margem nos marketplaces (devido à comissão)

### 9.2 Modelo 2: Preço Diferenciado
- Site próprio: preço base (melhor)
- Marketplaces: preço maior (para cobrir comissão)
- **Risco:** cliente comparar e escolher site próprio sempre

### 9.3 Modelo 3: Produtos Exclusivos
- Alguns produtos só no site próprio
- Outros produtos só nos marketplaces
- **Estratégia:** atrair cliente do marketplace para conhecer site próprio

---

## 10. Métricas de Sucesso

### 10.1 KPIs por Canal
- **Vendas por canal:**
  - Site próprio: R$ X
  - Magalu: R$ Y
  - Amazon: R$ Z

- **Taxa de conversão por canal:**
  - Site: 2%
  - Magalu: 5% (marketplace tem mais tráfego)
  - Amazon: 8%

- **Ticket médio por canal**

- **CAC (Custo de Aquisição de Cliente) por canal**

### 10.2 Dashboard de Performance
- Gráfico: Vendas por canal (últimos 30 dias)
- Qual canal está crescendo mais?
- Qual canal tem maior margem?
- Onde investir mais (estoque, anúncios)?

---

## 11. Cronograma de Implementação

### 11.1 Fase 1 (Mês 1-2): Preparação
- Escolher hub de integração (Bling, Tiny, ou desenvolvimento próprio)
- Cadastrar CNPJ nos marketplaces
- Aprovação dos marketplaces
- Configurar integrações

### 11.2 Fase 2 (Mês 3): Primeiro Marketplace
- Começar com **Mercado Livre** (mais fácil e popular)
- Cadastrar 20-50 produtos
- Testar fluxo completo
- Ajustar processos

### 11.3 Fase 3 (Mês 4): Segundo Marketplace
- Adicionar **Magazine Luiza**
- Expandir catálogo
- Otimizar sincronização de estoque

### 11.4 Fase 4 (Mês 5): Terceiro Marketplace
- Adicionar **Amazon**
- Avaliar performance dos 3 canais
- Decidir se vale a pena adicionar mais

### 11.5 Fase 5 (Mês 6+): Expansão
- Shopee, Americanas, Via (se fizer sentido)
- Otimização contínua
- Anúncios pagos nos marketplaces

---

## 12. Custos Estimados

### 12.1 Hub de Integração (SaaS)
- **Bling/Tiny:** R$ 50 a R$ 200/mês
- **Anymarket:** R$ 149 a R$ 500/mês
- **Olist:** Sob consulta

### 12.2 Desenvolvimento Próprio
- **Custo inicial:** R$ 20.000 a R$ 50.000
- **Vantagem:** Sem mensalidade
- **Desvantagem:** Manutenção e atualizações por sua conta

### 12.3 Comissões dos Marketplaces
- 10% a 18% sobre cada venda
- **Importante:** Incluir no preço

### 12.4 Ferramentas Auxiliares
- **Nota fiscal eletrônica:** R$ 30 a R$ 100/mês
- **Reprecificação:** R$ 50 a R$ 200/mês (opcional)

---

## 13. Checklist de Integração

### 13.1 Antes de Começar
- [ ] CNPJ ativo e regularizado
- [ ] Inscrição Estadual
- [ ] Certificado digital e-CNPJ
- [ ] Conta bancária PJ
- [ ] Sistema de nota fiscal eletrônica
- [ ] Estoque organizado
- [ ] Fotos profissionais dos produtos
- [ ] Descrições otimizadas

### 13.2 Cadastro nos Marketplaces
- [ ] Criar conta no Mercado Livre
- [ ] Criar conta no Magazine Luiza Marketplace
- [ ] Criar conta no Amazon Seller Central
- [ ] Aguardar aprovação (pode levar 7 a 15 dias)

### 13.3 Configuração Técnica
- [ ] Escolher hub de integração
- [ ] Conectar APIs dos marketplaces
- [ ] Testar sincronização de estoque
- [ ] Testar importação de pedidos
- [ ] Testar emissão de NF
- [ ] Testar envio de rastreamento

### 13.4 Cadastro de Produtos
- [ ] Definir quais produtos vender em cada marketplace
- [ ] Adaptar fotos e descrições
- [ ] Definir preços
- [ ] Cadastrar produtos via hub
- [ ] Aguardar aprovação dos produtos

### 13.5 Operação
- [ ] Processar pedidos
- [ ] Emitir notas fiscais
- [ ] Despachar produtos
- [ ] Enviar rastreamento
- [ ] Monitorar avaliações dos clientes
- [ ] Responder dúvidas no marketplace

---

## 14. Recomendações Finais

### 14.1 Comece Pequeno
- Não integre com todos os marketplaces de uma vez
- Comece com 1 ou 2
- Aprenda o processo
- Depois expanda

### 14.2 Priorize Marketplaces por:
1. **Volume de tráfego** (Mercado Livre é gigante)
2. **Comissão** (Shopee tem menor comissão)
3. **Público-alvo** (Amazon tem público com maior poder aquisitivo)

### 14.3 Invista em Anúncios
- Apenas estar no marketplace não garante vendas
- Invista em anúncios patrocinados:
  - Mercado Livre Ads
  - Amazon Sponsored Products
  - Magalu Ads

### 14.4 Monitore Avaliações
- Marketplaces vivem de reputação
- Responda todas as dúvidas rapidamente
- Resolva problemas com agilidade
- Incentive avaliações positivas

---

## Próximos Passos
1. Decidir qual hub de integração usar (Bling, Tiny, ou próprio)
2. Definir por qual marketplace começar
3. Preparar documentação e cadastro
4. Testar integração em ambiente de homologação
5. Lançar produtos gradualmente
