import {
    applyTranslations,
    initLanguageSelector,
    t
} from "../i18n/i18n.js";

import { login } from "../api/auth.js";

const form = document.getElementById("login-form");
const languageSwitcher = document.getElementById("language-switcher");
const messageBox = document.getElementById("message-box");

function setDocumentTexts() {
    document.title = t("common.login");
}

async function handleSubmit(event) {
    event.preventDefault();
    messageBox.textContent = "";

    const formData = new FormData(form);

    const payload = {
        email: formData.get("email")?.trim() || "",
        password: formData.get("password")?.trim() || ""
    };

    try {
        if (payload.email && payload.password) {
            await login(payload);
            window.location.href = "/index";
        } else {
            messageBox.textContent = t("error.login");
        }
    } catch (error) {
        console.error(t("error.login"), error);
        messageBox.textContent = `${t("error.login")}: ${error.message}`;
    }
}

function bindEvents() {
    form.addEventListener("submit", handleSubmit);
}

document.addEventListener("DOMContentLoaded", async () => {
    if (languageSwitcher) {
        initLanguageSelector(languageSwitcher, async () => {
            applyTranslations();
            setDocumentTexts();
        });
    }

    applyTranslations();
    setDocumentTexts();
    bindEvents();
});