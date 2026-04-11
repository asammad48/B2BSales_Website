import { createContext, useContext, useEffect, useState } from 'react';
import { publicStoreRepository } from '@/repositories/publicStoreRepository';

type ThemeContextState = {
  isLoaded: boolean;
};

const ThemeContext = createContext<ThemeContextState>({ isLoaded: false });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    publicStoreRepository.getTheme()
      .then((theme: any) => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary-custom', theme?.primaryColor ?? '#345991');
        root.style.setProperty('--color-secondary-custom', theme?.secondaryColor ?? '#274776');
        root.style.setProperty('--color-accent-custom', theme?.accentColor ?? '#3f7a5f');
      })
      .finally(() => setLoaded(true));
  }, []);

  return <ThemeContext.Provider value={{ isLoaded }}>{children}</ThemeContext.Provider>;
}

export function useThemeState() {
  return useContext(ThemeContext);
}
