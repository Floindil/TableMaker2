import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import LanguageSwitcher from "./components/slideMenu/LanguageSwitcher";
import SlideMenu from "./components/slideMenu/SlideMenu";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TeamsPage from "./pages/teams/TeamsPage";
import TeamInfoPage from "./pages/teams/TeamInfoPage";
import PersonPage from "./pages/people/PeoplePage";
import PersonInfoPage from "./pages/people/PersonInfoPage";
import ClubsPage from "./pages/clubs/ClubsPage";
import ClubInfoPage from "./pages/clubs/ClubInfoPage";

export default function App() {
  return (
    <>
      <SlideMenu />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/"  element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>

        <Route path="/people"  element={<ProtectedRoute><PersonPage /></ProtectedRoute>}/>
        <Route path="/people/:id" element={<ProtectedRoute><PersonInfoPage /></ProtectedRoute>} />

        <Route path="/teams"  element={<ProtectedRoute><TeamsPage /></ProtectedRoute>}/>
        <Route path="/teams/:id" element={<ProtectedRoute><TeamInfoPage /></ProtectedRoute>} />

        <Route path="/clubs"  element={<ProtectedRoute><ClubsPage /></ProtectedRoute>}/>
        <Route path="/clubs/:id" element={<ProtectedRoute><ClubInfoPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}