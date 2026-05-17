import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/slideMenu/LanguageSwitcher";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      navigate("/players");
    } catch (err) {
      if (err.message === "NO_USER") {
        alert(t("alert.noUser"));
        return;
      }

      alert(t("alert.loginFailed"));
    }
  };

  return (
    <div className="container">
      <h2>{t("common.login")}</h2>
      <form onSubmit={handleLogin}>
        <input id="email" name="email" type="email" autoComplete="email"
          placeholder={t("field.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input id="password" name="password" type="password" autoComplete="current-password"
          placeholder={t("field.password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{t("common.login")}</button>
      </form>
    </div>
  );
}