import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react';
import { useCart } from '@/state/CartContext';
import { useLanguage } from '@/state/LanguageContext';
import { cn } from '@/lib/utils';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { t } = useLanguage();

  const total = items.reduce((acc, item) => acc + Number(item.product?.price || 0) * item.quantity, 0);
  const cartCurrency = items[0]?.product?.currencyCode ?? 'USD';
  const hasMixedCurrencies = items.some((item) => (item.product?.currencyCode ?? cartCurrency) !== cartCurrency);

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-primary/5 border-2 border-dashed border-primary/10 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-10 h-10 text-primary/20" />
        </div>
        <div>
          <h1 className="text-2xl font-black mb-2">{t('cart.empty.title')}</h1>
          <p className="text-text-muted text-sm">{t('cart.empty.description')}</p>
        </div>
        <Link to="/products" className="btn-primary inline-flex">
          {t('cart.empty.browseProducts')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{t('cart.title')}</h1>
          <p className="text-text-muted text-sm mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted hover:text-red-500 transition-colors border border-border rounded-xl px-4 py-2.5 hover:border-red-200 hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {t('cart.actions.clearCart')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.product?.id}
              className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-border bg-bg">
                  {item.product?.primaryImageUrl || item.product?.imageUrl ? (
                    <img
                      src={item.product?.primaryImageUrl || item.product?.imageUrl}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-text-muted/30" />
                    </div>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-sm leading-snug truncate">{item.product?.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.product?.sku && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            {item.product.sku}
                          </span>
                        )}
                        {item.product?.sku && <span className="w-1 h-1 rounded-full bg-border" />}
                        <span className={cn(
                          'text-[10px] font-bold uppercase tracking-widest',
                          item.product?.isInStock ? 'text-green-600' : 'text-red-500',
                        )}>
                          {item.product?.isInStock ? t('cart.item.inStock') : t('cart.item.outOfStock')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.product?.id)}
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      aria-label={t('cart.item.remove')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center rounded-xl border border-border overflow-hidden">
                      <button
                        type="button"
                        className="w-9 h-9 flex items-center justify-center text-text-muted hover:bg-primary/5 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        onClick={() => updateQuantity(item.product?.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-black border-x border-border py-2">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="w-9 h-9 flex items-center justify-center text-text-muted hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.product?.id, item.quantity + 1)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-text-muted font-medium">
                        {item.product?.currencyCode ?? 'USD'} {Number(item.product?.price || 0).toFixed(2)} × {item.quantity}
                      </span>
                      <p className="text-lg font-black text-primary leading-none mt-0.5">
                        {item.product?.currencyCode ?? 'USD'}{(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {index < items.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div className="h-fit">
          <div className="rounded-2xl border border-border overflow-hidden shadow-sm sticky top-24">
            <div className="bg-primary px-6 py-5">
              <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">{t('cart.summary.total')}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-white/60">
                  {hasMixedCurrencies ? '' : cartCurrency}
                </span>
                <span className="text-4xl font-black text-white leading-none">
                  {hasMixedCurrencies ? t('cart.summary.mixed') : total.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-white/40 mt-2 font-medium">
                {items.reduce((acc, item) => acc + item.quantity, 0)} items · Before tax
              </p>
            </div>

            <div className="bg-surface px-6 py-5 space-y-3">
              <Link
                to="/checkout"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-accent text-white text-xs font-black uppercase tracking-widest shadow-md shadow-accent/25 hover:bg-accent/90 active:scale-95 transition-all"
              >
                {t('cart.actions.proceedToCheckout')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-border text-text-muted text-xs font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
              >
                {t('cart.actions.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
