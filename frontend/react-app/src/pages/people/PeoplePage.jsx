import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, SquarePen, Save, SquareX, SquarePlus, Eraser } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from "../../api/poeple";
import { getPeopleInputColumns } from "../../components/tables/content/columnDefinitions";
import InlineEditTable from "../../components/tables/InlineEditTable";

export default function PersonPage() {
  const { t } = useLanguage();

  const [people, setPeople] = useState([]);

  const columns = getPeopleInputColumns(t)
  const navigate = useNavigate();

  const loadPeople = async () => {
    const data = await getPeople();
    setPeople(data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleCreate = async (draft) => {
    await createPerson(draft);
    loadPeople();
  };

  const handleDelete = async (personId) => {
    await deletePerson(personId);
    loadPeople();
  };

  const handleSave = async (personId, draft) => {
    await updatePerson(personId, draft);

    setPeople((prev) =>
      prev.map((p) =>
        p.id === personId ? { ...p, ...draft } : p
      )
    );
  };

  const handleInfo = async (personId) => {
    navigate(`/people/${personId}`)
  }

  return (
    <div className="container">
      <h2>{t("person.title")}</h2>
      <InlineEditTable
        columns={columns}
        handleCreate={handleCreate}
        items={people}
        handleSave={handleSave}
        handleDelete={handleCreate}
        handleInfo={handleInfo}
      />
    </div>
  );
}