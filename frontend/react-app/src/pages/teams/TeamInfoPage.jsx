import {
  addPerson,
  removePerson,
  getTeamById,
  getPeopleForTeam,
  getPeopleNotInTeam
} from "../../api/teams";
import { createPerson, deletePerson, updatePerson } from "../../api/poeple";
import { getPeopleInputColumns } from "../../components/tables/content/columnDefinitions";
import RelatedItemHandling from "../../components/relatedItemHandling";
import { SUBROUTES } from "../../config";
import ManagementInfoPage from "../templates/ManagementInfoPage";

const teamHandling = {
  get: getTeamById
};

const createAndLinkPerson = async (draft, masterId) => {
  var team = await getTeamById(masterId)
  return await createPerson({
    ...draft,
    club_id: team.club_id,
    team_id: masterId,
    person_number: null
  });
};

const addPersonToTeam = async (teamId, personId) => {
  return await addPerson(teamId, personId, null)
}

const relatedPeopleHandling = new RelatedItemHandling({
  get: getPeopleForTeam,
  getAvailable: getPeopleNotInTeam,
  add: addPersonToTeam,
  create: createAndLinkPerson,
  save: updatePerson,
  delete: deletePerson,
  unlink: removePerson
});

const teamInfoGetter = (team) => ({
  title: team.name,
  fields: [
    {
      key: "owner",
      label: "common.owner",
      value: team.owner?.email
    },
    {
      key: "abbreviation",
      label: "common.abrv",
      value: team.abbreviation
    }
  ]
});

const relatedItemsProperties = [
  {
    key: "people",
    titleString: "person.title",
    columnsGetter: getPeopleInputColumns,
    relatedItemHandling: relatedPeopleHandling,
    relatedRoute: SUBROUTES.people
  }
];

export default function TeamInfoPage() {
  return (
    <ManagementInfoPage
      itemHandling={teamHandling}
      infoGetter={teamInfoGetter}
      relatedItemsProperties={relatedItemsProperties}
    />
  );
}