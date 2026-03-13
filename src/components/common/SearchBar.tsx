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
    <div className={cn("relative group w-full", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted transition-colors group-focus-within:text-primary" />
      <input 
        className="w-full h-12 pl-12 pr-12 bg-background border border-border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder} 
      />
      {value && (
        <button 
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-surface rounded-full text-text-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
