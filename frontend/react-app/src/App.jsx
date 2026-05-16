import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PlayersPage from "./pages/PlayersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/players" replace />} />
      <Route path="/login" element={<LoginPage />} />
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
  );
}