import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/product/ProductCard';
import { SearchBar } from '@/components/common/SearchBar';
import { PaginationBar } from '@/components/common/PaginationBar';
import { Filter, LayoutGrid, List, ArrowUpDown, ChevronDown, ChevronUp, Tag, Award, Smartphone, Wrench, SlidersHorizontal } from 'lucide-react';
import { CustomDropdown } from '@/components/common/CustomDropdown';
import { cn } from '@/lib/utils';
import { publicCatalogRepository } from '@/repositories/publicCatalogRepository';
import type { PublicLookupItemDto } from '@/api/generated/apiClient';
import { useShop } from '@/state/ShopContext';
import { useLanguage } from '@/state/LanguageContext';

const PAGE_SIZE = 20;

export function ProductListingPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedShopId, isReady: isShopReady } = useShop();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get('search') || '');
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page') || 1));
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'name');
  const [sortDirection, setSortDirection] = useState(searchParams.get('sortDirection') || 'asc');
  const [categoryIds, setCategoryIds] = useState<string[]>(() => (searchParams.get('categoryId') || '').split(',').filter(Boolean));
  const [brandIds, setBrandIds] = useState<string[]>(() => (searchParams.get('brandId') || '').split(',').filter(Boolean));
  const [modelIds, setModelIds] = useState<string[]>(() => (searchParams.get('modelId') || '').split(',').filter(Boolean));
  const [partTypeIds, setPartTypeIds] = useState<string[]>(() => (searchParams.get('partTypeId') || '').split(',').filter(Boolean));
  const [expandedFilters, setExpandedFilters] = useState<Record<'category' | 'brand' | 'model' | 'partType', boolean>>({
    category: false,
    brand: false,
    model: false,
    partType: false,
  });
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
    if (!isShopReady) {
      return;
    }

    setIsLoading(true);
    publicCatalogRepository
      .getPublicProducts({
        pageNumber,
        pageSize: PAGE_SIZE,
        search: debouncedSearch,
        categoryIds,
        brandIds,
        modelIds,
        partTypeIds,
        shopId: selectedShopId || undefined,
        sortBy,
        sortDirection,
      })
      .then((result) => setData(result))
      .finally(() => setIsLoading(false));
  }, [pageNumber, debouncedSearch, categoryIds, brandIds, modelIds, partTypeIds, sortBy, sortDirection, isShopReady, selectedShopId]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedSearch) next.set('search', debouncedSearch);
    if (categoryIds.length > 0) next.set('categoryId', categoryIds.join(','));
    if (brandIds.length > 0) next.set('brandId', brandIds.join(','));
    if (modelIds.length > 0) next.set('modelId', modelIds.join(','));
    if (partTypeIds.length > 0) next.set('partTypeId', partTypeIds.join(','));
    if (pageNumber > 1) next.set('page', String(pageNumber));
    if (sortBy !== 'name') next.set('sortBy', sortBy);
    if (sortDirection !== 'asc') next.set('sortDirection', sortDirection);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  }, [debouncedSearch, categoryIds, brandIds, modelIds, partTypeIds, pageNumber, sortBy, sortDirection, setSearchParams]);

  const toggleFilterValue = (setter: Dispatch<SetStateAction<string[]>>) => (value: string) => {
    setter((previous) => (previous.includes(value) ? previous.filter((item) => item !== value) : [...previous, value]));
    setPageNumber(1);
  };

  const filterIconMap: Record<'category' | 'brand' | 'model' | 'partType', React.ReactNode> = {
    category: <Tag className="w-3.5 h-3.5" />,
    brand: <Award className="w-3.5 h-3.5" />,
    model: <Smartphone className="w-3.5 h-3.5" />,
    partType: <Wrench className="w-3.5 h-3.5" />,
  };

  const renderCheckboxGroup = (
    key: 'category' | 'brand' | 'model' | 'partType',
    label: string,
    items: PublicLookupItemDto[] | undefined,
    selectedValues: string[],
    onToggle: (value: string) => void,
  ) => {
    const normalizedItems = (items || []).filter((item): item is PublicLookupItemDto & { id: string } => Boolean(item.id));
    const visibleCount = expandedFilters[key] ? normalizedItems.length : 6;
    const visibleItems = normalizedItems.slice(0, visibleCount);
    const hasMore = normalizedItems.length > 6;
    const selectedCount = selectedValues.length;

    return (
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-accent">{filterIconMap[key]}</span>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text">{label}</h3>
          </div>
          {selectedCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-accent text-white text-[10px] font-bold">
              {selectedCount}
            </span>
          )}
        </div>
        <div className="p-3 space-y-1">
          {visibleItems.map((item) => {
            const id = item.id;
            const isChecked = selectedValues.includes(id);
            return (
              <label
                key={id}
                onMouseDown={(e) => e.preventDefault()}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all duration-150 min-w-0 group',
                  isChecked
                    ? 'bg-accent/10 border border-accent/30'
                    : 'hover:bg-primary/5 border border-transparent',
                )}
              >
                <div className={cn(
                  'flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150',
                  isChecked
                    ? 'bg-accent border-accent'
                    : 'border-border group-hover:border-primary/40',
                )}>
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(id)}
                    className="sr-only"
                  />
                </div>
                <span className={cn(
                  'text-sm truncate transition-colors duration-150',
                  isChecked ? 'text-text font-medium' : 'text-text-muted group-hover:text-text',
                )}>
                  {item.name || t('listing.common.unknown')}
                </span>
              </label>
            );
          })}
        </div>
        {hasMore && (
          <div className="px-3 pb-3">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-text-muted transition-all hover:text-accent py-1.5 rounded-lg hover:bg-accent/5 border border-dashed border-border hover:border-accent/30"
              onClick={() => setExpandedFilters((previous) => ({ ...previous, [key]: !previous[key] }))}
            >
              {expandedFilters[key] ? 'Show less' : 'See more'}
              {expandedFilters[key] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-4 lg:items-start">
        <aside className="self-start h-fit rounded-xl border border-border shadow-futuristic overflow-clip bg-surface lg:sticky lg:top-24">
          <div className="flex items-center justify-between px-4 py-3.5 bg-primary border-b border-primary/20">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">Filters</span>
            </div>
            {(categoryIds.length + brandIds.length + modelIds.length + partTypeIds.length) > 0 && (
              <button
                type="button"
                onClick={() => { setCategoryIds([]); setBrandIds([]); setModelIds([]); setPartTypeIds([]); setPageNumber(1); }}
                className="text-[10px] font-bold uppercase tracking-widest text-accent/80 hover:text-accent transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="p-3 space-y-2 bg-bg/60 overflow-y-auto overscroll-contain max-h-[55vh] lg:max-h-[calc(100vh-8rem)]">
            {renderCheckboxGroup('category', t('listing.filters.category'), filters.categories, categoryIds, toggleFilterValue(setCategoryIds))}
            {renderCheckboxGroup('brand', t('listing.filters.brand'), filters.brands, brandIds, toggleFilterValue(setBrandIds))}
            {renderCheckboxGroup('model', t('listing.filters.model'), filters.models, modelIds, toggleFilterValue(setModelIds))}
            {renderCheckboxGroup('partType', t('listing.filters.partType'), filters.partTypes, partTypeIds, toggleFilterValue(setPartTypeIds))}
          </div>
        </aside>

        <div className="space-y-4">
          <div className="glass-card p-3 overflow-visible relative z-30">
            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
              <div className="flex-1 min-w-0">
                <SearchBar value={search} onChange={setSearch} placeholder={t('listing.searchPlaceholder')} />
              </div>

              <div className="flex flex-wrap items-center gap-2">
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
                    { value: 'name', label: t('listing.sort.name'), icon: <ArrowUpDown className="w-3 h-3" /> },
                    { value: 'price', label: t('listing.sort.price'), icon: <ArrowUpDown className="w-3 h-3" /> },
                    { value: 'stockQuantity', label: t('listing.sort.stock'), icon: <ArrowUpDown className="w-3 h-3" /> },
                  ]}
                />

                <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')} className="btn-outline h-10 px-4 flex items-center gap-2">
                  {sortDirection === 'asc' ? t('listing.direction.asc') : t('listing.direction.desc')}
                </button>
              </div>
            </div>
          </div>

          <div className="relative min-h-[400px] z-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 border-[3px] border-accent/20 border-t-accent rounded-full animate-spin" />
                <p className="text-sm text-text-muted">Loading products…</p>
              </div>
            ) : (data?.items ?? []).length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-10 h-10 text-primary/20" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t('listing.empty.title')}</h3>
                <p className="text-text-muted">{t('listing.empty.description')}</p>
              </div>
            ) : (
              <div className={cn(viewMode === 'grid' ? 'grid-layout' : 'flex flex-col gap-4')}>
                {(data?.items ?? []).map((product: any) => (
                  <ProductCard key={product.id} product={product} variant={viewMode} />
                ))}
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-border">
            <PaginationBar pageNumber={pageNumber} pageSize={data?.pageSize ?? PAGE_SIZE} totalCount={data?.totalCount ?? 0} onChange={setPageNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
