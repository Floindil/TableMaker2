import { apiRequest } from "./client";

export async function getPlayers() {
  return apiRequest("/players/");
}

export async function createPlayer(playerData) {
  return apiRequest("/players/", {
    method: "POST",
    body: JSON.stringify(playerData)
  });
}

export async function updatePlayer(playerId, playerData) {
  return apiRequest(`/players/${playerId}`, {
    method: "PATCH",
    body: JSON.stringify(playerData)
  });
}

export async function deletePlayer(playerId) {
  return apiRequest(`/players/${playerId}`, {
    method: "DELETE"
  });
}