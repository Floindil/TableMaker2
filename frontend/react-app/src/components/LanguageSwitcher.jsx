import React from "react";
import { languages } from "../i18n/index.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
      {Object.entries(languages).map(([code, config]) => (
        <option key={code} value={code}>
          {config.label}
        </option>
      ))}
    </select>
  );
}