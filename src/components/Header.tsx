import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ADMIN_TRANSLATIONS } from '../i18n/adminTranslations';
import type { Language, TranslationContent } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  t: TranslationContent;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOrderClick: () => void;
  onOpenAdmin: () => void;
}

export function Header({
  t,
  language,
  onLanguageChange,
  onOrderClick,
  onOpenAdmin,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const adminT = ADMIN_TRANSLATIONS[language];

  const navLinks = [
    { href: '#hero', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileOrderClick = () => {
    setMobileMenuOpen(false);
    onOrderClick();
  };

  const handleAdminClick = () => {
    setMobileMenuOpen(false);
    onOpenAdmin();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060B14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#hero"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
        >
          {language === 'en' ? 'Sanarip' : 'Санарип'}{' '}
          <span className="text-emerald-400">IT</span>
        </a>

        {/* Zone 2: Concise single-line navigation links + visible Admin Panel link */}
        <nav
          aria-label={t.nav.ariaLabel}
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-emerald-400 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleAdminClick}
            className="relative py-1 font-semibold text-emerald-400 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-emerald-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-emerald-400 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded cursor-pointer"
          >
            {adminT.footerLink}
          </button>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Burger Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleAdminClick}
            className="inline-flex min-h-[38px] items-center justify-center px-2.5 py-1.5 text-xs font-semibold text-emerald-400 whitespace-nowrap shrink-0 transition-colors hover:text-emerald-300 md:hidden cursor-pointer"
          >
            {adminT.footerLink}
          </button>

          <button
            type="button"
            onClick={onOrderClick}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 cursor-pointer"
          >
            {t.nav.orderCta}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/70 text-slate-200 transition-colors hover:border-slate-700 hover:text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Burger Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-800/80 bg-[#080F1C] px-4 py-4 md:hidden"
        >
          <nav aria-label={t.nav.mobileAriaLabel} className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-base font-medium text-slate-200 transition-colors hover:bg-slate-800/60 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleAdminClick}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-left text-base font-semibold text-emerald-400 transition-colors hover:bg-slate-800/60 hover:text-emerald-300 cursor-pointer"
            >
              {adminT.footerLink}
            </button>

            <div className="my-2 border-t border-slate-800/80 pt-3">
              <LanguageSwitcher
                language={language}
                onChange={onLanguageChange}
                ariaLabel={t.languageLabel}
                compact
              />
            </div>

            <button
              type="button"
              onClick={handleMobileOrderClick}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 cursor-pointer"
            >
              {t.nav.orderCta}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
