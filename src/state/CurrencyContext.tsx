import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PublicTenantClientInfoResponseDto } from '@/api/generated/apiClient';
import { env } from '@/env';
import { publicStoreRepository } from '@/repositories/publicStoreRepository';
import { useAuth } from '@/state/AuthContext';

type CurrencyState = {
  currency: string;
  currencySymbol: string;
  clientInfo: PublicTenantClientInfoResponseDto | null;
  isLoading: boolean;
  setCurrency: (currency: string) => void;
};

type CachedClientInfo = {
  cachedAt: number;
  data: PublicTenantClientInfoResponseDto;
};

const CURRENCY_CODE_KEY = 'app_currency';
const CLIENT_INFO_CACHE_KEY = 'app_client_info';
const CLIENT_INFO_TTL_MS = 10 * 60 * 1000;

const CurrencyContext = createContext<CurrencyState | null>(null);

function readCachedClientInfo(): PublicTenantClientInfoResponseDto | null {
  const cachedRaw = localStorage.getItem(CLIENT_INFO_CACHE_KEY);
  if (!cachedRaw) {
    return null;
  }

  try {
    const parsed = JSON.parse(cachedRaw) as CachedClientInfo;
    if (!parsed?.cachedAt || !parsed?.data) {
      return null;
    }

    if (Date.now() - parsed.cachedAt > CLIENT_INFO_TTL_MS) {
      localStorage.removeItem(CLIENT_INFO_CACHE_KEY);
      return null;
    }

    return parsed.data;
  } catch {
    localStorage.removeItem(CLIENT_INFO_CACHE_KEY);
    return null;
  }
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currency, setCurrency] = useState(() => localStorage.getItem(CURRENCY_CODE_KEY) || '');
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [clientInfo, setClientInfo] = useState<PublicTenantClientInfoResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(CURRENCY_CODE_KEY, currency);
  }, [currency]);

  useEffect(() => {
    let isMounted = true;

    const loadClientInfo = async () => {
      const tenantId = env.tenantId?.trim() || user?.tenantId?.trim() || '';
      if (!tenantId) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      const cachedData = readCachedClientInfo();
      if (cachedData) {
        if (!isMounted) {
          return;
        }

        setClientInfo(cachedData);
        setCurrency((prev) => prev || cachedData.defaultCurrencyCode || '');
        setCurrencySymbol(cachedData.defaultCurrencySymbol || '');
        setIsLoading(false);
        return;
      }

      try {
        const response = await publicStoreRepository.getClientInfo(tenantId);
        if (!isMounted) {
          return;
        }

        setClientInfo(response);
        setCurrency((prev) => prev || response.defaultCurrencyCode || '');
        setCurrencySymbol(response.defaultCurrencySymbol || '');
        localStorage.setItem(
          CLIENT_INFO_CACHE_KEY,
          JSON.stringify({ cachedAt: Date.now(), data: response } satisfies CachedClientInfo),
        );
      } catch (error) {
        console.error('Unable to load tenant client info', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadClientInfo();

    return () => {
      isMounted = false;
    };
  }, [user?.tenantId]);

  const value = useMemo(
    () => ({ currency, currencySymbol, clientInfo, isLoading, setCurrency }),
    [currency, currencySymbol, clientInfo, isLoading],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
