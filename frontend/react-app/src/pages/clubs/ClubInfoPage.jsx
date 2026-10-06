import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { addPerson, getClubById, getPeopleForClub, getPeopleNotInClub, removePerson } from "../../api/clubs";
import { getPeopleInputColumns } from "../../components/tables/content/columnDefinitions";
import { SquarePlus, ListPlus, Unlink } from "lucide-react";
import InlineEditTable from "../../components/tables/InlineEditTable";
import { createPerson } from "../../api/poeple";
import ListPeopleModal from "../../components/modals/ListPeople";

export default function ClubInfoPage() {
  const { clubId } = useParams();
  const { t } = useLanguage();

  const [club, setClub] = useState(null);
  const [members, setMembers] = useState([]);
  const [showCreateRow, setShowCreateRow] = useState(false);
  const [showListPeopleModal, setModalShowListPeople] = useState(false);

  const columns = getPeopleInputColumns(t);

  const loadMembers = async () => {
    const data = await getPeopleForClub(club.id);
    setMembers(data);
  };

  const handleSavePerson = async () => {
    console.log("Save")
  };

  const handleCreatePerson = async (draft) => {
    draft.club_id = club.id
    await createPerson(draft)
    await loadMembers()
    setShowCreateRow(false)
  };

  const handleDeletePerson = async () => {
    console.log("delete");
  };

  const handlePersonInfo = async () => {
    console.log("info");
  };

  const togglePersonCreateRow = async () => {
    setShowCreateRow(!showCreateRow);
  };

  const removePersonFromClub = async (personId) => {
    await removePerson(clubId, personId)
    await loadMembers()
  }

  const ModalCloseListPeople = async () => {
    setModalShowListPeople(false);
  };
  
  const ModalGetPeople = async () => {
    return await getPeopleNotInClub(clubId);
  };

  const ModalAddPersonToClub = async (personId) => {
    await addPerson(clubId, personId)
    await loadMembers()
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
      <div className="flex-container">
        <h3> {t("person.title")}</h3>
        <button
          className="button-cell-button"
          onClick={() => togglePersonCreateRow()}
          >
          <SquarePlus size={18} />
        </button>        
        <button
          className="button-cell-button"
          onClick={() => setModalShowListPeople(true)}
          >
          <ListPlus size={18} />
        </button>

      </div>
      <InlineEditTable
        columns={columns}
        handleCreate={handleCreatePerson}
        items={members}
        handleSave={handleSavePerson}
        handleDelete={handleDeletePerson}
        handleInfo={handlePersonInfo}
        handleCancel={togglePersonCreateRow}
        customAction={removePersonFromClub}
        customSymbol={Unlink}
        showCreateRow={showCreateRow}
      />
      

      {showListPeopleModal && (
        <ListPeopleModal
          onClose={ModalCloseListPeople}
          getPeople={ModalGetPeople}
          onAction={ModalAddPersonToClub}
        />
      )}
    </div>
  );
}