import { Instagram, Lock, MapPin, Phone, Send } from 'lucide-react';
import type { ContactSettings } from '../data/services';
import { ADMIN_TRANSLATIONS } from '../i18n/adminTranslations';
import type { Language, TranslationContent } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ContactAndFooterProps {
  t: TranslationContent;
  language: Language;
  contacts: ContactSettings;
  onLanguageChange: (lang: Language) => void;
  onOpenAdmin: () => void;
}

function buildPhoneHref(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    return `tel:+996${digits.slice(1)}`;
  }
  if (digits.startsWith('996')) {
    return `tel:+${digits}`;
  }
  return `tel:${digits}`;
}

function buildTelegramHref(rawTelegram: string): string {
  const trimmed = rawTelegram.trim();
  if (trimmed.startsWith('@')) {
    return `https://t.me/${trimmed.slice(1)}`;
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    return `https://t.me/+996${digits.slice(1)}`;
  }
  if (digits.length >= 9) {
    return `https://t.me/+${digits}`;
  }
  return `https://t.me/${trimmed}`;
}

function buildInstagramHref(rawInsta: string): string {
  const clean = rawInsta.trim().replace(/^@/, '');
  return `https://instagram.com/${clean}`;
}

export function ContactAndFooter({
  t,
  language,
  contacts,
  onLanguageChange,
  onOpenAdmin,
}: ContactAndFooterProps) {
  const adminT = ADMIN_TRANSLATIONS[language];
  const phoneHref = buildPhoneHref(contacts.phone);
  const telegramHref = buildTelegramHref(contacts.telegram);
  const instagramHref = buildInstagramHref(contacts.instagram);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contacts.mapsQuery || contacts.address
  )}`;

  const displayAddress =
    contacts.address === 'Фучика көчөсү, 18'
      ? t.contact.addressValue
      : contacts.address;

  return (
    <>
      <section
        id="contact"
        className="border-b border-slate-800/70 bg-[#060B14] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-emerald-400">
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t.contact.title}
            </h2>
            <p className="mt-3 text-base text-slate-400">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={phoneHref}
              className="group rounded-xl border border-slate-800 bg-[#0B1220] p-6 transition-colors duration-150 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-emerald-400">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-medium text-slate-400">
                {t.contact.phoneLabel}
              </p>
              <p className="mt-1 font-mono text-base font-semibold text-white group-hover:text-emerald-300 tabular-nums">
                {contacts.phone}
              </p>
            </a>

            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-800 bg-[#0B1220] p-6 transition-colors duration-150 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-emerald-400">
                <Send className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-medium text-slate-400">
                {t.contact.telegramLabel}
              </p>
              <p className="mt-1 font-mono text-base font-semibold text-white group-hover:text-emerald-300 tabular-nums">
                {contacts.telegram}
              </p>
            </a>

            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-800 bg-[#0B1220] p-6 transition-colors duration-150 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-emerald-400">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-medium text-slate-400">
                {t.contact.instagramLabel}
              </p>
              <p className="mt-1 font-mono text-base font-semibold text-white group-hover:text-emerald-300">
                {contacts.instagram}
              </p>
            </a>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contact.addressAria}
              className="group rounded-xl border border-slate-800 bg-[#0B1220] p-6 transition-colors duration-150 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-emerald-400">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-medium text-slate-400">
                {t.contact.addressLabel}
              </p>
              <p className="mt-1 text-base font-semibold text-white group-hover:text-emerald-300">
                {displayAddress}
              </p>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#050911] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 lg:flex-row lg:items-center sm:px-6 lg:px-8">
          <div>
            <a
              href="#hero"
              className="text-base font-bold tracking-tight text-white"
            >
              {language === 'en' ? 'Sanarip' : 'Санарип'}{' '}
              <span className="text-emerald-400">IT</span>
            </a>
            <p className="mt-1.5 text-xs text-slate-400">
              {t.contact.copyright}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-emerald-400"
            >
              Telegram
            </a>
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-emerald-400"
            >
              Instagram
            </a>
            <a
              href={phoneHref}
              className="font-mono transition-colors hover:text-emerald-400"
            >
              {contacts.phone}
            </a>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300 cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{adminT.footerLink}</span>
            </button>
            <LanguageSwitcher
              language={language}
              onChange={onLanguageChange}
              ariaLabel={t.languageLabel}
              compact
            />
          </div>
        </div>
      </footer>
    </>
  );
}
