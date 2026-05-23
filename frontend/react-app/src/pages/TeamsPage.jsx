import React, { useEffect, useState } from "react";
import { getTeams, createTeam, deleteTeam, updateTeam } from "../api/teams";
import { useLanguage } from "../context/LanguageContext";

import TableHeaderRow from "../components/tableContent/HeaderRow";
import CreateRow from "../components/tableContent/CreateRow";
import TableRows from "../components/tableContent/TableRows";

export default function TeamsPage() {
  const { t } = useLanguage();

  const [teams, setTeams] = useState([]);
  const [createDraft, setCreateDraft] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});

  const columns = [
    { label: t("team.name"), key: "name" },
    { label: t("team.coach"), key: "coach" },
    { label: t("person.title"), key: "personAmount" },
  ];

  const loadTeams = async () => {
    const data = await getTeams();
    setTeams(data);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreateChange = (key, value) => {
    setCreateDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    await createTeam(createDraft);
    setCreateDraft({});
    loadTeams();
  };

  const handleErase = () => {
    setCreateDraft({});
  };

  const handleDelete = async (teamId) => {
    await deleteTeam(teamId);
    loadTeams();
  };

  const handleEdit = (team) => {
    setEditingId(team.id);
    setDraft({ ...team });
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraft({});
  };

  const handleDraftChange = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async (teamId) => {
    await updateTeam(teamId, draft);

    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, ...draft } : team
      )
    );

    setEditingId(null);
    setDraft({});
  };

  return (
    <div className="container">
      <h2>{t("team.title")}</h2>

      <table>
        <thead>
          <HeaderRow
            columns={columns}
            actionsLabel={t("common.actions")}
          />
        </thead>

        <tbody>
          <CreateRow
            columns={columns}
            draft={createDraft}
            onChange={handleCreateChange}
            onCreate={handleCreate}
            onErase={handleErase}
          />

          <TableRows
            items={teams}
            columns={columns}
            editingId={editingId}
            draft={draft}
            onDraftChange={handleDraftChange}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        </tbody>
      </table>
    </div>
  );
}