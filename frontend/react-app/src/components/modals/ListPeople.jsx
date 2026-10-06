import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import SingleActionTable from "../tables/SingleActionTable";
import { getPeopleInfoColumns } from "../tables/content/columnDefinitions";
import { AlignCenter, SquarePlus } from "lucide-react";

export default function ListPeopleModal({ onClose, getPeople, onAction }) {
  const { t } = useLanguage();
  const columns = getPeopleInfoColumns(t);

  const [people, setPeople] = useState([]);

  const loadPeople = async () => {
    const data = await getPeople();
    setPeople(data);
  };

  const action = async (personId) => {
    await onAction(personId);
    await loadPeople();
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div style={overlay}>
      <div style={modal}>
        <SingleActionTable
          items={people}
          columns={columns}
          action={action}
          symbol={SquarePlus}
        />

        <button type="button" onClick={onClose}>
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
};

const modal = {
  background: "white",
  padding: "20px",
  margin: "100px auto",
  width: "600px",
  borderRadius: "6px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};