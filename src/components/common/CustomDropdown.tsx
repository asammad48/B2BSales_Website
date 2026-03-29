import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function CustomDropdown({ value, onChange, options, label, className, disabled = false }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {label && <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 ml-1">{label}</p>}
      <button
        onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
        className={cn('w-full flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-xl transition-all min-w-[120px] justify-between group', disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-primary')}
        disabled={disabled}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedOption?.icon}
          <span className="text-[10px] font-black uppercase tracking-widest truncate">{selectedOption?.label || value}</span>
        </div>
        <ChevronDown className={cn('w-3 h-3 text-text-muted transition-transform duration-300 flex-shrink-0', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[160px] bg-surface border border-border rounded-xl shadow-xl z-[100] overflow-hidden"
          >
            <div className="py-1 max-h-64 overflow-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors text-left hover:bg-primary/5',
                    value === option.value ? 'text-primary bg-primary/5' : 'text-text-muted',
                  )}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
