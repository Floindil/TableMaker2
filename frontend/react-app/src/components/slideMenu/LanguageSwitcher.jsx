import React from "react";
import Select from "react-select";
import { languages } from "../../i18n/index.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./SlideMenu.css"

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const languageOptions = Object.entries(languages).map(([code, config]) => ({
    value: code,
    label: config.label,
  }));

  return (
    <Select
      className="language-select"
      classNamePrefix="language-select"
      value={languageOptions.find((l) => l.value === language)}
      onChange={(selected) => changeLanguage(selected.value)}
      options={languageOptions}
    />
  );
}