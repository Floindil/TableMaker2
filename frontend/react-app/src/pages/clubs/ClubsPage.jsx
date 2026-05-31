import { useEffect, useState } from "react";
import { createClub, deleteClub, getClubs } from "../../api/clubs";
import { getClubColumns } from "../../components/tables/content/columnDefinitions";
import InlineEditTable from "../../components/tables/InlineEditTable";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function ClubsPage() {
    const { t } = useLanguage();
    
    const [clubs, setClubs] = useState([]);

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

    return (
        <div className="container">
            <h2>{t("club.title")}</h2>
            <InlineEditTable
                columns={columns}
                handleCreate={handleCreate}
                items={clubs}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleInfo={handleInfo}
            />
        </div>
    )
}