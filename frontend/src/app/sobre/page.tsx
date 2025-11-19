import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sobre - Valiosa Joias | Nossa História e Valores',
  description: 'Conheça a história da Valiosa Joias. Elegância, qualidade e sofisticação em cada peça de joia.',
};

export default function SobrePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
              Sobre a Valiosa
            </h1>
            <p className="text-xl text-neutral-600 font-light max-w-2xl mx-auto px-4">
              Elegância em cada detalhe, sofisticação em cada joia
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-playfair text-4xl font-bold text-neutral-900 mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                A <strong className="text-neutral-900">Valiosa Joias</strong> nasceu da paixão por criar peças
                que transcendem o tempo. Cada joia é cuidadosamente selecionada para refletir elegância,
                sofisticação e qualidade excepcional.
              </p>
              <p>
                Especializados em <strong className="text-neutral-900">Prata 925</strong> e metais nobres,
                trabalhamos com os melhores materiais para garantir durabilidade e beleza em cada criação.
              </p>
              <p>
                Nossa missão é proporcionar experiências únicas através de joias que contam histórias,
                celebram momentos e expressam personalidade.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop"
              alt="Joias Valiosa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="bg-neutral-50 py-20">
        <div className="container">
          <h2 className="font-playfair text-4xl font-bold text-neutral-900 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Qualidade */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-neutral-900 mb-4">
                Qualidade Premium
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Trabalhamos apenas com os melhores materiais: Prata 925, Ouro 18k e pedras naturais
                selecionadas com rigor.
              </p>
            </div>

            {/* Elegância */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-neutral-900 mb-4">
                Design Atemporal
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Peças elegantes e sofisticadas que nunca saem de moda. Cada design é pensado para
                durar gerações.
              </p>
            </div>

            {/* Confiança */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-neutral-900 mb-4">
                Confiança e Segurança
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Certificado de autenticidade em todas as peças e garantia de satisfação. Sua confiança
                é nossa prioridade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="container py-20">
        <h2 className="font-playfair text-4xl font-bold text-neutral-900 text-center mb-12">
          Por que escolher a Valiosa?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="font-semibold text-neutral-900 mb-2">Prata 925 Certificada</h3>
            <p className="text-sm text-neutral-600">Pureza garantida em todas as peças</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-semibold text-neutral-900 mb-2">Frete Grátis</h3>
            <p className="text-sm text-neutral-600">Acima de R$ 500 para todo Brasil</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-semibold text-neutral-900 mb-2">Compra Segura</h3>
            <p className="text-sm text-neutral-600">Ambiente 100% protegido</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-semibold text-neutral-900 mb-2">Satisfação Garantida</h3>
            <p className="text-sm text-neutral-600">Trocas facilitadas em 30 dias</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-gold-50 to-neutral-50 py-20">
        <div className="container text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-900 mb-6">
            Conheça Nossa Coleção
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Explore peças únicas e encontre a joia perfeita para você ou para presentear quem você ama.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/produtos"
              className="px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors font-medium"
            >
              Ver Produtos
            </a>
            <a
              href="/contato"
              className="px-8 py-4 bg-white text-neutral-900 rounded-full hover:bg-neutral-50 transition-colors font-medium border border-neutral-200"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
