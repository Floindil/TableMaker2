import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getPersonById } from "../../api/poeple";

export default function PersonInfoPage() {
  const { personId } = useParams();
  const { t } = useLanguage();

  const [person, setPerson] = useState(null);

  useEffect(() => {
    const loadPerson = async () => {
      const data = await getPersonById(personId);
      setPerson(data);
    };

    loadPerson();
  }, [personId]);

  if (!person) {
    return <div className="container">Lade...</div>;
  }

  return (
    <div className="container">
      <h2>
        {person.prename} {person.lastname}
      </h2>
    </div>
  );
}