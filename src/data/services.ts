import type { PortfolioCategoryKey } from '../i18n/translations';

export type ServiceId = 'menu' | 'vizitka' | 'video' | 'website';
export type OrderStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  unitPrice: number;
  currency: 'KGS' | 'USD';
  defaultQuantity: number;
  minQuantity: number;
  stepQuantity: number;
  supportsQuickCalculator: boolean;
}

export interface WhyChooseUsItem {
  number: string;
  key: 'quality' | 'speed' | 'price' | 'partnership';
}

export interface CustomPortfolioCopy {
  title: string;
  client: string;
  resultMetric: string;
  summary: string;
}

export interface PortfolioItem {
  id: string;
  categoryKey: Exclude<PortfolioCategoryKey, 'all'>;
  serviceId: ServiceId;
  year: string;
  image: string;
  customCopy?: CustomPortfolioCopy;
}

export interface OrderRecord {
  id: string;
  name: string;
  phone: string;
  serviceId: ServiceId;
  quantity: number;
  unitPrice: number;
  currency: 'KGS' | 'USD';
  totalAmount: number;
  comment: string;
  status: OrderStatus;
  createdAt: string;
}

export interface ContactSettings {
  phone: string;
  telegram: string;
  instagram: string;
  address: string;
  mapsQuery: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_it_studio_1794507820637.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'menu',
    number: '01',
    unitPrice: 20,
    currency: 'KGS',
    defaultQuantity: 50,
    minQuantity: 1,
    stepQuantity: 10,
    supportsQuickCalculator: true,
  },
  {
    id: 'vizitka',
    number: '02',
    unitPrice: 10,
    currency: 'KGS',
    defaultQuantity: 100,
    minQuantity: 1,
    stepQuantity: 50,
    supportsQuickCalculator: true,
  },
  {
    id: 'video',
    number: '03',
    unitPrice: 500,
    currency: 'KGS',
    defaultQuantity: 1,
    minQuantity: 1,
    stepQuantity: 1,
    supportsQuickCalculator: false,
  },
  {
    id: 'website',
    number: '04',
    unitPrice: 450,
    currency: 'USD',
    defaultQuantity: 1,
    minQuantity: 1,
    stepQuantity: 1,
    supportsQuickCalculator: false,
  },
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  { number: '01', key: 'quality' },
  { number: '02', key: 'speed' },
  { number: '03', key: 'price' },
  { number: '04', key: 'partnership' },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    categoryKey: 'menu',
    serviceId: 'menu',
    year: '2026',
    image: '/src/assets/images/portfolio_menu_cafe_1794507822370.jpg',
  },
  {
    id: 'p2',
    categoryKey: 'vizitka',
    serviceId: 'vizitka',
    year: '2026',
    image: '/src/assets/images/portfolio_vizitka_brand_1794507821557.jpg',
  },
  {
    id: 'p3',
    categoryKey: 'video',
    serviceId: 'video',
    year: '2026',
    image: '/src/assets/images/portfolio_promo_video_1794507822632.jpg',
  },
  {
    id: 'p4',
    categoryKey: 'website',
    serviceId: 'website',
    year: '2026',
    image: '/src/assets/images/portfolio_web_platform_1794507822661.jpg',
  },
  {
    id: 'p5',
    categoryKey: 'menu',
    serviceId: 'menu',
    year: '2025',
    image: '/src/assets/images/portfolio_qr_menu_1794507823069.jpg',
  },
  {
    id: 'p6',
    categoryKey: 'website',
    serviceId: 'website',
    year: '2025',
    image: '/src/assets/images/portfolio_ecommerce_site_1794507823424.jpg',
  },
];

export const DEFAULT_CONTACTS: ContactSettings = {
  phone: '0 559 146 555',
  telegram: '0559146555',
  instagram: '@kamiljanovv.797',
  address: 'Фучика көчөсү, 18',
  mapsQuery: 'Бишкек, улица Фучика 18',
};

export const PORTFOLIO_CATEGORY_KEYS: PortfolioCategoryKey[] = [
  'all',
  'menu',
  'vizitka',
  'video',
  'website',
];

export function formatMoney(amount: number, currencyLabel: string): string {
  const formatted = new Intl.NumberFormat('ru-RU').format(amount);
  if (currencyLabel === '$') {
    return `$${formatted}`;
  }
  return `${formatted} ${currencyLabel}`;
}
