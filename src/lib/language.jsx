import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "wedding-language";
const SUPPORTED_LANGUAGES = ["hi", "en"];
const DEFAULT_LANGUAGE = "hi";

const LanguageContext = createContext(null);

// Storage can throw in private windows or when site data is blocked.
const readStoredLanguage = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

/**
 * Provides the active language (Hindi or English) to the whole app and
 * remembers the guest's choice between visits.
 */
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => readStoredLanguage() ?? DEFAULT_LANGUAGE,
  );

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Remembering the choice is a convenience; ignore storage failures.
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "hi" ? "en" : "hi"));
  }, []);

  /**
   * Picks the text for the active language from a `{ en, hi }` object.
   * Plain strings are returned unchanged.
   */
  const t = useCallback(
    (value) => {
      if (value && typeof value === "object") {
        return value[language] ?? value.en ?? "";
      }
      return value ?? "";
    },
    [language],
  );

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
