import React, { useEffect, useState } from "react";
import { getTeams, createTeam, deleteTeam, updateTeam, getTeamById } from "../../api/teams";
import { useLanguage } from "../../context/LanguageContext";
import { getTeamInfoColumns } from "../../components/tables/content/columnDefinitions";
import { useNavigate } from "react-router-dom";
import InlineEditRows from "../../components/tables/content/InlineEditRows";
import InlineEditTable from "../../components/tables/InlineEditTable";

export default function TeamsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);

  const columns = getTeamInfoColumns(t)

  const loadTeams = async () => {
    const data = await getTeams();
    setTeams(data);
  };

  useEffect(() => {
    loadTeams();
  }, []);
  
  const handleCreate = async (draft) => {
    draft.abbreviation="";
    draft.league=null;
    draft.club_id=null;
    await createTeam(draft);
    loadTeams();
  };

  const handleDelete = async (teamId) => {
    await deleteTeam(teamId);
    loadTeams();
  };

  const handleSave = async (teamId, draft) => {
    const team = await getTeamById(teamId)

    const updatedTeam = {
      ...team,
      name: draft.name
    };

    await updateTeam(teamId, updatedTeam);

    setTeams((prev) =>
      prev.map((p) =>
        p.id === teamId ? { ...p, ...updatedTeam } : p
      )
    );
  };

  const handleInfo = async (teamId) => {
    navigate(`/teams/${teamId}`)
  }

  return (
    <div className="container">
      <h2>{t("team.title")}</h2>

      <InlineEditTable
        columns={columns}
        handleCreate={handleCreate}
        items={teams}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleInfo={handleInfo}
      />
    </div>
  );
}