import { login } from "../../api/auth";

export default {
    common: {
        reload: "Neu laden",
        actions: "Aktionen",
        edit: "Bearbeiten",
        delete: "Löschen",
        close: "Schließen",
        language: "Sprache",
        login: "Anmelden",
        logout: "Abmelden"
    },
    messages: {
        noDataLoaded: "Noch keine Daten geladen."
    },
    field: {
        firstName: "Vorname",
        lastName: "Nachname",
        birthdate: "Geburtsdatum",
        datePlaceholder: "DD.MM.JJJJ",
        license: "Lizenz",
        email: "E-Mail",
        phone: "Telefon",
        password: "Passwort"
    },
    player: {
        title: "Spieler",
        create: "Spieler erstellen",
        notAvailable: "Keine Spieler vorhanden.",
        update: "Spieler aktualisieren"
    },
    alert: {
        loginFailed: "Anmeldung fehlgeschlagen",
        noUser: "Benutzer existiert nicht",
        userExists: "Benutzer existiert bereits"
    },
    error: {
        load: "Fehler beim Laden",
        update: "Fehler beim Aktualisieren",
        create: "Fehler beim Erstellen"
    }
};