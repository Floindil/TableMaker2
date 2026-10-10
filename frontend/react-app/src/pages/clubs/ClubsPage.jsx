import { useEffect, useState } from "react";
import { createClub, deleteClub, getClubs, updateClub } from "../../api/clubs";
import { getClubColumns } from "../../components/tables/content/columnDefinitions";
import InlineEditTable from "../../components/tables/InlineEditTable";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import TitleWithActions from "../../components/pages/TitleWithActions";
import { SquarePlus } from "lucide-react";

export default function ClubsPage() {
    const { t } = useLanguage();
    
    const [clubs, setClubs] = useState([]);
    const [showCreateRow, setShowCreateRow] = useState(false);

    const columns = getClubColumns(t);
    const navigate = useNavigate();

    const loadClubs = async () => {
    const data = await getClubs();
    setClubs(data);
    };

    useEffect(() => {
    loadClubs();
    }, []);

    const handleCreate = async (draft) => {
    await createClub(draft);
    setShowCreateRow(false)
    loadClubs();
    };

    const handleDelete = async (clubId) => {
    await deleteClub(clubId);
    loadClubs();
    };

    const handleSave = async (clubId, draft) => {
    await updateClub(clubId, draft);
        setClubs((prev) =>
            prev.map((p) =>
            p.id === clubId ? { ...p, ...draft } : p
            )
        );
    };

    const handleInfo = async (clubId) => {
    navigate(`/clubs/${clubId}`)
    };

    const toggleCreateRow = async () => {
        setShowCreateRow(!showCreateRow);
    };

    const titelActions = [
        {icon: SquarePlus, onClick: toggleCreateRow}
    ]

    return (
        <div className="container">
            <TitleWithActions
                title={t("club.title")}
                actions={titelActions}
            />
            <InlineEditTable
                columns={columns}
                handleCreate={handleCreate}
                items={clubs}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleInfo={handleInfo}
                showCreateRow={showCreateRow}
            />
        </div>
    )
}