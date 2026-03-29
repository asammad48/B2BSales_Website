import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PublicShopLookupItemDto } from '@/api/generated/apiClient';
import { env } from '@/env';
import { publicShopRepository } from '@/repositories/publicShopRepository';

type ShopState = {
  shops: PublicShopLookupItemDto[];
  selectedShopId: string;
  setSelectedShopId: (shopId: string) => void;
  isLoading: boolean;
  isReady: boolean;
  isSelectionLocked: boolean;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [shops, setShops] = useState<PublicShopLookupItemDto[]>([]);
  const [selectedShopId, setSelectedShopId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const tenantId = env.tenantId?.trim();
    if (!tenantId) {
      setShops([]);
      setSelectedShopId('');
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    publicShopRepository
      .getPublicTenantShops(tenantId)
      .then((shopList) => {
        if (!isMounted) {
          return;
        }

        const activeShops = (shopList || []).filter((shop) => shop.isActive !== false);
        setShops(activeShops);

        if (activeShops.length > 0) {
          const defaultShop = activeShops[0];
          setSelectedShopId(defaultShop.id || '');
        } else {
          setSelectedShopId('');
        }
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setShops([]);
        setSelectedShopId('');
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      shops,
      selectedShopId,
      setSelectedShopId,
      isLoading,
      isReady: !isLoading,
      isSelectionLocked: shops.length <= 1,
    }),
    [shops, selectedShopId, isLoading],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  return context;
}
