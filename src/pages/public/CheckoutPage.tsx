import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { env } from '@/env';
import { useAuth } from '@/state/AuthContext';
import { useCurrency } from '@/state/CurrencyContext';
import { useCart } from '@/state/CartContext';
import { clientOrderRepository } from '@/repositories/clientOrderRepository';
import { publicShopRepository } from '@/repositories/publicShopRepository';
import type { PublicShopLookupItemDto } from '@/api/generated/apiClient';
import { useToast } from '@/components/common/ToastProvider';

type CheckoutItem = {
  product: any;
  quantity: number;
};

export function CheckoutPage() {
  const { isAuthenticated } = useAuth();
  const { currency } = useCurrency();
  const { items: cartItems, clearCart } = useCart();
  const location = useLocation();
  const [items] = useState<CheckoutItem[]>(location.state?.items || cartItems);
  const [shopId, setShopId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [shops, setShops] = useState<PublicShopLookupItemDto[]>([]);
  const [isShopsLoading, setIsShopsLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (!isAuthenticated || !env.tenantId) {
      return;
    }

    setIsShopsLoading(true);

    publicShopRepository
      .getPublicTenantShops(env.tenantId)
      .then((shopList) => {
        const activeShops = shopList.filter((shop) => shop.isActive !== false);
        setShops(activeShops);

        const mainShop = activeShops.find((shop) => shop.isMain);
        if (mainShop?.id) {
          setShopId(mainShop.id);
        }
      })
      .catch((error: any) => {
        showError(error?.message || 'Unable to load pickup shops.');
      })
      .finally(() => setIsShopsLoading(false));
  }, [isAuthenticated, showError]);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + Number(item.product?.price || 0) * item.quantity, 0),
    [items],
  );

  const totalCurrency = items[0]?.product?.currencyCode ?? currency;
  const hasMixedCurrencies = items.some((item) => (item.product?.currencyCode ?? totalCurrency) !== totalCurrency);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError('Please add at least one product to cart before placing your order.');
      return;
    }

    if (shops.length > 0 && !shopId) {
      setSubmitError('Please select a pickup shop before placing your order.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await clientOrderRepository.placeClientOrder({
        shopId: shopId || undefined,
        notes: notes || undefined,
        items: items.map((item) => ({ productId: item.product?.id, quantity: item.quantity })),
      });

      showSuccess(response.message || `Order ${response.orderNumber || ''} submitted successfully.`);
      clearCart();
      setShopId('');
      setNotes('');
    } catch (error: any) {
      showError(error?.message || 'Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight mb-2">Checkout</h1>
        <p className="text-text-muted">Review your cart and place your client order.</p>
      </header>

      {items.length === 0 ? (
        <div className="glass-card p-10 text-center space-y-4">
          <p className="text-text-muted">Your cart is empty.</p>
          <Link to="/products" className="btn-primary inline-flex">
            Browse Products
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <section className="glass-card p-6 space-y-4">
            <h2 className="text-lg font-bold">Order summary</h2>
            {items.map((item) => (
              <div key={item.product?.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="font-bold">{item.product?.name}</p>
                  <p className="text-xs text-text-muted">
                    {item.product?.sku || 'No SKU'} • Qty {item.quantity}
                  </p>
                </div>
                <p className="font-black text-primary">
                  {item.product?.currencyCode ?? currency}
                  {(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Total</p>
              <p className="text-2xl font-black text-primary">
                {hasMixedCurrencies ? 'Mixed' : totalCurrency}
                {total.toFixed(2)}
              </p>
            </div>
          </section>

          <section className="glass-card p-6 grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Pickup shop</label>
              <select
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
                className="input-field"
                disabled={isShopsLoading || shops.length === 0}
              >
                <option value="">{isShopsLoading ? 'Loading shops...' : shops.length === 0 ? 'No shops available' : 'Select a shop'}</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                    {shop.isMain ? ' (Main)' : ''}
                    {shop.address ? ` - ${shop.address}` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Notes (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field h-auto py-3" rows={4} placeholder="Add delivery notes or instructions" />
            </div>
          </section>

          {submitError && <p className="text-sm text-red-600 font-bold">{submitError}</p>}

          <div className="flex justify-end gap-3">
            <Link to="/cart" className="btn-outline">
              Back to cart
            </Link>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Placing order...' : 'Place order'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
