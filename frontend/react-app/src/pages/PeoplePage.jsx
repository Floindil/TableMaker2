import React, { useEffect, useState } from "react";
import { Trash, SquarePen } from "lucide-react";
import PersonModal from "../components/peopleModal/PeopleModal";
import { useLanguage } from "../context/LanguageContext";
import { createPerson, deletePerson, getPeople, updatePerson } from "../api/poeple";

export default function PersonPage() {
  const { t } = useLanguage()

  const [people, setPeople] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const loadPeople = async () => {
    const data = await getPeople();
    setPeople(data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleCreate = async (person) => {
    await createPerson(person);
    loadPeople();
  };

  const handleUpdate = async (person) => {
    await updatePerson(selectedPerson.id, person);
    loadPeople();
  };

  const handleDelete = async (personId) => {
    await deletePerson(personId);
    loadPeople()
  };

  const handleEdit = async (person) => {
    setSelectedPerson(person);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  const columns = [
    t("field.firstName"),
    t("field.lastName"),
    t("field.birthdate"),
    t("field.email"),
    t("field.phone"),
    t("field.license"),
    t("common.actions")
  ]

  return (
    <div className="container">
      <h2>{t("person.title")}</h2>

      <button onClick={() => {
        setSelectedPerson(null);
        setShowModal(true);
      }}>
        {t("person.create")}
      </button>

      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
          <tr>
            <th colSpan={columns.length}><div className="separator" /></th>
          </tr>
        </thead>

        <tbody>
          {people.map((p) => (
            <tr key={p.id}>
              <td>{p.prename}</td>
              <td>{p.lastname}</td>
              <td>{p.birthdate}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.license}</td>
              <td className="button-cell">
                <button className="button-cell-button" onClick={() => handleEdit(p)}>
                  <SquarePen size={18}/>
                </button>
                <button className="button-cell-button" onClick={() => handleDelete(p.id)}>
                  <Trash  size={18}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <PersonModal
          onClose={closeModal}
          onSave={selectedPerson ? handleUpdate : handleCreate}
          person={selectedPerson ?? {
            prename: "",
            lastname: "",
            birthdate: "",
            email: "",
            phone: "",
            license: "",
          }}
        />
      )}
    </div>
  );
}