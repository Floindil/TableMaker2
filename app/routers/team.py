from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.person import PersonRead
from app.schemas.team import TeamCreate, TeamRead, TeamUpdate, TeamAddPerson
from app.services.person_service import PersonService
from app.services.team_service import TeamService

router = APIRouter(dependencies=[Depends(get_current_user)])
service = TeamService()
person_service = PersonService()

DbSession = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


@router.get("/", response_model=list[TeamRead])
def list_teams(db: DbSession, current_user: CurrentUser):
    return service.list_teams_for_user(db, current_user.id)


@router.get("/{team_id}", response_model=TeamRead)
def get_team(team_id: int, db: DbSession):
    team = service.get_team(db, team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team nicht gefunden")
    return team


@router.get("/{team_id}/people", response_model=list[PersonRead])
def get_people_for_team(team_id: int, db:DbSession):
    return person_service.list_people_for_team(db, team_id)


@router.get("/{team_id}/otherPeople", response_model=list[PersonRead])
def get_people_not_in_team(team_id: int, db: DbSession, current_user: CurrentUser):
    return person_service.list_people_not_in_team(db, team_id, current_user.id)


@router.post("/", response_model=TeamCreate, status_code=201)
def create_team(
    payload: TeamCreate,
    db: DbSession,
    current_user: User = Depends(get_current_user)
):
    return service.create_team(db, payload, current_user.id)


@router.post("/{team_id}/people", status_code=201)
def add_person_to_team(team_id: int, payload: TeamAddPerson, db: DbSession):
    link = service.add_person_to_team(db, team_id, payload)
    return {
        "message": "Spieler zum Team hinzugefügt",
        "link_id": link.id
    }


@router.patch("/{team_id}", response_model=TeamRead)
def update_team(team_id: int, payload: TeamUpdate, db: DbSession):
    return service.update_team(db, team_id, payload)


@router.delete("/{team_id}", status_code=204)
def delete_team(team_id: int, db: DbSession):
    return service.delete_team(db, team_id)


@router.delete("/{team_id}/people", status_code=204)
def remove_person_from_team(team_id: int, payload: TeamAddPerson, db: DbSession):
    link = service.remove_person_from_team(db, team_id, payload)
    return {
        "message": "Peron von Team entfernt",
        "link_id": link.id
    }