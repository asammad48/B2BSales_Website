import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/state/CurrencyContext';
import { useAuth } from '@/state/AuthContext';
import { useCart } from '@/state/CartContext';
import { qualityTypeLabels, getEnumLabel } from '@/utils/enumLabels';

const DUMMY_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><rect width="640" height="640" fill="%23f3f4f6"/><g fill="none" stroke="%23c7ccd7" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><path d="M202 244h40l38 184h174l34-136H260"/><circle cx="302" cy="484" r="18" fill="%23c7ccd7"/><circle cx="438" cy="484" r="18" fill="%23c7ccd7"/></g></svg>';

export function ProductCard({ product, variant = 'grid' }: { product: any; variant?: 'grid' | 'list' }) {
  const { currency } = useCurrency();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const canViewPrice = isAuthenticated || !product?.isPriceLocked;

  const loginState = {
    from: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
  };

  const imageUrl = product?.primaryImageUrl || product?.imageUrl || DUMMY_IMAGE;
  const detailPath = `/products/${product?.id}`;

  const onAddToCart = () => {
    addItem(product, 1);
    navigate('/cart');
  };

  if (variant === 'list') {
    return (
      <motion.article whileHover={{ x: 5 }} className="group glass-card flex items-center gap-6 p-4">
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-background">
          <img
            src={imageUrl}
            alt={product?.name || 'Product image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex-grow max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{product?.brandName || 'Generic'}</span>
              {product?.qualityType && (
                <span className="px-2 py-0.5 bg-accent/5 text-accent text-[8px] font-black uppercase tracking-widest rounded-full border border-accent/10">
                  {getEnumLabel(product.qualityType, qualityTypeLabels)}
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{product?.name ?? 'Premium Spare Part'}</h3>
            <p className="text-xs text-text-muted line-clamp-1">{product?.shortDescription || 'High-quality replacement component verified for performance.'}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-2">
              {product?.isInStock ? `Stock: ${product?.stockQuantity ?? 0}` : 'Out of stock'}
            </p>
          </div>

          <div className="flex items-center gap-8 flex-shrink-0">
            <div className="flex flex-col items-end">
              {canViewPrice ? (
                <span className="text-xl font-black text-primary">
                  {product?.currencyCode ?? currency}
                  {Number(product?.price ?? 0).toFixed(2)}
                </span>
              ) : (
                <Link to="/login" state={loginState} className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Login for price
                </Link>
              )}
              {product?.isPriceLocked && !isAuthenticated && (
                <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Price locked for guests</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={onAddToCart}
                  disabled={!product?.canOrder}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                    product?.canOrder
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-110'
                      : 'bg-surface border border-border text-text-muted cursor-not-allowed opacity-50',
                  )}
                  title={product?.canOrder ? 'Add to cart' : 'Ordering unavailable'}
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              ) : (
                <Link to="/login" state={loginState} className="w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </Link>
              )}
              <Link to={detailPath} state={{ product }} className="w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary">
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article whileHover={{ y: -5 }} className="group card flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-background">
        <img
          src={imageUrl}
          alt={product?.name || 'Product image'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />

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
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{product?.brandName || 'Generic'}</span>
          <span className="w-1 h-1 bg-border rounded-full" />
          <span className="text-[10px] font-medium text-text-muted">{product?.modelName || 'Universal'}</span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{product?.name ?? 'Premium Spare Part'}</h3>

        <p className="text-xs text-text-muted line-clamp-2 mb-4">{product?.shortDescription || 'High-quality replacement component verified for performance and durability.'}</p>

        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">
          {product?.isInStock ? `In stock (${product?.stockQuantity ?? 0})` : 'Out of stock'}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {canViewPrice ? (
              <span className="text-xl font-black text-primary">
                {product?.currencyCode ?? currency}
                {Number(product?.price ?? 0).toFixed(2)}
              </span>
            ) : (
              <Link to="/login" state={loginState} className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                Login for price
              </Link>
            )}
            {product?.isPriceLocked && !isAuthenticated && (
              <span className="text-[10px] text-text-muted uppercase tracking-widest">Guest access locked</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onAddToCart}
                disabled={!product?.canOrder}
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                  product?.canOrder
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-110'
                    : 'bg-surface border border-border text-text-muted cursor-not-allowed opacity-50',
                )}
                title={product?.canOrder ? 'Add to cart' : 'Ordering unavailable'}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/login" state={loginState} className="w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:text-primary">
                <ShieldCheck className="w-5 h-5" />
              </Link>
            )}
            <Link to={detailPath} state={{ product }} className="w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
