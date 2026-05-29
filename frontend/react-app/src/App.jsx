import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import React from "react";
import SlideMenu from "./components/slideMenu/SlideMenu";
import RegisterPage from "./pages/RegisterPage";
import LanguageSwitcher from "./components/slideMenu/LanguageSwitcher";
import TeamsPage from "./pages/TeamsPage";
import PersonPage from "./pages/PeoplePage";
import PersonInfoPage from "./pages/PersonInfoPage";
import TeamInfoPage from "./pages/TeamInfoPage";

export default function App() {
  return (
    <>
      <SlideMenu />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/"  element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
        <Route path="/people"  element={<ProtectedRoute><PersonPage /></ProtectedRoute>}/>
        <Route path="/people/:personId" element={<PersonInfoPage />} />
        <Route path="/teams"  element={<ProtectedRoute><TeamsPage /></ProtectedRoute>}/>
        <Route path="/teams/:teamId" element={<TeamInfoPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}