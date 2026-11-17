import { useState, useEffect, FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { ServiceItem, ServiceId, formatMoney } from '../data/services';
import type { TranslationContent } from '../i18n/translations';

interface OrderFormProps {
  t: TranslationContent;
  services: ServiceItem[];
  selectedService: ServiceId;
  selectedQuantity: number;
  onServiceChange: (serviceId: ServiceId) => void;
  onQuantityChange: (quantity: number) => void;
}

interface SubmittedOrder {
  orderId?: string;
  name: string;
  phone: string;
  serviceId: ServiceId;
  quantity: number;
  comment: string;
}

export function OrderForm({
  t,
  services,
  selectedService,
  selectedQuantity,
  onServiceChange,
  onQuantityChange,
}: OrderFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<'name' | 'phone' | 'qty' | 'server' | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(
    null
  );

  const activeService =
    services.find((s) => s.id === selectedService) ?? services[0];
  const activeCopy = t.servicesSection.items[activeService.id];

  const safeQuantity =
    Number.isFinite(selectedQuantity) && selectedQuantity > 0
      ? selectedQuantity
      : 1;

  const calculatedTotal = safeQuantity * activeService.unitPrice;
  const formattedTotal = formatMoney(calculatedTotal, activeCopy.currencyLabel);

  useEffect(() => {
    setErrorKey(null);
  }, [name, phone, selectedService, selectedQuantity]);

  const handleServiceSelectChange = (nextId: ServiceId) => {
    onServiceChange(nextId);
    const nextService = services.find((s) => s.id === nextId);
    if (nextService) {
      onQuantityChange(nextService.defaultQuantity);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const digitsOnly = trimmedPhone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setErrorKey('name');
      return;
    }

    if (digitsOnly.length < 9) {
      setErrorKey('phone');
      return;
    }

    if (safeQuantity < 1) {
      setErrorKey('qty');
      return;
    }

    setErrorKey(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          serviceId: activeService.id,
          quantity: safeQuantity,
          comment: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Order request failed');
      }

      const data = (await response.json()) as { order?: { id?: string } };
      setSubmittedOrder({
        orderId: data.order?.id,
        name: trimmedName,
        phone: trimmedPhone,
        serviceId: activeService.id,
        quantity: safeQuantity,
        comment: comment.trim(),
      });
    } catch {
      setErrorKey('server');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedOrder(null);
    setName('');
    setPhone('');
    setComment('');
    setErrorKey(null);
  };

  const errorMessage =
    errorKey === 'name'
      ? t.orderForm.errName
      : errorKey === 'phone'
        ? t.orderForm.errPhone
        : errorKey === 'qty'
          ? t.orderForm.errQty
          : errorKey === 'server'
            ? t.orderForm.errPhone
            : null;

  const submittedService = submittedOrder
    ? (services.find((s) => s.id === submittedOrder.serviceId) ?? services[0])
    : null;
  const submittedCopy = submittedOrder
    ? t.servicesSection.items[submittedOrder.serviceId]
    : null;

  return (
    <section
      id="order"
      className="border-b border-slate-800/70 bg-[#080E1A] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Side: Info & Live Price Preview */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-emerald-400">
              {t.orderForm.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              {t.orderForm.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              {t.orderForm.subtitle}
            </p>

            <div className="mt-8 rounded-xl border border-slate-800 bg-[#0B1220] p-6">
              <p className="text-xs font-medium text-slate-400">
                {t.orderForm.summaryHeading}
              </p>

              <div className="mt-3 flex items-baseline justify-between gap-4 border-b border-slate-800/80 pb-3">
                <span className="text-sm font-semibold text-white">
                  {activeCopy.title}
                </span>
                <span className="font-mono text-sm text-slate-300 tabular-nums">
                  {formatMoney(activeService.unitPrice, activeCopy.currencyLabel)} /{' '}
                  {activeCopy.unitLabel}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-4 text-sm text-slate-300 tabular-nums">
                <span>{t.orderForm.qtyLabel}</span>
                <span className="font-mono text-white">
                  {safeQuantity} {activeCopy.unitLabel}
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-slate-800/80 pt-4">
                <span className="text-sm font-medium text-slate-300">
                  {t.orderForm.estimatedTotalLabel}
                </span>
                <span className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                  {formattedTotal}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form or Confirmation */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-800 bg-[#0B1220] p-6 sm:p-8">
              {submittedOrder && submittedService && submittedCopy ? (
                <div className="py-4" role="status" aria-live="polite">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-white">
                    {t.orderForm.successTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {t.orderForm.successTextPrefix} {submittedOrder.name}
                    {t.orderForm.successTextMiddle}{' '}
                    <span className="font-mono text-emerald-400">
                      {submittedOrder.phone}
                    </span>{' '}
                    {t.orderForm.successTextSuffix}
                  </p>

                  <div className="mt-6 space-y-2 rounded-lg border border-slate-800 bg-[#060B14] p-4 text-sm text-slate-300">
                    {submittedOrder.orderId && (
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">ID:</span>
                        <span className="font-mono text-emerald-400">
                          {submittedOrder.orderId}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        {t.orderForm.summaryService}
                      </span>
                      <span className="font-medium text-white">
                        {submittedCopy.title}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 tabular-nums">
                      <span className="text-slate-400">
                        {t.orderForm.summaryQty}
                      </span>
                      <span className="font-mono text-white">
                        {submittedOrder.quantity} {submittedCopy.unitLabel}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 tabular-nums">
                      <span className="text-slate-400">
                        {t.orderForm.summaryTotal}
                      </span>
                      <span className="font-mono font-semibold text-emerald-400">
                        {formatMoney(
                          submittedOrder.quantity * submittedService.unitPrice,
                          submittedCopy.currencyLabel
                        )}
                      </span>
                    </div>
                    {submittedOrder.comment && (
                      <div className="border-t border-slate-800 pt-2">
                        <span className="text-slate-400">
                          {t.orderForm.summaryComment}{' '}
                        </span>
                        <span className="text-slate-200">
                          {submittedOrder.comment}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-slate-500 cursor-pointer"
                  >
                    {t.orderForm.newOrderBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="order-name"
                        className="block text-sm font-medium text-slate-200"
                      >
                        {t.orderForm.nameLabel}{' '}
                        <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="order-name"
                        type="text"
                        required
                        placeholder={t.orderForm.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="order-phone"
                        className="block text-sm font-medium text-slate-200"
                      >
                        {t.orderForm.phoneLabel}{' '}
                        <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="order-phone"
                        type="tel"
                        required
                        placeholder={t.orderForm.phonePlaceholder}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3.5 font-mono text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="order-service"
                        className="block text-sm font-medium text-slate-200"
                      >
                        {t.orderForm.serviceLabel}
                      </label>
                      <select
                        id="order-service"
                        value={selectedService}
                        onChange={(e) =>
                          handleServiceSelectChange(e.target.value as ServiceId)
                        }
                        className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3.5 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      >
                        {services.map((s) => {
                          const itemCopy = t.servicesSection.items[s.id];
                          return (
                            <option key={s.id} value={s.id}>
                              {itemCopy.title} (
                              {formatMoney(s.unitPrice, itemCopy.currencyLabel)})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="order-quantity"
                        className="block text-sm font-medium text-slate-200"
                      >
                        {t.orderForm.quantityLabel} ({activeCopy.unitLabel})
                      </label>
                      <input
                        id="order-quantity"
                        type="number"
                        min={1}
                        max={100000}
                        value={selectedQuantity}
                        onChange={(e) =>
                          onQuantityChange(
                            Math.max(1, Number(e.target.value) || 1)
                          )
                        }
                        className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3.5 font-mono text-sm text-white tabular-nums focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="order-comment"
                      className="block text-sm font-medium text-slate-200"
                    >
                      {t.orderForm.commentLabel}
                    </label>
                    <textarea
                      id="order-comment"
                      rows={3}
                      placeholder={t.orderForm.commentPlaceholder}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-700 bg-[#060B14] p-3.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3.5 text-sm text-rose-200"
                    >
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-rose-400"
                        aria-hidden="true"
                      />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-emerald-400 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 cursor-pointer"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{t.orderForm.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
