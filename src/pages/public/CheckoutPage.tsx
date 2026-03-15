import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/state/AuthContext';
import { useCurrency } from '@/state/CurrencyContext';
import { clientOrderRepository } from '@/repositories/clientOrderRepository';

type CheckoutItem = {
  product: any;
  quantity: number;
};

export function CheckoutPage() {
  const { isAuthenticated } = useAuth();
  const { currency } = useCurrency();
  const location = useLocation();
  const [items, setItems] = useState<CheckoutItem[]>(location.state?.items || []);
  const [shopId, setShopId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const total = useMemo(
    () =>
      items.reduce(
        (acc, item) =>
          acc + Number(item.product?.price || 0) * item.quantity,
        0,
      ),
    [items],
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const updateQuantity = (index: number, next: number) => {
    if (next < 1) {
      return;
    }

    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, quantity: next } : item)));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitMessage(null);
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError('Please select at least one product before placing your order.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await clientOrderRepository.placeClientOrder({
        shopId: shopId || undefined,
        notes: notes || undefined,
        items: items.map((item) => ({ productId: item.product?.id, quantity: item.quantity })),
      });

      setSubmitMessage(response.message || `Order ${response.orderNumber || ''} submitted successfully.`);
      setItems([]);
      setShopId('');
      setNotes('');
    } catch (error: any) {
      setSubmitError(error?.message || 'Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight mb-2">Checkout</h1>
        <p className="text-text-muted">Review your selected products and place your client order.</p>
      </header>

      {items.length === 0 ? (
        <div className="glass-card p-10 text-center space-y-4">
          <ShoppingCart className="w-10 h-10 text-text-muted mx-auto" />
          <p className="text-text-muted">No selected items yet.</p>
          <Link to="/products" className="btn-primary inline-flex">
            Browse Products
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <section className="glass-card p-6 space-y-4">
            <h2 className="text-lg font-bold">Selected products</h2>
            {items.map((item, index) => (
              <div key={`${item.product?.id}-${index}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="font-bold">{item.product?.name}</p>
                  <p className="text-xs text-text-muted">{item.product?.sku || 'No SKU'} • {item.product?.isInStock ? 'In stock' : 'Out of stock'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center" onClick={() => updateQuantity(index, item.quantity - 1)}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="min-w-8 text-center font-bold">{item.quantity}</span>
                  <button type="button" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center" onClick={() => updateQuantity(index, item.quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-black text-primary">
                  {item.product?.currencyCode ?? currency}
                  {(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Total</p>
              <p className="text-2xl font-black text-primary">{currency}{total.toFixed(2)}</p>
            </div>
          </section>

          <section className="glass-card p-6 grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Pickup Shop Id (optional)</label>
              <input value={shopId} onChange={(e) => setShopId(e.target.value)} className="input-field" placeholder="Enter pickup shop id" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Notes (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field h-auto py-3" rows={4} placeholder="Add delivery notes or instructions" />
            </div>
          </section>

          {submitMessage && <p className="text-sm text-primary font-bold">{submitMessage}</p>}
          {submitError && <p className="text-sm text-red-600 font-bold">{submitError}</p>}

          <div className="flex justify-end gap-3">
            <Link to="/products" className="btn-outline">
              Continue shopping
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
