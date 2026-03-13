import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  onChange: (page: number) => void;
};

export function PaginationBar({ pageNumber, pageSize, totalCount, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  
  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, pageNumber - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onChange(i)}
          className={cn(
            "pagination-item",
            pageNumber === i && "pagination-item-active"
          )}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Showing <span className="text-text">{(pageNumber - 1) * pageSize + 1}</span> to <span className="text-text">{Math.min(pageNumber * pageSize, totalCount)}</span> of <span className="text-text">{totalCount}</span> results
      </p>
      
      <div className="pagination-container">
        <button 
          disabled={pageNumber <= 1} 
          onClick={() => onChange(pageNumber - 1)}
          className="pagination-item disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-1">
          {renderPages()}
        </div>

        <button 
          disabled={pageNumber >= totalPages} 
          onClick={() => onChange(pageNumber + 1)}
          className="pagination-item disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
