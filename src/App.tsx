/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AdminPanel } from './components/AdminPanel';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesAndCalculator } from './components/ServicesAndCalculator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Portfolio } from './components/Portfolio';
import { OrderForm } from './components/OrderForm';
import { ContactAndFooter } from './components/ContactAndFooter';
import { ScrollControls } from './components/ScrollControls';
import {
  ContactSettings,
  DEFAULT_CONTACTS,
  PORTFOLIO_ITEMS,
  PortfolioItem,
  SERVICES,
  ServiceId,
  ServiceItem,
} from './data/services';
import { Language, TRANSLATIONS } from './i18n/translations';

const STORAGE_KEY = 'sanarip_language';

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ky' || saved === 'ru' || saved === 'uz' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'ky';
}

function isInitialAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hash === '#admin' ||
    window.location.pathname === '/admin'
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isAdminView, setIsAdminView] = useState<boolean>(isInitialAdminRoute);
  const [selectedService, setSelectedService] = useState<ServiceId>('menu');
  const [selectedQuantity, setSelectedQuantity] = useState<number>(50);

  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [contacts, setContacts] = useState<ContactSettings>(DEFAULT_CONTACTS);

  const t = TRANSLATIONS[language];

  const loadSiteData = useCallback(async () => {
    try {
      const res = await fetch('/api/site-data');
      if (!res.ok) return;
      const data = (await res.json()) as {
        services?: ServiceItem[];
        portfolio?: PortfolioItem[];
        contacts?: ContactSettings;
      };
      if (Array.isArray(data.services) && data.services.length > 0) {
        setServices(data.services);
      }
      if (Array.isArray(data.portfolio) && data.portfolio.length > 0) {
        setPortfolio(data.portfolio);
      }
      if (data.contacts) {
        setContacts(data.contacts);
      }
    } catch {
      // Fallback to initial defaults cleanly
    }
  }, []);

  useEffect(() => {
    void loadSiteData();
  }, [loadSiteData]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.metaTitle;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage access errors
    }
  }, [language, t.metaTitle]);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(isInitialAdminRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdmin = () => {
    window.history.pushState(null, '', '#admin');
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const closeAdmin = () => {
    window.history.pushState(null, '', '/');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceForOrder = (
    serviceId: ServiceId,
    quantity?: number
  ) => {
    setSelectedService(serviceId);
    if (typeof quantity === 'number' && quantity > 0) {
      setSelectedQuantity(quantity);
    } else {
      const found = services.find((s) => s.id === serviceId);
      setSelectedQuantity(found ? found.defaultQuantity : 1);
    }
    scrollToSection('order');
  };

  if (isAdminView) {
    return (
      <AdminPanel
        t={t}
        language={language}
        services={services}
        portfolio={portfolio}
        contacts={contacts}
        onLanguageChange={setLanguage}
        onSiteDataUpdated={loadSiteData}
        onExitAdmin={closeAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#060B14] text-slate-100">
      <Header
        t={t}
        language={language}
        onLanguageChange={setLanguage}
        onOrderClick={() => scrollToSection('order')}
        onOpenAdmin={openAdmin}
      />

      <main>
        <Hero
          t={t}
          language={language}
          onLanguageChange={setLanguage}
          onViewServices={() => scrollToSection('services')}
          onContactClick={() => scrollToSection('contact')}
        />

        <ServicesAndCalculator
          t={t}
          services={services}
          onSelectServiceForOrder={handleSelectServiceForOrder}
        />

        <WhyChooseUs t={t} />

        <Portfolio
          t={t}
          portfolio={portfolio}
          onOrderSimilar={(serviceId) => handleSelectServiceForOrder(serviceId)}
        />

        <OrderForm
          t={t}
          services={services}
          selectedService={selectedService}
          selectedQuantity={selectedQuantity}
          onServiceChange={setSelectedService}
          onQuantityChange={setSelectedQuantity}
        />

        <ContactAndFooter
          t={t}
          language={language}
          contacts={contacts}
          onLanguageChange={setLanguage}
          onOpenAdmin={openAdmin}
        />
      </main>

      <ScrollControls language={language} />
    </div>
  );
}
