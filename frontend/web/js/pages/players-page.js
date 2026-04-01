import { getPlayers, createPlayer, updatePlayer, deletePlayer } from "../api/players.js";

const reloadButton = document.getElementById("reload-players-btn");
const tableBody = document.getElementById("players-table-body");

const modal = document.getElementById("player-modal");
const openModalButton = document.getElementById("open-player-modal-btn");
const closeModalButton = document.getElementById("close-player-modal-btn");

const form = document.getElementById("player-form");
const messageBox = document.getElementById("player-message");

function openPlayerModal(player) {
    modal.classList.remove("hidden");
    messageBox.textContent = "";

    const button = document.getElementById("submit-button");
    const playerIdInput = document.getElementById("player-id");

    if (player) {
        button.textContent = "Spieler aktualisieren";
        form.prename.value = player.prename ?? "";
        form.lastname.value = player.lastname ?? "";
        form.birthdate.value = player.birthdate ?? "";
        form.email.value = player.email ?? "";
        form.phone.value = player.phone ?? "";
        form.license.value = player.license ?? "";
        playerIdInput.value = player.id;

    } else {
        button.textContent = "Spieler erstellen";
        playerIdInput.value = "";
    }
}

function closePlayerModal() {
    modal.classList.add("hidden");
    form.reset();
    messageBox.textContent = "";
}

function renderPlayersTable(players) {
    tableBody.innerHTML = "";

    if (!players.length) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">Keine Spieler vorhanden.</td>
            </tr>
        `;
        return;
    }

    for (const player of players) {
        const row = document.createElement("tr");
        const editBtnID = "edit_" + player.id
        const deleteBtnID = "delete_" + player.id

        row.innerHTML = `
            <td>${player.prename ?? ""}</td>
            <td>${player.lastname ?? ""}</td>
            <td>${player.birthdate ?? "-"}</td>
            <td>${player.email ?? "-"}</td>
            <td>${player.phone ?? "-"}</td>
            <td>${player.license ?? "-"}</td>
            <td>
                <button type="button" id=${editBtnID}>edit</button>
                <button type="button" id=${deleteBtnID}>delete</button>
            </td>
        `;

        tableBody.appendChild(row);

        const editButton = row.querySelector(`#${editBtnID}`);
        const deleteButton = row.querySelector(`#${deleteBtnID}`);

        editButton.addEventListener("click", () => openPlayerModal(player));
        deleteButton.addEventListener("click", () => deletePlayer(player.id));
    }
}

async function loadPlayers() {
    try {
        const players = await getPlayers();
        renderPlayersTable(players);
    } catch (error) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">Fehler beim Laden: ${error.message}</td>
            </tr>
        `;
        console.error("Fehler beim Laden der Spieler:", error);
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    messageBox.textContent = "";

    const formData = new FormData(form);
    const playerID = formData.get("player-id")

    const payload = {
        prename: formData.get("prename")?.trim(),
        lastname: formData.get("lastname")?.trim(),
        birthdate: formData.get("birthdate")?.trim() || null,
        email: formData.get("email")?.trim() || null,
        phone: formData.get("phone")?.trim() || null,
        license: formData.get("license")?.trim() || null
    };

    if (playerID) {
        try {
            await updatePlayer(playerID, payload);
        } catch (error) {
            messageBox.textContent = `Fehler: ${error.message}`;
            console.error("Fehler beim Aktualisieren:", error);
        }
    } else {
        try {
            await createPlayer(payload);
        } catch (error) {
            messageBox.textContent = `Fehler: ${error.message}`;
            console.error("Fehler beim Erstellen:", error);
        }
    }
    await loadPlayers();
    closePlayerModal();
    
}

openModalButton.addEventListener("click",  () => openPlayerModal(null));
closeModalButton.addEventListener("click", closePlayerModal);
reloadButton.addEventListener("click", loadPlayers);
form.addEventListener("submit", handleSubmit);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closePlayerModal();
    }
});

document.addEventListener("DOMContentLoaded", loadPlayers);