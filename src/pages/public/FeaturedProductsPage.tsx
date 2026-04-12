import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { PaginationBar } from '@/components/common/PaginationBar';
import { publicCatalogRepository } from '@/repositories/publicCatalogRepository';
import { useShop } from '@/state/ShopContext';
import { useLanguage } from '@/state/LanguageContext';

const PAGE_SIZE = 12;

export function FeaturedProductsPage() {
  const { t } = useLanguage();
  const { selectedShopId, isReady: isShopReady } = useShop();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<any>({ items: [], totalCount: 0, pageSize: PAGE_SIZE });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isShopReady || !selectedShopId) {
      return;
    }

    setIsLoading(true);
    publicCatalogRepository
      .getFeaturedProducts({ shopId: selectedShopId, pageNumber, pageSize: PAGE_SIZE, sortBy: 'createdAt', sortDirection: 'desc' })
      .then((response) => setData(response))
      .finally(() => setIsLoading(false));
  }, [pageNumber, isShopReady, selectedShopId]);

  return (
    <div className="space-y-16">
      <header className="relative h-[340px] rounded-[3rem] overflow-hidden flex items-center px-12 bg-gradient-to-r from-primary to-accent">
        <div className="relative z-20 max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface/25 text-white rounded-full"
          >
            <Star className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">{t('featured.badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none"
          >
            {t('featured.heroTitleLine1')} <br /> {t('featured.heroTitleLine2')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg"
          >
            {t('featured.heroSubtitle')}
          </motion.p>
        </div>
      </header>

      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">{t('featured.section.title')}</h2>
            <p className="text-text-muted">{t('featured.section.subtitle')}</p>
          </div>
        </div>

        <div className="grid-layout">
          {(data?.items || []).map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {!isLoading && (data?.items || []).length === 0 && (
          <div className="glass-card p-8 text-center text-text-muted">{t('featured.empty')}</div>
        )}

        <div className="pt-4 border-t border-border">
          <PaginationBar
            pageNumber={pageNumber}
            pageSize={data?.pageSize ?? PAGE_SIZE}
            totalCount={data?.totalCount ?? 0}
            onChange={setPageNumber}
          />
        </div>
      </section>

      <section className="p-12 bg-primary/5 border border-primary/10 rounded-[3rem] space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tight">{t('featured.why.title')}</h2>
        <p className="text-text-muted leading-relaxed">
          {t('featured.why.description')}
        </p>
        <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group">
          {t('featured.why.cta')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </section>
    </div>
  );
}
