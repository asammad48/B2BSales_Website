import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductThumbnailProps {
  src?: string | null;
  name?: string | null;
  className?: string;
  imgClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export function ProductThumbnail({ src, name, className, imgClassName, size = 'md' }: ProductThumbnailProps) {
  const [errored, setErrored] = useState(false);

  const initial = (name || 'P').trim()[0].toUpperCase();

  const iconSizes = {
    sm: { letter: 'text-xl', label: 'text-[8px]', icon: 'w-8 h-8' },
    md: { letter: 'text-2xl', label: 'text-[9px]', icon: 'w-10 h-10' },
    lg: { letter: 'text-3xl', label: 'text-[10px]', icon: 'w-14 h-14' },
    full: { letter: 'text-5xl', label: 'text-xs', icon: 'w-20 h-20' },
  };

  const s = iconSizes[size];

  if (!src || errored) {
    return (
      <div className={cn('w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-primary/8 via-bg to-accent/8', className)}>
        <div className={cn('rounded-2xl bg-primary/10 border border-primary/10 flex items-center justify-center flex-shrink-0', s.icon)}>
          <span className={cn('font-black text-primary/50 leading-none select-none', s.letter)}>
            {initial}
          </span>
        </div>
        {name && (
          <span className={cn('font-semibold text-text-muted/60 uppercase tracking-widest text-center px-2 line-clamp-2 leading-tight select-none', s.label)}>
            {name}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name || 'Product'}
      onError={() => setErrored(true)}
      className={cn('w-full h-full object-cover', imgClassName)}
      referrerPolicy="no-referrer"
    />
  );
}
