import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getTranslation, interpolate, type SupportedLanguage } from '@/i18n/translations';

type LanguageState = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
const ALLOWED_LANGUAGES: SupportedLanguage[] = ['en', 'de', 'fr'];

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const storedLanguage = localStorage.getItem('app_language') as SupportedLanguage | null;
    return storedLanguage && ALLOWED_LANGUAGES.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string, vars?: Record<string, string | number>) => {
        const languageMatch = getTranslation(language, key);
        const fallbackMatch = getTranslation(DEFAULT_LANGUAGE, key);
        return interpolate(languageMatch || fallbackMatch || key, vars);
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
