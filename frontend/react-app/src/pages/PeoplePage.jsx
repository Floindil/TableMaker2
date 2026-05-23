import React, { useEffect, useState } from "react";
import { Trash, SquarePen, Save, SquareX, SquarePlus, Eraser } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from "../api/poeple";
import CreateRow from "../components/tableContent/CreateRow";
import TableRows from "../components/tableContent/tableRows";
import HeaderRow from "../components/tableContent/HeaderRow";

export default function PersonPage() {
  const { t } = useLanguage();

  const [people, setPeople] = useState([]);
  const [createDraft, setCreateDraft] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});

  const columns = [
    { label: t("field.firstName"), key: "prename", ac: "given-name" },
    { label: t("field.lastName"), key: "lastname", ac: "family-name" },
    { label: t("field.birthdate"), key: "birthdate", ac: "date" },
    { label: t("field.email"), key: "email", ac: "email" },
    { label: t("field.phone"), key: "phone", ac: "tel" },
    { label: t("field.license"), key: "license", ac: "" },
  ];

  const loadPeople = async () => {
    const data = await getPeople();
    setPeople(data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleCreateChange = (key, value) => {
    setCreateDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    await createPerson(createDraft);
    setCreateDraft({});
    loadPeople();
  };

  const handleErase = () => {
    setCreateDraft({});
  };

  const handleDelete = async (personId) => {
    await deletePerson(personId);
    loadPeople();
  };

  const handleEdit = (person) => {
    setEditingId(person.id);
    setDraft({ ...person });
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

  const handleSave = async (personId) => {
    await updatePerson(personId, draft);

    setPeople((prev) =>
      prev.map((p) =>
        p.id === personId ? { ...p, ...draft } : p
      )
    );

    setEditingId(null);
    setDraft({});
  };

  return (
    <div className="container">
      <h2>{t("person.title")}</h2>

      <table>
        <thead>
          <HeaderRow columns={columns} actionsLabel={t("common.actions")}/>
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
            items={people}
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