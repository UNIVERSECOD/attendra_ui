import { createContext, useContext, useMemo } from "react";
import { translations } from "../config/i18n";
import { useUiPreferences } from "../store/useUiPreferences";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const { language, setLanguage } = useUiPreferences();

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key, fallback = key) => translations[language]?.[key] || fallback,
    }),
    [language, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
