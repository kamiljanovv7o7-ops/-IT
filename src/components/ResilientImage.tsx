import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#0B1220] to-[#062019] p-6 text-center touch-pan-y ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <Layers className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-slate-200">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      draggable={false}
      onError={() => setHasError(true)}
      className={`select-none touch-pan-y ${className}`}
      loading="lazy"
    />
  );
}
