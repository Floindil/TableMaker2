export function getPeopleInputColumns(t) {
  return [
    { label: t("field.firstName"), key: "prename", ac: "given-name", editable: true},
    { label: t("field.lastName"), key: "lastname", ac: "family-name", editable: true },
    { label: t("field.birthdate"), key: "birthdate", ac: "date", editable: true },
    { label: t("field.email"), key: "email", ac: "email", editable: true },
    { label: t("field.phone"), key: "phone", ac: "tel", editable: true },
    { label: t("field.license"), key: "license", editable: true },
  ];
}

export function getTeamInfoColumns(t) {
  return [
    { label: t("team.name"), key: "name", editable: true },
    { label: t("club.title"), key: "club", editable: false },
    { label: t("team.coach"), key: "coach", editable: false },
    { label: t("person.title"), key: "personAmount", editable: false },
  ];
}