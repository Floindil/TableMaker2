const API_BASE_URL = "http://192.168.210.49:8000";

function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function apiRequest(path, options = {}, retry = true) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  if (response.status === 401 && retry) {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      clearTokens();
      throw new Error("Nicht eingeloggt");
    }

    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!refreshResponse.ok) {
      clearTokens();
      throw new Error("Session abgelaufen");
    }

    const refreshData = await refreshResponse.json();

    localStorage.setItem("access_token", refreshData.access_token);
    localStorage.setItem("refresh_token", refreshData.refresh_token);

    return apiRequest(path, options, false);
  }

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API-Fehler ${response.status}: ${text}`);
  }

  return response.json();
}