import { login } from "../../api/auth";

export default {
    common: {
        reload: "Reload",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        close: "Close",
        language: "Language",
        login: "Login",
        logout: "Logout"
    },
    messages: {
        noDataLoaded: "No data loaded yet."
    },
    field: {
        firstName: "First name",
        lastName: "Last name",
        birthdate: "Date of birth",
        datePlaceholder: "DD.MM.YYYY",
        license: "License",
        email: "Email",
        phone: "Phone",
        password: "Password"
    },
    player: {
        title: "Players",
        create: "Create player",
        notAvailable: "No players available.",
        update: "Update player"
    },
    alert: {
        loginFailed: "Login failed",
        noUser: "User does not exist",
        userExists: "User already exists"
    },
    error: {
        load: "Error while loading",
        update: "Error while updating",
        create: "Error while creating"
    }
};