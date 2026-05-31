import { apiRequest } from "./client";

export async function getClubs() {
  return apiRequest("/clubs/");
}

export async function getPeopleForClub(clubId) {
    return apiRequest(`/clubs/${clubId}/people`, {
        method: "GET"
    });
}

export async function getTeamsForClub(clubId) {
    return apiRequest(`/clubs/${clubId}/teams`, {
        method: "GET"
    });
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
  console.log(clubId)
  return apiRequest(`/clubs/${clubId}`, {
    method: "DELETE"
  });
}