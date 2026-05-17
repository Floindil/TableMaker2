import React from "react";
import { createContext, useContext, useState } from "react";
import {
  getCurrentLanguage,
  setLanguage as setI18nLanguage,
  t,
} from "../i18n/i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getCurrentLanguage());

  function changeLanguage(lang) {
    setI18nLanguage(lang);
    setLanguageState(lang);
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}