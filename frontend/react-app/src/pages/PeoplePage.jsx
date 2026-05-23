import React, { useEffect, useState } from "react";
import { Trash, SquarePen, Save, SquareX, SquarePlus, Eraser } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from "../api/poeple";

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
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th>{t("common.actions")}</th>
          </tr>

          <tr>
            <th colSpan={columns.length + 1}>
              <div className="separator" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {columns.map((c) => (
              <td key={c.key}>
                <input
                  id={`create-${c.key}`}
                  value={createDraft[c.key] ?? ""}
                  onChange={(e) =>
                    handleCreateChange(c.key, e.target.value)
                  }
                  {...(c.ac ? { autoComplete: c.ac } : {})}
                  className="create-input"
                  placeholder={c.label}
                />
              </td>
            ))}

            <td className="button-cell">
              <button
                className="button-cell-button"
                onClick={handleCreate}
              >
                <SquarePlus size={18} />
              </button>

              <button
                className="button-cell-button"
                onClick={handleErase}
              >
                <Eraser size={18} />
              </button>
            </td>
          </tr>

          {people.map((p) => {
            const isEditing = editingId === p.id;

            return (
              <tr key={p.id}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {isEditing ? (
                      <input
                        id={`edit-${p.id}-${c.key}`}
                        value={draft[c.key] ?? ""}
                        onChange={(e) =>
                          handleDraftChange(c.key, e.target.value)
                        }
                        {...(c.ac ? { autoComplete: c.ac } : {})}
                      />
                    ) : (
                      <span className="table-cell">{p[c.key] || "-"}</span>
                    )}
                  </td>
                ))}

                <td className="button-cell">
                  {isEditing ? (
                    <>
                      <button
                        className="button-cell-button"
                        onClick={() => handleSave(p.id)}
                      >
                        <Save size={18} />
                      </button>

                      <button
                        className="button-cell-button"
                        onClick={handleCancel}
                      >
                        <SquareX size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="button-cell-button"
                        onClick={() => handleEdit(p)}
                      >
                        <SquarePen size={18} />
                      </button>

                      <button
                        className="button-cell-button"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash size={18} color="red" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}