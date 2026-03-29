import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/state/CartContext';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();

  const total = items.reduce((acc, item) => acc + Number(item.product?.price || 0) * item.quantity, 0);
  const cartCurrency = items[0]?.product?.currencyCode ?? 'USD';
  const hasMixedCurrencies = items.some((item) => (item.product?.currencyCode ?? cartCurrency) !== cartCurrency);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto glass-card p-12 text-center space-y-4">
        <ShoppingCart className="w-10 h-10 text-text-muted mx-auto" />
        <h1 className="text-2xl font-black">Your cart is empty</h1>
        <p className="text-text-muted">Add products from the catalog to place your order.</p>
        <Link to="/products" className="btn-primary inline-flex">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Shopping Cart</h1>
          <p className="text-text-muted">Review items and continue to checkout.</p>
        </div>
        <button onClick={clearCart} className="btn-outline inline-flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Clear cart
        </button>
      </div>

      <div className="glass-card p-6 space-y-5">
        {items.map((item) => (
          <div key={item.product?.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-background border border-border">
                {item.product?.primaryImageUrl || item.product?.imageUrl ? (
                  <img src={item.product?.primaryImageUrl || item.product?.imageUrl} alt={item.product?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted/30">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold">{item.product?.name}</p>
                <p className="text-xs text-text-muted">{item.product?.sku || 'No SKU'} • {item.product?.isInStock ? 'In stock' : 'Out of stock'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center" onClick={() => updateQuantity(item.product?.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                <Minus className="w-4 h-4" />
              </button>
              <span className="min-w-8 text-center font-bold">{item.quantity}</span>
              <button type="button" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center" onClick={() => updateQuantity(item.product?.id, item.quantity + 1)}>
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <p className="font-black text-primary">
                {item.product?.currencyCode ?? 'USD'}
                {(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
              </p>
              <button onClick={() => removeItem(item.product?.id)} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-red-600 transition-colors" aria-label="Remove item">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Total</p>
            <p className="text-2xl font-black text-primary">
              {hasMixedCurrencies ? 'Mixed' : cartCurrency}
              {total.toFixed(2)}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/products" className="btn-outline">
              Continue shopping
            </Link>
            <Link to="/checkout" className="btn-primary">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
