import { apiRequest } from "./client.js";

export async function getPlayers() {
  return apiRequest("/players/");
}

export async function createPlayer(playerData) {
  return apiRequest("/players/", {
    method: "POST",
    body: JSON.stringify(playerData)
  });
}