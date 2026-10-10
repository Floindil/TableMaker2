import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { addPerson, removePerson, getTeamById, getPeopleForTeam, getPeopleNotInTeam } from "../../api/teams";
import { createPerson } from "../../api/poeple";
import { getPeopleInputColumns } from "../../components/tables/content/columnDefinitions";
import { SquarePlus, ListPlus, Unlink } from "lucide-react";
import InlineEditTable from "../../components/tables/InlineEditTable";
import ListPeopleModal from "../../components/modals/ListPeople";

export default function TeamInfoPage() {
  const { teamId } = useParams();
  const { t } = useLanguage();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [showCreateRow, setShowCreateRow] = useState(false);
  const [showListPeopleModal, setModalShowListPeople] = useState(false);

  const columns = getPeopleInputColumns(t);

  const loadMembers = async () => {
    const data = await getPeopleForTeam(team.id);
    setMembers(data);
  };

  const handleSavePerson = async () => {
    console.log("Save")
  };

  const handleCreatePerson = async (draft) => {
    draft.team_id = team.id
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

  const removePersonFromTeam = async (personId) => {
    await removePerson(teamId, personId)
    await loadMembers()
  }

  const ModalCloseListPeople = async () => {
    setModalShowListPeople(false);
  };
  
  const ModalGetPeople = async () => {
    return await getPeopleNotInTeam(teamId);
  };

  const ModalAddPersonToTeam = async (personId) => {
    await addPerson(teamId, personId)
    await loadMembers()
  };

  useEffect(() => {
    const loadTeam = async () => {
      const data = await getTeamById(teamId);
      setTeam(data);
    };

    loadTeam();
  }, [teamId]);

  useEffect(() => {
    if (!team?.id) return;

    loadMembers();
  }, [team]);

  if (!team) {
    return <div className="container">Lade...</div>;
  }

  return (
    <div className="container">
      <h2>{team.name}</h2>

      <table>
        <tbody>
          <tr>
            <td>{t("common.owner")}</td>
            <td>{team.owner.email}</td>
          </tr>
          <tr>
            <td>{t("common.abrv")}</td>
            <td>{team.abbreviation}</td>
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
        customAction={removePersonFromTeam}
        customSymbol={Unlink}
        showCreateRow={showCreateRow}
      />
      

      {showListPeopleModal && (
        <ListPeopleModal
          onClose={ModalCloseListPeople}
          getPeople={ModalGetPeople}
          onAction={ModalAddPersonToTeam}
        />
      )}
    </div>
  );
}