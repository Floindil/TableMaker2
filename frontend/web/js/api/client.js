//const API_BASE_URL = "http://localhost:8000"; //Mit Front- und Backend auf Raspi
const API_BASE_URL = "http://192.168.1.111:8000"; //Home
//const API_BASE_URL = "http://192.168.210.49:8000"; 


export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API-Fehler ${response.status}: ${text}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}