'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { mockProducts } from '@/lib/mockData';

export default function AdminDashboard() {
  // Mock data
  const stats = [
    {
      label: 'Vendas do Mês',
      value: 'R$ 45.890,00',
      change: '+12.5%',
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Pedidos',
      value: '127',
      change: '+8.2%',
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      label: 'Ticket Médio',
      value: 'R$ 361,02',
      change: '+3.1%',
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Conversão',
      value: '2.4%',
      change: '-0.3%',
      positive: false,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Ana Silva', total: 2499.90, status: 'Pago', date: '28/10/2025' },
    { id: '#1233', customer: 'Carlos Santos', total: 1899.90, status: 'Processando', date: '28/10/2025' },
    { id: '#1232', customer: 'Maria Oliveira', total: 3299.90, status: 'Enviado', date: '27/10/2025' },
    { id: '#1231', customer: 'João Costa', total: 899.90, status: 'Entregue', date: '27/10/2025' },
    { id: '#1230', customer: 'Paula Lima', total: 1799.90, status: 'Pago', date: '26/10/2025' },
  ];

  const topProducts = mockProducts.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-neutral-600">Visão geral do seu e-commerce</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} hover={false}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold mb-2">{stat.value}</p>
                <Badge variant={stat.positive ? 'success' : 'error'} size="sm">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-gold-500">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pedidos Recentes</h2>
            <a href="/admin/pedidos" className="text-sm text-gold-500 hover:underline">
              Ver todos
            </a>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-neutral-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                  <Badge
                    variant={
                      order.status === 'Entregue'
                        ? 'success'
                        : order.status === 'Pago'
                        ? 'info'
                        : 'silver'
                    }
                    size="sm"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Produtos Mais Vendidos</h2>
            <a href="/admin/produtos" className="text-sm text-gold-500 hover:underline">
              Ver todos
            </a>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <div className="w-8 text-center font-bold text-neutral-400">
                  #{index + 1}
                </div>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-neutral-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gold-500">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-neutral-600">{product.reviewCount} vendas</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card hover={false} className="mt-8">
        <h2 className="text-xl font-bold mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/produtos"
            className="p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors text-center"
          >
            <svg className="w-8 h-8 mx-auto mb-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="font-medium">Novo Produto</p>
          </a>

          <a
            href="/admin/media"
            className="p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors text-center"
          >
            <svg className="w-8 h-8 mx-auto mb-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-medium">Gerenciar Mídia</p>
          </a>

          <a
            href="/admin/pedidos"
            className="p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors text-center"
          >
            <svg className="w-8 h-8 mx-auto mb-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="font-medium">Ver Pedidos</p>
          </a>

          <a
            href="/"
            className="p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors text-center"
          >
            <svg className="w-8 h-8 mx-auto mb-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <p className="font-medium">Visualizar Site</p>
          </a>
        </div>
      </Card>
    </div>
  );
}
