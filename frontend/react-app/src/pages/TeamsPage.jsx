import React, { useEffect, useState } from "react";
import { Trash, SquarePen } from "lucide-react";
import { getTeams, createTeam, deleteTeam, updateTeam } from "../api/teams";
import { useLanguage } from "../context/LanguageContext";

export default function TeamsPage() {
  const { t } = useLanguage()

  const [Teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const loadTeams = async () => {
    const data = await getTeams();
    setTeams(data);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreate = async (team) => {
    await createTeam(team);
    loadTeams();
  };

  const handleUpdate = async (team) => {
    await updateTeam(selectedTeam.id, team);
    loadTeams();
  };

  const handleDelete = async (teamId) => {
    await deleteTeam(teamId);
    loadTeams()
  };

  const handleEdit = async (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  const columns = [
    {label: t("team.name"), key: "name"},
    {label: t("team.coach"), key: "coach"},
    {label: t("person.title"), key: "personAmount"}
  ]

  return (
    <div className="container">
      <h2>{t("team.title")}</h2>

      <button onClick={() => {
        setSelectedTeam(null);
        setShowModal(true);
      }}>
        {t("team.create")}
      </button>

      <table>
        <thead>
          <tr>
            {columns.map((c) => (<th key={c.key}>{c.label}</th>))}
            <th>{t("common.actions")}</th>
          </tr>
          <tr>
            <th colSpan={columns.length + 1}><div className="separator" /></th>
          </tr>
        </thead>

        <tbody>
          {Teams.map((t) => (
            <tr key={t.id}>
              {columns.map((c) => (<td key={c.key}>{t[c.key]}</td>))}
              <td className="button-cell">
                <button className="button-cell-button" onClick={() => handleEdit(p)}>
                  <SquarePen size={18}/>
                </button>
                <button className="button-cell-button" onClick={() => handleDelete(p.id)}>
                  <Trash  size={18}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}