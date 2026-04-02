import { languages } from "./index.js";

const STORAGE_KEY = "app-language";
const DEFAULT_LANGUAGE = "de";

let currentLanguage = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;

function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
}

export function getCurrentLanguage() {
    return currentLanguage;
}

export function setLanguage(lang) {
    if (!languages[lang]) return;

    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    applyTranslations();
}

export function t(key) {
    const currentTranslations = languages[currentLanguage]?.translations;
    const fallbackTranslations = languages[DEFAULT_LANGUAGE]?.translations;

    return (
        getNestedValue(currentTranslations, key) ??
        getNestedValue(fallbackTranslations, key) ??
        key
    );
}

export function applyTranslations(root = document) {
    document.documentElement.lang = currentLanguage;

    root.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });

    root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        element.placeholder = t(key);
    });

    root.querySelectorAll("[data-i18n-title]").forEach((element) => {
        const key = element.dataset.i18nTitle;
        element.title = t(key);
    });
}

export function initLanguageSelector(selectElement, onLanguageChange = null) {
    if (!selectElement) return;

    selectElement.innerHTML = "";

    Object.entries(languages).forEach(([code, config]) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = config.label;
        option.selected = code === currentLanguage;
        selectElement.appendChild(option);
    });

    selectElement.addEventListener("change", async (event) => {
        setLanguage(event.target.value);

        if (typeof onLanguageChange === "function") {
            await onLanguageChange(event.target.value);
        }
    });
}