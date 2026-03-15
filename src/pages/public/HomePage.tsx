import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Zap, Star } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { publicCatalogRepository } from '@/repositories/publicCatalogRepository';
import { useLanguage } from '@/state/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();
  const [newArrivals, setNewArrivals] = useState<any[]>([]);

  useEffect(() => {
    publicCatalogRepository
      .getNewArrivalProducts({ pageNumber: 1, pageSize: 4, sortBy: 'createdAt', sortDirection: 'desc' })
      .then((response) => setNewArrivals(response.items || []))
      .catch(() => setNewArrivals([]));
  }, []);

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary py-20 px-8 sm:px-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              {t('home.badge')}
              </span>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              {t('home.titlePrefix')} <span className="text-accent">{t('home.titleAccent')}</span> {t('home.titleSuffix')}
              </h1>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
              {t('home.subtitle')}
              </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-accent hover:text-white transition-all flex items-center gap-2 group"
              >
                {t('home.browseCatalog')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                {t('home.partnerLogin')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Preview */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">{t('home.sectionTitle')}</h2>
            <p className="text-text-muted">{t('home.sectionSubtitle')}</p>
          </div>
          <Link to="/new-arrivals" className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 group">
            {t('home.viewAll')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {newArrivals.length > 0 ? (
          <div className="grid-layout">
            {newArrivals.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center text-text-muted">{t('home.noArrivals')}</div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: <ShieldCheck className="w-8 h-8 text-primary" />, 
            title: t('home.features.qualityTitle'), 
            desc: t('home.features.qualityDesc'), 
          },
          { 
            icon: <Truck className="w-8 h-8 text-primary" />, 
            title: t('home.features.shippingTitle'), 
            desc: t('home.features.shippingDesc'), 
          },
          { 
            icon: <Zap className="w-8 h-8 text-primary" />, 
            title: t('home.features.quotesTitle'), 
            desc: t('home.features.quotesDesc'), 
          }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass-card"
          >
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trust Section */}
      <section className="bg-surface rounded-3xl p-12 border border-border text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
          </div>
          <h2 className="text-3xl font-bold mb-6">{t('home.trustTitle')}</h2>
          <p className="text-text-muted mb-10 italic">
            {t('home.trustQuote')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-border rounded-full" />
            <div className="text-left">
              <p className="font-bold">{t('home.trustAuthor')}</p>
              <p className="text-xs text-text-muted uppercase tracking-widest">{t('home.trustRole')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
