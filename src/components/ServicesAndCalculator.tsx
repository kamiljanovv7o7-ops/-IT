import { useState } from 'react';
import {
  BookOpen,
  Calculator,
  CreditCard,
  Film,
  Globe,
  Minus,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { ServiceItem, ServiceId, formatMoney } from '../data/services';
import type { TranslationContent } from '../i18n/translations';

interface ServicesAndCalculatorProps {
  t: TranslationContent;
  services: ServiceItem[];
  onSelectServiceForOrder: (serviceId: ServiceId, quantity?: number) => void;
}

const SERVICE_ICONS: Record<ServiceId, typeof BookOpen> = {
  menu: BookOpen,
  vizitka: CreditCard,
  video: Film,
  website: Globe,
};

type CalcMode = 'menu' | 'vizitka' | 'both';

const PRESET_QUANTITIES = [20, 50, 100, 250, 500];

export function ServicesAndCalculator({
  t,
  services,
  onSelectServiceForOrder,
}: ServicesAndCalculatorProps) {
  const [calcMode, setCalcMode] = useState<CalcMode>('menu');
  const [menuQty, setMenuQty] = useState<number>(50);
  const [vizitkaQty, setVizitkaQty] = useState<number>(100);

  const menuService = services.find((s) => s.id === 'menu');
  const vizitkaService = services.find((s) => s.id === 'vizitka');
  const menuUnitPrice = menuService ? menuService.unitPrice : 20;
  const vizitkaUnitPrice = vizitkaService ? vizitkaService.unitPrice : 10;

  const safeMenuQty = Number.isFinite(menuQty) && menuQty > 0 ? menuQty : 0;
  const safeVizitkaQty =
    Number.isFinite(vizitkaQty) && vizitkaQty > 0 ? vizitkaQty : 0;

  const menuTotal = safeMenuQty * menuUnitPrice;
  const vizitkaTotal = safeVizitkaQty * vizitkaUnitPrice;

  const grandTotal =
    calcMode === 'menu'
      ? menuTotal
      : calcMode === 'vizitka'
        ? vizitkaTotal
        : menuTotal + vizitkaTotal;

  const handleApplyCalculation = () => {
    if (calcMode === 'vizitka') {
      onSelectServiceForOrder('vizitka', Math.max(1, safeVizitkaQty));
      return;
    }
    if (calcMode === 'menu') {
      onSelectServiceForOrder('menu', Math.max(1, safeMenuQty));
      return;
    }
    if (safeMenuQty > 0) {
      onSelectServiceForOrder('menu', safeMenuQty);
    } else {
      onSelectServiceForOrder('vizitka', Math.max(1, safeVizitkaQty));
    }
  };

  return (
    <section
      id="services"
      className="border-b border-slate-800/70 bg-[#060B14] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-emerald-400">
            {t.servicesSection.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
            {t.servicesSection.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            {t.servicesSection.subtitle}
          </p>
        </div>

        {/* 4 Service & Pricing Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.id];
            const copy = t.servicesSection.items[service.id];
            const dynamicPrice = formatMoney(
              service.unitPrice,
              copy.currencyLabel
            );
            return (
              <button
                key={service.id}
                type="button"
                onClick={() =>
                  onSelectServiceForOrder(service.id, service.defaultQuantity)
                }
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0B1220] p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              >
                <div className="w-full">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900 text-emerald-400 transition-colors duration-200 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {copy.title}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-semibold text-emerald-400 tabular-nums">
                      {dynamicPrice}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {copy.perUnitNote}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {copy.description}
                  </p>
                </div>

                <div className="mt-6 w-full border-t border-slate-800/80 pt-4">
                  <p className="mb-4 text-xs text-slate-400">
                    {copy.deliverable}
                  </p>
                  <span className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-300 whitespace-nowrap transition-colors duration-150 group-hover:bg-emerald-500 group-hover:text-slate-950">
                    <span>{t.servicesSection.orderBtn}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Price Calculator (#pricing anchor) */}
        <div
          id="pricing"
          className="mt-12 rounded-xl border border-slate-800 bg-[#0B1220] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Calculator className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-semibold">
                  {t.calculator.eyebrow}
                </span>
              </div>

              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                {t.calculator.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {t.calculator.subtitle}
              </p>

              {/* Segmented Control */}
              <div
                className="mt-6 inline-flex flex-wrap gap-1 rounded-lg border border-slate-800 bg-[#060B14] p-1"
                role="tablist"
                aria-label={t.calculator.eyebrow}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={calcMode === 'menu'}
                  onClick={() => setCalcMode('menu')}
                  className={`min-h-[40px] rounded-md px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    calcMode === 'menu'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t.servicesSection.items.menu.title} ({menuUnitPrice}{' '}
                  {t.calculator.somCurrency})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={calcMode === 'vizitka'}
                  onClick={() => setCalcMode('vizitka')}
                  className={`min-h-[40px] rounded-md px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    calcMode === 'vizitka'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t.servicesSection.items.vizitka.title} ({vizitkaUnitPrice}{' '}
                  {t.calculator.somCurrency})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={calcMode === 'both'}
                  onClick={() => setCalcMode('both')}
                  className={`min-h-[40px] rounded-md px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    calcMode === 'both'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t.calculator.tabBoth}
                </button>
              </div>

              {/* Quantity Inputs */}
              <div className="mt-6 space-y-5">
                {(calcMode === 'menu' || calcMode === 'both') && (
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <label
                        htmlFor="calc-menu-qty"
                        className="font-medium text-slate-200"
                      >
                        {t.servicesSection.items.menu.title} ({menuUnitPrice}{' '}
                        {t.calculator.somCurrency} / {t.calculator.unitPcs})
                      </label>
                      <span className="font-mono text-xs text-emerald-400 tabular-nums">
                        {formatMoney(menuTotal, t.calculator.somCurrency)}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-lg border border-slate-700 bg-[#060B14]">
                        <button
                          type="button"
                          aria-label={t.calculator.decreaseMenu}
                          onClick={() => setMenuQty((q) => Math.max(0, q - 10))}
                          className="flex h-11 w-11 items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <input
                          id="calc-menu-qty"
                          type="number"
                          min={0}
                          max={100000}
                          value={menuQty}
                          onChange={(e) =>
                            setMenuQty(Math.max(0, Number(e.target.value) || 0))
                          }
                          className="h-11 w-24 bg-transparent text-center font-mono text-base font-semibold text-white tabular-nums focus:outline-none"
                        />
                        <button
                          type="button"
                          aria-label={t.calculator.increaseMenu}
                          onClick={() => setMenuQty((q) => q + 10)}
                          className="flex h-11 w-11 items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_QUANTITIES.map((qty) => (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => setMenuQty(qty)}
                            className={`min-h-[38px] rounded-md border px-3 py-1.5 font-mono text-xs tabular-nums transition-colors cursor-pointer ${
                              menuQty === qty
                                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                                : 'border-slate-800 bg-[#060B14] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            {qty}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(calcMode === 'vizitka' || calcMode === 'both') && (
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <label
                        htmlFor="calc-vizitka-qty"
                        className="font-medium text-slate-200"
                      >
                        {t.servicesSection.items.vizitka.title} ({vizitkaUnitPrice}{' '}
                        {t.calculator.somCurrency} / {t.calculator.unitPcs})
                      </label>
                      <span className="font-mono text-xs text-emerald-400 tabular-nums">
                        {formatMoney(vizitkaTotal, t.calculator.somCurrency)}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-lg border border-slate-700 bg-[#060B14]">
                        <button
                          type="button"
                          aria-label={t.calculator.decreaseVizitka}
                          onClick={() =>
                            setVizitkaQty((q) => Math.max(0, q - 50))
                          }
                          className="flex h-11 w-11 items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <input
                          id="calc-vizitka-qty"
                          type="number"
                          min={0}
                          max={100000}
                          value={vizitkaQty}
                          onChange={(e) =>
                            setVizitkaQty(
                              Math.max(0, Number(e.target.value) || 0)
                            )
                          }
                          className="h-11 w-24 bg-transparent text-center font-mono text-base font-semibold text-white tabular-nums focus:outline-none"
                        />
                        <button
                          type="button"
                          aria-label={t.calculator.increaseVizitka}
                          onClick={() => setVizitkaQty((q) => q + 50)}
                          className="flex h-11 w-11 items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_QUANTITIES.map((qty) => (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => setVizitkaQty(qty)}
                            className={`min-h-[38px] rounded-md border px-3 py-1.5 font-mono text-xs tabular-nums transition-colors cursor-pointer ${
                              vizitkaQty === qty
                                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                                : 'border-slate-800 bg-[#060B14] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            {qty}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Calculation Summary Box */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-slate-800 bg-[#060B14] p-6">
                <p className="text-xs font-medium text-slate-400">
                  {t.calculator.totalLabel}
                </p>

                <div className="mt-2 font-mono text-3xl font-bold text-emerald-400 tabular-nums sm:text-4xl">
                  {formatMoney(grandTotal, t.calculator.somCurrency)}
                </div>

                <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-4 text-sm text-slate-300 tabular-nums">
                  {(calcMode === 'menu' || calcMode === 'both') && (
                    <div className="flex items-center justify-between">
                      <span>
                        {t.servicesSection.items.menu.title}: {safeMenuQty}{' '}
                        {t.calculator.unitPcs} × {menuUnitPrice}{' '}
                        {t.calculator.somCurrency}
                      </span>
                      <span className="font-mono text-white">
                        {formatMoney(menuTotal, t.calculator.somCurrency)}
                      </span>
                    </div>
                  )}
                  {(calcMode === 'vizitka' || calcMode === 'both') && (
                    <div className="flex items-center justify-between">
                      <span>
                        {t.servicesSection.items.vizitka.title}:{' '}
                        {safeVizitkaQty} {t.calculator.unitPcs} ×{' '}
                        {vizitkaUnitPrice} {t.calculator.somCurrency}
                      </span>
                      <span className="font-mono text-white">
                        {formatMoney(vizitkaTotal, t.calculator.somCurrency)}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleApplyCalculation}
                  className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 cursor-pointer"
                >
                  <span>{t.calculator.applyBtn}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
