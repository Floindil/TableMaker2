import { getTeams, createTeam, deleteTeam, updateTeam } from "../../api/teams";
import { getTeamInfoColumns } from "../../components/tables/content/columnDefinitions";
import { SUBROUTES } from "../../config";
import ManagmentPage from "../templates/ManagementPage";

export default function TeamsPage() {
  
      const itemhandling = {
          get: getTeams,
          create: createTeam,
          remove: deleteTeam,
          update: updateTeam,
      }
  
      return (
          <ManagmentPage
            titleString={"team.title"}
            columnGetter={getTeamInfoColumns}
            itemHandling={itemhandling}
            subroute={SUBROUTES.teams}
          />
      )
  }