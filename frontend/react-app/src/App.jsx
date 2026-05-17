import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PlayersPage from "./pages/PlayersPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import React from "react";
import SlideMenu from "./components/slideMenu/SlideMenu";
import RegisterPage from "./pages/RegisterPage";
import LanguageSwitcher from "./components/slideMenu/LanguageSwitcher";

export default function App() {
  return (
    <>
      <SlideMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/players" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <PlayersPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}