import { getPlayers, createPlayer } from "../api/players.js";

const form = document.getElementById("player-form");
const messageBox = document.getElementById("player-message");
const playersList = document.getElementById("players-table-body");
const reloadButton = document.getElementById("reload-players-btn");

function renderPlayersTable(players) {
    playersList.innerHTML = "";

    if (!players.length) {
        playersList.innerHTML = `
            <tr>
                <td colspan="7">Keine Spieler vorhanden.</td>
            </tr>
        `;
        return;
    }

    for (const player of players) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${player.id ?? ""}</td>
            <td>${player.prename ?? ""}</td>
            <td>${player.lastname ?? ""}</td>
            <td>${player.birthdate ?? "-"}</td>
            <td>${player.email ?? "-"}</td>
            <td>${player.phone ?? "-"}</td>
            <td>${player.license ?? "-"}</td>
        `;

        playersList.appendChild(row);
    }
}

async function loadPlayers() {
    try {
        const players = await getPlayers();
        renderPlayersTable(players);
    } catch (error) {
        playersList.innerHTML = `
            <tr>
                <td colspan="7">Fehler beim Laden: ${error.message}</td>
            </tr>
        `;
    }
}

async function handleSubmit(event) {
  event.preventDefault();
  messageBox.textContent = "";

  const formData = new FormData(form);

  const payload = {
    prename: formData.get("prename")?.trim(),
    lastname: formData.get("lastname")?.trim(),
    birthdate: formData.get("birthdate")?.trim() || null,
    email: formData.get("email")?.trim() || null,
    phone: formData.get("phone")?.trim() || null,
    license: formData.get("license")?.trim() || null
  };

  try {
    await createPlayer(payload);
    form.reset();
    messageBox.textContent = "Spieler erfolgreich angelegt.";
    await loadPlayers();
  } catch (error) {
    messageBox.textContent = `Fehler: ${error.message}`;
  }
}

reloadButton.addEventListener("click", loadPlayers);
form.addEventListener("submit", handleSubmit);
document.addEventListener("DOMContentLoaded", loadPlayers);