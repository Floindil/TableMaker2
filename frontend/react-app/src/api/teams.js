import { apiRequest } from "./client";

export async function getTeams() {
  return apiRequest("/teams/");
}

export async function createTeam(teamData) {
  return apiRequest("/teams/", {
    method: "POST",
    body: JSON.stringify(teamData)
  });
}

export async function updateTeam(teamId, teamData) {
  return apiRequest(`/teams/${teamId}`, {
    method: "PATCH",
    body: JSON.stringify(teamData)
  });
}

export async function deleteTeam(teamId) {
  console.log(teamId)
  return apiRequest(`/teams/${teamId}`, {
    method: "DELETE"
  });
}