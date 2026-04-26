import { useEffect, useState } from "react";

const LANGUAGE_STORAGE_KEY = "hr-access-language";

export function useUiPreferences() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "az";
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "az";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  return {
    language,
    setLanguage,
  };
}
