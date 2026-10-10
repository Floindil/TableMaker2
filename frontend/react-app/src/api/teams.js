import { apiRequest } from "./client";

export async function getTeams() {
  return apiRequest("/teams/");
}

export async function getTeamById(teamId) {
  return apiRequest(`/teams/${teamId}`, {
    method: "GET",
  })
}

export async function getPeopleForTeam(teamId) {
  return apiRequest(`/teams/${teamId}/people`, {
    method: "GET"
  })
}

export async function getPeopleNotInTeam(teamId) {
  return apiRequest(`/teams/${teamId}/otherPeople`, {
    method: "GET"
  })
}

export async function createTeam(teamData) {
  return apiRequest("/teams/", {
    method: "POST",
    body: JSON.stringify(teamData)
  });
}

export async function addPerson(teamId, personId) {
  return apiRequest(`/teams/${teamId}/people`, {
    method: "POST",
    body: JSON.stringify({person_id: personId})
  })
}

export async function updateTeam(teamId, teamData) {
  return apiRequest(`/teams/${teamId}`, {
    method: "PATCH",
    body: JSON.stringify(teamData)
  });
}

export async function deleteTeam(teamId) {
  return apiRequest(`/teams/${teamId}`, {
    method: "DELETE"
  });
}

export async function removePerson(teamId, personId) {
  return apiRequest(`/teams/${teamId}`, {
    method: "DELETE",
    body: JSON.stringify({person_id: personId})
  })
}