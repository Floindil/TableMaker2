import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getClubById } from "../../api/clubs";

export default function ClubInfoPage() {
  const { clubId } = useParams();
  const { t } = useLanguage();

  const [club, setClub] = useState(null);

  useEffect(() => {
    const loadClub = async () => {
      const data = await getClubById(clubId);
      setClub(data);
    };

    loadClub();
  }, [clubId]);

  if (!club) {
    return <div className="container">Lade...</div>;
  }

  return (
    <div className="container">
      <h2>
        {club.name}
      </h2>
    </div>
  );
}