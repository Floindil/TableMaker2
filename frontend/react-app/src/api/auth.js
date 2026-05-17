import { apiRequest } from "./client";

export async function loginRequest(loginData) {
  return await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
}

export async function registerRequest(registrationData) {
  return await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(registrationData),
  });
}

export async function checkUserExists(email) {
  return await apiRequest(
    `/auth/users/exists?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
    }
  );
}

export async function logoutRequest(refreshToken) {
  if (!refreshToken) return;

  return await apiRequest("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}