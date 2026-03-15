import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  product: any;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  itemCount: number;
  addItem: (product: any, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = 'buyer_cart_items';

const CartContext = createContext<CartState | null>(null);

function readCartStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readCartStorage());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: any, quantity = 1) => {
    if (!product?.id) {
      return;
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product?.id === product.id);
      if (existingIndex === -1) {
        return [...prev, { product, quantity }];
      }

      return prev.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
      );
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product?.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product?.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, itemCount, addItem, removeItem, updateQuantity, clearCart }),
    [items, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return ctx;
}
