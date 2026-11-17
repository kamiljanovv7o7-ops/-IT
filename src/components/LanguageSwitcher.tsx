import { Globe } from 'lucide-react';
import { LANGUAGES, Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  language: Language;
  onChange: (lang: Language) => void;
  ariaLabel: string;
  compact?: boolean;
}

export function LanguageSwitcher({
  language,
  onChange,
  ariaLabel,
  compact = false,
}: LanguageSwitcherProps) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-2"
      role="group"
      aria-label={ariaLabel}
    >
      {!compact && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <Globe className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
        </span>
      )}
      <div className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#0B1220] p-1">
        {LANGUAGES.map((opt) => {
          const isActive = language === opt.code;
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => onChange(opt.code)}
              aria-pressed={isActive}
              className={`min-h-[34px] rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
