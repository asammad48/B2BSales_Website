import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { PaginationBar } from '@/components/common/PaginationBar';
import { publicCatalogRepository } from '@/repositories/publicCatalogRepository';

const PAGE_SIZE = 12;

export function NewArrivalsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<any>({ items: [], totalCount: 0, pageSize: PAGE_SIZE });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    publicCatalogRepository
      .getNewArrivalProducts({ pageNumber, pageSize: PAGE_SIZE, sortBy: 'createdAt', sortDirection: 'desc' })
      .then((response) => setData(response))
      .finally(() => setIsLoading(false));
  }, [pageNumber]);

  return (
    <div className="space-y-16">
      <header className="relative h-[400px] rounded-[3rem] overflow-hidden flex items-center px-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <img 
          src="https://picsum.photos/seed/tech-dark/1920/1080" 
          alt="New Arrivals" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        <div className="relative z-20 max-w-2xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">Just Landed</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
          >
            New <br /> Arrivals
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            The latest cutting-edge components for the newest devices on the market. Fresh from our quality control labs.
          </motion.p>
        </div>
      </header>

      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Latest Inventory</h2>
            <p className="text-text-muted">Updated every 24 hours with verified stock.</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-muted">
            <span>Filter by:</span>
            <button className="px-4 py-2 bg-surface border border-border rounded-xl hover:border-primary transition-colors">Brand</button>
            <button className="px-4 py-2 bg-surface border border-border rounded-xl hover:border-primary transition-colors">Model</button>
          </div>
        </div>

        <div className="grid-layout">
          {(data?.items || []).map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {!isLoading && (data?.items || []).length === 0 && (
          <div className="glass-card p-8 text-center text-text-muted">No newly arrived products found.</div>
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-12 bg-accent/5 border border-accent/10 rounded-[3rem] space-y-6">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Priority Stocking</h2>
          <p className="text-text-muted leading-relaxed">
            We prioritize stocking parts for flagship devices within 14 days of their global release. Stay ahead of the repair market with our early-access inventory.
          </p>
          <button className="flex items-center gap-2 text-accent font-black uppercase tracking-widest text-xs group">
            Learn about sourcing <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="p-12 bg-primary/5 border border-primary/10 rounded-[3rem] space-y-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Verified Arrivals</h2>
          <p className="text-text-muted leading-relaxed">
            Every new arrival goes through an extended 48-hour burn-in test to ensure compatibility with the latest firmware updates from manufacturers.
          </p>
          <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group">
            Our Quality Standards <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
