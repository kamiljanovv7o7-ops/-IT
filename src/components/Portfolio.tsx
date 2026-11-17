import { useState, useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import {
  PORTFOLIO_CATEGORY_KEYS,
  PortfolioItem,
  ServiceId,
} from '../data/services';
import type {
  PortfolioCategoryKey,
  TranslationContent,
} from '../i18n/translations';
import { ResilientImage } from './ResilientImage';

interface PortfolioProps {
  t: TranslationContent;
  portfolio: PortfolioItem[];
  onOrderSimilar: (serviceId: ServiceId) => void;
}

export function Portfolio({ t, portfolio, onOrderSimilar }: PortfolioProps) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategoryKey>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? portfolio
      : portfolio.filter((item) => item.categoryKey === activeCategory);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const getItemCopy = (item: PortfolioItem) =>
    item.customCopy ?? t.portfolio.items[item.id] ?? {
      title: item.id,
      client: 'Бишкек',
      resultMetric: item.year,
      summary: '',
    };

  const selectedCopy = selectedItem ? getItemCopy(selectedItem) : null;

  return (
    <section
      id="portfolio"
      className="border-b border-slate-800/70 bg-[#060B14] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-emerald-400">
              {t.portfolio.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              {t.portfolio.title}
            </h2>
            <p className="mt-3 text-base text-slate-400">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-800 bg-[#0B1220] p-1 self-start"
            role="tablist"
            aria-label={t.portfolio.tabsAriaLabel}
          >
            {PORTFOLIO_CATEGORY_KEYS.map((categoryKey) => (
              <button
                key={categoryKey}
                type="button"
                role="tab"
                aria-selected={activeCategory === categoryKey}
                onClick={() => setActiveCategory(categoryKey)}
                className={`min-h-[38px] rounded-md px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === categoryKey
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.portfolio.categories[categoryKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const copy = getItemCopy(item);
            const categoryLabel = t.portfolio.categories[item.categoryKey];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0B1220] text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <ResilientImage
                    src={item.image}
                    alt={copy.title}
                    fallbackTitle={copy.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 via-transparent to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 tabular-nums">
                      <span className="font-medium text-emerald-400">
                        {categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{copy.resultMetric}</span>
                    </div>

                    <h3 className="mt-2 text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {copy.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                      {copy.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                    <span>{t.portfolio.viewDetails}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Portfolio Detail Modal */}
      {selectedItem && selectedCopy && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="my-auto w-full max-w-xl overflow-hidden rounded-xl border border-slate-700 bg-[#0B1220] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full bg-slate-900">
              <ResilientImage
                src={selectedItem.image}
                alt={selectedCopy.title}
                fallbackTitle={selectedCopy.title}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label={t.portfolio.closeModal}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-[#060B14]/85 text-slate-200 transition-colors hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 tabular-nums">
                <span className="font-medium text-emerald-400">
                  {t.portfolio.categories[selectedItem.categoryKey]}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedCopy.client}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedCopy.resultMetric}</span>
              </div>

              <h3
                id="portfolio-modal-title"
                className="mt-2 text-xl font-bold text-white"
              >
                {selectedCopy.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {selectedCopy.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="min-h-[42px] rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white cursor-pointer"
                >
                  {t.portfolio.closeBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetService = selectedItem.serviceId;
                    setSelectedItem(null);
                    onOrderSimilar(targetService);
                  }}
                  className="min-h-[42px] rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 cursor-pointer"
                >
                  {t.portfolio.orderSimilarBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
