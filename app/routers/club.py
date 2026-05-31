from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.club import ClubAddTeam, ClubAddUser, ClubCreate, ClubRead, ClubUpdate, ClubAddPerson
from app.schemas.person import PersonRead
from app.schemas.team import TeamRead
from app.services.club_service import ClubService
from app.services.person_service import PersonService
from app.services.team_service import TeamService

router = APIRouter(dependencies=[Depends(get_current_user)])
service = ClubService()
person_service = PersonService()
team_service = TeamService()

DbSession = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


@router.get("/", response_model=list[ClubRead])
def list_clubs(db: DbSession, current_user: CurrentUser):
    return service.list_clubs_for_user(db, current_user.id)


@router.get("/{club_id}", response_model=ClubRead)
def get_club(club_id: int, db: DbSession):
    club = service.get_club(db, club_id)
    if not club:
        raise HTTPException(status_code=404, detail="Club nicht gefunden")
    return club


@router.get("/{club_id}/people", response_model=list[PersonRead])
def get_people_for_club(club_id: int, db: DbSession):
    return person_service.list_people_for_club(db, club_id)


@router.get("/{club_id}/teams", response_model=list[TeamRead])
def get_teams_for_club(club_id: int, db: DbSession):
    return team_service.list_teams_for_club(db, club_id)


@router.post("/", response_model=ClubRead, status_code=201)
def create_club(payload: ClubCreate, db: DbSession, current_user: CurrentUser):
    return service.create_club(db, payload, current_user.id)


@router.patch("/{club_id}", response_model=ClubRead)
def update_club(club_id: int, payload: ClubUpdate, db: DbSession):
    return service.update_club(db, club_id, payload)


@router.delete("/{club_id}", status_code=204)
def delete_club(club_id: int, db: DbSession):
    service.delete_club(db, club_id)


@router.post("/{club_id}/people", status_code=201)
def add_person_to_club(club_id: int, payload: ClubAddPerson, db: DbSession):
    link = service.add_person_to_club(db, club_id, payload)
    return {
        "message": "Spieler zum Club hinzugefügt",
        "link_id": link.id
    }

@router.post("/{club_id}/users", status_code=201)
def add_user_to_club(club_id: int, payload: ClubAddUser, db: DbSession):
    link = service.add_user_to_club(db, club_id, payload)
    return {
        "message": "Benutzer zum Club hinzugefügt",
        "link_id": link.id
    }

@router.post("/{club_id}/teams", status_code=201)
def add_team_to_club(club_id: int, payload: ClubAddTeam, db: DbSession):
    link = service.add_team_to_club(db, club_id, payload)
    return {
        "message": "Team zum Club hinzugefügt",
        "link_id": link.id
    }