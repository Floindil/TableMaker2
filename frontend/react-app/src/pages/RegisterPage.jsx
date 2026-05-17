import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { t } = useLanguage();
  const { register } = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      if (password != confirmPassword) {
        alert(t("alert.passwordMissmatch"));
        return
      }

      await register(email, password)

      navigate("/");

    } catch (err) {
      if (err.message === "USER_EXISTS") {
        alert(t("alert.userExists"))
        return
      }
      alert(t("alert.registrationFailed"));
    }
  };

  return (
    <div className="container">
      <h2>{t("common.registration")}</h2>
      <form onSubmit={handleRegistration}>
        <input id="email" name="email" type="email" autoComplete="email"
          placeholder={t("field.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input id="password" name="password" type="password" autoComplete="new-password"
          placeholder={t("field.password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password"
          placeholder={t("field.confirmPassword")}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">{t("common.register")}</button>
      </form>
    </div>
  );
}