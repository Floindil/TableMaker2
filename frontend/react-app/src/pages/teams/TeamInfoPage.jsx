import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamById } from "../../api/teams";
import { useLanguage } from "../../context/LanguageContext";

export default function TeamInfoPage() {
  const { teamId } = useParams();
  const { t } = useLanguage();

  const [team, setTeam] = useState(null);

  useEffect(() => {
    const loadTeam = async () => {
      const data = await getTeamById(teamId);
      setTeam(data);
    };

    loadTeam();
  }, [teamId]);

  if (!team) {
    return <div className="container">Lade...</div>;
  }

  return (
    <div className="container">
      <h2>
        {team.name}
      </h2>
    </div>
  );
}