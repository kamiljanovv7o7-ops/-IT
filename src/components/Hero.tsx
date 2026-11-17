import { ArrowRight, PhoneCall } from 'lucide-react';
import { HERO_IMAGE } from '../data/services';
import type { Language, TranslationContent } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  t: TranslationContent;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onViewServices: () => void;
  onContactClick: () => void;
}

export function Hero({
  t,
  language,
  onLanguageChange,
  onViewServices,
  onContactClick,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative border-b border-slate-800/70 bg-gradient-to-b from-[#070D19] to-[#060B14] py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Utility Strip inside Hero for instant Language Switching */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
          <p className="text-sm font-medium tracking-wide text-emerald-400">
            {t.hero.eyebrow}
          </p>
          <LanguageSwitcher
            language={language}
            onChange={onLanguageChange}
            ariaLabel={t.languageLabel}
          />
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Headline, description, 2 action buttons, inline proof */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <h1
                className="font-bold tracking-tight text-white [text-wrap:balance]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.6rem)', lineHeight: 1.12 }}
              >
                {t.hero.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onViewServices}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 cursor-pointer"
                >
                  <span>{t.hero.viewServices}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-slate-500 hover:bg-slate-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span>{t.hero.contactUs}</span>
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-800/80 pt-6 text-sm text-slate-400 tabular-nums">
              <span>{t.hero.proof1}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{t.hero.proof2}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{t.hero.proof3}</span>
            </div>
          </div>

          {/* Right Column: Visual Studio Showcase */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={onViewServices}
              aria-label={t.hero.viewServices}
              className="group relative block h-full min-h-[260px] w-full overflow-hidden rounded-xl border border-slate-800 bg-[#0B1220] text-left transition-colors duration-200 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:min-h-[340px] cursor-pointer"
            >
              <ResilientImage
                src={HERO_IMAGE}
                alt={t.hero.imageAlt}
                fallbackTitle={t.hero.imageFallback}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] lg:h-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060B14]/70 via-transparent to-transparent"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
