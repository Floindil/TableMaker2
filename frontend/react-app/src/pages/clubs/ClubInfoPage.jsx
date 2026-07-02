import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getClubById, getPeopleForClub } from "../../api/clubs";
import { getPeopleInputColumns } from "../../components/tables/content/columnDefinitions";
import InlineEditRows from "../../components/tables/content/InlineEditRows";
import InlineEditTable from "../../components/tables/InlineEditTable";

export default function ClubInfoPage() {
  const { clubId } = useParams();
  const { t } = useLanguage();

  const [club, setClub] = useState(null);
  const [members, setMembers] = useState([]);

  const columns = getPeopleInputColumns(t);

  const handleSave = async () => {
    console.log("Save")
  };

  const handleCreate = async () => {
    console.log("Create")
  };

  const handleDelete = async () => {
    console.log("delete")
  }

  const handleInfo = async () => {
    console.log("info")
  };

  useEffect(() => {
    const loadClub = async () => {
      const data = await getClubById(clubId);
      setClub(data);
    };

    loadClub();
  }, [clubId]);

  useEffect(() => {
    if (!club?.id) return;

    const loadMembers = async () => {
      const data = await getPeopleForClub(club.id);
      setMembers(data);
    };

    loadMembers();
  }, [club]);

  if (!club) {
    return <div className="container">Lade...</div>;
  }

  return (
    <div className="container">
      <h2>{club.name}</h2>

      <table>
        <tbody>
          <tr>
            <td>{t("common.owner")}</td>
            <td>{club.owner.email}</td>
          </tr>
          <tr>
            <td>{t("common.abrv")}</td>
            <td>{club.abbreviation}</td>
          </tr>
          <tr>
            <td>{t("common.members")}</td>
            <td>{members.length}</td>
          </tr>
        </tbody>
      </table>
      <h3> {t("person.title")} </h3>
      <InlineEditTable
        columns={columns}
        handleCreate={handleCreate}
        items={members}
        onSave={handleSave}
        onDelete={handleDelete}
        onInfo={handleInfo}
      />
    </div>
  );
}