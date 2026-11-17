import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Language } from '../i18n/translations';

interface ScrollControlsProps {
  language: Language;
}

const LABELS: Record<Language, { up: string; down: string }> = {
  ky: { up: 'Жогору көтөрүлүү', down: 'Ылдый түшүү' },
  ru: { up: 'Наверх', down: 'Вниз' },
  uz: { up: 'Тепага чиқиш', down: 'Пастга тушиш' },
  en: { up: 'Scroll up', down: 'Scroll down' },
};

export function ScrollControls({ language }: ScrollControlsProps) {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      setAtTop(y <= 24);
      setAtBottom(y + winHeight >= docHeight - 24);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    const docHeight = document.documentElement.scrollHeight;
    const step = Math.max(360, Math.round(window.innerHeight * 0.78));
    const remaining = docHeight - (window.scrollY + window.innerHeight);
    if (remaining <= step * 1.15) {
      window.scrollTo({ top: docHeight, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: step, behavior: 'smooth' });
    }
  };

  const copy = LABELS[language];

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-2">
      <button
        type="button"
        onClick={handleScrollUp}
        disabled={atTop}
        aria-label={copy.up}
        title={copy.up}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/90 bg-[#0B1220]/95 text-slate-200 shadow-lg backdrop-blur-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          atTop
            ? 'opacity-35 cursor-default'
            : 'hover:border-emerald-500/60 hover:text-emerald-300 cursor-pointer'
        }`}
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={handleScrollDown}
        disabled={atBottom}
        aria-label={copy.down}
        title={copy.down}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/90 bg-[#0B1220]/95 text-slate-200 shadow-lg backdrop-blur-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          atBottom
            ? 'opacity-35 cursor-default'
            : 'hover:border-emerald-500/60 hover:text-emerald-300 cursor-pointer'
        }`}
      >
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
