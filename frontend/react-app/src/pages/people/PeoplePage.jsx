import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from "../../api/poeple";
import { getPeopleInputColumns } from "../../components/tables/content/columnDefinitions";
import { SUBROUTES } from "../../config";
import ManagmentPage from "../templates/ManagementPage";

export default function PersonPage() {
  
  const itemhandling = {
            get: getPeople,
            create: createPerson,
            remove: deletePerson,
            update: updatePerson,
        }
    
        return (
            <ManagmentPage
              titleString={"person.title"}
              columnGetter={getPeopleInputColumns}
              itemHandling={itemhandling}
              subroute={SUBROUTES.people}
            />
        )
    }