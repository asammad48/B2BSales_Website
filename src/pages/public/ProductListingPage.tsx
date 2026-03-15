import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/product/ProductCard';
import { SearchBar } from '@/components/common/SearchBar';
import { PaginationBar } from '@/components/common/PaginationBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { CustomDropdown } from '@/components/common/CustomDropdown';
import { cn } from '@/lib/utils';
import { publicCatalogRepository } from '@/repositories/publicCatalogRepository';
import type { PublicLookupItemDto } from '@/api/generated/apiClient';

const PAGE_SIZE = 20;

export function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get('search') || '');
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page') || 1));
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'name');
  const [sortDirection, setSortDirection] = useState(searchParams.get('sortDirection') || 'asc');
  const [categoryId, setCategoryId] = useState(searchParams.get('categoryId') || '');
  const [brandId, setBrandId] = useState(searchParams.get('brandId') || '');
  const [modelId, setModelId] = useState(searchParams.get('modelId') || '');
  const [partTypeId, setPartTypeId] = useState(searchParams.get('partTypeId') || '');
  const [filters, setFilters] = useState<{ categories?: PublicLookupItemDto[]; brands?: PublicLookupItemDto[]; models?: PublicLookupItemDto[]; partTypes?: PublicLookupItemDto[] }>({});
  const [data, setData] = useState<any>({ items: [], totalCount: 0, pageSize: PAGE_SIZE });
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    publicCatalogRepository.getPublicCatalogFilters().then(setFilters).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPageNumber(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    publicCatalogRepository
      .getPublicProducts({
        pageNumber,
        pageSize: PAGE_SIZE,
        search: debouncedSearch,
        categoryId,
        brandId,
        modelId,
        partTypeId,
        sortBy,
        sortDirection,
      })
      .then((result) => setData(result))
      .finally(() => setIsLoading(false));
  }, [pageNumber, debouncedSearch, categoryId, brandId, modelId, partTypeId, sortBy, sortDirection]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedSearch) next.set('search', debouncedSearch);
    if (categoryId) next.set('categoryId', categoryId);
    if (brandId) next.set('brandId', brandId);
    if (modelId) next.set('modelId', modelId);
    if (partTypeId) next.set('partTypeId', partTypeId);
    if (pageNumber > 1) next.set('page', String(pageNumber));
    if (sortBy !== 'name') next.set('sortBy', sortBy);
    if (sortDirection !== 'asc') next.set('sortDirection', sortDirection);
    setSearchParams(next, { replace: true });
  }, [debouncedSearch, categoryId, brandId, modelId, partTypeId, pageNumber, sortBy, sortDirection, setSearchParams]);

  const toOptions = useMemo(
    () => (items?: PublicLookupItemDto[]) => [
      { value: '', label: 'All' },
      ...(items || []).map((item) => ({ value: item.id || '', label: item.name || 'Unknown' })),
    ],
    [],
  );

  const updateFilter = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setPageNumber(1);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Parts Catalog</h1>
          <p className="text-text-muted text-sm">Browse our complete inventory of verified mobile components.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-surface border border-border rounded-xl p-1">
            <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg transition-all', viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-text-muted hover:text-primary')}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg transition-all', viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-text-muted hover:text-primary')}>
              <List className="w-4 h-4" />
            </button>
          </div>

          <CustomDropdown
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'name', label: 'Name', icon: <ArrowUpDown className="w-3 h-3" /> },
              { value: 'price', label: 'Price', icon: <ArrowUpDown className="w-3 h-3" /> },
              { value: 'stockQuantity', label: 'Stock', icon: <ArrowUpDown className="w-3 h-3" /> },
            ]}
          />

          <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')} className="btn-outline h-10 px-4 flex items-center gap-2">
            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      <div className="glass-card p-4 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, SKU, brand, or model..." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <CustomDropdown value={categoryId} onChange={updateFilter(setCategoryId)} options={toOptions(filters.categories)} label="Category" />
          <CustomDropdown value={brandId} onChange={updateFilter(setBrandId)} options={toOptions(filters.brands)} label="Brand" />
          <CustomDropdown value={modelId} onChange={updateFilter(setModelId)} options={toOptions(filters.models)} label="Model" />
          <CustomDropdown value={partTypeId} onChange={updateFilter(setPartTypeId)} options={toOptions(filters.partTypes)} label="Part Type" />
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid-layout">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="glass-card h-[380px] animate-pulse bg-surface/50" />
              ))}
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn(viewMode === 'grid' ? 'grid-layout' : 'flex flex-col gap-4')}>
              {(data?.items ?? []).map((product: any) => (
                <ProductCard key={product.id} product={product} variant={viewMode} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && (data?.items ?? []).length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-primary/20" />
            </div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-text-muted">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-border">
        <PaginationBar pageNumber={pageNumber} pageSize={data?.pageSize ?? PAGE_SIZE} totalCount={data?.totalCount ?? 0} onChange={setPageNumber} />
      </div>
    </div>
  );
}
