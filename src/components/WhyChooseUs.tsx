import { BadgeDollarSign, Handshake, ShieldCheck, Zap } from 'lucide-react';
import { WHY_CHOOSE_US, WhyChooseUsItem } from '../data/services';
import type { TranslationContent } from '../i18n/translations';

interface WhyChooseUsProps {
  t: TranslationContent;
}

const PILLAR_ICONS: Record<WhyChooseUsItem['key'], typeof ShieldCheck> = {
  quality: ShieldCheck,
  speed: Zap,
  price: BadgeDollarSign,
  partnership: Handshake,
};

export function WhyChooseUs({ t }: WhyChooseUsProps) {
  return (
    <section
      id="about"
      className="border-b border-slate-800/70 bg-[#080E1A] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-emerald-400">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              {t.about.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            {t.about.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = PILLAR_ICONS[item.key];
            const copy = t.about.items[item.key];
            return (
              <div
                key={item.key}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0B1220] p-6 transition-colors duration-200 hover:border-slate-700"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900 text-emerald-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      {item.number}.
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {copy.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {copy.description}
                  </p>
                </div>

                <p className="mt-5 border-t border-slate-800/80 pt-3 text-xs font-medium text-emerald-400">
                  {copy.metric}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
