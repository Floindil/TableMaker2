from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user
from app.schemas.club import ClubAddTeam, ClubAddUser, ClubCreate, ClubRead, ClubUpdate, ClubAddPerson
from app.services.club_service import ClubService

router = APIRouter(dependencies=[Depends(get_current_user)])
service = ClubService()

DbSession = Annotated[Session, Depends(get_db)]


@router.get("/", response_model=list[ClubRead])
def list_clubs(db: DbSession):
    return service.list_clubs(db)


@router.get("/{club_id}", response_model=ClubRead)
def get_club(club_id: int, db: DbSession):
    club = service.get_club(db, club_id)
    if not club:
        raise HTTPException(status_code=404, detail="Club nicht gefunden")
    return club


@router.post("/", response_model=ClubRead, status_code=201)
def create_club(payload: ClubCreate, db: DbSession):
    return service.create_club(db, payload)


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