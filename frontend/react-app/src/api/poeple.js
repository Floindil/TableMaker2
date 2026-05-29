import { apiRequest } from "./client";

export async function getPeople() {
  return apiRequest("/people/");
}

export async function getPersonById(personId) {
  return apiRequest(`/people/${personId}`)
}

export async function createPerson(personData) {
  return apiRequest("/people/", {
    method: "POST",
    body: JSON.stringify(personData)
  });
}

export async function updatePerson(personId, personData) {
  return apiRequest(`/people/${personId}`, {
    method: "PATCH",
    body: JSON.stringify(personData)
  });
}

export async function deletePerson(personId) {
  console.log(personId)
  return apiRequest(`/people/${personId}`, {
    method: "DELETE"
  });
}