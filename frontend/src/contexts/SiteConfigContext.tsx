'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface SiteConfigContextType {
  config: SiteConfig;
  updateLogo: (logo: string) => void;
  updateFavicon: (favicon: string) => void;
  updateBanners: (banners: Banner[]) => void;
  addBanner: (banner: Banner) => void;
  removeBanner: (id: string) => void;
  updateBanner: (id: string, banner: Partial<Banner>) => void;
}

const defaultConfig: SiteConfig = {
  logo: '/logo.png',
  favicon: '/favicon.ico',
  siteName: 'Valiosa Joias',
  banners: [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop',
      title: 'Coleção Premium',
      subtitle: 'Até 20% OFF em joias selecionadas',
      link: '/produtos',
      active: true,
      order: 1,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=600&fit=crop',
      title: 'Novidades',
      subtitle: 'Descubra as últimas tendências',
      link: '/produtos?filter=novidades',
      active: true,
      order: 2,
    },
  ],
  categories: [
    {
      id: '1',
      name: 'Anéis',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    },
    {
      id: '2',
      name: 'Colares',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      name: 'Brincos',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    },
    {
      id: '4',
      name: 'Pulseiras',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
    },
  ],
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  // Load config from API or localStorage
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/site-config');
        // const data = await response.json();
        // setConfig(data);

        // For now, load from localStorage
        const savedConfig = localStorage.getItem('valiosa-site-config');
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig));
        }
      } catch (error) {
        console.error('Error loading site config:', error);
      }
    };

    loadConfig();
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('valiosa-site-config', JSON.stringify(config));
  }, [config]);

  const updateLogo = (logo: string) => {
    setConfig((prev) => ({ ...prev, logo }));
  };

  const updateFavicon = (favicon: string) => {
    setConfig((prev) => ({ ...prev, favicon }));
  };

  const updateBanners = (banners: Banner[]) => {
    setConfig((prev) => ({ ...prev, banners }));
  };

  const addBanner = (banner: Banner) => {
    setConfig((prev) => ({
      ...prev,
      banners: [...prev.banners, banner],
    }));
  };

  const removeBanner = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      banners: prev.banners.filter((b) => b.id !== id),
    }));
  };

  const updateBanner = (id: string, banner: Partial<Banner>) => {
    setConfig((prev) => ({
      ...prev,
      banners: prev.banners.map((b) => (b.id === id ? { ...b, ...banner } : b)),
    }));
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateLogo,
        updateFavicon,
        updateBanners,
        addBanner,
        removeBanner,
        updateBanner,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}
