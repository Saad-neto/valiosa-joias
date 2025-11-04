'use client';

import { useState } from 'react';
import { useSiteConfig, Banner } from '@/contexts/SiteConfigContext';
import ImageUpload from '@/components/ui/ImageUpload';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

export default function MediaPage() {
  const { config, updateLogo, addBanner, removeBanner, updateBanner } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'logo' | 'banners'>('logo');
  const [showAddBanner, setShowAddBanner] = useState(false);

  // New banner state
  const [newBanner, setNewBanner] = useState<Partial<Banner>>({
    title: '',
    subtitle: '',
    link: '',
    active: true,
    order: config.banners.length + 1,
  });

  const handleLogoUpload = (file: File, preview: string) => {
    // In a real app, you would upload to a server/CDN first
    // For now, we'll just update with the preview URL
    updateLogo(preview);
    alert('Logo atualizado com sucesso!');
  };

  const handleBannerImageUpload = (file: File, preview: string) => {
    setNewBanner({ ...newBanner, image: preview });
  };

  const handleAddBanner = () => {
    if (!newBanner.image || !newBanner.title) {
      alert('Por favor, adicione uma imagem e um título');
      return;
    }

    const banner: Banner = {
      id: Date.now().toString(),
      image: newBanner.image!,
      title: newBanner.title!,
      subtitle: newBanner.subtitle,
      link: newBanner.link,
      active: newBanner.active!,
      order: newBanner.order!,
    };

    addBanner(banner);
    setNewBanner({
      title: '',
      subtitle: '',
      link: '',
      active: true,
      order: config.banners.length + 2,
    });
    setShowAddBanner(false);
    alert('Banner adicionado com sucesso!');
  };

  const toggleBannerStatus = (banner: Banner) => {
    updateBanner(banner.id, { active: !banner.active });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gerenciar Mídia</h1>
        <p className="text-neutral-600">
          Gerencie o logo e os banners do carrossel da página inicial
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('logo')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'logo'
                ? 'text-gold-500 border-b-2 border-gold-500'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Logo
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'banners'
                ? 'text-gold-500 border-b-2 border-gold-500'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Banners do Carrossel
          </button>
        </div>
      </div>

      {/* Logo Tab */}
      {activeTab === 'logo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card hover={false}>
            <h2 className="text-xl font-bold mb-4">Alterar Logo</h2>
            <ImageUpload
              onUpload={handleLogoUpload}
              currentImage={config.logo}
              label="Logo do Site"
              maxSize={2}
              aspectRatio="2/1"
            />
            <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-600">
                <strong>Dica:</strong> Use uma imagem com fundo transparente (PNG) para
                melhor resultado. Tamanho recomendado: 400x200px
              </p>
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-neutral-600 mb-3">Header (fundo branco)</p>
                <div className="bg-white p-4 rounded-lg border">
                  <img
                    src={config.logo}
                    alt="Logo Preview"
                    className="h-12"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo-fallback.png';
                    }}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-neutral-600 mb-3">Footer (fundo escuro)</p>
                <div className="bg-neutral-900 p-4 rounded-lg">
                  <img
                    src={config.logo}
                    alt="Logo Preview"
                    className="h-10 brightness-0 invert"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo-fallback.png';
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === 'banners' && (
        <div>
          {/* Add Banner Button */}
          {!showAddBanner && (
            <Card hover={false} className="mb-6">
              <button
                onClick={() => setShowAddBanner(true)}
                className="w-full p-8 border-2 border-dashed border-neutral-300 rounded-lg hover:border-gold-500 hover:bg-gold-50 transition-colors flex flex-col items-center gap-3"
              >
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-lg font-medium">Adicionar Novo Banner</span>
              </button>
            </Card>
          )}

          {/* Add Banner Form */}
          {showAddBanner && (
            <Card hover={false} className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Novo Banner</h2>
                <button
                  onClick={() => setShowAddBanner(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ImageUpload
                    onUpload={handleBannerImageUpload}
                    label="Imagem do Banner"
                    maxSize={5}
                    aspectRatio="16/9"
                  />
                </div>

                <div className="space-y-4">
                  <Input
                    label="Título"
                    placeholder="Ex: Coleção Premium"
                    value={newBanner.title || ''}
                    onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                    fullWidth
                  />

                  <Input
                    label="Subtítulo (opcional)"
                    placeholder="Ex: Até 20% OFF em joias selecionadas"
                    value={newBanner.subtitle || ''}
                    onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                    fullWidth
                  />

                  <Input
                    label="Link (opcional)"
                    placeholder="Ex: /produtos?category=1"
                    value={newBanner.link || ''}
                    onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                    fullWidth
                  />

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newBanner.active}
                        onChange={(e) => setNewBanner({ ...newBanner, active: e.target.checked })}
                        className="w-4 h-4 text-gold-500 focus:ring-gold-500 rounded"
                      />
                      <span className="text-sm">Banner ativo (visível no site)</span>
                    </label>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button variant="primary" onClick={handleAddBanner} fullWidth>
                      Adicionar Banner
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddBanner(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Existing Banners */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Banners Ativos ({config.banners.filter(b => b.active).length}/{config.banners.length})</h2>

            {config.banners.length === 0 ? (
              <Card hover={false}>
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-neutral-600">Nenhum banner cadastrado</p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {config.banners.map((banner) => (
                  <Card key={banner.id} hover={false}>
                    <div className="flex gap-4">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{banner.title}</h3>
                            {banner.subtitle && (
                              <p className="text-sm text-neutral-600">{banner.subtitle}</p>
                            )}
                          </div>
                          <Badge variant={banner.active ? 'success' : 'silver'}>
                            {banner.active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>

                        {banner.link && (
                          <p className="text-sm text-neutral-500 mb-3">
                            Link: {banner.link}
                          </p>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant={banner.active ? 'outline' : 'primary'}
                            size="sm"
                            onClick={() => toggleBannerStatus(banner)}
                          >
                            {banner.active ? 'Desativar' : 'Ativar'}
                          </Button>
                          <button
                            onClick={() => {
                              if (confirm('Tem certeza que deseja remover este banner?')) {
                                removeBanner(banner.id);
                              }
                            }}
                            className="px-4 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
