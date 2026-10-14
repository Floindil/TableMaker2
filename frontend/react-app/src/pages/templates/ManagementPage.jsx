import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquarePlus } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import InlineEditTable from "../../components/tables/InlineEditTable";
import TitleWithActions from "../../components/pages/TitleWithActions";

export default function ManagmentPage({
    titleString,
    columnGetter,
    itemHandling: {
        get,
        create,
        update,
        remove,
        unlink
    },
    subroute
}) {
    const { t } = useLanguage();
    
    const [items, setItems] = useState([]);
    const [showCreateRow, setShowCreateRow] = useState(false);

    const columns = columnGetter(t);
    const navigate = useNavigate();

    const loadItems = async () => {
    const data = await get();
    setItems(data);
    };

    useEffect(() => {
    loadItems();
    }, []);

    const handleCreate = async (draft) => {
    await create(draft);
    setShowCreateRow(false)
    loadItems();
    };

    const handleDelete = async (id) => {
    await remove(id);
    loadItems();
    };

    const handleSave = async (id, draft) => {
    await update(id, draft);
        setItems((prev) =>
            prev.map((p) =>
            p.id === id ? { ...p, ...draft } : p
            )
        );
    };

    const handleInfo = async (id) => {
    navigate(`/${subroute}/${id}`)
    };

    const handleUnlink = async (id) => {
        await unlink(id);
        loadItems();
    };

    const toggleCreateRow = async () => {
        setShowCreateRow(!showCreateRow);
    };

    const titelActions = [
        {icon: SquarePlus, onClick: toggleCreateRow}
    ];

    const lineItemHandling = {
        handleCreate: handleCreate,
        handleSave: handleSave,
        handleDelete: handleDelete,
        handleInfo: handleInfo,
        ...(typeof unlink === "function" && {
            handleUnlink: handleUnlink
        })
    };

    return (
        <div className="container">
            <TitleWithActions
                title={t(titleString)}
                actions={titelActions}
            />
            <InlineEditTable
                columns={columns}
                items={items}
                itemHandling={lineItemHandling}
                showCreateRow={showCreateRow}
            />
        </div>
    )
}