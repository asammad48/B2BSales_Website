import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/state/AuthContext';
import { useCart } from '@/state/CartContext';
import { clientOrderRepository } from '@/repositories/clientOrderRepository';
import { useToast } from '@/components/common/ToastProvider';
import { useShop } from '@/state/ShopContext';
import { useLanguage } from '@/state/LanguageContext';

type CheckoutItem = {
  product: any;
  quantity: number;
};

export function CheckoutPage() {
  const { isAuthenticated } = useAuth();
  const { items: cartItems, clearCart } = useCart();
  const { shops, selectedShopId, setSelectedShopId, isLoading: isShopsLoading, isSelectionLocked } = useShop();
  const location = useLocation();
  const [items] = useState<CheckoutItem[]>(location.state?.items || cartItems);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { showError, showSuccess } = useToast();
  const { t } = useLanguage();

  const total = useMemo(
    () => items.reduce((acc, item) => acc + Number(item.product?.price || 0) * item.quantity, 0),
    [items],
  );

  const totalCurrency = items[0]?.product?.currencyCode ?? 'USD';
  const hasMixedCurrencies = items.some((item) => (item.product?.currencyCode ?? totalCurrency) !== totalCurrency);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError(t('checkout.validation.emptyCart'));
      return;
    }

    if (shops.length > 0 && !selectedShopId) {
      setSubmitError(t('checkout.validation.selectPickupShop'));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await clientOrderRepository.placeClientOrder({
        shopId: selectedShopId || undefined,
        notes: notes || undefined,
        items: items.map((item) => ({ productId: item.product?.id, quantity: item.quantity })),
      });

      showSuccess(response.message || t('checkout.success.submitted', { orderNumber: response.orderNumber || '' }));
      clearCart();
      setNotes('');
    } catch (error: any) {
      showError(error?.message || t('checkout.errors.submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight mb-2">{t('checkout.title')}</h1>
        <p className="text-text-muted">{t('checkout.subtitle')}</p>
      </header>

      {items.length === 0 ? (
        <div className="glass-card p-10 text-center space-y-4">
          <p className="text-text-muted">{t('checkout.emptyCart')}</p>
          <Link to="/products" className="btn-primary inline-flex">
            {t('checkout.browseProducts')}
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <section className="glass-card p-6 space-y-4">
            <h2 className="text-lg font-bold">{t('checkout.summary.title')}</h2>
            {items.map((item) => (
              <div key={item.product?.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="font-bold">{item.product?.name}</p>
                  <p className="text-xs text-text-muted">
                    {item.product?.sku || t('checkout.summary.noSku')} • {t('checkout.summary.qty', { count: item.quantity })}
                  </p>
                </div>
                <p className="font-black text-primary">
                  {item.product?.currencyCode ?? 'USD'}
                  {(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-text-muted">{t('checkout.summary.total')}</p>
              <p className="text-2xl font-black text-primary">
                {hasMixedCurrencies ? t('checkout.summary.mixed') : totalCurrency}
                {total.toFixed(2)}
              </p>
            </div>
          </section>

          <section className="glass-card p-6 grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">{t('checkout.form.pickupShopLabel')}</label>
              <select
                value={selectedShopId}
                onChange={(e) => setSelectedShopId(e.target.value)}
                className="input-field"
                disabled={isShopsLoading || isSelectionLocked || shops.length === 0}
              >
                <option value="">{isShopsLoading ? t('checkout.form.shop.loading') : shops.length === 0 ? t('checkout.form.shop.noneAvailable') : t('checkout.form.shop.select')}</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                    {shop.address ? ` - ${shop.address}` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">{t('checkout.form.notesLabel')}</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field h-auto py-3" rows={4} placeholder={t('checkout.form.notesPlaceholder')} />
            </div>
          </section>

          {submitError && <p className="text-sm text-red-600 font-bold">{submitError}</p>}

          <div className="flex justify-end gap-3">
            <Link to="/cart" className="btn-outline">
              {t('checkout.actions.backToCart')}
            </Link>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? t('checkout.actions.placingOrder') : t('checkout.actions.placeOrder')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
