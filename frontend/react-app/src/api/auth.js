import { apiRequest } from "./client";

export async function login(loginData) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData)
  });

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  return data;
}

export async function logout() {
  const refreshToken = localStorage.getItem("refresh_token");

  try {
    if (refreshToken) {
      await apiRequest("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken })
      });
    }
  } catch (error) {
    console.warn("Logout-Request fehlgeschlagen:", error);
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}