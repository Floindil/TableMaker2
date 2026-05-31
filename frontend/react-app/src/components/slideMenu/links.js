export function getPublicLinks(t) {
    return [
        { path: "/login", label: t("common.login") },
        { path: "/register", label: t("common.register") },
    ]
};

export function getPrivateLinks(t) {
    return [
        { path: "/people", label: t("person.title") },
        { path: "/teams", label: t("team.title") },
        { path: "/clubs", label: t("club.title") },
    ]
}