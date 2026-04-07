import { apiRequest } from "./client.js";

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

    if (refreshToken) {
        await apiRequest("/auth/logout", {
            method: "POST",
            body: JSON.stringify({ refresh_token: refreshToken })
        });
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
}

export async function refresh() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
        throw new Error("Kein Refresh Token vorhanden");
    }

    const data = await apiRequest("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken })
    });

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    return data;
}

export function isLoggedIn() {
    return !!localStorage.getItem("access_token");
}