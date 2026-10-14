
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import RelatedItems from "../../components/pages/relatedItems";

export default function ManagementInfoPage({
  itemHandling,
  infoGetter,
  relatedItemsProperties = []
}) {
  const { id } = useParams();
  const { t } = useLanguage();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadItem = async () => {
      setLoading(true);

      try {
        const data = await itemHandling.get(id);
        if (active) setItem(data);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadItem();

    return () => {
      active = false;
    };
  }, [id, itemHandling.get]);

  if (loading) {
    return <div className="container">Lade...</div>;
  }

  if (!item) {
    return <div className="container">
      Eintrag nicht gefunden.
    </div>;
  }

  const info = infoGetter(item, t);

  return (
    <div className="container">
      <h2>{info.title}</h2>

      <table>
        <tbody>
          {info.fields.map((field) => (
            <tr key={field.key}>
              <td>{t(field.label)}</td>
              <td>{field.value ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {relatedItemsProperties.map((rip) => (
        <RelatedItems
          key={rip.key}
          masterId={id}
          titleString={rip.titleString}
          columnsGetter={rip.columnsGetter}
          relatedItemHandling={rip.relatedItemHandling}
          relatedRoute={rip.relatedRoute}
        />
      ))}
    </div>
  );
}
