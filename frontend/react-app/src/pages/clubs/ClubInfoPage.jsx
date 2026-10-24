import ManagementInfoPage from "../templates/ManagementInfoPage";
import {
  getClubById,
  getPeopleForClub,
  getPeopleNotInClub,
  addPerson,
  removePerson,
  getTeamsForClub,
  getTeamsNotInClub,
  addTeam,
  removeTeam
} from "../../api/clubs";
import {
  createPerson,
  deletePerson,
  updatePerson
} from "../../api/poeple";
import {
  createTeam,
  deleteTeam,
  updateTeam,
} from "../../api/teams";
import { getPeopleInputColumns, getTeamInfoColumns } from "../../components/tables/content/columnDefinitions";
import { SUBROUTES } from "../../config";
import RelatedItemHandling from "../../components/relatedItemHandling";

const clubHandling = {
  get: getClubById
};

const createAndLinkPerson = async (draft, masterId) => {
  return await createPerson({
    ...draft,
    club_id: masterId
  });
};

const createAndLinkTeam = async (draft, masterId) => {
  return await createTeam({
    ...draft,
    club_id: masterId
  })
}

const relatedPeopleHandling = new RelatedItemHandling({
  get: getPeopleForClub,
  getAvailable: getPeopleNotInClub,
  add: addPerson,
  create: createAndLinkPerson,
  save: updatePerson,
  delete: deletePerson,
  unlink: removePerson
});

const relatedTeamsHandling = new RelatedItemHandling({
  get: getTeamsForClub,
  getAvailable: getTeamsNotInClub,
  add: addTeam,
  create: createAndLinkTeam,
  save: updateTeam,
  delete: deleteTeam,
  unlink: removeTeam
});

const clubInfoGetter = (club) => ({
  title: club.name,
  fields: [
    {
      key: "owner",
      label: "common.owner",
      value: club.owner?.email
    },
    {
      key: "abbreviation",
      label: "common.abrv",
      value: club.abbreviation
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
  },
  {
    key: "teams",
    titleString: "team.title",
    columnsGetter: getTeamInfoColumns,
    relatedItemHandling: relatedTeamsHandling,
    relatedRoute: SUBROUTES.teams
  }
];

export default function ClubInfoPage() {
  return (
    <ManagementInfoPage
      itemHandling={clubHandling}
      infoGetter={clubInfoGetter}
      relatedItemsProperties={relatedItemsProperties}
    />
  );
}
