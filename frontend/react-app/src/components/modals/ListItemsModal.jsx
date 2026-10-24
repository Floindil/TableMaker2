import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import SingleActionTable from "../tables/SingleActionTable";
import { SquarePlus } from "lucide-react";

export default function ListItemsModal({
    columns,
    getItems,
    onClose,
    onAction
}) {
    const { t } = useLanguage();

    const [items, setItems] = useState([]);

    const loadItems = async () => {
    const data = await getItems();
    setItems(data);
    };

    const action = async (itemId) => {
    await onAction(itemId);
    await loadItems();
    };

    useEffect(() => {
    loadItems();
    }, []);

    return (
    <div style={overlay}>
        <div style={modal}>
        <SingleActionTable
            items={items}
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

  width: "max-content",
  maxWidth: "90vw",
  maxHeight: "80vh",

  borderRadius: "6px",

  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",

  overflow: "auto",
  boxSizing: "border-box",
};