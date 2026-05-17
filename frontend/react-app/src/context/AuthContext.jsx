import React, { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  logoutRequest,
  loginRequest,
  checkUserExists,
  registerRequest
} from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const login = async (email, password) => {
    const userCheck = await checkUserExists(email);

    if (!userCheck.exists) {
      throw new Error("NO_USER");
    }

    const data = await loginRequest({
      email,
      password,
    });

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    setIsLoggedIn(true);

    return data;
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    try {
      await logoutRequest(refreshToken);
    } catch (error) {
      console.warn("Logout-Request fehlgeschlagen:", error);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  const register = async (email, password) => {

    const userCheck = await checkUserExists(email);

    if (userCheck.exists) {
      throw new Error("USER_EXISTS")
    }

    const data = await registerRequest({email,password});

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    setIsLoggedIn(true);

    return data;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}