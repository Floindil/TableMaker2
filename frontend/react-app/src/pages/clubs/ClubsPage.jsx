import { createClub, deleteClub, getClubs, updateClub } from "../../api/clubs";
import { getClubColumns } from "../../components/tables/content/columnDefinitions";
import { SUBROUTES } from "../../config";
import ManagmentPage from "../templates/ManagementPage";

export default function ClubsPage() {

    const itemhandling = {
        get: getClubs,
        create: createClub,
        remove: deleteClub,
        update: updateClub,
    }

    return (
        <ManagmentPage
            titleString={"club.title"}
            columnGetter={getClubColumns}
            itemHandling={itemhandling}
            subroute={SUBROUTES.clubs}
        />
    )
}