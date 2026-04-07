//const API_BASE_URL = "http://localhost:8000"; //Mit Front- und Backend auf Raspi
//const API_BASE_URL = "http://192.168.1.111:8000"; //Home
const API_BASE_URL = "http://192.168.210.49:8000"; 

export async function apiRequest(path, options = {}, retry = true) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    },
    ...options
  });

  if (response.status === 401 && retry) {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      logout();
      return;
    }

    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!refreshResponse.ok) {
      logout();
      return;
    }

    const data = await refreshResponse.json();

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

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

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}