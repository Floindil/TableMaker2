
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import InlineEditTable from "../tables/InlineEditTable";
import TitleWithActions from "./TitleWithActions";
import ListPeopleModal from "../modals/ListPeople";
import { ListPlus, SquarePlus } from "lucide-react";

export default function RelatedItems({
  masterId,
  titleString,
  columnsGetter,
  relatedItemHandling: {
    get,
    getAvailable,
    add,
    save,
    create,
    delete: deleteItem,
    unlink
  },
  relatedRoute
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [showCreateRow, setShowCreateRow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const columns = columnsGetter(t);

  // Verknüpfte Einträge laden
  const loadRelatedItems = async () => {
    const data = await get(masterId);
    setItems(data);
  };

  useEffect(() => {
    if (masterId == null) return;

    loadRelatedItems();
  }, [masterId, get]);

  // Bestehenden Eintrag bearbeiten
  const handleSave = async (itemId, draft) => {
    await save(itemId, draft);
    await loadRelatedItems();
  };

  // Neuen Eintrag erstellen
  const handleCreate = async (draft) => {
    await create(draft, masterId);
    setShowCreateRow(false);
    await loadRelatedItems();
  };

  // Eintrag vollständig löschen
  const handleDelete = async (itemId) => {
    await deleteItem(itemId);
    await loadRelatedItems();
  };

  // Verknüpfung entfernen
  const handleUnlink = async (itemId) => {
    await unlink(masterId, itemId);
    await loadRelatedItems();
  };

  // Detailseite öffnen
  const handleInfo = (itemId) => {
    navigate(`/${relatedRoute}/${itemId}`);
  };

  // Erstellung abbrechen
  const handleCancel = () => {
    setShowCreateRow(false);
  };

  // Verfügbare, noch nicht verknüpfte Einträge laden
  const handleModalGet = async () => {
    return await getAvailable(masterId);
  };

  // Bestehenden Eintrag verknüpfen
  const handleModalAdd = async (itemId) => {
    await add(masterId, itemId);
    await loadRelatedItems();
  };

  // Aktionen für InlineEditTable
  const itemHandling = {
    ...(save && { handleSave: handleSave }),
    ...(create && { handleCreate: handleCreate }),
    ...(deleteItem && { handleDelete: handleDelete }),
    ...(relatedRoute && { handleInfo: handleInfo }),
    ...(create && { handleCancel: handleCancel }),
    ...(unlink && { handleUnlink: handleUnlink })
  };

  // Aktionen für die Überschrift
  const titleActions = [
    ...(create
      ? [{
          icon: SquarePlus,
          onClick: () => setShowCreateRow(prev => !prev)
        }]
      : []),

    ...(add && getAvailable
      ? [{
          icon: ListPlus,
          onClick: () => setShowModal(true)
        }]
      : [])
  ];

  return (
    <div className="container">
      <TitleWithActions
        title={t(titleString)}
        actions={titleActions}
      />

      <InlineEditTable
        columns={columns}
        items={items}
        itemHandling={itemHandling}
        showCreateRow={showCreateRow}
      />

      {showModal && add && getAvailable && (
        <ListPeopleModal
          onClose={() => setShowModal(false)}
          getPeople={handleModalGet}
          onAction={handleModalAdd}
        />
      )}
    </div>
  );
}
