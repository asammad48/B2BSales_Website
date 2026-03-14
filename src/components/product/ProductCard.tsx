import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/state/CurrencyContext';
import { useAuth } from '@/state/AuthContext';
import { qualityTypeLabels, getEnumLabel } from '@/utils/enumLabels';

export function ProductCard({ product, variant = 'grid' }: { product: any, variant?: 'grid' | 'list' }) {
  const { currency } = useCurrency();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const canViewPrice = isAuthenticated || !product?.isPriceLocked;

  const loginState = {
    from: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
  };
  
  if (variant === 'list') {
    return (
      <motion.article 
        whileHover={{ x: 5 }}
        className="group glass-card flex items-center gap-6 p-4"
      >
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-background">
          {product?.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted/20">
              <ShoppingCart className="w-8 h-8" />
            </div>
          )}
        </div>

        <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex-grow max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {product?.brandName || 'Generic'}
              </span>
              <span className="px-2 py-0.5 bg-accent/5 text-accent text-[8px] font-black uppercase tracking-widest rounded-full border border-accent/10">
                {getEnumLabel(product.qualityType, qualityTypeLabels)}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
              {product?.name ?? 'Premium Spare Part'}
            </h3>
            <p className="text-xs text-text-muted line-clamp-1">
              {product?.shortDescription || product?.variantSummary || 'High-quality replacement component verified for performance.'}
            </p>
          </div>

          <div className="flex items-center gap-8 flex-shrink-0">
            <div className="flex flex-col items-end">
              {canViewPrice ? (
                <span className="text-xl font-black text-primary">
                  {product?.currencyCode ?? currency}{product?.price ?? '0.00'}
                </span>
              ) : (
                <Link to="/login" state={loginState} className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Login for price
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                disabled={!product?.canOrder}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  product?.canOrder 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-110" 
                    : "bg-surface border border-border text-text-muted cursor-not-allowed opacity-50"
                )}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <Link 
                to={`/products/${product?.id}`} 
                className="w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article 
      whileHover={{ y: -5 }}
      className="group card flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-background">
        {product?.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted/20">
            <ShoppingCart className="w-12 h-12" />
          </div>
        )}
        
        {product?.qualityType && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-surface/90 backdrop-blur-sm border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {getEnumLabel(product.qualityType, qualityTypeLabels)}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            {product?.brandName || 'Generic'}
          </span>
          <span className="w-1 h-1 bg-border rounded-full" />
          <span className="text-[10px] font-medium text-text-muted">
            {product?.modelName || 'Universal'}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product?.name ?? 'Premium Spare Part'}
        </h3>

        <p className="text-xs text-text-muted line-clamp-2 mb-4">
          {product?.shortDescription || product?.variantSummary || 'High-quality replacement component verified for performance and durability.'}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {canViewPrice ? (
              <span className="text-xl font-black text-primary">
                {product?.currencyCode ?? currency}{product?.price ?? '0.00'}
              </span>
            ) : (
              <Link to="/login" state={loginState} className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                Login for price
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              disabled={!product?.canOrder}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                product?.canOrder 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-110" 
                  : "bg-surface border border-border text-text-muted cursor-not-allowed opacity-50"
              )}
              title={product?.canOrder ? "Add to Cart" : "Login to Order"}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link 
              to={`/products/${product?.id}`} 
              className="w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
