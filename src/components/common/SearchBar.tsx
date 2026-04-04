import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({ value, onChange, placeholder = 'Search products...', className }: Props) {
  return (
    <div className={cn('relative group w-full', className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-4 h-4 text-text-muted transition-all duration-200 group-focus-within:text-accent group-focus-within:scale-110" />
      </div>
      <input
        className={cn(
          'w-full h-11 pl-11 pr-11 rounded-xl border text-sm transition-all duration-200 focus:outline-none',
          'bg-surface border-border text-text placeholder:text-text-muted',
          'focus:border-accent/60 focus:ring-2 focus:ring-accent/15 focus:bg-white',
          'shadow-sm focus:shadow-accent/10 focus:shadow-md',
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-text-muted hover:text-text transition-colors"
          aria-label="Clear search"
        >
          <span className="w-5 h-5 rounded-full bg-border/70 hover:bg-border flex items-center justify-center transition-colors">
            <X className="w-3 h-3" />
          </span>
        </button>
      )}
    </div>
  );
}
