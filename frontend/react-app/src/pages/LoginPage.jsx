import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserExists, login } from "../api/auth";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import React from "react";
import { t } from "../i18n/i18n";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCheck = await checkUserExists(email);

      if (!userCheck.exists) {
        alert(t("alert.noUser"));
        return;
      }

      await login({
        email,
        password
      });

      navigate("/players");

    } catch (err) {
      alert(t("alert.loginFailed"));
    }
  };

  return (
    <div className="container">
      <LanguageSwitcher />
      <h2>{t("common.login")}</h2>
      <input
        placeholder={t("field.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder={t("field.password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>{t("common.login")}</button>
    </div>
  );
}