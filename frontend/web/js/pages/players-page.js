import {
    applyTranslations,
    initLanguageSelector,
    t
} from "../i18n/i18n.js";

import {
    getPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer
} from "../api/players.js";

const reloadButton = document.getElementById("reload-players-btn");
const tableBody = document.getElementById("players-table-body");

const modal = document.getElementById("player-modal");
const openModalButton = document.getElementById("open-player-modal-btn");
const closeModalButton = document.getElementById("close-player-modal-btn");

const form = document.getElementById("player-form");
const messageBox = document.getElementById("player-message");
const languageSwitcher = document.getElementById("language-switcher");

const submitButton = document.getElementById("submit-button");
const playerIdInput = document.getElementById("player-id");
const modalTitle = modal.querySelector(".modal-header h2");

function setDocumentTexts() {
    document.title = t("player.title");
}

function setCreateMode() {
    modalTitle.textContent = t("player.create");
    submitButton.textContent = t("player.create");
}

function setUpdateMode() {
    modalTitle.textContent = t("player.update");
    submitButton.textContent = t("player.update");
}

function openPlayerModal(player = null) {
    modal.classList.remove("hidden");
    messageBox.textContent = "";

    if (player) {
        setUpdateMode();

        form.prename.value = player.prename ?? "";
        form.lastname.value = player.lastname ?? "";
        form.birthdate.value = player.birthdate ?? "";
        form.email.value = player.email ?? "";
        form.phone.value = player.phone ?? "";
        form.license.value = player.license ?? "";
        playerIdInput.value = player.id ?? "";
    } else {
        form.reset();
        playerIdInput.value = "";
        setCreateMode();
    }
}

function closePlayerModal() {
    modal.classList.add("hidden");
    form.reset();
    playerIdInput.value = "";
    messageBox.textContent = "";
    setCreateMode();
}

async function handleDeletePlayer(playerId) {
    try {
        await deletePlayer(playerId);
        await loadPlayers();
    } catch (error) {
        console.error(t("error.delete"), error);
        messageBox.textContent = `${t("error.delete")}: ${error.message}`;
    }
}

function renderEmptyTable(messageKey) {
    tableBody.innerHTML = `
        <tr>
            <td colspan="7">${t(messageKey)}</td>
        </tr>
    `;
}

function renderPlayersTable(players) {
    tableBody.innerHTML = "";

    if (!players || players.length === 0) {
        renderEmptyTable("player.notAvailable");
        return;
    }

    for (const player of players) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${player.prename ?? ""}</td>
            <td>${player.lastname ?? ""}</td>
            <td>${player.birthdate ?? "-"}</td>
            <td>${player.email ?? "-"}</td>
            <td>${player.phone ?? "-"}</td>
            <td>${player.license ?? "-"}</td>
            <td>
                <button type="button" class="edit-player-btn">${t("common.edit")}</button>
                <button type="button" class="delete-player-btn">${t("common.delete")}</button>
            </td>
        `;

        const editButton = row.querySelector(".edit-player-btn");
        const deleteButton = row.querySelector(".delete-player-btn");

        editButton.addEventListener("click", () => openPlayerModal(player));
        deleteButton.addEventListener("click", () => handleDeletePlayer(player.id));

        tableBody.appendChild(row);
    }
}

async function loadPlayers() {
    try {
        const players = await getPlayers();
        renderPlayersTable(players);
    } catch (error) {
        console.error("Fehler beim Laden der Spieler:", error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">${t("error.load")}: ${error.message}</td>
            </tr>
        `;
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    messageBox.textContent = "";

    const formData = new FormData(form);
    const playerId = formData.get("player-id");

    const payload = {
        prename: formData.get("prename")?.trim() || "",
        lastname: formData.get("lastname")?.trim() || "",
        birthdate: formData.get("birthdate")?.trim() || null,
        email: formData.get("email")?.trim() || null,
        phone: formData.get("phone")?.trim() || null,
        license: formData.get("license")?.trim() || null
    };

    try {
        if (playerId) {
            await updatePlayer(playerId, payload);
        } else {
            await createPlayer(payload);
        }

        await loadPlayers();
        closePlayerModal();
    } catch (error) {
        console.error("Fehler beim Speichern des Spielers:", error);

        messageBox.textContent = playerId
            ? `${t("error.update")}: ${error.message}`
            : `${t("error.create")}: ${error.message}`;
    }
}

function bindEvents() {
    openModalButton.addEventListener("click", () => openPlayerModal());
    closeModalButton.addEventListener("click", closePlayerModal);
    reloadButton.addEventListener("click", loadPlayers);
    form.addEventListener("submit", handleSubmit);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closePlayerModal();
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    initLanguageSelector(languageSwitcher, async () => {
        applyTranslations();
        setDocumentTexts();

        if (!modal.classList.contains("hidden")) {
            if (playerIdInput.value) {
                setUpdateMode();
            } else {
                setCreateMode();
            }
        }

        await loadPlayers();
    });

    applyTranslations();
    setDocumentTexts();
    setCreateMode();
    bindEvents();
    await loadPlayers();
});