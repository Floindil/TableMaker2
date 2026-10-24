import { apiRequest } from "./client";

export async function getClubs() {
  return apiRequest("/clubs/");
}

export async function getClubById(clubId) {
  return apiRequest(`/clubs/${clubId}`, {
    method: "GET"
  });
}

export async function createClub(clubData) {
  return apiRequest("/clubs/", {
    method: "POST",
    body: JSON.stringify(clubData)
  });
}

export async function updateClub(clubId, clubData) {
  return apiRequest(`/clubs/${clubId}`, {
    method: "PATCH",
    body: JSON.stringify(clubData)
  });
}

export async function deleteClub(clubId) {
  return apiRequest(`/clubs/${clubId}`, {
    method: "DELETE"
  });
}

// People Handling

export async function getPeopleForClub(clubId) {
    return apiRequest(`/clubs/${clubId}/people`, {
        method: "GET"
    });
}

export async function getPeopleNotInClub(clubId) {
    return apiRequest(`/clubs/${clubId}/otherPeople`, {
        method: "GET"
    });
}

export async function addPerson(clubId, personId) {
  return apiRequest(`/clubs/${clubId}/people`, {
    method: "POST",
    body: JSON.stringify({person_id:personId})
  });
}

export async function removePerson(clubId, personId) {
  return apiRequest(`/clubs/${clubId}/people`, {
    method: "DELETE",
    body: JSON.stringify({person_id:personId})
  })
}

// Team Handling

export async function getTeamsForClub(clubId) {
    return apiRequest(`/clubs/${clubId}/teams`, {
        method: "GET"
    });
}

export async function getTeamsNotInClub(clubId) {
    return apiRequest(`/clubs/${clubId}/otherTeams`, {
        method: "GET"
    });
}

export async function addTeam(clubId, teamId) {
  return apiRequest(`/teams/${teamId}`, {
    method: "PATCH",
    body: JSON.stringify({club_id:clubId})
  });
}

export async function removeTeam(clubId, teamId) {
  return apiRequest(`/teams/${teamId}`, {
    method: "PATCH",
    body: JSON.stringify({club_id:null})
  })
}