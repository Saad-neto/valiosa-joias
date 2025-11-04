'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Link from 'next/link';

type Step = 'login' | 'address' | 'payment' | 'review';

interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface PaymentMethod {
  type: 'credit' | 'pix' | 'boleto';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>('login');
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<Address>({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });
  const [payment, setPayment] = useState<PaymentMethod>({
    type: 'credit',
  });

  const shippingCost = total >= 500 ? 0 : 25;
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <svg className="w-24 h-24 text-neutral-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
          <Link href="/produtos">
            <Button variant="primary" size="lg">Ver Produtos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    setStep('address');
  };

  const handleAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.cep || !address.street || !address.number || !address.city || !address.state) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    setStep('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (payment.type === 'credit') {
      if (!payment.cardNumber || !payment.cardName || !payment.cardExpiry || !payment.cardCvv) {
        alert('Por favor, preencha todos os dados do cartão');
        return;
      }
    }
    setStep('review');
  };

  const handleFinish = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock order
    const order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items,
      total: finalTotal,
      customer: { email, name, phone },
      address,
      payment,
      date: new Date().toISOString(),
    };

    console.log('Pedido criado:', order);

    // Clear cart
    clearCart();

    // Redirect to success page
    alert(`Pedido #${order.id} realizado com sucesso! Em um app real, você seria redirecionado para a página de confirmação.`);
    router.push('/');
  };

  const steps = [
    { id: 'login', label: 'Identificação', icon: '1' },
    { id: 'address', label: 'Endereço', icon: '2' },
    { id: 'payment', label: 'Pagamento', icon: '3' },
    { id: 'review', label: 'Revisão', icon: '4' },
  ];

  const stepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                      index <= stepIndex
                        ? 'bg-gold-500 text-white'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span className={`text-sm font-medium ${index <= stepIndex ? 'text-gold-500' : 'text-neutral-400'}`}>
                    {s.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors ${
                      index < stepIndex ? 'bg-gold-500' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card hover={false}>
              {/* Step 1: Login */}
              {step === 'login' && (
                <form onSubmit={handleLogin}>
                  <h2 className="text-2xl font-bold mb-6">Identificação</h2>
                  <div className="space-y-4">
                    <Input
                      label="E-mail"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      required
                    />
                    <Input
                      label="Nome Completo"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                    <Input
                      label="Telefone"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                      required
                    />
                    <div className="pt-4">
                      <Button type="submit" variant="primary" size="lg" fullWidth>
                        Continuar
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: Address */}
              {step === 'address' && (
                <form onSubmit={handleAddress}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Endereço de Entrega</h2>
                    <button
                      type="button"
                      onClick={() => setStep('login')}
                      className="text-sm text-gold-500 hover:underline"
                    >
                      Voltar
                    </button>
                  </div>
                  <div className="space-y-4">
                    <Input
                      label="CEP"
                      placeholder="00000-000"
                      value={address.cep}
                      onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                      fullWidth
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Input
                          label="Rua"
                          placeholder="Nome da rua"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          fullWidth
                          required
                        />
                      </div>
                      <Input
                        label="Número"
                        placeholder="123"
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        fullWidth
                        required
                      />
                    </div>
                    <Input
                      label="Complemento"
                      placeholder="Apto, Bloco, etc (opcional)"
                      value={address.complement}
                      onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                      fullWidth
                    />
                    <Input
                      label="Bairro"
                      placeholder="Bairro"
                      value={address.neighborhood}
                      onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                      fullWidth
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Input
                          label="Cidade"
                          placeholder="Cidade"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          fullWidth
                          required
                        />
                      </div>
                      <Input
                        label="Estado"
                        placeholder="UF"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        fullWidth
                        required
                      />
                    </div>
                    <div className="pt-4">
                      <Button type="submit" variant="primary" size="lg" fullWidth>
                        Continuar
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 3: Payment */}
              {step === 'payment' && (
                <form onSubmit={handlePayment}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Forma de Pagamento</h2>
                    <button
                      type="button"
                      onClick={() => setStep('address')}
                      className="text-sm text-gold-500 hover:underline"
                    >
                      Voltar
                    </button>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPayment({ type: 'credit' })}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        payment.type === 'credit'
                          ? 'border-gold-500 bg-gold-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <p className="text-sm font-medium">Cartão</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPayment({ type: 'pix' })}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        payment.type === 'pix'
                          ? 'border-gold-500 bg-gold-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium">PIX</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPayment({ type: 'boleto' })}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        payment.type === 'boleto'
                          ? 'border-gold-500 bg-gold-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                      </svg>
                      <p className="text-sm font-medium">Boleto</p>
                    </button>
                  </div>

                  {/* Credit Card Form */}
                  {payment.type === 'credit' && (
                    <div className="space-y-4">
                      <Input
                        label="Número do Cartão"
                        placeholder="0000 0000 0000 0000"
                        value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                        fullWidth
                        required
                      />
                      <Input
                        label="Nome no Cartão"
                        placeholder="Nome como está no cartão"
                        value={payment.cardName}
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                        fullWidth
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Validade"
                          placeholder="MM/AA"
                          value={payment.cardExpiry}
                          onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                          fullWidth
                          required
                        />
                        <Input
                          label="CVV"
                          placeholder="000"
                          value={payment.cardCvv}
                          onChange={(e) => setPayment({ ...payment, cardCvv: e.target.value })}
                          fullWidth
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* PIX Info */}
                  {payment.type === 'pix' && (
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <p className="text-sm text-neutral-600">
                        Após confirmar o pedido, você receberá um QR Code PIX para pagamento.
                        O pedido será processado após a confirmação do pagamento.
                      </p>
                    </div>
                  )}

                  {/* Boleto Info */}
                  {payment.type === 'boleto' && (
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <p className="text-sm text-neutral-600">
                        O boleto será gerado após a confirmação do pedido e enviado para seu e-mail.
                        Prazo de pagamento: até 3 dias úteis.
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Continuar
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 4: Review */}
              {step === 'review' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Revisão do Pedido</h2>
                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="text-sm text-gold-500 hover:underline"
                    >
                      Voltar
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Customer Info */}
                    <div>
                      <h3 className="font-semibold mb-2">Dados Pessoais</h3>
                      <div className="p-4 bg-neutral-50 rounded-lg space-y-1">
                        <p className="text-sm">{name}</p>
                        <p className="text-sm text-neutral-600">{email}</p>
                        <p className="text-sm text-neutral-600">{phone}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <p className="text-sm">
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {address.neighborhood} - {address.city}/{address.state}
                        </p>
                        <p className="text-sm text-neutral-600">CEP: {address.cep}</p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div>
                      <h3 className="font-semibold mb-2">Forma de Pagamento</h3>
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <p className="text-sm">
                          {payment.type === 'credit' && `Cartão de Crédito terminado em ${payment.cardNumber?.slice(-4)}`}
                          {payment.type === 'pix' && 'PIX'}
                          {payment.type === 'boleto' && 'Boleto Bancário'}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h3 className="font-semibold mb-2">Itens do Pedido</h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-neutral-600">Qtd: {item.quantity}</p>
                            </div>
                            <p className="font-medium">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleFinish}
                      loading={loading}
                    >
                      Finalizar Pedido
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card hover={false} className="sticky top-24">
              <h2 className="text-xl font-bold mb-4">Resumo</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                  <span className="font-medium">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Frete</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-success' : ''}`}>
                    {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gold-500">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Garantia de 12 meses</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Troca grátis em 30 dias</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
